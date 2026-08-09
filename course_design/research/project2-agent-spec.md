# Project 2: The Given Agent

Implementation brief for the agent students clone, instrument, and diagnose. Built in a separate
repo. Everything below is sourced from existing course documents:
[project2_resources/resource.md](../../projects/project2_resources/resource.md),
[notes_project_2.qmd](../../instructor_notes/notes_project_2.qmd),
[activities_assessments.md](../activities_assessments.md) (`id: project-2` and its component
assessments), [learning_arcs.md](../learning_arcs.md),
[teaching_philosophy.md](../teaching_philosophy.md), [TODO.md](../../TODO.md).

## Purpose

Students inherit a working-but-unreliable agent at ACME.io and must find out what is wrong with it,
prove it with evidence, and report it to a company audience. The agent therefore exists to *fail in
diagnosable ways* — every defect must be real, reachable through ordinary use, and visible once
instrumented. It is a teaching instrument disguised as a production codebase.

## Requirements

- Belongs to ACME.io, "the one stop shop for everything tech related"
- Already built and running, but broken or minimally functioning
    - Diagnosable — the failures can be found, named, and evidenced
    - Serves the four report sections: purpose, measures, actual performance, next steps
- Distributed as a repo students clone
    - Not pre-instrumented; students wire up tracing themselves
    - Revisable — students submit a codebase for a revised agent, so defects must be fixable
      without a rewrite
    - Supports experimentation and re-measurement after revision
- Traces surface all six run types students were taught to read in LangSmith: LLM, Retriever, Tool,
  Chain, Prompt, Parser ([notes2_2.qmd](../../instructor_notes/notes2_2.qmd))
- Exercises the Outcome 2 competencies: observe (2.1), measure (2.2), diagnose (2.3) — enumerated
  below
- Supports explanation to a non-technical company audience
- Stack matches the course: LangChain / LangGraph / LangSmith, Gemini API

## Student entry state

Students arrive having built an agent in LangChain (Project 1) and able to read and implement
traces. Everything else in Outcome 2 is learned *during* the project. The agent is therefore the
vehicle for first contact with evaluators, datasets, experiments, and root-cause analysis — it
cannot assume any of them are already familiar.

## Outcome 2 competencies the agent must support

The agent has to give students something to do for each of these. Naming them explicitly so the
build can be checked against the list rather than against a vibe.

**2.1 Observe**

- 2.1.1 Instrument tracing to see what the agent actually did
- 2.1.2 Read runs, traces, and spans (inputs, outputs, metadata)
- 2.1.3 Distinguish run types (LLM, tool, retriever, chain, prompt, parser)

**2.2 Measure**

- 2.2.1 Write and implement deterministic evaluators for hard constraints
- 2.2.2 Create LLM-as-judge evaluators for subjective qualities
- 2.2.3 Build curated golden datasets from scratch
- 2.2.4 Run offline evals from datasets
- 2.2.5 Compare two or more agent versions objectively to decide which is better

**2.3 Diagnose**

- 2.3.1 Root-cause a failure from traces and eval results
- 2.3.2 Classify failures into nameable failure modes
- 2.3.3 Use human review to re-calibrate rubrics and judges

Two of these constrain the build harder than the rest: **2.2.1** requires the agent to produce
outputs with externally checkable ground truth, and **2.2.2** requires it to produce outputs that
are not checkable that way. Both must be present or half of 2.2 has nothing to grade.

**2.3.2** grades against the six committed failure modes in
[failure_modes.md](failure_modes.md) — tool, grounding, state, control, specification, safety.
The agent's defects are built to produce that vocabulary.

## Not yet specified anywhere

Decisions the existing documents leave open:

- What the agent actually does — no document names a domain or task
- How many defects, and which
- Whether any seed data or test inputs ship with the repo
- Whether the revised agent (part 2) is a fork or a branch

Design decisions on these are being worked out in
[project2-agent-implementation.md](project2-agent-implementation.md).
