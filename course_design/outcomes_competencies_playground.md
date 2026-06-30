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

### Cross-cutting THEME — "Intent engineering" *(make the implicit explicit)*
> ⚑ **OPEN GOAL: find a solid way to paint this.** "Intent is the target, not a competency-in-one-
> place" (it's *defined* in Outcome 3, *encoded* in Build, *detected* in Evaluate) — but we can't
> let it vanish into the cracks. It needs to be visibly painted near the competencies even though it
> isn't housed as a single one. Working theme statement: *control the agent by making the implicit
> explicit — through structure (architecture) and through language (instructions).* Naming TBD
> (Specification Precision / Clarity of Intent / Intent Engineering).

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
- **Safety guardrails** — constrain the agent to prevent harmful or disallowed actions
  - **Human-in-the-loop** — approval checkpoints before consequential actions *(also a permissions mechanism above; also surfaces as human review in Outcome 2)*
  - **Sandboxing** — isolate what the agent can touch (filesystem, network, credentials, blast radius)
  > Couples to Outcome 6 (ethics supplies the *why*) and Outcome 2 (safety evals verify the *guardrails hold*).
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

#### Measure — choose an evaluator type to match the criterion type
> Defining the *standard* of "good" lives in Outcome 3. Here we *implement* and *run* the eval.
> The core competency is **choosing the right evaluator for the criterion** (mirrors "choose a
> substrate for state"). Don't phrase everything as LLM-as-judge — it's a *portfolio*.
- **Code / deterministic evaluators** — regex, schema validation, exact match, did-it-call-the-tool
  → for **hard constraints** (pass/fail). Cheap, reliable, no LLM needed.
- **LLM-as-judge** — for **graded / subjective qualities** (tone, helpfulness, reasoning quality)
  - Pointwise (score one output) vs. **pairwise** (compare two, pick the winner)
  - **Judge calibration** — how do you know the judge is any good? (a recursive "define good")
- **Human review** — ground truth + judge calibration
  > **FLAGGED — come back to this.** More nuanced/specific than the others, and it crosses
  > Outcome 3 (translating ambiguity). Park until we treat it deliberately.
- Datasets that feed the above: golden (curated) + production (real usage)
- Run **offline** evals (before deploy) and **online** evals (in production)

#### Experiment
- Compare two or more agents/versions objectively to decide which is better
- **Pairwise comparison** powers head-to-head experiments (the "Battle of the Bots" shape)

#### Bridge competency (the iteration hinge)
- **Root-cause a failure from traces + eval results, and decide which lever to pull next.**
  This is the one genuine iteration skill — it hands Evaluate's findings back to Build.
  > Closely tied to **failure pattern recognition** (see Parking Lot) — the diagnostic vocabulary
  > that makes root-causing possible.

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
- **Find hidden qualifications / assumptions that must be made explicit** to the agent (in context or
  architecture) — the "did what I said, not what I meant" detector
  > Split skill: usually *discovered* when the agent violates an unspoken assumption (Outcome 2,
  > via failure), but *resolved* here by specifying it. Discovered in 2, fixed in 3.
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

## PARKING LOT — concepts thrown in, proposed landings (not yet grilled)

> Dumped to place, not yet decomposed. Proposed home in **bold**; ⚑ = needs a deliberate pass.

- **Failure pattern recognition** → *Outcome 2 (Evaluate)*, feeding the bridge competency. The
  diagnostic vocabulary that makes root-causing possible. **"Six" was arbitrary — dropped.** Full
  banked list of failure modes is below (own section), to be placed into teaching material later.
  Recognition (classify) and resolution (pull lever) are already largely covered: diagnose +
  root-cause analysis live under Outcome 2; resolution is the bridge competency.
- **Context architecture** → *Outcome 1 (Build)*. The *structural* steering cluster: state + memory
  + retrieval + context selection, deliberately organized to feed the window. Possibly the Module-3
  structural climax (the "good agent" design act).
- **Specification precision / Clarity of intent / Intent engineering** → now a **cross-cutting THEME**
  (see top of competencies). ⚑ OPEN GOAL: find a solid way to paint it near the competencies.
- ✅ **Finding hidden qualifications / assumptions to make explicit** → **COMMITTED to Outcome 3**
  (split: discovered in Evaluate, resolved in Outcome 3).
- ✅ **Safety guardrails** → **COMMITTED to Outcome 1**, with **Human-in-the-loop** and **Sandboxing**
  as sub-competencies. Couples to Outcome 6 (why) and Outcome 2 (verify).
- **UI · async · streaming** → *Outcome 1 (Build/Deploy — interface & execution layer)*. Streaming
  already listed; add UI and async as the productization/interface surface.
- **Cost & token economics** → *Outcome 1 (Build) + Outcome 2 (Evaluate measures it)*. Budgeting
  tokens/calls, cost-aware design, cost as an eval dimension. (Termination failures are partly a cost
  problem — see failure patterns.)
- **Size up scope & feasibility of a build** → *home TBD; likely Outcome 1 Design or Outcome 3*. Judge
  before building: is this tractable for an agent, how big, what's the risk? Pairs with "determine
  where agentic AI fits" (Outcome 3).

---

## FAILURE MODES — raw teaching material (banked, not yet structured)

> Jointly discovered. NOT a competency list — this is perspective and optionally *material* to teach
> through (see banked insight below). 
> Copy/paste into teaching material where wanted.

**Mechanisms (root causes — each points toward a fix-lever):**
- **Context degradation / pollution** — output quality drops over long sessions as the window fills with noise
- **Specification drift** — agent forgets its original instructions over a long task unless the harness forcibly re-reminds it
- **Sycophantic confirmation** — agent confidently affirms incorrect data fed to it, then builds an entire system on the flawed assumption
- **Hallucination / fabrication** — invents facts/APIs/citations not grounded in anything
- **Tool selection error** — picks the wrong tool; often from tools being mis-framed in the prompt, too numerous, or too long
- **Tool execution error** — right tool, bad arguments / never called / tool itself errors
- **Planning / control failure** — bad plan, gives up, or wanders
- **Termination failure** — fails to stop: infinite loop, or conversation runs too long, incurring cost/compute (a control failure with a cost face)
- **Specification failure** — did exactly what you *said*, not what you *meant* (hidden assumptions); the "intent" failure
- **Coordination failure (multi-agent)** — agents step on each other, duplicate work, miscommunicate, or deadlock *(⚑ not yet crisply defined — revisit)*
- **Safety / alignment violation** — does something harmful or disallowed, even if "correct" for the task *(⚑ worth treating as genuinely distinct: failure against values, not task-correctness)*
- **Code bug** — deterministic harness error; less an "agent failure," but real to the course process *(an origin distinction, see below)*

**Cross-cutting DIMENSIONS (modifiers — any mechanism can carry these; each stresses a different diagnostic skill):**
- **Detectability: silent ↔ loud.** Silent = plausible, correct-*looking* output that's actually wrong (hidden variables, e.g. a warehouse mismatch). The most dangerous; stresses the **detection** skill.
- **Propagation / scope: isolated ↔ cascading.** One agent's error propagates through the chain when loops/verification are missing; stresses the **localization** skill (hunt for the link where it cascaded).
- **Origin: model (probabilistic) ↔ code bug (deterministic).** Different eyes, different fixes.

---

## BANKED INSIGHTS — from a past conversation worth revisiting

> Honest pick of what's genuinely reusable from this session — perspective, not committed structure.

1. **The diagnostic skill pipeline (a lens, not a committed competency set).**
   *Find* (detect + localize) → *Diagnose* (classify + root-cause) → *Fix* (resolve + harden).
   It traces Evaluate → bridge → Build (= the iteration loop). **Caveat from the design conversation:**
   "detect" is *not* a standalone competency — it only exists paired with *methods* of detection; and
   diagnose / root-cause are already housed under Outcome 2. So treat this as a way to *check coverage*
   and design teaching instruments, not as new outcome scaffolding.

2. **Each failure DIMENSION names a distinct diagnostic skill — this is why silent/cascading earn
   their keep.** Silent failures train *detection eyes*; cascading failures train *localization eyes*.
   They aren't mechanisms, but they're the canonical instruments for teaching those skills. This is the
   single most useful nugget for turning the failure list into curriculum.

3. **Recurring META-MOVE: "split one concept by the skill that touches it."** We kept resolving hard
   concepts by splitting the *same material* across two competencies based on *which skill acts on it*:
   - state (persist) vs. context selection (choose what reaches the window) — reservoir/faucet
   - define "good" (Outcome 3) vs. operationalize/run the eval (Outcome 2)
   - hidden assumption *discovered* via failure (Outcome 2) vs. *resolved* via spec (Outcome 3)
   - failure *recognition* (classify) vs. *resolution* (pull lever)
   When a concept feels too big to home, try splitting it by the verb the student is performing.

4. **Recurring competency SHAPE: "choose the right X for the Y."** Several core competencies are
   *selection/matching judgments*, not memorized procedures: choose a *substrate* for state's function ·
   choose an *evaluator type* for the criterion type · choose a *lever* for the failure. This shape is
   framework-agnostic by nature (it survives stack changes) and is probably the truest expression of the
   course's "principles over tools" stance. Worth using as a template when drafting more competencies.

5. **The outcome test (already principle 7, restated because it kept earning its keep):** a candidate is
   only an outcome if it has competencies that aren't just other outcomes run in sequence. It killed
   "iterate" as a pillar and promoted "evaluate" to one.

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
