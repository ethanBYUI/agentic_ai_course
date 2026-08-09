/* =============================================================================
 * Coverage linter — configuration
 * -----------------------------------------------------------------------------
 * This is the one file you edit to tell the linter WHERE to look. It is a .js
 * (not .json) on purpose: browsers block fetch() of local files when you open
 * the page by double-clicking (file://), but a <script> tag loads a .js fine.
 * It is still just a plain object — edit the values, save, re-run.
 *
 * All paths are relative to the folder you pick when you click "Load" — pick
 * your `course_design` folder (the parent of this `coverage/` folder).
 * ========================================================================== */
window.COVERAGE_CONFIG = {
  // Which folder the user should point at (shown as a hint in the UI).
  rootHint: "course_design",

  // Where the folder picker OPENS to, every time (hardcoded — it does not drift
  // to wherever you were last session). The File System Access API only accepts
  // a well-known name here, not an arbitrary path: one of "documents",
  // "desktop", "downloads", "music", "pictures", "videos". Since this project
  // lives under Documents, "documents" lands you one hop from course_design.
  startInDirectory: "documents",

  // Single source files, each parsed with a role-specific rule.
  competenciesFile: "course_outcomes.md",   // numbered bullets -> competencies
  useCasesFile:     "use_case_coverage.md",  // level-2 headers  -> use cases
  templatesFile:    "activities_assessments.md", // abstracts -> activity/assessment templates

  // Folders that hold day-placed instances. Type defaults to the folder unless
  // a node's own comment says otherwise. Day id comes from the filename suffix
  // (e.g. `lesson1_2.md` => unit 1, day 2) unless a `<!-- day: 1_2; -->`
  // comment overrides it.
  contentFolders: ["lessons", "practice", "primers", "examples"],

  // File extensions the loader reads. Course content is authored in Quarto
  // (`.qmd`) and notebooks (`.ipynb`) as well as plain `.md`; all three are
  // scanned. A file's DAY still comes from its filename (`lesson1_2.qmd`), so an
  // empty lesson file registers its day even before any content is written.
  contentExtensions: ["md", "qmd", "ipynb"],
  folderTypeDefaults: {
    primers:  "prep_reading",
    practice: "practice",
    examples: "example",
    lessons:  "in_class"      // lesson files hold in-class activities as L2 headers
  },

  // Kinds that count as an INSTANCE of a use case (hard rule `uc-instance`).
  // A use case is covered when a node of one of these kinds tags it with
  // `use_case:`. This is deliberately wider than "example": the requirement
  // descends from competency 5.5, where breadth IS the evidence, so a case-study
  // prep reading about a telecom covers telecom as honestly as runnable code
  // does. Wanting a *runnable* example on top of that is the separate soft rule
  // `uc-example`. `untyped` is absent on purpose — a node that forgot its
  // `type:` must never satisfy a use case by accident.
  useCaseBearingKinds: [
    "example", "prep_reading", "practice", "in_class", "activity", "assessment"
  ],

  // Folders never scanned (the tool itself, research scratch, git internals).
  ignoreFolders: ["coverage", "research", ".git", "node_modules"]
};
