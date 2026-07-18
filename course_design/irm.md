# Curriculum Map (I / R / M)

<!-- TODO: document needs full review, only minimally adjusted from AI -->

The standard curriculum-alignment artifact: outcomes down the side, units across the top. This is what
accreditors ask for and what most departments keep. It is included here to establish the baseline —
and to show where it runs out.

**Legend**

| Code | Meaning | Assessment expectation |
|------|---------|------------------------|
| **I** | Introduced — first exposure, low stakes | Not assessed at criterion |
| **R** | Reinforced — practiced with feedback | Formative; failure is expected and useful |
| **M** | Mastered — demonstrated at criterion | Summative; this is where the grade comes from |
| — | Not present in this unit | — |

**Units** (per [learning_arcs.md](learning_arcs.md) and [teaching_philosophy.md](teaching_philosophy.md))

| Unit | Arc | Project |
|------|-----|---------|
| **U1** | Build a **"Bad"** Agent (includes Day 0.1) | P1: powerful, unpredictable agent |
| **U2** | **"Why"** was it bad? | P2: diagnostics |
| **U3** | Build a **"Good"** Agent | P3: context engineering |
| **Cap** | Battle of the Bots + Contribution Assignment | Portfolio, Manifesto, Final Interview |

---

## Level 1 — Outcomes × Units

| # | Outcome | U1 | U2 | U3 | Cap |
|---|---------|:--:|:--:|:--:|:---:|
| 1 | Build and deploy agentic AI solutions | **I** | R | R | **M** |
| 2 | Evaluate agents using agent observability tools | — | **I** | R | **M** |
| 3 | Translate ambiguous goals into architecture and success criteria | — | — | **I → R** | **M** |
| 4 | Communicate about AI using language fitted to each audience | **I** | R | R | **M** |
| 5 | Find and evaluate quality sources to self-learn | I | R | R | **M** |
| 6 | Form and live a personal ethic for the use of AI agents | **I** | R | R | **M** |

### What this table tells you

Almost nothing. Five of six rows are `I → R → R → M`, and every row masters in the Capstone —
which is what *always* happens to a capstone-based course under I/R/M, because the capstone assesses
everything. The only two facts here you did not already know are that Outcome 2 and Outcome 6 start
late, and you knew that too.

This is the established solution, it took an afternoon, and it cannot find a single one of your gaps.
That is not a defect in your course. It is the resolution limit of the instrument: six rows cannot
locate a problem that lives at competency 3.4.

---

## Level 2 — Competencies × Units

The same instrument at the resolution where signal actually appears. Twenty-seven rows, one page.

> **This is a draft with my judgment calls in it, not a record of your intent.** Cells marked `?` are
> ones I inferred with weak or no evidence in the repo. Correct them — the corrections are the point.

| # | Competency | U1 | U2 | U3 | Cap |
|---|------------|:--:|:--:|:--:|:---:|
| | **1. Build and deploy** | | | | |
| 1.1 | Connect to the model | **I** | R | R | M |
| 1.2 | Build the agent harness | **I** | R | **M** | M |
| 1.3 | Deploy | I | — | R | **M** |
| 1.4 | Refine (the loop) | — | I | **M** | M |
| | **2. Evaluate** | | | | |
| 2.1 | Observe agent performance | — | **I → M** | R | R |
| 2.2 | Measure agent performance | — | **I** | R | **M** |
| 2.3 | Diagnose agent performance | — | **I → M** | R | R |
| | **3. Translate goals into decisions** | | | | |
| 3.1 | Define purpose and intent without digital tools | **I** | R | R | M |
| 3.2 | Gut-check viability of AI for a problem | I | R | R | M |
| 3.3 | Define and operationalize success | — | **I** | R | **M** |
| 3.4 | Find hidden domain knowledge and assumptions | — | — | I `?` | R `?` |
| 3.5 | Anticipate what context the agent needs | — | — | **I → R** | M |
| 3.6 | Plan an agent's architecture from first principles | — | — | **I → R** | M |
| 3.7 | Author intent into durable artifacts | — | — | I `?` | R `?` |
| | **4. Communicate** | | | | |
| 4.1 | Use current industry terminology correctly | **I** | R | R | M |
| 4.2 | Demonstrate competence to employers | — | — | I `?` | **M** |
| 4.3 | Communicate an agent's behavior at work | — | **I** | R | **M** |
| | **5. Self-learn** | | | | |
| 5.1 | Learn from primary-source documentation | **I** | R | R | M |
| 5.2 | Find and evaluate trusted people and communities | — | — | — | I `?` |
| 5.3 | Evaluate relevance and currency of information | **I** | R | R | M |
| 5.4 | Find and evaluate software | I `?` | — | R `?` | M `?` |
| 5.5 | Develop genuine excitement for AI use cases | *ambient* | *ambient* | *ambient* | *ambient* |
| | **6. Personal ethic** | | | | |
| 6.1 | Develop a personal conviction | — | **I** | R | **M** |
| 6.2 | Define what ethical AI use means to them | — | **I** | R | **M** |
| 6.3 | Examine how their AI use impacts self and others | — | I | R | M |
| 6.4 | Apply Church doctrine to real AI situations | — | **I** | R | **M** |
| 6.5 | Articulate industry's framing of alignment as ethics | — | I | R | M |

---

## What the second table found

**Outcome 3 has no home.** Four of its seven competencies (3.4–3.7) appear only in Unit 3 or later,
and 3.4 and 3.7 are `?` because I could not find evidence they are taught anywhere. Outcome 3 is your
hardest outcome and the one your own doc flags as "nearly taken shape" — and structurally it is a
Unit 3 outcome bolted onto a course whose first two-thirds don't touch it. Either it is a Unit 3
outcome and should say so, or it needs a presence in U1–U2 that doesn't exist yet.

**Outcome 5 is thin where it matters.** 5.1 and 5.3 are well served — prep readings, Out of Date
Reading, docs in every lesson. 5.2 has *nothing* anywhere. 5.4 is a guess in all four columns. Your
own [activities doc](research/activities_performances_ideas.md) already flags 5.2 and 5.4 as
insufficiently covered; this is the same finding arrived at independently, which is mild evidence the
instrument works at this resolution.

**5.5 cannot be coded.** Not because it's a bad outcome — because the only things serving it
("Convey a Personal Excitement", "Cover Every Use Case Under The Sun") are stances, not units. `I/R/M`
has no vocabulary for that. This is the gap that motivated the pattern/instance model: instantiate
those stances onto specific days and 5.5 becomes codeable like everything else.

**The `I → M` cells in Unit 2 are a design smell worth a look.** Competencies 2.1 and 2.3 get
introduced and mastered inside a single unit, then decay to `R` afterward. That may be correct — the
diagnostics project is a real summative assessment. But mastery in the same unit as introduction
usually means either the unit is doing too much, or the mastery bar is lower than the word implies.

---

## The limit of this artifact

Every cell above answers "does this competency appear in this unit." None answers the question you
actually asked:

- Which competencies have **no assessment**, as opposed to no teaching?
- Which days are **overloaded**?
- If MCP dies, **what breaks**?

Those need the relation between competencies and *instances* — a specific thing on a specific day —
not between competencies and units. This table is the honest ceiling of the established tool, and it
is worth keeping precisely so the next thing has something to beat.
