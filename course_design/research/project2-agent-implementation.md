# Project 2: Building the Given Agent

Design decisions and build resources for the agent students clone, instrument, and diagnose.

Companion to [project2-agent-spec.md](project2-agent-spec.md), which records only what the course
documents already commit to. This document holds the decisions those documents leave open, and the
reasoning behind them — argue with this one, audit that one.

## Purpose

Give the implementer a domain, an architecture, and a set of things to pattern off, so that
building the agent is assembly rather than invention. The agent must fail in ways students can
find, name, and prove, while reading as ordinary inherited production code.

---

## The domain: order support for ACME.io

ACME.io is "the one stop shop for everything tech related"
([learning_arcs.md](../learning_arcs.md)), so a customer-facing order-support agent is the
straightforward reading of what this company would have already built. Scope: order lookup,
shipping status, return and refund eligibility, product questions, and escalation to a human.

### Why this domain and not another

**It produces both kinds of output the spec requires.** Competency `2.2.1` needs outputs with
externally checkable ground truth; `2.2.2` needs outputs that have none. Order facts, refund
eligibility, and policy compliance are checkable against a database and a policy corpus. Tone,
completeness, and whether escalating was the right call are not. Most domains give you one or the
other; this gives both without contrivance, and half of Outcome 2 has nothing to grade if either is
missing.

**Students already know what good looks like.** Everyone has been a customer. They can build a
golden dataset (`2.2.3`) and judge quality on day one without first being taught a vertical — which
matters when the entire project is diagnosis and the domain is supposed to be transparent.

**It naturally produces all six run types.** [notes2_2.qmd](../../instructor_notes/notes2_2.qmd)
requires students to identify LLM, Retriever, Tool, Chain, Prompt, and Parser runs in LangSmith. A
support agent that retrieves policy, calls order tools, classifies intent, and emits a structured
record produces all six as a consequence of doing its job, not as decoration.

**It is the deepest-covered build in the LangChain docs.** The customer-support material is 🟢 in
[langchain-use-case-coverage.md](langchain-use-case-coverage.md) — the only tutorial that exercises
model, prompt, memory, tools, HITL, and handoff in one artifact. That matters for *build speed*:
the working version is largely assembly, leaving the effort budget for the defects and the seed
data.

**The audience deliverable lands.** Project 2 requires a recorded presentation to a non-technical
company audience. "Here is what your support bot is doing to your customers" is a briefing a real
VP would sit through; a briefing about retrieval latency is not.

### One consequence to accept

Customer support is now spent, and cannot be reused for Project 3 — which is fine, since Project 3
is headed toward nonprofit intake and eligibility screening
([project3-client-scenario.md](project3-client-scenario.md)). Worth noting so the two projects
aren't accidentally converged later.

---

## Architecture sketch

Shaped to produce the six run types and to keep defects independently fixable, since part 2 of the
project is revision and re-measurement.

| Component | Purpose | Run type it surfaces |
|---|---|---|
| Intake / intent classifier | Route the incoming message to a path | Chain, LLM, Parser |
| Policy retrieval | Return/warranty/shipping rules pulled at runtime | Retriever |
| Order tools | Lookup, shipping status, refund initiation | Tool |
| Support agent | Compose an answer from retrieved policy + tool results | LLM, Prompt |
| Escalation path | Hand off to a human | Chain, Tool |
| Session memory | Hold order number and context across turns | — |
| Structured case record | Emit a record of the interaction | Parser |

Keeping these as separate components is what makes the revision half of the project workable: a
student must be able to fix one defect and re-measure without touching the rest.

## Seed data the repo needs

- **Order/inventory database** — the ground truth deterministic evaluators check against. Needs
  enough variety to make eligibility questions non-trivial (recent and old orders, delivered and
  in-transit, returnable and not).
- **Policy corpus** — returns, warranty, shipping. The retrieval target, and the second source of
  checkable ground truth.
- **Customer message set** — realistic inputs covering every path, so reaching a defect doesn't
  depend on guessing the right phrasing.

## Course documents the repo should carry

- **[failure_modes.md](failure_modes.md)** — vendor a copy into the build repo. It is the committed
  taxonomy the defect list is authored against, and the implementer needs it at hand without
  reaching back into the course repo. Keep it in sync if the taxonomy is revised between semesters.

---

## What to pattern off

**Primary reference — build the working agent from this:**

- [Customer-support state machine](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support)
  — warranty intake → classify hardware/software → solve or escalate. The closest single match to
  the target architecture.

**Component references:**

- [Knowledge base / RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) and
  [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval) — the policy retrieval path
- [SQL Agent](https://docs.langchain.com/oss/python/langchain/sql-agent) — pattern for tools that
  query the order database with validation and error correction
- [Tools](https://docs.langchain.com/oss/python/langchain/tools) — custom tool definition
- [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) — the case
  record, and the parser runs
- [Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory) and
  [Context engineering](https://docs.langchain.com/oss/python/langchain/context-engineering) —
  session state, and the surface where trimming defects live
- [Human-in-the-loop](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) and
  [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) — escalation and approval
- [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) and
  [Middleware](https://docs.langchain.com/oss/python/langchain/middleware/overview) — the surface
  where missing constraints live

**Student-side references (what they will be pointed at, not what the repo uses):**

- [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation) — offline evals, datasets
- [LLM-as-judge](https://docs.langchain.com/langsmith/llm-as-judge) — `2.2.2`
- [Online evaluations](https://docs.langchain.com/langsmith/online-evaluations-llm-as-judge) and
  [Alerts](https://docs.langchain.com/langsmith/alerts) — the production half of `2.1.4`

**Real deployments to point students at** (from the
[case-studies roster](https://docs.langchain.com/oss/python/langgraph/case-studies)): Minimal,
Cisco CX, Cisco TAC, Prosper, Infor — all shipped multi-agent support systems. Useful for showing
that the assigned scenario is not a toy.

---

## Defects

**The list is not yet decided, but the taxonomy it must map onto now is.**

Defects map onto the six committed failure modes
([failure_modes.md](failure_modes.md)) — tool, grounding, state, control, specification,
safety — so that `2.3.2` grades against vocabulary students were given rather than vocabulary
they have to invent. Each mode is named for the lever that fixes it, which also satisfies the
"independently fixable" constraint below by construction: one defect, one lever, one re-measure.

Safety is the one mode that may not earn a planted defect here — a deliberately unsafe agent
handed to students has a different character than a merely unreliable one. Decide when the list
is drawn.

Constraints on whatever the list turns out to be:

- Each defect independently fixable, so revision can proceed one at a time
- Each reachable through ordinary use, and visible once tracing is wired up
- Failures plausible rather than crashing — a stack trace is a bug report, a confidently wrong
  answer is a diagnosis
- Nothing in the code, comments, or naming that flags a defect's location

## Open decisions

- How many defects, and how they distribute across the taxonomy
- Fork or branch for the revised agent in part 2
- Whether the instructor answer key lives in this repo, a private one, or the course repo
