# Failure Modes — COMMITTED

The taxonomy this course teaches. Six modes, three dimensions. This is the vocabulary
competency `2.3.2` (classify failures into nameable failure modes) grades against, and the
vocabulary the Project 2 defects are built to produce.

**Status: committed.** Revisable between semesters, not mid-build. Everything downstream —
notes2_3, slide2_3, the Project 2 defect list — assumes this list and nothing else.

## Why these six, and why commit is safe

The industry has no settled taxonomy of how agents fail. Every published list
(Latitude's six, the conference-talk six, the mechanism list banked in
[research/outcomes_competencies_playground.md](research/outcomes_competencies_playground.md))
is a *descriptive* claim about agent behavior in the wild, and picking among them means
betting on an empirical question nobody has answered. That is why the choice kept feeling
arbitrary.

So this taxonomy is not descriptive. **Each mode is named for the lever that fixes it.**
The categories are the Outcome 1 steering levers, read backwards. That makes the list a claim
about *this curriculum*, not about reality — and the curriculum is ours to fix.

Three things follow:

- **The bridge competency becomes trivial to teach.** "Root-cause a failure, then decide which
  lever to pull" is the classification itself. Naming the mode *is* naming the fix.
- **Students already own the vocabulary.** Every category is a thing they built in Module 1.
  They are not memorizing a new list; they are re-reading a familiar one from the failure end.
- **Completeness stops mattering.** The list is complete with respect to what students can
  change. A failure that fits no category is a failure they have no lever for — which is a
  useful thing to say out loud, not a hole in the taxonomy.

The cost, stated plainly: a real failure often has several plausible fixes, so mode assignment
is sometimes a judgment call rather than a lookup. That is acceptable — arguably desirable.
Defending a classification is the assessable act; the label alone is not.

---

## The six modes

### 1. Tool failure
The agent's connection to the outside world breaks down.

- Wrong tool chosen for the job
- Right tool, wrong arguments
- Tool never called when it should have been
- Tool output not parsed or misread
- Tool itself errored and the agent proceeded anyway

**Lever:** tool definitions, descriptions, and I/O schemas. Usually the *text framing* the
tool, not the tool's code.

### 2. Grounding failure
The agent asserts things not supported by anything it retrieved.

- Fabricated facts, citations, APIs, order numbers
- Retrieval returned nothing relevant and the agent answered anyway
- Retrieval returned the right document and the agent contradicted it
- Sycophantic confirmation — accepts a false premise from the user and builds on it

**Lever:** retrieval and knowledge state — what is in the corpus, what gets retrieved, and
whether the prompt permits answering ungrounded.

### 3. State failure
Information the agent needs is lost, stale, or poisoned.

- Context window exhaustion; early steps silently truncated
- Context degradation — quality decays as the window fills with noise
- Memory pollution — a bad intermediate result is written down and treated as ground truth
- Session state not carried across turns (loses the order number, asks again)

**Lever:** state and memory design — what persists, in what substrate, and what gets selected
into the window.

### 4. Control failure
The agent's path through the task is wrong: it does not stop, does not finish, or wanders.

- Infinite loop / non-termination
- Budget drain — terminates eventually, at unacceptable cost
- Premature termination — stops before the objective is complete
- Bad plan, or abandons the plan mid-run
- Orchestration breakdown in multi-agent setups (sub-agents duplicating or deadlocking)

**Lever:** deterministic scaffolding — control flow, routing, step limits, workflow-vs-agent
boundaries.

### 5. Specification failure
The agent did exactly what it was told, and that was not what was meant.

- Hidden assumption never made explicit (the "did what I said, not what I meant" failure)
- Specification drift — original instructions fade over a long run without re-reminding
- Semantic drift — the task quietly redefines itself across steps
- Reward hacking — satisfies the stated criterion while defeating its purpose

**Lever:** instructions and spec — system prompt, success criteria, output format, forced
re-anchoring. This is the failure mode that hands work back to Outcome 3.

### 6. Safety failure
The agent does something harmful or disallowed, even if it is task-correct.

- Takes a consequential action without authorization
- Prompt injection — external content overrides the agent's instructions
- Leaks credentials, PII, or internal policy
- Alignment faking — appears to comply while not complying

**Lever:** guardrails, permissions, sandboxing, human-in-the-loop. Distinct from the other
five because it is failure against *values*, not against task-correctness — which is why it
couples to Outcome 6.

---

## The three dimensions

Modifiers, not modes. Any of the six can carry any of these, and each one names a distinct
diagnostic skill. **This is where most of the teaching value lives** — the modes give students
words, the dimensions give them eyes.

- **Detectability: silent ↔ loud.** A stack trace is loud; a confidently wrong refund amount is
  silent. Silent failures are the dangerous ones and they train the **detection** skill — you
  cannot classify what you never noticed. Every eval students write is an answer to "how would
  I have caught this if it were silent?"
- **Propagation: isolated ↔ cascading.** One bad tool result flows downstream through three
  more steps before surfacing. Cascading failures train the **localization** skill — hunting
  the trace for the earliest span where things went wrong rather than the last.
- **Origin: model ↔ code.** Probabilistic failure or deterministic bug. Different evidence,
  different fix, and worth separating early because students reflexively blame the model.

---

## What was dropped, and why

- **Coordination failure as its own mode** — folded into Control. Project 2's agent is
  single-agent, so it would be a category students never populate, and orchestration bugs are
  control-flow bugs with more actors.
- **"Code bug" as a mode** — it has no distinct lever (the lever is "fix the code"). Survives
  as the Origin dimension, which is where it was actually doing work.
- **Hallucination as a top-level mode** — it is a symptom with at least three different fixes.
  Split across Grounding (ungrounded assertion) and Control (fabricated plan).
- **Separate tool-selection vs. tool-execution modes** — same lever, so one mode with bullets.

## Sources this was synthesized from

Kept for the re-evaluation pass, not for teaching:

- <https://latitude.so/blog/ai-agent-failure-detection-guide>
- <https://www.youtube.com/watch?v=D37Ijn2o5U0>
- <https://www.youtube.com/watch?v=A59R_RUh2Dw>
