# Build Outcome — Gap Analysis Against the Durable Core

*Concept-level comparison of the durable "Build" principles (from industry-leader
research on job-desc headers 4–6, 8) against the current [course_outcomes.md](../course_outcomes.md).
Focus is conceptual; wording flagged where relevant. Not everything belongs in Outcome 1 —
where a concept fits another outcome, that placement is noted.*

*Date: 2026-07-09. Sources listed at the bottom.*

---

## What the research says is already well-covered

So the gaps below are trustworthy by contrast:

- **Memory/state** — [course_outcomes.md:28-33](../course_outcomes.md#L28) is genuinely strong; state-by-function + substrate choice is more sophisticated than most of the source material.
- **Tools & MCP** — [course_outcomes.md:34-38](../course_outcomes.md#L34) covers custom tools, MCP, CLI, and tool-definition *quality*. Solid.
- **Context engineering as design** — the Translate outcome ([:97-102](../course_outcomes.md#L97)) already carries "anticipate what context it will/won't need" and "decide how each piece of context is delivered." That's the runtime-selection skill, well placed.
- **The framework-agnostic framing** ([:12-14](../course_outcomes.md#L12)) already *is* LangChain's "own the cognitive architecture, outsource the infrastructure" razor. Internalized structurally. Nothing to add — it's working.

## The genuine conceptual gaps, ranked

### 1. Adversarial security: prompt injection, jailbreak, the rail taxonomy — *absent entirely*
This is the biggest hole. The guardrails block ([:39-44](../course_outcomes.md#L39)) is framed as **reliability** — HITL, sandbox, permissions, retries. That's *deterministic safety*. It contains **nothing adversarial**: prompt injection, jailbreak, data exfiltration, tool-output as an untrusted attack surface. Across OpenAI and NVIDIA this is the most convergent guardrails content, and prompt injection is the definitionally *non-transitory* threat — it's inherent to mixing instructions and data in one channel, so it won't be "solved." The file even self-flags this block as "deserves more sub-competencies" ([:43](../course_outcomes.md#L43)).

- **Where it lives:** Build guardrails (implementation), but threat *awareness* also touches Translate ("common failure points," [:89](../course_outcomes.md#L89)) and the ethics outcome.
- **What to add conceptually:** input rails (relevance, jailbreak/injection detection, PII), output validation, tool/action rails — and the framing that untrusted content entering context is an attack vector.

### 2. Layered defense / defense-in-depth — *the missing organizing idea for guardrails*
Related but distinct from #1. The single most repeated guardrails principle in the research — OpenAI: "a single guardrail is unlikely to provide sufficient protection"; NVIDIA: "one-size-fits-all doesn't secure agentic workflows." Right now [:39-44](../course_outcomes.md#L39) is a *flat list* of mechanisms with no principle unifying them. Defense-in-depth is what turns that list into a competency. This is the concept that answers the "this deserves more" flag.

### 3. Control-flow patterns + the workflow↔agent spectrum — *the orchestration discipline is a bare one-liner*
Header 4 is rated **High / "first-class discipline,"** yet "Architect multi-agent / sub-agent delegation" ([:45](../course_outcomes.md#L45)) is a **single bullet with zero sub-competencies**, and the named patterns are nowhere. Missing durable vocabulary (identical across Anthropic + LangChain + 2026 catalogs):
- The **workflow↔agent spectrum**: deterministic/predefined control flow vs. model-directed autonomy, and *the cost of autonomy* (choosing the least-autonomous thing that works).
- The **composition patterns**: prompt chaining, routing, parallelization, orchestrator-worker, evaluator-optimizer.
- **Planning loops**: decompose → plan → execute → re-plan from observations.

- **Where it lives — the "not everything in Outcome 1" case:** the *design judgment* (when a fixed workflow beats an agent, which pattern fits) belongs in **Translate → "Plan an agent's architecture from first principles"** ([:98-101](../course_outcomes.md#L98)) — "Propose multiple harness schemas" is the natural hook. The *implementation* of those patterns belongs in Build. The seed already exists in "Identify deterministic elements that should NOT be decided by an LLM" ([:100](../course_outcomes.md#L100)) — that's the workflow-vs-agent instinct, just not named as such.

### 4. The agentic execution loop itself — *the harness is described by its parts, not its loop*
Subtle but foundational. Build enumerates the harness *components* (instructions, memory, tools, guardrails, multi-agent) but never names the **loop that runs them**: model acts via tool → **observes ground truth from the environment** → re-plans. The research flagged this as the single most durable object in the whole field. Note this is **not** the same as the "agent development lifecycle" (build→observe→evaluate→deploy, [:169](../course_outcomes.md#L169)) — that's the *human's* SDLC loop; this is the *agent's runtime* loop. Both should exist; only one does.

### 5. Context as a finite resource — *the moves are taught, not the law*
The operational moves are present (state management, context delivery). What's missing is the **governing principle** that makes them cohere: context is finite, attention degrades as it fills ("context rot"), so the goal is the *smallest set of high-signal tokens*. Without the "why," [:30](../course_outcomes.md#L30) reads as "too many ideas in one" (existing flag) instead of instances of one principle. Adding the principle would also **resolve that flag** — it's the unifying frame that block is missing.

Two durable *techniques* under this are also absent:
- **Compaction** — summarize-and-reinitialize context for long-running tasks (central to the newer Anthropic long-running-agent work).
- **Progressive disclosure / just-in-time retrieval** — hold lightweight references (paths, queries), load content at runtime rather than front-loading. RAG is present ([:32](../course_outcomes.md#L32)) but not this.

### 6. Tool results as a context/token cost — *minor, mostly pointed-at*
"Judge good vs. bad tool definitions" ([:36](../course_outcomes.md#L36)) covers input design. The research adds one durable idea not captured: a tool should **return high-signal context, not raw data** (semantic names over UUIDs, pagination/truncation) — which is also where Tools meets gap #5. Low priority; could be a sub-point under the existing bullet.

## Two existing flags, resolved by the research

- **[:31](../course_outcomes.md#L31) "short-term vs long-term… seems like duplicate"** — it is **not** a duplicate. Anthropic and LangChain both treat short-term (within-task/thread state) vs. long-term (cross-session memory) as a first-class, durable distinction, separate from the state-*by-function* cut at [:30](../course_outcomes.md#L30). Keep both; they're different axes (lifetime vs. role).
- **[:36](../course_outcomes.md#L36) "Judge good vs bad tool definitions — flag location"** — the research says this is high-value and correctly in Build; if anything it deserves *expansion* (consolidation, high-signal returns, eval-driven refinement), not relocation.

## Out-of-scope-but-worth-a-line
Header 3 (CI/CD & automated feedback loops) is genuinely beyond the Deploy scope, and that's a deliberate choice — don't add it. But the **eval-driven tool/agent improvement loop** (let evaluation results drive tool refinement) is a cheap bridge already *almost* present in Refine ([:50-51](../course_outcomes.md#L50)); it just isn't connected to *tools* specifically.

---

**Net:** four real conceptual gaps (adversarial security, layered defense, control-flow/orchestration vocabulary, the runtime loop) and one missing principle (finite context) with two missing techniques (compaction, progressive disclosure). Three of the four gaps are guardrails/orchestration — exactly the two pillars (headers 4, 8) the job-desc file already rated as under-developed, so this triangulates with that read.

---

## Sources (primary, industry-leader)

- [Anthropic — Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) (Dec 19, 2024)
- [Anthropic — Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sep 29, 2025)
- [Anthropic — Writing Effective Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) (Sep 11, 2025)
- [Anthropic — Our Framework for Developing Safe and Trustworthy Agents](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents) (Aug 4, 2025)
- [OpenAI — A Practical Guide to Building Agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) (Apr 17, 2025)
- [LangChain — Outsource Your Infrastructure, Own Your Cognitive Architecture](https://www.langchain.com/blog/why-you-should-outsource-your-agentic-infrastructure-but-own-your-cognitive-architecture) (Jul 13, 2024 — durable thesis; illustrative example, OpenAI Assistants API, is now obsolete)
- [LangChain — Agentic Architectures (workflows→agents taxonomy)](https://docs.langchain.com/oss/python/langgraph/workflows-agents) (living doc)
- [NVIDIA — NeMo Guardrails NIM Microservices for Agentic AI](https://blogs.nvidia.com/blog/nemo-guardrails-nim-microservices/) (Jan 16, 2025)
