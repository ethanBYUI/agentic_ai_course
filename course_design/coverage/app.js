/* =============================================================================
 * Coverage linter — app / DOM layer
 * -----------------------------------------------------------------------------
 * Handles: folder access (File System Access API, with a webkitdirectory
 * fallback for Brave Shields / file://), handle persistence, and rendering the
 * five tabs from the pure result produced by linter.js.
 * ========================================================================== */
(function () {
  "use strict";

  var CFG = window.COVERAGE_CONFIG;
  var SVGNS = "http://www.w3.org/2000/svg";
  var state = { dirHandle: null, result: null, pollTimer: null };

  var el = {
    load: document.getElementById("load"),
    fallback: document.getElementById("fallback"),
    exportBtn: document.getElementById("export"),
    poll: document.getElementById("poll"),
    status: document.getElementById("status"),
    summary: document.getElementById("summary"),
    tabs: document.getElementById("tabs"),
    relation: document.getElementById("relation")
  };

  /* ---- status helper ------------------------------------------------------- */
  function status(html, cls) {
    el.status.className = "status" + (cls ? " " + cls : "");
    el.status.innerHTML = html;
  }

  /* ---- IndexedDB: persist the directory handle ----------------------------- */
  function idb(cb) {
    var open = indexedDB.open("coverage-linter", 1);
    open.onupgradeneeded = function () { open.result.createObjectStore("kv"); };
    open.onsuccess = function () { cb(open.result); };
    open.onerror = function () { cb(null); };
  }
  function idbSet(key, val) {
    idb(function (db) {
      if (!db) return;
      try { db.transaction("kv", "readwrite").objectStore("kv").put(val, key); } catch (e) {}
    });
  }
  function idbGet(key, cb) {
    idb(function (db) {
      if (!db) return cb(null);
      try {
        var r = db.transaction("kv", "readonly").objectStore("kv").get(key);
        r.onsuccess = function () { cb(r.result || null); };
        r.onerror = function () { cb(null); };
      } catch (e) { cb(null); }
    });
  }

  /* ---- reading files ------------------------------------------------------- */

  // Walk a directory handle recursively, collecting .md files (skip ignored).
  function walkHandle(dirHandle, prefix, out) {
    return (async function () {
      for await (var entry of dirHandle.values()) {
        var name = entry.name;
        var rel = prefix ? prefix + "/" + name : name;
        if (entry.kind === "directory") {
          if (CFG.ignoreFolders.indexOf(name) !== -1 || name.charAt(0) === ".") continue;
          await walkHandle(entry, rel, out);
        } else if (/\.md$/i.test(name)) {
          out.push({ path: rel, handle: entry });
        }
      }
      return out;
    })();
  }

  async function readViaHandle(dirHandle) {
    var entries = await walkHandle(dirHandle, "", []);
    var files = [];
    for (var i = 0; i < entries.length; i++) {
      var file = await entries[i].handle.getFile();
      files.push({ path: entries[i].path, text: await file.text() });
    }
    return files;
  }

  // Fallback: <input webkitdirectory>. webkitRelativePath includes the picked
  // folder name as its first segment; strip it so paths match the handle form.
  function readViaInput(fileList) {
    var arr = Array.prototype.slice.call(fileList).filter(function (f) { return /\.md$/i.test(f.name); });
    return Promise.all(arr.map(function (f) {
      var rel = (f.webkitRelativePath || f.name).split("/").slice(1).join("/") || f.name;
      return f.text().then(function (t) { return { path: rel, text: t }; });
    })).then(function (files) {
      // drop ignored folders
      return files.filter(function (f) {
        var top = f.path.split("/")[0];
        return CFG.ignoreFolders.indexOf(top) === -1;
      });
    });
  }

  /* ---- run ----------------------------------------------------------------- */

  function run(files) {
    var result;
    try {
      result = window.CoverageLinter.analyze(files, CFG);
    } catch (e) {
      status("Parse error: " + e.message, "err");
      console.error(e);
      return;
    }
    state.result = result;
    el.exportBtn.disabled = false;
    renderAll(result);
    var s = result.summary;
    var when = new Date().toLocaleTimeString();
    status("Read <b>" + files.length + "</b> files · <b>" + s.hardViolations +
      "</b> hard, <b>" + s.softWarnings + "</b> soft · " +
      (s.pass ? "<b class='ok'>PASS</b>" : "hard gaps present") + " · " + when,
      s.pass ? "ok" : null);
  }

  async function loadFromHandle(dirHandle, opts) {
    opts = opts || {};
    try {
      if (dirHandle.requestPermission && !opts.silent) {
        var perm = await dirHandle.requestPermission({ mode: "read" });
        if (perm !== "granted") { status("Permission to read the folder was denied.", "err"); return; }
      }
      var files = await readViaHandle(dirHandle);
      state.dirHandle = dirHandle;
      idbSet("dir", dirHandle);
      run(files);
    } catch (e) {
      if (opts.silent) return;                 // quiet auto-load attempt failed
      status("Could not read folder: " + e.message, "err");
      console.error(e);
    }
  }

  async function pickAndLoad() {
    // Preferred path: File System Access API (persists, dialog-free refresh).
    if (window.showDirectoryPicker) {
      try {
        // Always open at the hardcoded folder from config (default "documents").
        // We deliberately DON'T pass `id`: that would make the browser reopen at
        // wherever you browsed last session, which is exactly the drift we don't
        // want here — the picker should start in the same place every time.
        var handle = await window.showDirectoryPicker({
          mode: "read",
          startIn: CFG.startInDirectory || "documents"
        });
        await loadFromHandle(handle);
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;   // user closed the picker
        // Otherwise fall through to the input fallback (Brave Shields, file://).
        console.warn("showDirectoryPicker unavailable, using fallback:", e);
      }
    }
    // Fallback path: webkitdirectory input (always works, no persistence).
    el.fallback.value = "";
    el.fallback.click();
  }

  // If we still hold the handle, refresh with no dialog. Otherwise re-pick.
  function refresh() {
    if (state.dirHandle) {
      readViaHandle(state.dirHandle).then(run).catch(function (e) {
        status("Re-read failed (" + e.message + ") — click Load to re-pick.", "err");
        state.dirHandle = null;
        el.load.textContent = "Load course folder";
      });
    } else {
      pickAndLoad();
    }
  }

  /* ---- rendering: summary + dispatch --------------------------------------- */

  function renderAll(result) {
    el.load.textContent = "Refresh";
    renderSummary(result.summary);
    renderDashboard(result.rules);
    renderNodeLink(result.model);
    renderMatrix(result);
    renderGraph(result);
    updateTabBadges(result.rules);
  }

  function renderSummary(s) {
    var c = s.counts;
    var stats = [
      ["competencies", c.competencies], ["use cases", c.useCases],
      ["activities", c.activities], ["assessments", c.assessments],
      ["examples", c.examples], ["prep readings", c.prepReadings],
      ["days", c.days], ["templates", c.templates]
    ];
    var html = stats.map(function (p) {
      return '<div class="stat"><div class="n">' + p[1] + '</div><div class="l">' + p[0] + '</div></div>';
    }).join("");
    html += '<div class="verdict ' + (s.pass ? "pass" : "fail") + '">' +
      (s.pass ? "✓ PASS" : "✗ " + s.hardViolations + " hard gap" + (s.hardViolations === 1 ? "" : "s")) + '</div>';
    el.summary.innerHTML = html;
  }

  function updateTabBadges(rules) {
    var hard = rules.filter(function (r) { return !r.soft; })
      .reduce(function (n, r) { return n + r.offenders.length; }, 0);
    var tab = el.tabs.querySelector('[data-tab="m3"]');
    tab.innerHTML = "Dashboard" +
      '<span class="badge ' + (hard ? "" : "zero") + '">' + hard + "</span>";
  }

  /* ---- dashboard ------------------------------------------------- */

  function buildRuleCard(r) {
    var pct = r.total ? Math.round((r.satisfied / r.total) * 100) : 100;
    var cls = r.offenders.length === 0 ? "r-full" : (r.soft ? "r-warn" : "r-part");
    var card = document.createElement("div");
    card.className = "rule " + cls;
    var reveal = "";
    if (r.offenders.length) {
      // Sorted numeric/alphabetical, all shown, one per row when expanded.
      var sorted = r.offenders.slice().sort(function (a, b) {
        return String(a.id).localeCompare(String(b.id), undefined, { numeric: true, sensitivity: "base" });
      });
      var n = r.offenders.length;
      var list = '<div class="r-list" hidden>' + sorted.map(function (o) {
        return '<div class="r-item ' + (r.soft ? "warn" : "") + '">' +
          '<span class="ri-id">' + esc(o.id) + "</span>" +
          '<span class="ri-label">' + esc(o.label) + "</span></div>";
      }).join("") + "</div>";
      reveal = '<div class="r-reveal"><button class="r-toggle" type="button" aria-expanded="false">' +
        n + " gap" + (n === 1 ? "" : "s") + ' <span class="caret">▾</span></button></div>' + list;
    }
    card.innerHTML =
      '<div class="r-top"><span class="r-name">' + esc(r.name) +
        (r.soft ? ' <span class="soft-tag">soft</span>' : "") + "</span>" +
        '<span class="r-frac">' + r.satisfied + " / " + r.total + "</span></div>" +
      '<div class="meter"><span style="width:' + pct + '%"></span></div>' +
      (r.offenders.length ? reveal : '<div class="r-done">✓ complete</div>') +
      (r.note ? '<div class="r-note">' + esc(r.note) + "</div>" : "");
    return card;
  }

  // We distribute cards into real column elements ourselves (rather than CSS
  // multi-column) so a card expanding only lengthens its own column — it never
  // reflows into a neighbouring column the way balanced CSS columns do.
  function renderDashboard(rules) {
    var body = document.getElementById("m3-body");
    if (!rules.length) { body.innerHTML = '<div class="empty">No rules ran.</div>'; return; }
    state.dashRules = rules;

    var wrap = document.createElement("div");
    wrap.className = "rules";
    var width = body.clientWidth || 960;
    var n = Math.max(1, Math.floor((width + 12) / 332));   // ~320px card + 12px gap
    var colEls = [];
    for (var i = 0; i < n; i++) {
      var col = document.createElement("div");
      col.className = "rule-col";
      wrap.appendChild(col);
      colEls.push(col);
    }
    // Round-robin so cards still read left-to-right, row by row, when collapsed.
    rules.forEach(function (r, i) { colEls[i % n].appendChild(buildRuleCard(r)); });

    // Toggle a card open/closed without disturbing any other card.
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".r-toggle");
      if (!btn) return;
      var card = btn.closest(".rule");
      var list = card.querySelector(".r-list");
      var open = list.hasAttribute("hidden");
      if (open) { list.removeAttribute("hidden"); } else { list.setAttribute("hidden", ""); }
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      card.classList.toggle("expanded", open);
    });
    body.innerHTML = "";
    body.appendChild(wrap);

    // Re-flow columns on width changes (collapses open cards — acceptable on resize).
    if (!state.dashResizeBound) {
      state.dashResizeBound = true;
      var t;
      window.addEventListener("resize", function () {
        clearTimeout(t);
        t = setTimeout(function () { if (state.dashRules) renderDashboard(state.dashRules); }, 150);
      });
    }
  }

  /* ---- node-link ------------------------------------------------- */

  function renderNodeLink(model) {
    var body = document.getElementById("m2-body");
    var comps = model.competencies;
    var teaching = model.nodes.filter(function (n) {
      return n.kind === "in_class" || n.kind === "practice" || n.kind === "activity" || n.kind === "assessment";
    });
    if (!comps.length && !teaching.length) {
      body.innerHTML = '<div class="empty">Nothing to draw yet.</div>'; return;
    }
    // Which competencies are covered by any teaching/assessment node?
    var coveredComp = {};
    teaching.forEach(function (n) {
      n.competencies.forEach(function (L) {
        comps.forEach(function (c) {
          if (window.CoverageLinter.covers(L, c.id)) coveredComp[c.id] = true;
        });
      });
    });
    var days = Object.keys(model.days).sort(function (a, b) {
      return (model.days[a].dayIndex || 0) - (model.days[b].dayIndex || 0);
    });

    var colX = { comp: 150, node: 470, day: 800 };
    var rowH = 26, pad = 40;
    var rows = Math.max(comps.length, teaching.length, days.length, 1);
    var height = pad * 2 + rows * rowH;
    var width = 920;

    var yComp = {}, yNode = {}, yDay = {};
    comps.forEach(function (c, i) { yComp[c.id] = pad + i * rowH; });
    teaching.forEach(function (n, i) { yNode[n.id] = pad + i * rowH; });
    days.forEach(function (d, i) { yDay[d] = pad + i * rowH; });

    var svg = svgEl("svg", { viewBox: "0 0 " + width + " " + height, width: "100%",
      height: height, role: "img" });

    // headers
    svg.appendChild(text(colX.comp, 22, "Competency", { fill: "var(--c-comp)", "font-weight": 700, "text-anchor": "middle" }));
    svg.appendChild(text(colX.node, 22, "Activity / Assessment", { fill: "var(--c-activity)", "font-weight": 700, "text-anchor": "middle" }));
    svg.appendChild(text(colX.day, 22, "Day", { fill: "var(--c-day)", "font-weight": 700, "text-anchor": "middle" }));

    // edges comp -> node
    teaching.forEach(function (n) {
      n.competencies.forEach(function (L) {
        comps.forEach(function (c) {
          if (window.CoverageLinter.covers(L, c.id) && yComp[c.id] != null) {
            svg.appendChild(edge(colX.comp + 8, yComp[c.id], colX.node - 8, yNode[n.id]));
          }
        });
      });
      // edge node -> day
      if (n.day && yDay[n.day] != null) {
        svg.appendChild(edge(colX.node + 8, yNode[n.id], colX.day - 8, yDay[n.day]));
      }
    });

    // competency nodes (orphan = uncovered)
    comps.forEach(function (c) {
      var orphan = !coveredComp[c.id];
      svg.appendChild(dot(colX.comp, yComp[c.id], orphan ? "var(--gap)" : "var(--c-comp)", orphan));
      svg.appendChild(text(colX.comp - 12, yComp[c.id] + 4, c.id,
        { "text-anchor": "end", "font-size": 11, fill: orphan ? "var(--gap)" : "var(--fg)" }));
    });
    // activity/assessment nodes (orphan = no day)
    teaching.forEach(function (n) {
      var color = n.kind === "assessment" ? "var(--c-assess)" : "var(--c-activity)";
      var orphan = !n.day;
      svg.appendChild(dot(colX.node, yNode[n.id], orphan ? "var(--gap)" : color, orphan));
      svg.appendChild(text(colX.node + 12, yNode[n.id] + 4, clip(n.label, 34),
        { "text-anchor": "start", "font-size": 11, fill: "var(--fg)" }));
    });
    // day nodes
    days.forEach(function (d) {
      svg.appendChild(dot(colX.day, yDay[d], "var(--c-day)", false));
      svg.appendChild(text(colX.day + 12, yDay[d] + 4, "Day " + d,
        { "text-anchor": "start", "font-size": 11, fill: "var(--fg)" }));
    });

    var scroll = document.createElement("div");
    scroll.className = "svg-scroll";
    scroll.appendChild(svg);
    body.innerHTML = "";
    if (!days.length) {
      var n = document.createElement("div");
      n.className = "note";
      n.innerHTML = "No days placed yet — every scheduled node shows as a red orphan on the right until instances land in day files.";
      body.appendChild(n);
    }
    body.appendChild(scroll);
  }

  /* ---- matrix ---------------------------------------------------- */

  var RELATIONS = [
    { id: "comp-assess", label: "Competency × Assessment", rowsOf: "competencies", colsKind: "assessment", rule: ">=1" },
    { id: "comp-activity", label: "Competency × Activity", rowsOf: "competencies", colsKind: "teaching", rule: ">=1" },
    { id: "uc-example", label: "Use case × Example", rowsOf: "useCases", colsKind: "example", byUseCase: true, rule: ">=1" }
  ];

  function renderMatrix(result) {
    if (!el.relation.options.length) {
      RELATIONS.forEach(function (r) {
        var o = document.createElement("option");
        o.value = r.id; o.textContent = r.label;
        el.relation.appendChild(o);
      });
      el.relation.onchange = function () { drawMatrix(result); };
    }
    drawMatrix(result);
  }

  function drawMatrix(result) {
    var body = document.getElementById("m1-body");
    var rel = RELATIONS.filter(function (r) { return r.id === el.relation.value; })[0] || RELATIONS[0];
    var model = result.model;
    var rows = (model[rel.rowsOf] || []).slice().sort(function (a, b) {
      return String(a.id).localeCompare(String(b.id), undefined, { numeric: true, sensitivity: "base" });
    });
    var cols = colsFor(model, rel).slice().sort(function (a, b) {
      return String(a.label).localeCompare(String(b.label), undefined, { numeric: true, sensitivity: "base" });
    });
    if (!rows.length || !cols.length) {
      body.innerHTML = '<div class="empty">No ' +
        (!rows.length ? rel.rowsOf : "columns") + ' to show for this relation yet.</div>';
      return;
    }

    function hit(row, col) {
      if (rel.byUseCase) {
        return (col.useCases || []).indexOf(row.id) !== -1;
      }
      return (col.competencies || []).some(function (L) {
        return window.CoverageLinter.covers(L, row.id);
      });
    }

    var thead = "<tr><th class='rowh'>" + esc(rel.rowsOf) + " ↓ / " + esc(rel.colsKind) + " →</th>" +
      "<th class='sumh'>Σ</th>" +
      cols.map(function (c) { return "<th title='" + esc(c.label) + "'>" + esc(clip(c.label, 14)) + "</th>"; }).join("") +
      "</tr>";
    var tbody = rows.map(function (row) {
      var sum = 0;
      var cells = cols.map(function (c) {
        var on = hit(row, c);
        if (on) sum++;
        return on ? "<td class='cell-ok'></td>" : "<td class='cell-empty'>·</td>";
      }).join("");
      var gap = sum === 0;
      return "<tr class='" + (gap ? "gap-row" : "") + "'><th class='rowh' title='" + esc(row.label) + "'>" +
        esc(row.id) + " " + esc(clip(row.label, 30)) + "</th>" +
        "<td class='sum " + (gap ? "sum-gap" : "sum-ok") + "'>" + sum + "</td>" + cells + "</tr>";
    }).join("");

    body.innerHTML = "<div class='matrix-scroll'><table class='matrix'><thead>" +
      thead + "</thead><tbody>" + tbody + "</tbody></table></div>";
  }

  function colsFor(model, rel) {
    if (rel.colsKind === "teaching") {
      return model.nodes.filter(function (n) {
        return n.kind === "in_class" || n.kind === "practice" || n.kind === "activity";
      });
    }
    return model.nodes.filter(function (n) { return n.kind === rel.colsKind; });
  }

  /* ---- Graph tab: model overview ------------------------------------------- */

  function renderGraph(result) {
    var c = result.summary.counts;
    var body = document.getElementById("graph-body");
    var defs = '<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">' +
      '<path d="M0,0 L8,4 L0,8 Z" fill="var(--axis)"/></marker></defs>';
    function n(x, y, r, color, lines, count) {
      var t = lines.map(function (ln, i) {
        return '<text x="' + x + '" y="' + (y - (lines.length - 1) * 7 + i * 14 + 4) +
          '" fill="var(--fg)" text-anchor="middle" font-size="12" font-weight="600">' + esc(ln) + "</text>";
      }).join("");
      return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + color +
        '" opacity="0.16" stroke="' + color + '" stroke-width="1.6"/>' + t +
        '<text x="' + x + '" y="' + (y + r + 16) + '" fill="var(--muted)" text-anchor="middle" font-size="11">' +
        count + "</text>";
    }
    var edges = [
      [150,150, 360,80], [150,150, 360,150], [280,250, 360,175],
      [430,150, 620,150], [430,80, 620,120], [280,250, 620,200]
    ].map(function (e) {
      return '<path d="M' + e[0] + "," + e[1] + " L" + e[2] + "," + e[3] +
        '" marker-end="url(#arr)"/>';
    }).join("");
    var svg = '<svg viewBox="0 0 780 300" width="100%" role="img">' + defs +
      '<g stroke="var(--axis)" stroke-width="1.6" fill="none">' + edges + "</g>" +
      n(110, 150, 30, "var(--c-comp)", ["Compe-", "tency"], c.competencies) +
      n(370, 80, 27, "var(--c-assess)", ["Assess"], c.assessments) +
      n(370, 155, 27, "var(--c-activity)", ["Activity"], c.activities) +
      n(280, 255, 27, "var(--c-usecase)", ["Use case"], c.useCases) +
      n(500, 255, 27, "var(--c-example)", ["Example"], c.examples) +
      n(640, 150, 30, "var(--c-day)", ["Day"], c.days) +
      "</svg>";
    body.innerHTML = '<div class="svg-scroll">' + svg + "</div>" +
      '<div class="note">Solid arrows are "requires ≥1 of." Counts are live from your files. ' +
      "Prep readings: <b>" + c.prepReadings + "</b> · templates: <b>" + c.templates + "</b>.</div>";
  }

  /* ---- svg helpers --------------------------------------------------------- */
  function svgEl(name, attrs) {
    var e = document.createElementNS(SVGNS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function text(x, y, str, attrs) {
    var t = svgEl("text", Object.assign({ x: x, y: y }, attrs || {}));
    t.textContent = str;
    return t;
  }
  function dot(x, y, color, ring) {
    var g = svgEl("g", {});
    g.appendChild(svgEl("circle", { cx: x, cy: y, r: 6, fill: color }));
    if (ring) g.appendChild(svgEl("circle", { cx: x, cy: y, r: 11, fill: "none",
      stroke: "var(--gap)", "stroke-width": 1.2, "stroke-dasharray": "3 3" }));
    return g;
  }
  function edge(x1, y1, x2, y2) {
    var mx = (x1 + x2) / 2;
    return svgEl("path", { d: "M" + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + x2 + "," + y2,
      fill: "none", stroke: "var(--axis)", "stroke-width": 1, opacity: 0.55 });
  }

  /* ---- misc helpers -------------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function clip(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  /* ---- export -------------------------------------------------------------- */
  function exportJson() {
    if (!state.result) return;
    var blob = new Blob([JSON.stringify(state.result, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "coverage.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ---- tabs ---------------------------------------------------------------- */
  el.tabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    var id = btn.getAttribute("data-tab");
    Array.prototype.forEach.call(el.tabs.querySelectorAll(".tab"), function (t) { t.classList.remove("active"); });
    btn.classList.add("active");
    Array.prototype.forEach.call(document.querySelectorAll(".panel"), function (p) { p.classList.remove("active"); });
    document.getElementById("panel-" + id).classList.add("active");
  });

  /* ---- wire up ------------------------------------------------------------- */
  el.load.addEventListener("click", refresh);
  el.exportBtn.addEventListener("click", exportJson);
  el.fallback.addEventListener("change", function () {
    if (this.files && this.files.length) readViaInput(this.files).then(run);
  });
  el.poll.addEventListener("change", function () {
    if (state.pollTimer) { clearInterval(state.pollTimer); state.pollTimer = null; }
    if (this.checked && state.dirHandle) {
      state.pollTimer = setInterval(function () {
        if (state.dirHandle) readViaHandle(state.dirHandle).then(run).catch(function () {});
      }, 2000);
    } else if (this.checked) {
      status("Hot-reload needs the File System Access path (not the fallback). Use the Refresh button instead.", "err");
      this.checked = false;
    }
  });

  // On load: if we persisted a handle and still have permission, auto-run (zero clicks).
  idbGet("dir", function (handle) {
    if (!handle || !handle.queryPermission) return;
    handle.queryPermission({ mode: "read" }).then(function (perm) {
      if (perm === "granted") {
        status("Restoring last folder…");
        loadFromHandle(handle, { silent: true });
      } else {
        status('Last folder remembered — click <b>Load course folder</b> to re-grant access (no re-pick).');
      }
    }).catch(function () {});
  });

})();
