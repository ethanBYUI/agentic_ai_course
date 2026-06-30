# Outcomes & Competencies — PLAYGROUND

> **This is a playground, not a spec.** Nothing here is locked. Wording is provisional,
> structure is provisional, and the views below are deliberately *incongruous* in places
> because we're painting the same course from several perspectives (concept / lifecycle /
> teaching-order) at once. We are sorting *what is taught*, not semantics or final structure.
>
> Grammar target (when we get there): "Students can + verb."
>
> **Scope guardrail:** This document fleshes out **competencies**. Assessments, projects,
> performances, and tasks are a *separate dimension* (principle 6) and a *byproduct* of this
> work — when one surfaces we park it, we don't pursue it here.

---

## Governing principles (locked enough to reason with)

1. **Framework-agnostic competencies; one opinionated stack as the vehicle.**
   Outcomes/competencies are stated in transferable, principle-level terms. The concrete
   vehicle (LangChain / LangGraph / LangSmith, mostly Gemini API) lives one layer down, at
   the task/evidence level. If the stack changes in a few months, the outcomes don't.

2. **Concept organization is primary; implementation is a second perspective.**
   We organize by *what a thing does* (function), not by *where it lives / what datatype*.
   Substrate choices are a menu students learn to choose from, not separate competencies.

3. **The competency tree is NOT the teaching sequence.**
   A competency can live under "Build" conceptually even if it's introduced late (e.g., after
   observability). build → diagnose → steer is a *delivery order*, not a competency boundary.

4. **State is the reservoir; context selection is the faucet.**
   Persisting/organizing info = state. Selecting/shaping what reaches the model window =
   context engineering. Same data, two competencies.

5. **"Context engineering" is dissolved as a top-level concept** — too big/unspecific to live
   safely in the competencies. It splits into distinct *steering levers* (see Build).

6. **Outcomes and performances are SEPARATE dimensions.**
   An outcome owns a *concept*; a performance is *evidence*. One performance may serve several
   outcomes, and an outcome may be non-concrete and still be a real result of the class. So a
   competency can be claimed by the outcome it conceptually belongs to even when its evidence is
   a performance housed under another outcome. (This is what lets ethics stay first-class while
   its evidence is infused elsewhere, and it resolves "defining good" double-homing.)

7. **Iteration is connective tissue, not an outcome.**
   Test: a candidate outcome must have competencies of its own that aren't just other outcomes'
   competencies run in sequence. Iteration fails the test (it's "do Build, do Evaluate, connect
   them, repeat") — so it's carried in *wording*, not given a pillar. The one genuine skill near
   it (root-cause a failure → decide which lever to pull) is a *bridge competency*.

---

## The development lifecycle (carried in wording, not an outcome)

Design is coupled to Build. The loop the course is built around:

```
        ┌─────────────────────────────────────────────────────────────┐
        │                                                               │
   (Design +) Build ─► Observe ─► Offline Evals ─► Deploy ─► Observe ─► Online Evals
        ▲          (pre-production)   (test)                (production)        │
        │                                                                       │
        └───────────────────────────── loops back ─────────────────────────────┘
```

Build owns the left side (construction + deploy); Evaluate owns the observe/measure/experiment
side. The arrow between them is iteration — named in each outcome's one-liner so the loop is
present without teaching a waterfall ("build, *then* evaluate").

---

## OUTCOMES (top level)

> The development core used to be one giant "execute the lifecycle" outcome. It's now **split
> into three** so the evaluation selling-point gets a headline and the soft crown isn't swallowed
> by tooling: **Build** (construct), **Evaluate** (the *hard* side of measurement), and
> **Translate ambiguity** (the *soft* side — defines what Evaluate measures).

### Outcome 1 — Build and deploy agentic AI solutions  *(the "hard" skill — construction)*
Students can design, build, and deploy a working agentic AI solution — one whose behavior they
continuously evaluate and refine. (Design folds into the front of Build; deploy folds into the
back — shipping is building.)

### Outcome 2 — Evaluate agents  *(the "hard" side of measurement — the selling point)*
Students can observe, measure, and experiment on an agent's behavior to know *whether* and *why*
it works — feeding each finding back into the next build.

### Outcome 3 — Translate ambiguous goals into explicit, measurable criteria  *(the "soft" / crowning skill)*
Students can take a human objective from fuzzy intuition and convert it into explicit, decidable,
measurable structure — both *where AI fits* and *what success means*. Defines the target that
Outcome 2 measures against.
> Candidate alternate phrasings still on the table:
> - "Specify and measure success for systems where 'correct' is subjective."
> - "Impose clarity and rigor on ill-defined problems."
> - "Operationalize ambiguous objectives into testable behavior."

### Outcome 4 — Communicate about AI, in language fitted to each audience
Students can communicate their own competence and their agents' behavior to technical and
non-technical audiences alike.

### Outcome 5 — Find and evaluate quality sources to self-learn in an ever-changing AI landscape
Students can find and judge sources of AI knowledge — preferring primary, current sources over
stale tutorials and unreliable AI answers. ("Seek out of the best books words of wisdom.")
> Finding and evaluating are *one act*, not two — you judge a source as you find it. So the
> competencies below are source *types*, each meaning "find AND evaluate this kind of source."

### Outcome 6 — Form and live a personal ethic for the use of AI
Students can develop and act on a personal conviction for the ethical use of AI, grounded in
gospel doctrine and informed by industry and societal context.
> Deliberately *non-concrete* and that's OK (see principle 6). It owns the *conviction*; most of
> its evidence is borrowed from performances housed under other outcomes.

---

## COMPETENCIES

### Foundational (cross-cutting — serves Outcomes 1, 2, 3)
- **Understand the agent development lifecycle** — explain the loop and how its phases connect.
  *Understanding, not execution* — it left the headline (no longer an outcome) but stays present
  as conceptual literacy that grounds Build, Evaluate, and the iteration between them.

---

### Under Outcome 1 — Build and deploy agents

#### Design (front of Build)
- Define clearly the purpose and intent of an agent — without digital tools
- Plan the harness structure for an LLM
- Identify deterministic vs. probabilistic components of the problem
- Choose a meaningful harness architecture (memory, skills, sub-agents)

#### Build — connect to the model ("the brain")
- Connect to an LLM provider's API (provider-agnostic; find features in docs — memorization not essential)
- Implement core *model* features from documentation:
  token limits · system prompt · temperature · structured output · web search · thinking ·
  function calling · caching · other data types
  > Note: function calling is also a harness-level "tool use" lever below — same skill, two hats.
  > Keep the model-feature list *light* in favor of harness focus.

#### Build — agent/harness primitives  *(all conceptually here even if taught later)*
These are the **steering levers**. Module 1 hands them over raw; Module 3 is the *judgment*
to pull the right ones deliberately, against measured objectives.

- **Conversation state / history** — persist and pass prior turns
- **Persistent state across runs** — statefulness + checkpointing
- **State, organized by function (preferred)** (choose substrate for function + access pattern; substrate
  = md/text · objects/classes · SQL · vector — a menu, not 4 competencies):
  - Conversational state (turn history)
  - Working state (scratchpad: plans, intermediate results, persisted reasoning)
  - Knowledge state (long-term facts — what retrieval/RAG reads from)
  - Operational/metadata state (run ids, token counts, costs, status — feeds observability)
- **Tool use** — define, register, invoke custom tools; judge good vs. bad tool definitions
- **External tools / MCP** — community/prebuilt tools; MCP (stdio + HTTP, local + hosted); implement & create
- **Memory** — short-term (in-context) vs. long-term (retrieved); *when* to use each
- **Retrieval / RAG** — reads from knowledge state
- **Multi-agent / sub-agent architecture** — delegation
- **Deterministic scaffolding** (the deterministic shell around the probabilistic core):
  - Control flow — workflow vs. agent routing; deterministic steps; scripts (the *path*)
  - Permissions / authorization — what the agent may do; **human-in-the-loop** is a permission checkpoint (the *authority*)
- **Instruction / prompt design** *(steering lever)* — system prompt, persona, few-shot, output format (authored text)
- **Context selection** *(steering lever)* — the state→window faucet: what gets retrieved/included/compressed per step
- **Streaming**
- **Error / retry handling**

#### Deploy
- Deploy / host an agent (e.g., Vercel; could front a phone/Slack app)
- Connect to services (Slack, Google Calendar)
- Set up a publishable local environment: API secret standards · environment tooling (uv) · git basics

#### Refine (the loop — carried in wording)
- Use evaluation findings to deliberately tune the steering levers and re-enter the cycle.
  > The diagnosis skill itself (root-cause → choose a lever) is the **bridge competency**, housed
  > under Outcome 2 where the trace evidence lives.

---

### Under Outcome 2 — Evaluate agents

#### Observe (pre-production AND production)
- Instrument tracing / observability — see what the agent actually did
- Read runs, traces, spans; inputs, outputs, metadata
- Distinguish run types (LLM · tool · retriever · chain · prompt · parser)
- Observe pre-production vs. observe in production (distinct contexts)

#### Measure — Offline (test) and Online
> Defining the *standard* of "good" lives in Outcome 3. Here we *implement* and *run* the eval.
- Build evaluation infrastructure: LLM-as-judge; datasets (golden + production)
- Run offline evals (before deploy)
- Run online evals (in production, using real usage)

#### Experiment
- Compare two or more agents/versions objectively to decide which is better

#### Bridge competency (the iteration hinge)
- **Root-cause a failure from traces + eval results, and decide which lever to pull next.**
  This is the one genuine iteration skill — it hands Evaluate's findings back to Build.

---

### Under Outcome 3 — Translate ambiguity into measurable criteria
- **Determine where agentic AI fits** a problem
  - Identify deterministic elements (what should NOT be an LLM)
  - Demonstrate awareness of an LLM's limitations
- **Define and specify success for an agent** *(primarily discovered, with a lightweight up-front
  first draft — students "realize what they think they know but don't")*
  - Choose which quality dimensions matter for *this* agent (correctness, safety, tone, format,
    completeness, latency, cost…) — and deliberately ignore the rest
  - Separate hard constraints (pass/fail guardrails) from graded qualities (spectrum)
  - Operationalize a fuzzy criterion into a decidable one (a rubric/spec a human or judge can rule on)
  - Anchor criteria with concrete good/bad examples *(the seed of a golden dataset — bridge to Outcome 2)*
  - Name and prioritize tradeoffs between conflicting criteria (helpful vs. safe, thorough vs. concise)
  - Distinguish single-output quality from aggregate reliability ("this answer is good" vs. "good across 100 cases")
  - Revise success criteria from observed behavior *(the iterative core — the spec moves each loop)*
> Cross-link: this outcome owns *defining the standard*; Outcome 2's competencies own
> *operationalizing and running* it (judge, dataset, experiment). Don't duplicate the node.

---

### Under Outcome 4 — Communicate about AI
Two cross-cutting competencies sit directly under the outcome (they serve *both* arms below),
then two arms: communicating *yourself* vs. communicating *the work*.

- **Use current industry language correctly** *(cross-cutting)*
  - (agentic AI vs. LLM, API, runs/traces/tracing, alignment — specifics TBD)
- **Demonstrate competence to employers** *(the "look what I can do" arm)*
  - Publish work where employers can see it
    - Maintain a clean, public GitHub repository for an agent
    - Publish a LinkedIn post on work accomplished and lessons learned
  - Articulate what they built and what they learned from it
- **Communicate the work on the job** *(the "look at the AI" arm)*
  - Explain how an agent works to technical AND non-technical colleagues
    > Register-switching lives here: precise terminology with technical audiences, plain
    > language with non-technical ones. (Folded in — not a standalone competency.)
  - Report an agent's performance and behavior
    > Crosses Outcome 2 (Evaluate) / Outcome 3: evaluation produces the *finding*; communication
    > owns *conveying it* clearly to a decision-maker. (Shared performance — principle 6.)
  - Recommend where an agent should improve or go next *(advocacy, not just status reporting)*
  - Advocate for ethical AI use to an employer or stakeholder
    > Shared performance with Outcome 6: ethics supplies the conviction, communication the articulation.

---

### Under Outcome 5 — Find and evaluate quality sources
Each competency is a single find-AND-evaluate act on one source type. "Read docs" leads because
documentation is the primary-source antidote to stale secondary sources.

- **Learn from documentation** *(primary source — the keystone)*
  - Learn a package's core functionality
  - Find features deliberately to solve a predetermined problem
- **Find trusted people** — thought leaders in AI, industry professionals, forums, YouTube, blogs, in person
- **Evaluate relevance and currency of information** — use AI and tutorials to find information, and judge whether its answers are current and reliable, including AI code agent output
- **Find and evaluate software** — companies · GitHub repos · MCPs (is it maintained? current?)

---

### Under Outcome 6 — Personal ethic for AI use
Students can…
- **Apply** Church doctrine and gospel principles to real AI-use situations
  - Know what the Church and scripture teach that bears on AI use *(this piece lives nowhere else)*
- **Articulate** how the industry frames alignment and AI ethics — recognizing alignment as fundamentally an ethics question
- **Examine** and remain conscious of their own AI use
- **Develop** a personal conviction for ethical AI use that is genuinely their own
- **Define** what ethical AI use means to them personally

**Placements / cross-references (outcome owns the concept; performances are shared):**
- *Watchfulness / impact on others* → NOT a competency here; lives under AI assessment (Outcome 2 Evaluate / Outcome 3)
- *Talk to your employer about ethical AI use* → performance shared with Outcome 4 (Communicate); ethics supplies the conviction, communication supplies the articulation
- *Ethics/alignment-based evaluators* → built in Outcome 2 (Evaluate); the standard they encode is ethical
- *Personal ethics manifesto* → native artifact; primary evidence for conviction + definition
- Arc: "What can I do with AI?" → "How can I use AI for good?" → "I have a responsibility to do
  morally good things with AI and influence a world where it's often misused."

---

## OPEN TENSIONS / DECISIONS NOT YET MADE

1. **Primary spine among the three development outcomes.** Build / Evaluate / Translate-ambiguity
   are currently co-equal. For final-letter narrative and grading weight, we may eventually need to
   declare a primary. Deferred.
2. **Assessment orphaning of Outcome 3 (the soft crown).** Hard to measure by nature; risks being
   crowded out by the gradeable Build/Evaluate work unless deliberately assessed. (Principle 6
   helps — its evidence can be borrowed — but doesn't fully solve it.)
3. **Scope imbalance.** Build is large, Evaluate medium, Translate-ambiguity tight. They don't look
   parallel — may need rebalancing or re-leveling.
4. **One-vs-many outcomes (structural).** Whether the three development outcomes should be one
   integrated outcome or stay split — deliberately deferred as a structural/semantic question.
5. **Where exactly is the state↔context-engineering line drawn in practice?** Principle is set
   (reservoir vs. faucet); the teaching boundary still needs concrete examples.
6. **Does Module 3 introduce new primitives or only judgment?** Decided: it MAY introduce new
   primitives (don't frontload everything before observability). Competency tree stays concept-first
   regardless of when taught.
7. **Where does "understand the lifecycle" formally live?** Parked as a cross-cutting foundational
   competency; may want a permanent home once structure is decided.
