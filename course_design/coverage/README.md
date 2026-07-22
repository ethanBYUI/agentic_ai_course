# Course Coverage Linter

A browser tool that parses coverage properties from course files and visualizes them

## Intended Coverage Rules

Every competency has at least one
- assessment
- activity / teaching material (some scaffolding)

Every *significant* use case has at least one
- example the student can run
- day it is shown off (either in class or before/after)
- reading/video case study for an in-industry example

Every example (~50) has at least one
- competency it meets

Every assessment (~8) and activity (~30) (separate) has at least one
- competency
- day it is performed

Every prep reading (~30) has
- at least one video/article
- exactly one day
- at least one competency

Most (not strict) days (~36) have
- one prep reading
- at least one practice activity
- one or two in-class activity
- at least one example

For every competency an assessment measures, some activity teaching that competency exists on an earlier day than the first assessment.

Meets prereq rules (sporadically explicitly defined per node, not for every node, mostly for assessments)

## Running it

1. Double-click `index.html` file
2. Click **Load course folder** and pick your **`agentic_ai_course`** folder.
   - This is a *folder* chooser, not a file chooser
3. Optionally, **Export coverage.json** saves the parsed graph + violations

## What it reads

Edit [`config.js`](config.js) to point it at files/folders. Roles:

| Source | Becomes | How it's parsed |
| --- | --- | --- |
| `course_outcomes.md` | competencies | numbered bullets; `1.2.3` is the id, nesting is by dotted prefix |
| `use_case_coverage.md` | use cases | level-2 headers |
| `activities_assessments.md` | templates | L2 header + a comment block |
| `lessons/ practice/ primers/ examples/` | day-placed instances | comment blocks; day from filename `unit_day` |

## Node comment format (for when you spread things into days)

Position encodes what it can; a single HTML comment carries the rest. Every
property is terminated by `;`; commas separate values within a property:

```markdown
## Pull - AI
<!--
  id: pull-ai;
  type: practice;
  competency: 3.4, 3.5;
  use_case: sales;
  prereqs: pull, hit-the-board;   # ids of activities/assessments, never competencies
  template: pull-ai;              # on an instance: links back to the abstract
-->
```

- **Day** is *not* necessary here — it comes from the filename (`lesson1_2.md` =
  unit 1, day 2). Override with `day: 1_2;` only if the filename is off.
- **`competency: 1.2`** covers `1.2` and every descendant (`1.2.1`, `1.2.3.4`…).
- **Type** defaults to the folder (`primers/`→prep_reading, `practice/`→practice,
  `examples/`→example, `lessons/`→in_class); the comment wins if present.
- Templates get an `id`; instances inherit the template's competencies via
  `template:` and may add their own.

Keys understood: `id, type, day, competency/competencies, use_case(s),
example(s), prereq(s), template, video/article/source`.

## Rules → tabs

- **Dashboard** — one meter per rule, offender chips. The default view.
- **Node-link** — competency → activity/assessment → day; orphans red.
- **Matrix** — pick a relation, certify it exhaustively.
- **Model** — the entity types with live counts.
- **Timeline** — unimplemented (the ordering *rules* still run in the Dashboard).

The linter lives in [`linter.js`](linter.js) with no DOM, so the same file can be
`require()`'d from Node for a pre-commit hook later — same rules, no rewrite.


## Desired features

- The dialog always opens at the folder set by `startInDirectory` in
  [`config.js`](config.js) (default `documents`) — it does not drift to
  wherever you browsed last session.
- After that, the button says **Refresh** and re-reads with no dialog.
- Reopening the page later: usually zero clicks (it restores the folder), or
  one click to re-grant. On Brave, if Shields block folder access it falls
  back to a picker each session — still one click, just no persistence.