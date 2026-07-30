/* =============================================================================
 * Coverage linter — pure parse + rules engine (no DOM)
 * -----------------------------------------------------------------------------
 * Exposes window.CoverageLinter.analyze(files, config) -> result.
 *   files  : [{ path: "lessons/lesson1_2.md", text: "..." }, ...]
 *   config : window.COVERAGE_CONFIG
 *
 * The whole coverage map is a typed graph:
 *   - competencies come from numbered bullets (position = id + hierarchy)
 *   - use cases come from level-2 headers
 *   - activities/assessments come from L2 headers + a `<!-- ... -->` block
 *   - a "day" is derived from a filename suffix (unit_day) or a `day:` override,
 *     and aggregates every instance that lands on it
 *
 * Because there is no DOM in here, this same file can be require()'d from Node
 * later for a commit hook — same rules, no rewrite.
 * ========================================================================== */
(function (global) {
  "use strict";

  /* ---- tiny helpers -------------------------------------------------------- */

  function slug(s) {
    return String(s).toLowerCase()
      .replace(/\*[^*]*\*/g, "")        // drop *italic tags*
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "node";
  }

  function basename(path) {
    const p = path.split("/").pop();
    return p.replace(/\.(md|qmd|ipynb)$/i, "");
  }

  function topFolder(path) {
    const parts = path.split("/");
    return parts.length > 1 ? parts[0] : "";
  }

  // A competency L "covers" target T when they are equal or T is a descendant
  // of L (dotted-prefix). So `competency: 1.2` covers 1.2, 1.2.1, 1.2.3.4 ...
  function covers(listed, target) {
    return target === listed || target.startsWith(listed + ".");
  }

  // Negation: a node may carve a subtree out of a broader listing, e.g.
  // `competency: 3, !3.3.4` covers all of 3 EXCEPT 3.3.4 (and its descendants).
  // A value is an exclusion when prefixed with `!` or `-` (see splitComps); the
  // positive part lands in node.competencies, the excluded part in .competenciesExcl.
  function excluded(node, target) {
    return (node.competenciesExcl || []).some(function (N) { return covers(N, target); });
  }
  // node covers target downward (some listing covers it AND nothing excludes it).
  function coversComp(node, target) {
    return !excluded(node, target) &&
      node.competencies.some(function (L) { return covers(L, target); });
  }
  // Looser, bidirectional test used only for teach-before-assess: a node teaches
  // "toward" target if it lists an ancestor OR descendant of target (teaching a
  // leaf counts toward assessing its parent), unless target is excluded.
  function teachesToward(node, target) {
    return !excluded(node, target) &&
      node.competencies.some(function (L) { return covers(L, target) || covers(target, L); });
  }

  // Split raw competency values into positive listings and exclusions.
  // "!3.3.4" or "-3.3.4" -> exclusion of 3.3.4; everything else is positive.
  function splitComps(vals) {
    var pos = [], neg = [];
    (vals || []).forEach(function (v) {
      var m = /^[!-]\s*(.+)$/.exec(v);
      if (m) neg.push(m[1].trim());
      else pos.push(v);
    });
    return { pos: pos, neg: neg };
  }

  // "1_2" -> unit 1, day 2 -> a single sortable index (assumes < 1000 days/unit)
  function dayIndexOf(dayId) {
    if (!dayId) return null;
    const m = String(dayId).match(/^(\d+)_(\d+)$/);
    if (!m) return null;
    return parseInt(m[1], 10) * 1000 + parseInt(m[2], 10);
  }

  function dayIdFromFilename(path) {
    const m = basename(path).match(/(\d+)_(\d+)/);
    return m ? m[1] + "_" + m[2] : null;
  }

  /* ---- comment property blocks -------------------------------------------- *
   * A block is <!-- ... -->. Inside, properties are `key: v1, v2`, separated by
   * a semicolon OR a newline (either one terminates a property); commas separate
   * values within a property. A comment only counts as a node block if it holds
   * at least one KNOWN key, so prose comments elsewhere are ignored.
   */
  var KEY_ALIASES = {
    id: "id", type: "type", day: "day",
    competency: "competencies", competencies: "competencies",
    use_case: "useCases", use_cases: "useCases", usecase: "useCases",
    example: "examples", examples: "examples",
    prereq: "prereqs", prereqs: "prereqs",
    template: "template",
    video: "sources", article: "sources", source: "sources", sources: "sources"
  };

  function parseProps(raw) {
    var props = {};
    var found = false;
    raw.split(/[;\n]/).forEach(function (part) {
      part = part.trim();
      if (!part) return;
      var ci = part.indexOf(":");
      if (ci === -1) return;
      var key = part.slice(0, ci).trim().toLowerCase();
      if (!KEY_ALIASES.hasOwnProperty(key)) return;
      found = true;
      var canon = KEY_ALIASES[key];
      var vals = part.slice(ci + 1)
        .split(",").map(function (s) { return s.trim(); })
        .filter(Boolean);
      if (canon === "id" || canon === "type" || canon === "day" || canon === "template") {
        props[canon] = vals[0] || "";
      } else {
        props[canon] = (props[canon] || []).concat(vals);
      }
    });
    return found ? props : null;
  }

  // Find every property block in a text, tagged with its character offset so we
  // can attach it to the nearest preceding heading.
  function findPropBlocks(text) {
    var blocks = [];
    var re = /<!--([\s\S]*?)-->/g, m;
    while ((m = re.exec(text)) !== null) {
      var props = parseProps(m[1]);
      if (props) blocks.push({ props: props, index: m.index });
    }
    return blocks;
  }

  // Section = an L2 heading and the text that follows it. Returns headings with
  // their char range so blocks can be matched to the right one.
  function findSections(text) {
    var secs = [];
    var re = /^##\s+(.+?)\s*$/gm, m;
    while ((m = re.exec(text)) !== null) {
      secs.push({ title: m[1].trim(), start: m.index });
    }
    for (var i = 0; i < secs.length; i++) {
      secs[i].end = i + 1 < secs.length ? secs[i + 1].start : text.length;
    }
    return secs;
  }

  function sectionForIndex(secs, idx) {
    for (var i = 0; i < secs.length; i++) {
      if (idx >= secs[i].start && idx < secs[i].end) return secs[i];
    }
    return null; // preamble (before first heading)
  }

  /* ---- parsers per source -------------------------------------------------- */

  function parseCompetencies(text) {
    var comps = [], seen = {};
    text.split(/\r?\n/).forEach(function (line) {
      var m = line.match(/^\s*[-*]\s+(\d+(?:\.\d+)*)\b(.*)$/);
      if (!m) return;
      var id = m[1];
      if (seen[id]) return;
      seen[id] = true;
      var title = m[2]
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\*[^*]*\*/g, "")
        .replace(/`/g, "")
        .replace(/^[\s:–—-]+/, "")
        .trim();
      comps.push({ id: id, kind: "competency", label: title || id });
    });
    // hierarchy
    var byId = {};
    comps.forEach(function (c) { c.children = []; byId[c.id] = c; });
    comps.forEach(function (c) {
      var parentId = c.id.replace(/\.\d+$/, "");
      c.parent = parentId !== c.id ? parentId : null;
      if (c.parent && byId[c.parent]) byId[c.parent].children.push(c.id);
    });
    return comps;
  }

  // Build activity/assessment/example/prep nodes from any content/template file.
  // Every node is declared by a `<!-- ... -->` comment block attached to its L2
  // heading (or the file itself, for a block before any heading).
  function parseDocNodes(file, roleDefaultType, config) {
    var text = file.text;
    var secs = findSections(text);
    var blocks = findPropBlocks(text);
    var folder = topFolder(file.path);
    // A folder-level default is an explicit, configured signal (e.g. everything
    // in primers/ is a prep reading). If neither the node nor its folder says
    // what it is, we do NOT invent a type — it stays "untyped" (see mkNode).
    var folderType = config.folderTypeDefaults[folder] || roleDefaultType || null;
    var fileDayId = dayIdFromFilename(file.path);
    var nodes = [];

    blocks.forEach(function (b) {
      var sec = sectionForIndex(secs, b.index);
      var name = sec ? sec.title : basename(file.path);
      var p = b.props;
      var id = p.id || slug(name);
      nodes.push(mkNode(id, name, p, folderType, p.day || fileDayId, file.path, p.template || null));
    });
    return nodes;
  }

  function mkNode(id, label, props, defaultType, dayId, path, template) {
    var kind = normalizeKind((props.type) || defaultType);
    var comps = splitComps(props.competencies);
    return {
      id: id,
      label: label,
      kind: kind,
      competencies: comps.pos,
      competenciesExcl: comps.neg,
      useCases: props.useCases || [],
      examples: props.examples || [],
      prereqs: props.prereqs || [],
      sources: props.sources || [],
      template: template,
      day: dayId || null,
      dayIndex: dayIndexOf(dayId),
      path: path
    };
  }

  function normalizeKind(k) {
    k = String(k == null ? "" : k).toLowerCase().replace(/[\s-]+/g, "_");
    if (!k) return "untyped";                 // no type declared -> don't guess
    if (k === "inclass" || k === "in_class_activity") return "in_class";
    if (k === "summative_assessment" || k === "assessment") return "assessment";
    if (k === "prep" || k === "primer" || k === "reading" || k === "prep_reading") return "prep_reading";
    // Any other declared type is kept verbatim (e.g. "reflection", "lecture").
    // It simply won't match the activity/assessment rules — which is correct:
    // a reflection is not an activity, so we must not pretend it is one.
    return k;
  }

  // Kinds that count as "an activity / teaching material" for competency coverage.
  var TEACHING = { in_class: 1, practice: 1, activity: 1 };
  function isTeaching(n) { return !!TEACHING[n.kind]; }

  /* ---- coverage helpers ---------------------------------------------------- */

  // A competency is covered by a set of nodes (via their competency lists) if
  // some node lists it OR an ancestor of it (downward inheritance), OR — for a
  // parent node — every child is covered (upward roll-up, so tagging all the
  // leaves also satisfies their shared parent).
  function makeCoverage(comps, nodes) {
    var byId = {};
    comps.forEach(function (c) { byId[c.id] = c; });

    function directHit(compId) {
      return nodes.some(function (n) { return coversComp(n, compId); });
    }
    var memo = {};
    function covered(compId) {
      if (memo.hasOwnProperty(compId)) return memo[compId];
      memo[compId] = false; // guard against cycles (shouldn't happen in a tree)
      var c = byId[compId];
      var ok = directHit(compId);
      if (!ok && c && c.children.length) {
        ok = c.children.every(function (ch) { return covered(ch); });
      }
      memo[compId] = ok;
      return ok;
    }
    return covered;
  }

  /* ---- rules --------------------------------------------------------------- */

  function ruleResult(id, name, offenders, total, soft, note) {
    return {
      id: id, name: name, soft: !!soft, note: note || "",
      total: total,
      satisfied: total - offenders.length,
      offenders: offenders   // [{id,label}]
    };
  }

  function runRules(model) {
    var comps = model.competencies,
        nodes = model.nodes,          // all activity/assessment/example/prep nodes
        useCases = model.useCases,
        days = model.days;            // { dayId: {kind:[nodes], all:[]} }
    var rules = [];

    var assessments = nodes.filter(function (n) { return n.kind === "assessment"; });
    var teaching    = nodes.filter(isTeaching);
    var examples    = nodes.filter(function (n) { return n.kind === "example"; });
    var preps       = nodes.filter(function (n) { return n.kind === "prep_reading"; });

    // competency -> >=1 assessment / >=1 activity
    var coveredByAssess = makeCoverage(comps, assessments);
    var coveredByTeach  = makeCoverage(comps, teaching);
    var assessOffenders = comps.filter(function (c) { return !coveredByAssess(c.id); });
    var teachOffenders  = comps.filter(function (c) { return !coveredByTeach(c.id); });
    rules.push(ruleResult("comp-assess", "Competency → 1+ assessment", assessOffenders, comps.length, false));
    rules.push(ruleResult("comp-activity", "Competency → 1+ activity", teachOffenders, comps.length, false));

    // example / assessment / activity / prep -> >=1 competency
    rules.push(ruleResult("example-comp", "Example → 1+ competency",
      examples.filter(noComp), examples.length, false));
    rules.push(ruleResult("assess-comp", "Assessment → 1+ competency",
      assessments.filter(noComp), assessments.length, false));
    rules.push(ruleResult("activity-comp", "Activity → 1+ competency",
      teaching.filter(noComp), teaching.length, false));

    // scheduled nodes -> a day
    rules.push(ruleResult("assess-day", "Assessment → 1+ day",
      assessments.filter(noDay), assessments.length, false));
    rules.push(ruleResult("activity-day", "Activity → 1+ day",
      teaching.filter(noDay), teaching.length, false));

    // prep reading -> exactly one day + >=1 competency
    rules.push(ruleResult("prep-day", "Prep reading → exactly 1 day",
      preps.filter(function (n) { return !n.day; }), preps.length, false));
    rules.push(ruleResult("prep-comp", "Prep reading → 1+ competency",
      preps.filter(noComp), preps.length, false));

    // use case -> >=1 example (an example points to it via useCases)
    var ucExampleCount = {};
    examples.forEach(function (e) {
      e.useCases.forEach(function (uc) { ucExampleCount[uc] = (ucExampleCount[uc] || 0) + 1; });
    });
    rules.push(ruleResult("uc-example", "Use case → 1+ example",
      useCases.filter(function (u) { return !ucExampleCount[u.id]; }), useCases.length, false));

    // day-level soft rules
    var dayList = Object.keys(days).map(function (d) { return days[d]; });
    rules.push(dayRule("day-practice", "Day → 1+ practice activity", dayList, "practice", 1, Infinity));
    rules.push(dayRule("day-inclass", "Day → 1–2 in-class activities", dayList, "in_class", 1, 2));
    rules.push(dayRule("day-example", "Day → 1+ example", dayList, "example", 1, Infinity));
    rules.push(dayRule("day-prep", "Day → exactly 1 prep reading", dayList, "prep_reading", 1, 1));

    // template -> >=1 instance (soft)
    var instancedTemplates = {};
    nodes.forEach(function (n) { if (n.template) instancedTemplates[n.template] = 1; });
    var templateOffenders = model.templates.filter(function (t) { return !instancedTemplates[t.id]; });
    rules.push(ruleResult("template-instance", "Template → 1+ instance", templateOffenders,
      model.templates.length, true, "A template with no instance is a smell, not a broken course."));

    // every node should declare a type (untyped nodes are excluded from every
    // activity/assessment rule, so surface them rather than silently dropping)
    var untyped = nodes.filter(function (n) { return n.kind === "untyped"; });
    rules.push(ruleResult("node-typed", "Node → has an explicit type", untyped, nodes.length, true,
      "Soft — an untyped node matches no activity/assessment rule; give it a type."));

    // ---- ordering: teach-before-assess (hard) ----
    // For every competency an assessment measures, some activity teaching that
    // competency must be scheduled on an EARLIER day than the assessment.
    // Every (assessment, competency) pair is a check — we do NOT skip pairs
    // whose assessment lacks a day: an unscheduled assessment can't have
    // anything "earlier" than it, so that's a real failure, not a free pass.
    // (A silent 0/0 here was hiding exactly that.)
    var tbaOffenders = [];
    var tbaTotal = 0;
    assessments.forEach(function (a) {
      a.competencies.forEach(function (compId) {
        tbaTotal++;
        var taughtEarlier = a.dayIndex != null && teaching.some(function (t) {
          return t.dayIndex != null && t.dayIndex < a.dayIndex &&
            teachesToward(t, compId);
        });
        if (!taughtEarlier) {
          var why = a.dayIndex == null
            ? " — on no day, so " + compId + " can't be taught earlier"
            : " — " + compId + " not taught before day " + a.day;
          tbaOffenders.push({ id: a.id, label: a.label + why });
        }
      });
    });
    rules.push(ruleResult("teach-before-assess", "Teach-before-assess (ordering)",
      tbaOffenders, tbaTotal, false,
      "Every competency an assessment measures must be taught on an earlier day than the assessment."));

    // ---- ordering: prereqs on earlier days + no cycles (hard) ----
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    model.templates.forEach(function (t) { if (!byId[t.id]) byId[t.id] = t; });
    var prereqOffenders = [];
    var edges = {};
    Object.keys(byId).forEach(function (id) {
      var n = byId[id];
      edges[id] = (n.prereqs || []).filter(function (p) { return byId[p]; });
      (n.prereqs || []).forEach(function (p) {
        var pn = byId[p];
        if (!pn) {
          prereqOffenders.push({ id: id, label: n.label + " — prereq '" + p + "' not found" });
        } else if (n.dayIndex != null && pn.dayIndex != null && pn.dayIndex >= n.dayIndex) {
          prereqOffenders.push({ id: id, label: n.label + " — prereq '" + pn.label + "' not on an earlier day" });
        }
      });
    });
    var cycle = findCycle(edges);
    if (cycle) prereqOffenders.push({ id: "GRAPH", label: "prerequisite cycle: " + cycle.join(" → ") });
    var prereqTotal = Object.keys(byId).reduce(function (s, id) { return s + edges[id].length; }, 0);
    rules.push(ruleResult("prereq-order", "Prereqs on earlier days + no cycles",
      prereqOffenders, prereqTotal + prereqOffenders.length, false));

    return rules;

    function noComp(n) { return n.competencies.length === 0; }
    function noDay(n) { return !n.day; }
  }

  function dayRule(id, name, dayList, kind, lo, hi) {
    var offenders = [];
    dayList.forEach(function (d) {
      var n = (d[kind] || []).length;
      if (n < lo || n > hi) {
        offenders.push({ id: d.id, label: "Day " + d.id + ": " + kind + " = " + n + " (want " +
          lo + "–" + (hi === Infinity ? "∞" : hi) + ")" });
      }
    });
    return ruleResult(id, name, offenders, dayList.length, true,
      "Soft rule — 'most days', a miss is flagged not failed.");
  }

  // DFS cycle finder over an adjacency map; returns a node path or null.
  function findCycle(edges) {
    var state = {}, stack = [], result = null;
    function dfs(u) {
      if (result) return;
      state[u] = 1; stack.push(u);
      (edges[u] || []).forEach(function (v) {
        if (result) return;
        if (state[v] === 1) {
          var i = stack.indexOf(v);
          result = stack.slice(i).concat(v);
        } else if (!state[v]) dfs(v);
      });
      stack.pop(); state[u] = 2;
    }
    Object.keys(edges).forEach(function (u) { if (!state[u]) dfs(u); });
    return result;
  }

  /* ---- top-level ----------------------------------------------------------- */

  function analyze(files, config) {
    // Normalize CRLF -> LF once. JS regex `.` doesn't cross `\r`, so Windows
    // line endings break header/section stripping if left in.
    files = files.map(function (f) {
      return { path: f.path, text: String(f.text).replace(/\r\n/g, "\n").replace(/\r/g, "\n") };
    });
    var byPath = {};
    files.forEach(function (f) { byPath[f.path] = f; });

    // competencies
    var compFile = files.find(function (f) { return f.path.endsWith(config.competenciesFile); });
    var competencies = compFile ? parseCompetencies(compFile.text) : [];

    // use cases — same comment-block format as every other node
    var ucFile = files.find(function (f) { return f.path.endsWith(config.useCasesFile); });
    var useCases = ucFile ? parseDocNodes(ucFile, "use_case", config) : [];

    // templates (abstracts)
    var tmplFile = files.find(function (f) { return f.path.endsWith(config.templatesFile); });
    var templates = tmplFile ? parseDocNodes(tmplFile, null, config) : [];

    // instances in content folders
    var instances = [];
    files.forEach(function (f) {
      var folder = topFolder(f.path);
      if (config.contentFolders.indexOf(folder) === -1) return;
      instances = instances.concat(parseDocNodes(f, null, config));
    });

    // Templates are also nodes (they carry competencies/type before instancing),
    // but an instance overrides its template for scheduling. All "live" nodes =
    // templates without an instance + every instance.
    var instancedTemplateIds = {};
    instances.forEach(function (n) { if (n.template) instancedTemplateIds[n.template] = 1; });
    var liveTemplates = templates.filter(function (t) { return !instancedTemplateIds[t.id]; });
    var nodes = liveTemplates.concat(instances);

    // aggregate days from every node that has one
    var days = {};
    nodes.forEach(function (n) {
      if (!n.day) return;
      var d = days[n.day] || (days[n.day] = { id: n.day, dayIndex: n.dayIndex, all: [] });
      (d[n.kind] = d[n.kind] || []).push(n);
      d.all.push(n);
    });

    // A day exists as soon as a file in a content folder is named for it
    // (`lesson1_2.qmd` => day 1_2), even if that file has no node/comment yet.
    // This surfaces empty-but-scheduled days (they show up, and the day-level
    // soft rules flag them as still needing content) rather than hiding them.
    files.forEach(function (f) {
      if (config.contentFolders.indexOf(topFolder(f.path)) === -1) return;
      var dId = dayIdFromFilename(f.path);
      if (!dId || days[dId]) return;
      days[dId] = { id: dId, dayIndex: dayIndexOf(dId), all: [] };
    });

    var model = {
      competencies: competencies,
      useCases: useCases,
      templates: templates,
      instances: instances,
      nodes: nodes,
      days: days
    };
    var rules = runRules(model);

    var hard = rules.filter(function (r) { return !r.soft; });
    var summary = {
      hardViolations: hard.reduce(function (s, r) { return s + r.offenders.length; }, 0),
      softWarnings: rules.filter(function (r) { return r.soft; })
        .reduce(function (s, r) { return s + r.offenders.length; }, 0),
      pass: hard.every(function (r) { return r.offenders.length === 0; }),
      counts: {
        competencies: competencies.length,
        useCases: useCases.length,
        templates: templates.length,
        instances: instances.length,
        days: Object.keys(days).length,
        assessments: nodes.filter(function (n) { return n.kind === "assessment"; }).length,
        activities: nodes.filter(isTeaching).length,
        examples: nodes.filter(function (n) { return n.kind === "example"; }).length,
        prepReadings: nodes.filter(function (n) { return n.kind === "prep_reading"; }).length
      }
    };

    return { model: model, rules: rules, summary: summary, generatedAt: new Date().toISOString() };
  }

  global.CoverageLinter = {
    analyze: analyze,
    covers: covers,
    coversComp: coversComp,   // views must use the same downward-coverage test
    dayIndexOf: dayIndexOf
  };

})(typeof window !== "undefined" ? window : this);
