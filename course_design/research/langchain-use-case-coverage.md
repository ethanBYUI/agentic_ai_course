# LangChain Coverage of Agent Use Cases

A mapping of the use cases catalogued in [every-use-case.md](every-use-case.md) to concrete
material in the [LangChain](https://docs.langchain.com) documentation — tutorials, capability
guides, the tool-integration catalog, and the LangGraph **case-studies** roster — with an
assessment of how deeply each is covered.

Companion to [mastra-use-case-coverage.md](mastra-use-case-coverage.md); same catalog, same depth
legend, so the two frameworks can be compared side by side.

## How to read this

"LangChain" here means the whole open-source stack the docs cover: **LangChain** (agents, tools,
models, memory, RAG, middleware, multi-agent), **LangGraph** (the graph/workflow runtime,
persistence, human-in-the-loop, durability), **Deep Agents** (planning + subagents + filesystem +
sandbox for long-horizon tasks), and **LangSmith** (evals, tracing, online monitoring, scheduling).
The public docs live at `https://docs.langchain.com`.

Like Mastra, LangChain is a **framework organized around capabilities and patterns**, not a library
of turnkey vertical solutions. So the honest picture is the same shape:

- A **small set of concrete end-to-end tutorials** implement specific named use cases (SQL/data Q&A,
  RAG docs Q&A, deep research, data analysis, customer-support state machine, personal assistant,
  voice agent).
- A **larger set of capability guides** enable whole *classes* of use cases with generic examples.
- A **broad tool-integration catalog** supplies the connectors (search, browser, Gmail, SQL,
  payments) that turn a generic agent into a specific one.
- A **real-world case-studies table** names ~40 companies and the use case each shipped on LangGraph
  — these are external references (blog posts / talks), **not** in-docs walkthroughs, but they prove
  the pattern in a vertical.
- Most **industry-specific use cases have no dedicated tutorial** — they are "buildable" by composing
  primitives; the case-studies table is often the only vertical-specific pointer.
- A slice of the catalog is **out of scope** for an LLM-agent framework (computer-vision defect
  detection, drone imagery, ML forecasting/pricing/optimization models).

### Depth legend

| Symbol | Meaning |
|---|---|
| 🟢 **Dedicated** | A LangChain tutorial implements essentially this exact use case end-to-end. |
| 🟡 **Capability** | A capability/pattern guide directly enables it with a generic (non-vertical) example. |
| 🟠 **Composable** | No example, but the needed primitives exist and are documented; you assemble them. |
| 🔗 **Case study** | A real company shipped this on LangGraph — referenced in [case-studies](https://docs.langchain.com/oss/python/langgraph/case-studies) via external blog/talk, not an in-docs build. |
| ⚪ **Out of scope** | Not something an LLM-agent framework provides (vision / ML-model / pricing-engine territory). |

> Note on links: the docs ship parallel **Python** and **JavaScript** trees (`/oss/python/…` and
> `/oss/javascript/…`). Links below use the Python paths; swap `python`→`javascript` for the JS
> equivalent. A few capabilities (e.g. `data-analysis`, `sql-agent` under langgraph) exist on only
> one tree.

---

## Part 0 — The concrete tutorials & anchors

These are the end-to-end walkthroughs the docs actually ship. Everything else maps back to these
plus the capability guides and the tool catalog.

| Tutorial | What it builds | Anchors these catalog use cases |
|---|---|---|
| [SQL Agent](https://docs.langchain.com/oss/python/langchain/sql-agent) | Agent that queries a database with error-correction & validation | **NL querying of warehouses**, BI, reporting |
| [Knowledge base / RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) + [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval) | RAG Q&A over a corpus | **RAG internal Q&A, docs concierge, TA with citations** |
| [Agentic RAG](https://docs.langchain.com/oss/python/langgraph/agentic-rag) | Agent that decides when/what to retrieve | Grounded Q&A, research synthesis |
| [Deep research agent](https://docs.langchain.com/oss/python/deepagents/deep-research) | Planner + subagents + web search → cited report | **Research/browsing agents, market-analysis synthesis** |
| [Data analysis agent](https://docs.langchain.com/oss/python/deepagents/data-analysis) | CSV → EDA + visualizations, shares to Slack | **Report/narrative generation, dashboard insights** |
| [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) | Skills-guided + rubric-graded retrieval over docs.langchain.com | Grounded docs Q&A, e-discovery-style analysis |
| [Customer-support state machine](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support) | Warranty intake → classify hardware/software → solve or escalate | **Tier-1 support bot w/ escalation, ticket triage** |
| [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base) | Routes across GitHub + Notion + Slack specialists | **Internal KB search across sources, docs concierge** |
| [SQL skills assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/skills-sql-assistant) | Progressive-disclosure skills for per-vertical SQL | NL querying, multi-domain analytics |
| [Personal assistant (supervisor)](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) | Calendar + email specialists with HITL approval | **Meeting scheduling, email drafting, personal assistant** |
| [Voice agent](https://docs.langchain.com/oss/python/langchain/voice-agent) | Real-time spoken agent | **Voice agents, IVR deflection** |
| [Deep Agents coding CLI](https://docs.langchain.com/oss/python/deepagents/code/overview) | Autonomous coding agent (plan/edit/run in sandbox) | **Code agents, code generation** |

**Tool integrations that turn a generic agent vertical** (from the
[tool catalog](https://docs.langchain.com/oss/python/integrations/tools)): web
[search](https://docs.langchain.com/oss/python/integrations/tools/tavily_search) (Tavily, Exa,
Perplexity, Google…), [browser automation](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser)
(AgentCore, Hyperbrowser, AgentQL), [Gmail](https://docs.langchain.com/oss/python/integrations/tools/google_gmail)
& email toolkits, [SQL/DB](https://docs.langchain.com/oss/python/integrations/tools/mcp_toolbox),
code interpreters, and [payment/finance](https://docs.langchain.com/oss/python/integrations/tools/goat)
tools (GOAT, Privy) for autonomous-transaction agents.

---

## Part 3 — Agentic capability patterns (LangChain's strongest coverage)

LangChain maps most directly to the cross-cutting patterns. Nearly all are covered at 🟢/🟡.

| Pattern | Depth | LangChain docs |
|---|---|---|
| Monitor-and-alert agents | 🟡 | [LangSmith Alerts](https://docs.langchain.com/langsmith/alerts) + [Online evaluations](https://docs.langchain.com/langsmith/online-evaluations-llm-as-judge) (runtime monitoring); [Cron jobs](https://docs.langchain.com/langsmith/cron-jobs) / [Deep-agent schedules](https://docs.langchain.com/langsmith/managed-deep-agents-schedules) for scheduled watchers |
| Research / browsing agents | 🟢 | [Deep research agent](https://docs.langchain.com/oss/python/deepagents/deep-research), [Deep research overview](https://docs.langchain.com/oss/python/deepagents/deep-research), browser [tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) |
| Orchestrator / multi-agent | 🟢 | [Multi-agent overview](https://docs.langchain.com/oss/python/langchain/multi-agent), [supervisor/subagents](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant), [router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base), [handoffs](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs), [Deep Agents subagents](https://docs.langchain.com/oss/python/deepagents/subagents) |
| Workflow-automation agents | 🟢 | [Workflows & agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents), [Graph API](https://docs.langchain.com/oss/python/langgraph/use-graph-api), [Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api) |
| Copilot / assistant agents | 🟢 | [Agents overview](https://docs.langchain.com/oss/python/langchain/agents), [UI / generative UI](https://docs.langchain.com/oss/python/langchain/ui); "Copilot for domain-specific task" is the single most common case-study category |
| Autonomous-transaction agents (within guardrails) | 🟡 | [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails), [Middleware](https://docs.langchain.com/oss/python/langchain/middleware/overview), [Deep-agent permissions](https://docs.langchain.com/oss/python/deepagents/permissions) + [finance tools](https://docs.langchain.com/oss/python/integrations/tools/goat) |
| Human-in-the-loop review agents | 🟢 | [Human-in-the-loop (LangChain)](https://docs.langchain.com/oss/python/langchain/human-in-the-loop), [Interrupts (LangGraph)](https://docs.langchain.com/oss/python/langgraph/interrupts), [Deep-agent HITL](https://docs.langchain.com/oss/python/deepagents/human-in-the-loop) |
| Simulation / planning agents | 🟡 | [Deep Agents planning/todo](https://docs.langchain.com/oss/python/deepagents/overview), [Time travel](https://docs.langchain.com/oss/python/langgraph/use-time-travel) for what-if replays; no dedicated simulation tutorial |
| Computer-use / GUI agents | 🟡 | Browser [tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) (AgentCore, Hyperbrowser, AgentQL); AirTop case study (🔗) |
| Personal-assistant agents | 🟢 | [Personal assistant tutorial](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant), [long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory) |
| Voice agents | 🟢 | [Voice agent](https://docs.langchain.com/oss/python/langchain/voice-agent) |
| Code agents | 🟢 | [Deep Agents coding CLI](https://docs.langchain.com/oss/python/deepagents/code/overview); GitLab, Replit, Qodo, Uber, LinkedIn case studies (🔗) |

**Supporting capability guides** referenced throughout the tables below:
[Agents](https://docs.langchain.com/oss/python/langchain/agents) ·
[Tools](https://docs.langchain.com/oss/python/langchain/tools) ·
[Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) ·
[Short-term](https://docs.langchain.com/oss/python/langchain/short-term-memory) /
[Long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory) ·
[Context engineering](https://docs.langchain.com/oss/python/langchain/context-engineering) ·
[Middleware](https://docs.langchain.com/oss/python/langchain/middleware/overview) ·
[MCP](https://docs.langchain.com/oss/python/langchain/mcp) ·
[Persistence](https://docs.langchain.com/oss/python/langgraph/persistence) ·
[Fault tolerance / durability](https://docs.langchain.com/oss/python/langgraph/fault-tolerance) ·
[Sandboxes](https://docs.langchain.com/oss/python/deepagents/sandboxes) ·
[LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation).

---

## Part 1 — Cross-functional (horizontal) use cases

### Customer Service & Support
| Use case | Depth | LangChain material |
|---|---|---|
| Tier-1 support bot w/ confidence + escalation | 🟢 | [Customer-support state machine](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support) (classify → solve → escalate) + [HITL](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) |
| Ticket triage / routing / tagging | 🟢 | Same state-machine tutorial (intent classifier + routing); [structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Live-chat / voice IVR deflection | 🟢 | [Voice agent](https://docs.langchain.com/oss/python/langchain/voice-agent) |
| Multi-agent support system (production) | 🔗 | Minimal, Cisco CX/TAC, Prosper, Infor case studies ([case-studies](https://docs.langchain.com/oss/python/langgraph/case-studies)) |
| Post-interaction summarization / CRM notes | 🟡 | Agent generation + [structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Knowledge-base auto-writer from tickets | 🟠 | [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval) + generation; no example |
| Multilingual support / translation | 🟡 | Core model generation; [middleware](https://docs.langchain.com/oss/python/langchain/middleware/overview) for pre/post-processing |
| Proactive outreach (renewals, outages) | 🟡 | [Cron jobs](https://docs.langchain.com/langsmith/cron-jobs) / [schedules](https://docs.langchain.com/langsmith/managed-deep-agents-schedules) + tools |
| Smart upsell / cross-sell recommender | 🟠 | Tools + memory; no example |
| Automated refund / return adjudication | 🟠 | [HITL](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) + [guardrails](https://docs.langchain.com/oss/python/langchain/guardrails); no example |
| Sentiment early-warning / churn signals | 🟠 | Monitor pattern ([alerts](https://docs.langchain.com/langsmith/alerts)); no example |
| Conversation-QA auditor / scoring & leaderboards | 🟡 | [LLM-as-judge](https://docs.langchain.com/langsmith/llm-as-judge) + [online evaluations](https://docs.langchain.com/langsmith/online-evaluations-llm-as-judge) |

### Sales & Revenue
| Use case | Depth | LangChain material |
|---|---|---|
| Meeting scheduling / calendar coordination | 🟢 | [Personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) (calendar agent) |
| SDR / outbound drafting & personalization | 🔗 | 11x ("Research & outreach"), Unify ("agents for account qualification") case studies |
| Lead enrichment from external data | 🟡 | [Search tools](https://docs.langchain.com/oss/python/integrations/tools/tavily_search) + [browser/scraping](https://docs.langchain.com/oss/python/integrations/tools/hyperbrowser_web_scraping_tools) |
| Lead scoring / qualification / routing | 🔗/🟠 | Unify case study (🔗); otherwise classification workflow, no in-docs example |
| Sales-call transcription & next-steps | 🟡 | [Voice](https://docs.langchain.com/oss/python/langchain/voice-agent) + summarization/[structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Proposal / quote / RFP generation | 🟠 | [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval) + generation; no example |
| Pipeline hygiene / CRM data quality | 🟠 | Tools + workflow; no example |
| Deal-risk / forecast analysis | 🟠 | Composable; no example |
| Contract renewal / churn outreach | 🟡 | Schedule + outreach pattern; no dedicated example |

### Marketing
| Use case | Depth | LangChain material |
|---|---|---|
| Content generation (blog/ad/email/social) | 🟡 | [Agents](https://docs.langchain.com/oss/python/langchain/agents) (generation is the core primitive) |
| SEO research / keyword clustering / content-gap | 🟢 | [Deep research agent](https://docs.langchain.com/oss/python/deepagents/deep-research) + [search tools](https://docs.langchain.com/oss/python/integrations/tools/tavily_search) |
| Social-listening / brand-sentiment monitoring | 🟠 | Monitor pattern; no example |
| Campaign brief writer + task filing | 🟠 | Workflow + tools; no example |
| Audience segmentation / personalization | 🟠 | Composable; no example |
| Influencer discovery & vetting | 🟡 | [Research agent](https://docs.langchain.com/oss/python/deepagents/deep-research) pattern |
| Marketing analytics / attribution | 🟠 | [SQL agent](https://docs.langchain.com/oss/python/langchain/sql-agent) over marketing data; no attribution example |
| Creative-variation / image resizing | ⚪ | Image generation/resizing outside the framework's remit |
| Ad-budget pacing / bid adjustment | ⚪ | Optimization-engine territory |
| Email A/B / multi-armed bandit | ⚪ | Statistical-optimization territory |

### Human Resources & People Ops
| Use case | Depth | LangChain material |
|---|---|---|
| Resume ranking / candidate-fit scoring | 🟠 | Classification + [structured output](https://docs.langchain.com/oss/python/langchain/structured-output); no dedicated tutorial (cf. Mastra's AI Recruiter) |
| Job-description / offer-letter writing | 🟡 | Agent generation + structured output |
| Employee self-service HR assistant | 🟢 | [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base) / [RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) over policy docs |
| Interview scheduling / candidate comms | 🟢 | [Personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) (calendar+email) pattern |
| Onboarding concierge (accounts/hardware) | 🟠 | Workflow orchestration + tools; no example |
| Employee-sentiment / pulse-survey analysis | 🟠 | Classification + summarization; no example |
| Exit-survey synthesis / theme clustering | 🟠 | Retrieval/clustering; no example |
| Internal gig / skills matching | 🟠 | Composable; no example |
| Skills-gap / learning recommendations | 🟠 | Composable; no example |
| Payroll issue detection | 🟠 | Monitor pattern; no example |
| Performance-review drafting | 🟡 | Agent generation; no dedicated example |

### Finance, Accounting & Procurement
| Use case | Depth | LangChain material |
|---|---|---|
| Regulatory / compliance-change monitoring (SEC scanning) | 🟡 | [Cron jobs](https://docs.langchain.com/langsmith/cron-jobs) + [search tools](https://docs.langchain.com/oss/python/integrations/tools/tavily_search) |
| Data extraction from filings / documents | 🔗 | Captide ("equity research"), WebToon ("data extraction") case studies |
| Financial research & summarization | 🔗 | Morningstar case study; [deep research](https://docs.langchain.com/oss/python/deepagents/deep-research) pattern |
| Credit underwriting / credit memos | 🟠 | RAG + structured output; no example |
| Ledger anomaly / discrepancy flagging | 🟠 | Monitor + tools; no example |
| Journal-entry drafting (accountant-in-loop) | 🟠 | [HITL](https://docs.langchain.com/oss/python/langchain/human-in-the-loop); no example |
| Invoice-to-PO / three-way matching | 🟠 | Workflow; no example |
| Expense-report processing | 🟠 | Workflow + structured output; no example |
| AR / collections agent | 🟠 | Outreach + schedule; no example |
| P&L root-cause analysis | 🟡 | [SQL agent](https://docs.langchain.com/oss/python/langchain/sql-agent) + [data analysis](https://docs.langchain.com/oss/python/deepagents/data-analysis) |
| Procurement (quote-to-requisition) | 🟠 | Workflow; no example |
| Supplier-risk monitoring (OFAC/health) | 🟡 | Scheduled watcher + search; no dedicated example |
| Fraud detection on transactions | 🟠 | Monitor pattern; no example (ML model = ⚪) |
| Audit / continuous controls monitoring | 🟠 | Monitor pattern; no example |
| Financial forecasting / variance analysis | ⚪ | Forecasting-model territory (narrative around it is 🟠) |

### IT, Software Engineering & DevOps (LangChain's strongest horizontal area)
| Use case | Depth | LangChain material |
|---|---|---|
| Code generation / completion / refactoring | 🟢 | [Deep Agents coding CLI](https://docs.langchain.com/oss/python/deepagents/code/overview); Replit, Qodo, GitLab, Uber, Vodafone case studies (🔗) |
| Automated code review (PR copilot) | 🟡 | Coding agent + [sandbox](https://docs.langchain.com/oss/python/deepagents/sandboxes) + structured output |
| Test generation / execution | 🟡 | Coding agent + [sandbox](https://docs.langchain.com/oss/python/deepagents/sandboxes) |
| Bug detection / reproduction / fix | 🟡 | Coding agent + workspace/sandbox |
| DevOps automation (REST-API agents) | 🔗 | Cisco Outshift ("ReAct agent for DevOps tasks") case study |
| Internal documentation Q&A / docs concierge | 🟢 | [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base), [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag), [knowledge base](https://docs.langchain.com/oss/python/langchain/knowledge-base) |
| Incident commander / runbook / postmortems | 🟠 | [Durable execution](https://docs.langchain.com/oss/python/langgraph/fault-tolerance) + tools; no example |
| CVE / vulnerability watcher | 🟡 | Scheduled watcher + search |
| Log analysis / root-cause | 🟠 | Composable; no example |
| IaC drafting / change review | 🟡 | Coding-agent pattern |
| IT helpdesk / password reset / provisioning | 🟡 | [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base) + tools |
| Data-pipeline / ETL error handling | 🟡 | [Fault tolerance / durability](https://docs.langchain.com/oss/python/langgraph/fault-tolerance) |
| Cloud-cost optimization / rightsizing | 🟠 | Composable; no example |
| APM / auto-remediation | 🟠 | Monitor + action; no example |

### Data & Analytics (BI)
| Use case | Depth | LangChain material |
|---|---|---|
| Natural-language querying of warehouses | 🟢 | [SQL agent](https://docs.langchain.com/oss/python/langchain/sql-agent), [SQL skills assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/skills-sql-assistant); LinkedIn text-to-SQL case study (🔗) |
| Automated report / narrative generation | 🟢 | [Data analysis agent](https://docs.langchain.com/oss/python/deepagents/data-analysis) (EDA + viz + share) |
| Dashboard-insight summarization | 🟡 | Data analysis agent + generation |
| Automated data tagging / cleaning / enrichment | 🟡 | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) extraction |
| Proactive anomaly detection + root-cause | 🟡 | [Alerts](https://docs.langchain.com/langsmith/alerts) + agent root-cause; no vertical example |
| KPI monitoring + next actions | 🟡 | Scheduled watcher + tools |
| Embedded analytics narrative layer | 🔗 | Monday, Pigment, Modern Treasury, Infor ("GenAI embedded product experiences") case studies |
| Data-catalog / metadata governance | 🟠 | Composable; no example |

### Legal, Risk & Compliance
| Use case | Depth | LangChain material |
|---|---|---|
| Legal research / case summarization | 🟢 | [Deep research](https://docs.langchain.com/oss/python/deepagents/deep-research) / [RAG](https://docs.langchain.com/oss/python/deepagents/rag) patterns |
| Contract review / clause red-flagging | 🔗/🟡 | Definely ("copilot for legal") case study (🔗); [RAG](https://docs.langchain.com/oss/python/langchain/retrieval) + [structured output](https://docs.langchain.com/oss/python/langchain/structured-output) with confidence |
| Regulatory / policy-change monitoring + memo | 🟡 | Scheduled watcher + search |
| E-discovery clustering / summarization | 🟡 | [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) (retrieve/offload/delegate over large corpora) |
| Contract drafting / redlining | 🟠 | Generation from templates; no example |
| Due-diligence / KYC document review | 🟠 | RAG + structured output; no example |
| Whistleblower intake / severity routing | 🟠 | Classification workflow; no example |
| Trademark / IP fuzzy-matching watch | 🟠 | Monitor pattern; no example |
| Privacy / DSAR handling | 🟡 | [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) / middleware for PII; no dedicated example |

### Administrative & Personal Productivity
| Use case | Depth | LangChain material |
|---|---|---|
| Research assistant / web-briefing agent | 🟢 | [Deep research agent](https://docs.langchain.com/oss/python/deepagents/deep-research) |
| Email triage / drafting / inbox summary | 🟢 | [Personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) (email agent + HITL) + [Gmail toolkit](https://docs.langchain.com/oss/python/integrations/tools/google_gmail) |
| Meeting scheduling / calendar mgmt | 🟢 | [Personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant) (calendar agent) |
| Document drafting / summarization / translation | 🟡 | Agent generation + middleware |
| Travel planning / booking | 🔗 | Docent Pro (travel) case study; [browser tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) |
| Task / project management | 🟡 | Tools + [Deep Agents planning/todo](https://docs.langchain.com/oss/python/deepagents/overview) |
| Note-taking / transcription / action items | 🟡 | [Voice](https://docs.langchain.com/oss/python/langchain/voice-agent) + summarization; no meeting-notes tutorial |
| Expense filing | 🟠 | Composable; no example |

### Knowledge Management & Training
| Use case | Depth | LangChain material |
|---|---|---|
| RAG-based internal Q&A | 🟢 | [Knowledge base](https://docs.langchain.com/oss/python/langchain/knowledge-base), [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval), [Agentic RAG](https://docs.langchain.com/oss/python/langgraph/agentic-rag), [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) |
| Virtual TA / tutor with citations | 🟢 | [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) (rubric-checked grounding + citations) |
| Enterprise search / discovery | 🔗 | Exa, Harmonic, Abu Dhabi Government, Vodafone case studies |
| Onboarding / skills-training content gen | 🟡 | Agent generation |
| Adaptive learning / study coach | 🟠 | [Long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory) to track learner; no example |
| Curriculum-gap analysis vs. standards | 🟠 | RAG + structured output; no example |

---

## Part 2 — Industry-specific (vertical) use cases

This is where in-docs *tutorials* thin out — but LangChain has one asset Mastra lacks: the
[**case-studies roster**](https://docs.langchain.com/oss/python/langgraph/case-studies), ~40 named
companies mapped to industry + use case (external blog/talk references). So many verticals get a
🔗 "someone shipped this" pointer even without an in-docs walkthrough. The framework still provides
the *parts*, not an assembled vertical product.

| Vertical | Best LangChain fit | Typical depth |
|---|---|---|
| **Healthcare** — clinical copilot, record summarization, triage | [RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base); Komodo Health, Vizient, OpenRecovery, City of Hope case studies (🔗) | 🔗/🟠 — real deployments referenced; no in-docs healthcare build. Radiology/pathology imaging = ⚪. |
| **Financial Services / Fintech** — copilot, research, extraction, support | BlackRock, J.P. Morgan, Klarna, Morningstar, Captide, Prosper, Rakuten case studies (🔗); [SQL agent](https://docs.langchain.com/oss/python/langchain/sql-agent), [guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) | 🔗 heaviest vertical in the roster. Fraud/risk-scoring *models* = ⚪. |
| **Retail & E-commerce** — support, embedded GenAI, product | Minimal, Rakuten, Monday case studies (🔗); [customer-support tutorial](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support) | 🔗/🟠. Dynamic pricing / demand forecasting = ⚪. |
| **Manufacturing & Industrial** — operator assistant, docs Q&A | [RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base); [alerts](https://docs.langchain.com/langsmith/alerts) | 🟠 for assistant. Vision defect detection / predictive-maintenance ML / digital twin = ⚪. |
| **Supply Chain & Logistics** — automation, coordination | C.H. Robinson case study (🔗); [workflows](https://docs.langchain.com/oss/python/langgraph/workflows-agents) | 🔗/🟠. Route-optimization solvers = ⚪. |
| **Energy & Utilities** — outage/crew coordination, emissions reporting | Monitor + workflows | 🟠 for reporting/dispatch coordination. Grid/load optimization + drone imagery = ⚪. |
| **Real Estate & Construction** — domain copilot, feasibility, permits | AppFolio, Rexera case studies (🔗); [browser tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) (permit portals), [search](https://docs.langchain.com/oss/python/integrations/tools/tavily_search) | 🔗/🟡 for copilot & portal/research tasks. BIM/drone progress = ⚪. |
| **Media & Entertainment** — data extraction, moderation, script coverage | WebToon case study (🔗); [guardrails](https://docs.langchain.com/oss/python/langchain/guardrails) (moderation) | 🔗/🟠. Video clipping/dubbing / NPC AI = ⚪. |
| **Education** — TA chatbot, learning paths, grading | [RAG with Deep Agents](https://docs.langchain.com/oss/python/deepagents/rag) (TA w/ citations) | 🟢 for TA chatbot; 🟠 for grading/paths. Proctoring vision = ⚪. |
| **Government & Public Sector** — citizen search, case mgmt, FOIA | Abu Dhabi Government case study (🔗); [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base) | 🔗/🟡 for citizen Q&A; 🟠 for case mgmt/FOIA. |
| **Agriculture** — market monitoring | Monitor for market data | 🟠 for market monitoring. Satellite/imagery/yield models = ⚪. |
| **Hospitality & Travel** — concierge, itinerary, embedded GenAI | Docent Pro case study (🔗); [personal assistant](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant), [browser tools](https://docs.langchain.com/oss/python/integrations/tools/bedrock_agentcore_browser) | 🔗/🟡. Yield/dynamic pricing = ⚪. |
| **Telecommunications** — code gen, internal search, troubleshooting | Vodafone case study (🔗); [RAG](https://docs.langchain.com/oss/python/langchain/knowledge-base) | 🔗/🟠. Network self-healing / fraud ML = ⚪. |
| **Professional Services & Consulting** — research synthesis, KB search, deliverable QA | Athena Intelligence case study (🔗); [deep research](https://docs.langchain.com/oss/python/deepagents/deep-research), [KB router](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base), [evals](https://docs.langchain.com/langsmith/evaluation) for QA | 🟡 — one of the closest verticals to shipped examples. |

---

## Specific use cases with NO dedicated LangChain example

These appear in the catalog but are **not** implemented by any LangChain tutorial. They split into
three groups.

### A. Buildable, no walkthrough (🟠 — primitives exist, you assemble them)

*Customer service:* knowledge-base auto-writer · smart upsell recommender · refund/return
adjudication · sentiment early-warning/churn.
*Sales:* proposal/quote/RFP generation · pipeline hygiene · deal-risk/forecast analysis · lead
scoring/routing (Unify shipped it, no in-docs build).
*Marketing:* social-listening · campaign-brief writer · audience segmentation · marketing
analytics/attribution.
*HR:* resume ranking (no tutorial, unlike Mastra) · onboarding concierge · pulse-survey analysis ·
exit-survey clustering · skills matching · skills-gap/learning recs · payroll issue detection.
*Finance:* credit underwriting/memos · ledger anomaly flagging · journal-entry drafting ·
invoice/three-way matching · expense-report processing · AR/collections · procurement
quote-to-requisition · audit/controls monitoring · transaction fraud (monitor part).
*IT/Data:* incident commander/runbook · log root-cause · cloud-cost optimization · APM
auto-remediation · data-catalog governance.
*Legal:* contract drafting/redlining · due-diligence/KYC review · whistleblower intake ·
trademark/IP watch.
*Admin:* expense filing · dedicated meeting-notes/transcription pipeline.
*Training:* adaptive study coach · curriculum-gap analysis.
*Verticals:* essentially every healthcare, manufacturing (assistant parts), logistics, energy
(reporting/dispatch), agriculture (market monitoring), and government (case mgmt/FOIA) use case not
explicitly 🟢/🟡/🔗 above.

### B. Referenced only as a case study (🔗 — real deployment, external link, no in-docs build)

Financial-services copilots (BlackRock, J.P. Morgan, Klarna) · financial research (Morningstar) ·
equity-research data extraction (Captide) · legal copilot (Definely) · healthcare copilots (Komodo
Health, Vizient, OpenRecovery, City of Hope) · logistics automation (C.H. Robinson) · real-estate
copilots (AppFolio, Rexera) · travel embedded GenAI (Docent Pro) · e-commerce support (Minimal) ·
government search (Abu Dhabi) · telecom (Vodafone) · media data extraction (WebToon) · SDR/outreach
(11x, Unify) · embedded analytics (Monday, Pigment, Modern Treasury). These prove the pattern in a
vertical but give you a blog post, not a code walkthrough.

### C. Out of scope for an LLM-agent framework (⚪ — needs vision/ML/optimization, not agents)

- Creative-variation/image resizing; automated video/podcast clipping, captioning, dubbing
- Ad-budget pacing / bid adjustment; email A/B multi-armed-bandit optimization
- Financial forecasting/budgeting *models*; dynamic pricing / markdown optimization; demand
  forecasting; yield management
- Vision-based quality control / defect detection; radiology/pathology image pre-screening
- Predictive-maintenance ML; digital-twin simulation; route-optimization solvers
- Load-shift/battery/grid optimization; drone/sensor imagery analysis; BIM progress checking
- Crop/soil/pest detection from imagery; yield prediction models
- Proctoring / exam-integrity vision; network self-healing & fraud-scoring ML models

> Note: LangChain can still *orchestrate* these — wrap an external vision/ML/optimization service as
> a [tool](https://docs.langchain.com/oss/python/langchain/tools) and reason over the result. What it
> doesn't provide is the model itself, and it ships no example wiring one up.

---

## Coverage summary

| Depth | Count (approx.) | Reading |
|---|---|---|
| 🟢 Dedicated tutorial | ~20 use cases | Concentrated in: code agents, RAG/docs Q&A, deep research, data analysis/NL-SQL, customer-support state machine, personal assistant (calendar/email), voice, multi-agent orchestration. |
| 🟡 Direct capability | ~35 use cases | The capability patterns + anything "monitor/alert," "scheduled," "structured extraction," "eval/QA," "HITL approval," or "guardrail" flavored. |
| 🔗 Case study only | ~25 companies / ~15 verticals | LangChain's differentiator — real named deployments across finance, healthcare, legal, logistics, real estate, telecom, media, government, travel — but as external references, not in-docs builds. |
| 🟠 Composable, no example | ~60+ use cases | The long tail of horizontal functions and most verticals' internals. |
| ⚪ Out of scope | ~20 use cases | Vision, forecasting/pricing/optimization ML, media transcoding. |

**Bottom line for the course:** LangChain covers the *agentic capability patterns* (Part 3)
essentially completely and at good depth, and ships strong end-to-end tutorials in **software
engineering (deep-agent coding), RAG / knowledge Q&A, deep research, data analysis & NL-SQL,
customer support, and personal-assistant orchestration (calendar/email + HITL)**. Its distinctive
edge over a pure-framework catalog is the **case-studies roster** — proof that finance, healthcare,
legal, logistics, real-estate, telecom, media, and government teams have shipped these use cases on
LangGraph — even though those verticals have **no in-docs walkthrough**. As with Mastra, industry
*internals* are almost entirely "compose the primitives yourself," and the vision/ML/optimization
slice of the catalog sits outside the framework's remit.

### LangChain vs. Mastra at a glance

- **Both** cover Part 3 capability patterns thoroughly and ship concrete examples for code, RAG/docs
  Q&A, research, and multi-agent orchestration.
- **Mastra** has dedicated tutorials LangChain lacks (resume screening / AI Recruiter, meeting-notes
  template, WhatsApp/Slack channel bots) and first-class *scheduling/signals* primitives in-core.
- **LangChain** has dedicated tutorials Mastra lacks (SQL agent, data-analysis agent, customer-
  support state machine, calendar+email personal assistant, agentic-RAG/rubric grounding, voice) and
  a far larger *tool-integration catalog* plus the *case-studies roster* of real vertical deployments.
- **Neither** provides vertical walkthroughs for most industries, and both exclude the
  vision/ML/optimization-model use cases (usable only by wrapping an external service as a tool).
</content>
</invoke>
