# Use Cases → Course Competencies (LangChain)

Maps every entry in [use_case_coverage.md](../use_case_coverage.md) to the outcomes and
competencies in [course_outcomes.md](../course_outcomes.md), and — where a concrete build exists —
to a worked LangChain example or a real case study that demonstrates it.

[langchain-use-case-coverage.md](langchain-use-case-coverage.md) already inventories *what
LangChain material exists* per use case. This document answers a different question: *which
competency does building that thing actually exercise?* A use case is only worth picking for an
activity if it earns its place on both axes — it should teach something on the outcomes rubric,
not just fill a breadth checkbox.

## How to read this

- **Competency codes** reference the numbering in [course_outcomes.md](../course_outcomes.md)
  directly (e.g. `1.5.2` = "Connect a sandbox for arbitrary code execution"). Only codes that a
  use case exercises *distinctively well* are listed — not every competency a generic agent build
  touches (nearly all of them touch 1.1–1.2 trivially, so those are omitted unless a use case has
  a specific reason to highlight them).
- **Worked example** links to an in-docs LangChain tutorial or capability guide (🟢/🟡 depth in the
  companion doc). **Case studies** links to entries on the
  [LangGraph case-studies roster](https://docs.langchain.com/oss/python/langgraph/case-studies)
  (🔗 depth) — external proof, not an in-docs build.
- Breadth itself is the evidence for **5.5** (competency 5.5 can't be satisfied by any single
  use case — see the note in [use_case_coverage.md](../use_case_coverage.md)) so it isn't repeated
  on every row. Rows call out **6.x** (personal ethic) only where the use case raises a sharper
  ethical question than the baseline.

---

## Map

| Use case | Worked LangChain example | Case studies (🔗) | Competencies this use case exercises well |
|---|---|---|---|
| **Healthcare** | [Knowledge base / RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) | Komodo Health, Vizient, OpenRecovery, City of Hope | `1.5.1` HITL is non-negotiable on clinical output; `1.5.3` permissions/PHI access control; `3.3.2` identify safety guardrails under real stakes; `6.1–6.4` — privacy and life-impact make this the clearest ethics case in the whole catalog |
| **Financial Services** | [SQL Agent](https://docs.langchain.com/oss/python/langchain/sql-agent), [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) | BlackRock, J.P. Morgan, Klarna, Morningstar, Captide, Prosper, Rakuten | `1.5.3` authorization constraints on money-moving actions; `1.5.4` error/retry handling where mistakes cost real dollars; `2.2.1` deterministic evaluators for hard constraints (balance checks, limits); `3.2.4` cost assessment (these builds are expensive to get wrong) |
| **Retail** | [Customer-support state machine](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support) | Minimal, Rakuten | `1.4.1` tool calls against order/inventory systems; `1.6` handoff architecture between shopping assistant and support; `2.2.2` LLM-as-judge for conversational quality |
| **Manufacturing** | — (mostly ⚪; shop-floor assistant is 🟠 composable) | — | `3.2.1` demonstrate awareness of LLM limits — most of this vertical (vision QC, digital twins, predictive maintenance) is *not* an agent problem; good forcing function for recognizing when AI doesn't fit |
| **Supply Chain** | [Workflows & agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents) | C.H. Robinson ("Automation") | `1.6` multi-agent orchestration across a multi-step process; `3.6` planning an architecture that matches a long pipeline; `3.6.1` organizing state across stages |
| **Transportation & Logistics** | [Workflows & agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents) | Uber ("Developer productivity; Code generation") | `4.1.3` differentiating terms — Uber's case study is really an *internal dev-tooling* story tagged "Transportation" by industry, not a logistics agent; useful moment to teach `5.3` (evaluate relevance/currency of a source) rather than take an industry tag at face value |
| **Energy** | [LangSmith Alerts](https://docs.langchain.com/langsmith/alerts), [Cron jobs](https://docs.langchain.com/langsmith/cron-jobs) | — | `3.2.2` identify the most expensive/infeasible parts of a build (grid optimization, load-shift are ⚪); the monitor-and-alert pattern is the one piece that *is* buildable |
| **Real Estate** | [Browser tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) (permit-portal lookups) | AppFolio, Rexera | `1.4.3` connecting external tools with no clean API (portal scraping); `3.4` eliciting hidden domain knowledge (zoning, listing conventions) from a non-technical domain expert; `3.7` authoring a spec a realtor could read |
| **Media & Gaming** | [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) (content moderation) | WebToon | `1.5` guardrails for moderation/IP filtering; `6.3` examine downstream impact of generated/moderated content; NPC/dynamic-content generation is ⚪, a second good "not an agent problem" case alongside Manufacturing |
| **Education** | [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) (rubric-graded TA) | — | `2.2.2` LLM-as-judge — this tutorial *is* a rubric-graded evaluator, the cleanest in-docs example of the concept; `2.2.2.1` pointwise grading calibration; `1.3.1` short-term memory across a tutoring session |
| **Government** | [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base) | Abu Dhabi Government | `3.3.2` safety guardrails under public accountability; `4.3.4` advocating for ethical use to a stakeholder who isn't a typical "employer"; `6.5` alignment framed as a public-trust question |
| **Emergency Response** | — (no tutorial, no case study) | — | `3.1` define purpose without tooling first; `3.2` viability assessment under the highest error cost in the catalog — the strongest single case for "should this be an agent at all?"; `6.1–6.4` life-safety stakes with zero LangChain-provided guardrail to lean on, forcing the student to build the ethical judgment, not borrow it |
| **Agriculture** | Monitor pattern only ([Alerts](https://docs.langchain.com/langsmith/alerts)) | — | `3.2.1` LLM limits (imagery/yield models are ⚪); `5.4` evaluating whether a vendor tool is actually solving the stated problem vs. adjacent ML work |
| **Hospitality** | [Personal assistant (supervisor)](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) | Docent Pro | `1.6` subagent delegation (concierge routes to booking/itinerary specialists); `1.3.2` long-term memory for guest preferences |
| **Telecom** | [Knowledge base / RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) | Vodafone (code gen, internal search) | `1.4.2` MCP connections into internal systems; `5.1.1` discerning a package's core functionality quickly (Vodafone's case study spans two unrelated capabilities, a good "what did they actually build" reading exercise) |
| **Professional Services** | [Deep research agent](https://docs.langchain.com/oss/python/deepagents/deep-research), [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation) | Athena Intelligence | `2.2` measuring performance is the deliverable itself (client work has to be graded for quality before it ships); `3.7` authoring durable, human-readable artifacts (the deliverable *is* the artifact) |
| **IT & DevOps** | [Deep Agents coding CLI](https://docs.langchain.com/oss/python/deepagents/code/overview), [Sandboxes](https://docs.langchain.com/oss/python/deepagents/sandboxes) | Cisco Outshift, GitLab, Replit, Qodo, Uber, LinkedIn | `1.5.2` sandboxed code execution — direct 1:1 match; `1.4.1` custom tool definition; `2.1–2.3` full observability loop (LangSmith's home turf); the single deepest outcome-1 vertical in the catalog |
| **Automation** | [Workflows & agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents), [Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api) | C.H. Robinson | `3.6.1` choosing a state substrate; `1.6` orchestration; the most "framework-native" use case — good for teaching the harness mechanics divorced from any one industry's domain knowledge |
| **Customer Support** | [Customer-support state machine](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support) 🟢 | Cisco CX, Cisco TAC, Minimal, Prosper, Infor | The most complete single-tutorial build in the docs — touches `1.1–1.6` in one artifact (model, prompt, memory, tools, HITL escalation, handoff); best candidate for an activity anchoring *all* of Outcome 1 at once |
| **Sales** | [Personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) (partial fit — no dedicated tutorial) | 11x ("Research & outreach"), Unify ("Copilot for domain-specific task") | `3.4` hidden domain knowledge (what actually makes a lead qualified lives in a rep's head, not a doc); `3.6` architecting from scratch since no template exists — one of the few 🟠-only verticals, useful for testing whether students can compose primitives without a tutorial crutch |
| **Analytics** | [SQL Agent](https://docs.langchain.com/oss/python/langchain/sql-agent) 🟢, [Data analysis agent](https://docs.langchain.com/oss/python/deepagents/data-analysis) 🟢 | Monday, Pigment, Modern Treasury, Infor | `2.1.2` reading runs/traces on a data-querying agent; `2.2.1` deterministic evaluators (query correctness against ground truth); direct root for Outcome 2 since "did the agent get the right number" is externally checkable |
| **Legal** | [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval) + [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) (composable, no dedicated tutorial) | Definely ("Copilot for domain-specific task") | `3.3.3` operationalizing constraints into gradeable criteria (a clause is or isn't a red flag — precision matters); `6.1–6.4` confidentiality and liability of AI-drafted legal language make this a second sharp ethics case alongside Healthcare |
| **Software & Technology** | [Deep Agents coding CLI](https://docs.langchain.com/oss/python/deepagents/code/overview), [MCP](https://docs.langchain.com/oss/python/langchain/mcp), [Tools](https://docs.langchain.com/oss/python/langchain/tools) | AirTop, Athena Intelligence, Captide, Cisco CX/TAC/Outshift, Elastic, Exa, GitLab, Harmonic, Inconvo, Infor, Qodo, Replit, Tradestack, Unify, 11x | Largest case-study bucket in the roster (15 of 40 companies) — richest source of real 🔗 examples for nearly every Outcome-1 competency; also the natural home for `5.1–5.4` since these are the companies whose docs/blogs/GitHub repos students will actually be reading to self-learn |
| **Non-profit** | — (thin: `3.2.4` cost is the whole story) | City of Hope ("Copilot for domain-specific task") | `3.2.4` cost assessment under real budget constraint — nonprofits can't absorb a bad build the way an enterprise can; `3.1` defining purpose without tooling, since a nonprofit client is unlikely to hand over a polished spec |

---

## Notable pairings for planning activities

**If you need one activity that hits most of Outcome 1 at once:** Customer Support
([handoffs-customer-support](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support))
is the strongest candidate — it's the only 🟢 tutorial that exercises model selection, prompt
design, memory, tool calls, HITL, and multi-agent handoff in a single build.

**If you need a rubric-grading / LLM-as-judge exemplar for Outcome 2:** Education
([RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag)) ships an
actual rubric-graded retrieval loop in-docs — closer to competency `2.2.2` than anything else in
the catalog.

**If you need a case where AI-fit judgment (Outcome 3) is the whole point, not a build:**
Manufacturing, Media & Gaming (NPC/imagery slice), Agriculture, and Emergency Response are the
"mostly ⚪" use cases — assign one of these when the goal is teaching `3.2` (viability assessment)
rather than another harness build.

**If you need the sharpest ethics cases for Outcome 6:** Healthcare and Legal for
privacy/liability; Emergency Response for life-safety with no framework guardrail to lean on;
Government for public-trust alignment framing.

**If you need a use case with zero in-docs scaffolding, to test whether students can compose
primitives from scratch (Outcome 3.6):** Sales and Non-profit are the two thinnest verticals —
both 🟠/case-study-only, no dedicated tutorial to imitate.
