# Mastra Coverage of Agent Use Cases

A mapping of the use cases catalogued in [every-use-case.md](every-use-case.md) to concrete
material in the [Mastra](https://mastra.ai) documentation — guides, templates, and capability
docs — with an assessment of how deeply each is covered.

## How to read this

Mastra is a **TypeScript agent framework**, not a library of turnkey vertical solutions. Its
documentation is organized around *capabilities and patterns* (agents, tools, workflows, memory,
RAG, voice, browser, evals, human-in-the-loop, scheduling) rather than around industries. So the
honest picture is:

- A **small set of concrete end-to-end guides and templates** implement specific named use cases
  (resume screening, meeting notes, code review, docs Q&A, etc.).
- A **larger set of capability docs** directly enable whole *classes* of use cases with generic
  examples you adapt to a vertical.
- Most **industry-specific (vertical) use cases have no dedicated example** — they are "buildable"
  by composing the primitives, but Mastra ships no walkthrough for them.
- A few use cases in the catalog are **out of scope** for an LLM-agent framework entirely (computer
  vision defect detection, drone imagery, ML forecasting models, dynamic pricing engines).

### Depth legend

| Symbol | Meaning |
|---|---|
| 🟢 **Dedicated** | A Mastra guide or template implements essentially this exact use case end-to-end. |
| 🟡 **Capability** | A framework feature/pattern doc directly enables it with a generic (non-vertical) example. |
| 🟠 **Composable** | No example, but the needed primitives exist and are documented; you assemble them. |
| ⚪ **Out of scope** | Not something an LLM-agent framework provides (vision/ML-model/pricing-engine territory). |

---

## Part 0 — The concrete guides & templates (the anchor examples)

These are the end-to-end walkthroughs and starter templates Mastra actually ships. Everything else
in this document maps back to these plus the capability docs.

### Tutorial guides

| Guide | What it builds | Anchors these catalog use cases |
|---|---|---|
| [Chef Michel](https://mastra.ai/guides/guide/chef-michel) | Basic single agent with instructions | Any assistant/copilot pattern |
| [Stock Agent](https://mastra.ai/guides/guide/stock-agent) | Agent that calls a data tool | Tool-calling foundation |
| [Web Search](https://mastra.ai/guides/guide/web-search) | Agent with web search | Research/browsing agents |
| [Firecrawl](https://mastra.ai/guides/guide/firecrawl) | Web scraping into an agent | Research, lead enrichment, site-feasibility |
| [AI Recruiter](https://mastra.ai/guides/guide/ai-recruiter) | Workflow that screens candidates | **Resume ranking / candidate-fit** |
| [Research Assistant](https://mastra.ai/guides/guide/research-assistant) | RAG over documents | **RAG internal Q&A, research synthesis** |
| [Research Coordinator](https://mastra.ai/guides/guide/research-coordinator) | Supervisor delegating to sub-agents | **Orchestrator / multi-agent** |
| [Coding Agent](https://mastra.ai/guides/guide/coding-agent) | Plan/write/run code | **Code agents** |
| [Code Review Bot](https://mastra.ai/guides/guide/code-review-bot) | Reviews code changes | **Automated code review** |
| [Dev Assistant](https://mastra.ai/guides/guide/dev-assistant) | Workspace-backed dev helper | IT/engineering copilot |
| [Docs Manager](https://mastra.ai/guides/guide/docs-manager) | Filesystem doc management | Docs concierge, KB upkeep |
| [GitHub Actions: PR Description](https://mastra.ai/guides/guide/github-actions-pr-description) | CI-triggered agent | DevOps automation |
| [Slack Assistant](https://mastra.ai/guides/guide/slack-assistant) | Slack-channel agent | Support/IT/HR chat surface |
| [WhatsApp Chat Bot](https://mastra.ai/guides/guide/whatsapp-chat-bot) | Messaging bot | Conversational support/commerce |
| [Notes MCP Server](https://mastra.ai/guides/guide/notes-mcp-server) / [Publishing an MCP Server](https://mastra.ai/guides/guide/publishing-mcp-server) | Build & ship MCP tools | Tool/integration plumbing |
| [CI Signal Provider](https://mastra.ai/guides/guide/signal-provider) | Event-driven agent trigger | Monitor-and-alert plumbing |

### Starter templates (`npx create-mastra --template <name>`)

| Template | What it implements | Anchors these catalog use cases |
|---|---|---|
| `template-docs-expert` | Docs Q&A: web search + citations + memory + structured output | **Docs concierge, virtual TA with citations, citizen-service assistant** |
| `template-company-knowledge` | Indexes Linear + Notion into pgvector for internal Q&A | **RAG internal Q&A, KB search across engagements** |
| `template-meeting-notes` | Zoom transcript / audio → notes, decisions, action items | **Meeting transcription & action items, call summarization** |
| `template-browser-agent` | AgentBrowser to browse/inspect/act on web pages | **Computer-use / GUI agents, permit-status tracking** |
| `template-claw-assistant` | General workspace agent (filesystem + sandbox + browser + search) | **Personal-assistant / research agents** |

---

## Part 3 — Agentic capability patterns (Mastra's strongest coverage)

Mastra maps most directly to the cross-cutting patterns. Nearly all are covered at the 🟢/🟡 level.

| Pattern | Depth | Mastra docs |
|---|---|---|
| Monitor-and-alert agents | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows), [Schedules](https://mastra.ai/docs/long-running-agents/schedules), [Signals](https://mastra.ai/docs/long-running-agents/signals) + [Signal Providers](https://mastra.ai/docs/long-running-agents/signal-providers), [Background Tasks](https://mastra.ai/docs/long-running-agents/background-tasks) |
| Research / browsing agents | 🟢 | [Web Search](https://mastra.ai/guides/guide/web-search), [Research Assistant](https://mastra.ai/guides/guide/research-assistant), [Browser overview](https://mastra.ai/docs/browser/overview), `template-claw-assistant` |
| Orchestrator / multi-agent | 🟢 | [Supervisor Agents](https://mastra.ai/docs/agents/supervisor-agents), [Research Coordinator](https://mastra.ai/guides/guide/research-coordinator), [Multi-agent systems](https://mastra.ai/guides/concepts/multi-agent-systems), [A2A](https://mastra.ai/docs/agents/a2a) |
| Workflow-automation agents | 🟢 | [Workflows overview](https://mastra.ai/docs/workflows/overview), [Control Flow](https://mastra.ai/docs/workflows/control-flow), [Agents and Tools in workflows](https://mastra.ai/docs/workflows/agents-and-tools) |
| Copilot / assistant agents | 🟢 | [Agents overview](https://mastra.ai/docs/agents/overview), UI guides ([CopilotKit](https://mastra.ai/guides/build-your-ui/copilotkit/overview), [Assistant UI](https://mastra.ai/guides/build-your-ui/assistant-ui), [AI SDK UI](https://mastra.ai/guides/build-your-ui/ai-sdk-ui)) |
| Autonomous-transaction agents (within guardrails) | 🟡 | [Guardrails](https://mastra.ai/docs/agents/guardrails), [Agent Approval](https://mastra.ai/docs/agents/agent-approval), [Durable Agents](https://mastra.ai/docs/long-running-agents/durable-agents) |
| Human-in-the-loop review agents | 🟢 | [Human-in-the-loop workflows](https://mastra.ai/docs/workflows/human-in-the-loop), [Suspend and Resume](https://mastra.ai/docs/workflows/suspend-and-resume), [Tool Approvals](https://mastra.ai/docs/agent-controller/tool-approvals) |
| Simulation / planning agents | 🟠 | [Goals](https://mastra.ai/docs/long-running-agents/goals), [submitPlanTool](https://mastra.ai/reference/tools/submit-plan-tool) — planning primitives, no what-if simulation example |
| Computer-use / GUI agents | 🟢 | [AgentBrowser](https://mastra.ai/docs/browser/agent-browser), [Stagehand](https://mastra.ai/docs/browser/stagehand), `template-browser-agent` |
| Personal-assistant agents | 🟢 | `template-claw-assistant`, [Working Memory](https://mastra.ai/docs/memory/working-memory), [Channels](https://mastra.ai/docs/capabilities/channels/overview) |
| Voice agents | 🟢 | [Voice overview](https://mastra.ai/docs/voice/overview), [Speech-to-Speech](https://mastra.ai/docs/voice/speech-to-speech), [LiveKit](https://mastra.ai/docs/voice/livekit) |
| Code agents | 🟢 | [Coding Agent](https://mastra.ai/guides/guide/coding-agent), [createCodingAgent()](https://mastra.ai/reference/coding-agent/create-coding-agent), [Workspace](https://mastra.ai/docs/workspace/overview) + [Sandbox](https://mastra.ai/docs/workspace/sandbox) |

---

## Part 1 — Cross-functional (horizontal) use cases

### Customer Service & Support
| Use case | Depth | Mastra material |
|---|---|---|
| Tier-1 support bot w/ confidence + escalation | 🟡 | [Slack Assistant](https://mastra.ai/guides/guide/slack-assistant), [Channels](https://mastra.ai/docs/capabilities/channels/overview), [Human-in-the-loop](https://mastra.ai/docs/workflows/human-in-the-loop) for escalation |
| Live-chat / voice IVR deflection | 🟡 | [Voice overview](https://mastra.ai/docs/voice/overview), [Speech-to-Speech](https://mastra.ai/docs/voice/speech-to-speech), [LiveKit](https://mastra.ai/docs/voice/livekit) |
| Conversation-QA auditor / scoring & leaderboards | 🟡 | [Evals overview](https://mastra.ai/docs/evals/overview), [Multi-turn Evals](https://mastra.ai/docs/evals/multi-turn), [Built-in Scorers](https://mastra.ai/docs/evals/built-in-scorers) |
| Knowledge-base auto-writer from tickets | 🟠 | [Docs Manager](https://mastra.ai/guides/guide/docs-manager) + [Structured Output](https://mastra.ai/docs/agents/structured-output) |
| Ticket triage / routing / tagging | 🟠 | [Workflows](https://mastra.ai/docs/workflows/overview) + [Structured Output](https://mastra.ai/docs/agents/structured-output) (classification) |
| Post-interaction summarization / CRM notes | 🟡 | [template-meeting-notes](https://mastra.ai/reference/templates/overview), [summarizeConversation()](https://mastra.ai/reference/memory/summarizeConversation) |
| Multilingual support / translation | 🟡 | [LanguageDetector](https://mastra.ai/reference/processors/language-detector) processor + agent generation |
| Proactive outreach (renewals, outages) | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows), [Signals](https://mastra.ai/docs/long-running-agents/signals) |
| Smart upsell / cross-sell recommender | 🟠 | Composable (tools + memory); no example |
| Automated refund / return adjudication | 🟠 | [Human-in-the-loop](https://mastra.ai/docs/workflows/human-in-the-loop) + [Guardrails](https://mastra.ai/docs/agents/guardrails); no example |
| Sentiment early-warning / churn signals | 🟠 | Monitor pattern ([Signals](https://mastra.ai/docs/long-running-agents/signals)); no example |

### Sales & Revenue
| Use case | Depth | Mastra material |
|---|---|---|
| Lead enrichment from external data | 🟡 | [Firecrawl](https://mastra.ai/guides/guide/firecrawl), [Bright Data Tools](https://mastra.ai/reference/tools/brightdata) |
| SDR / outbound drafting & personalization | 🟠 | Agent + [Working Memory](https://mastra.ai/docs/memory/working-memory); no example |
| Sales-call transcription & next-steps | 🟢 | [template-meeting-notes](https://mastra.ai/reference/templates/overview) |
| Proposal / quote / RFP generation | 🟠 | [RAG](https://mastra.ai/docs/rag/overview) + [Structured Output](https://mastra.ai/docs/agents/structured-output); no example |
| Meeting scheduling / calendar coordination | 🟠 | Tools + [Schedules](https://mastra.ai/docs/long-running-agents/schedules); no example |
| Lead scoring/qualification/routing | 🟠 | Similar to [AI Recruiter](https://mastra.ai/guides/guide/ai-recruiter) scoring pattern; no dedicated example |
| Pipeline hygiene / CRM data quality | 🟠 | Composable; no example |
| Deal-risk / forecast analysis | 🟠 | Composable; no example |
| Contract renewal / churn outreach | 🟠 | Monitor + outreach pattern; no example |

### Marketing
| Use case | Depth | Mastra material |
|---|---|---|
| Content generation (blog/ad/email/social) | 🟡 | [Agents overview](https://mastra.ai/docs/agents/overview) (generation is the core primitive) |
| SEO research / keyword clustering / content-gap | 🟡 | [Web Search](https://mastra.ai/guides/guide/web-search), [Perplexity](https://mastra.ai/reference/tools/perplexity)/[Tavily](https://mastra.ai/reference/tools/tavily) tools |
| Social-listening / brand-sentiment monitoring | 🟠 | Monitor pattern; no example |
| Campaign brief writer + task filing | 🟠 | Workflow + tools; no example |
| Creative-variation / resizing | ⚪ | Image generation/resizing is outside the framework's remit |
| Ad-budget pacing / bid adjustment | ⚪ | Optimization engine territory, not agent-framework |
| Email A/B / multi-armed bandit | ⚪ | Statistical-optimization territory |
| Audience segmentation / personalization | 🟠 | Composable; no example |
| Influencer discovery & vetting | 🟠 | Research pattern; no example |
| Marketing analytics / attribution | 🟠 | Composable; no example |

### Human Resources & People Ops
| Use case | Depth | Mastra material |
|---|---|---|
| Resume ranking / candidate-fit scoring | 🟢 | [AI Recruiter](https://mastra.ai/guides/guide/ai-recruiter) — dedicated workflow tutorial |
| Job-description / offer-letter writing | 🟡 | Agent generation + [Structured Output](https://mastra.ai/docs/agents/structured-output) |
| Employee self-service HR assistant | 🟡 | [Slack Assistant](https://mastra.ai/guides/guide/slack-assistant) + [RAG](https://mastra.ai/docs/rag/overview) over policy docs |
| Interview scheduling / candidate comms | 🟠 | Tools + schedules; no example |
| Onboarding concierge (accounts/hardware) | 🟠 | Workflow orchestration; no example |
| Employee-sentiment / pulse-survey analysis | 🟠 | Classification + summarization; no example |
| Exit-survey synthesis / theme clustering | 🟠 | [GraphRAG](https://mastra.ai/docs/rag/graph-rag) clustering; no example |
| Internal gig / skills matching | 🟠 | Composable; no example |
| Skills-gap / learning recommendations | 🟠 | Composable; no example |
| Payroll issue detection | 🟠 | Monitor pattern; no example |
| Performance-review drafting | 🟡 | Agent generation; no dedicated example |

### Finance, Accounting & Procurement
| Use case | Depth | Mastra material |
|---|---|---|
| Regulatory / compliance-change monitoring (e.g. SEC scanning) | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows) + [Web Search](https://mastra.ai/guides/guide/web-search) |
| Ledger anomaly / discrepancy flagging | 🟠 | Monitor + tools; no example |
| Journal-entry drafting (accountant-in-loop) | 🟠 | [Human-in-the-loop](https://mastra.ai/docs/workflows/human-in-the-loop); no example |
| Credit underwriting / credit memos | 🟠 | RAG + structured output; no example |
| Invoice-to-PO / three-way matching | 🟠 | Workflow; no example |
| Expense-report processing | 🟠 | Workflow + structured output; no example |
| AR / collections agent | 🟠 | Outreach + schedule; no example |
| Financial forecasting / variance analysis | ⚪ | Forecasting-model territory (though narrative *around* it is 🟠) |
| P&L root-cause analysis | 🟠 | Composable; no example |
| Procurement (quote-to-requisition) | 🟠 | Workflow; no example |
| Supplier-risk monitoring (OFAC/health) | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows) + search tools |
| Fraud detection on transactions | 🟠 | Monitor pattern; no example |
| Audit / continuous controls monitoring | 🟠 | Monitor pattern; no example |

### IT, Software Engineering & DevOps (Mastra's second-strongest area)
| Use case | Depth | Mastra material |
|---|---|---|
| Code generation / completion / refactoring | 🟢 | [Coding Agent](https://mastra.ai/guides/guide/coding-agent), [createCodingAgent()](https://mastra.ai/reference/coding-agent/create-coding-agent) |
| Automated code review (PR copilot) | 🟢 | [Code Review Bot](https://mastra.ai/guides/guide/code-review-bot), [GitHub Actions PR Description](https://mastra.ai/guides/guide/github-actions-pr-description) |
| Internal documentation Q&A / docs concierge | 🟢 | [template-docs-expert](https://mastra.ai/reference/templates/overview), [Docs Manager](https://mastra.ai/guides/guide/docs-manager) |
| Test generation / execution | 🟡 | [Coding Agent](https://mastra.ai/guides/guide/coding-agent) + [Sandbox](https://mastra.ai/docs/workspace/sandbox) |
| Bug detection / reproduction / fix | 🟡 | [Coding Agent](https://mastra.ai/guides/guide/coding-agent) + [Workspace](https://mastra.ai/docs/workspace/overview) |
| Incident commander / runbook / postmortems | 🟡 | [Signals](https://mastra.ai/docs/long-running-agents/signals) + [Durable Agents](https://mastra.ai/docs/long-running-agents/durable-agents) |
| CVE / vulnerability watcher | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows) + search |
| Log analysis / root-cause | 🟠 | Composable; no example |
| IaC drafting / change review | 🟡 | [Coding Agent](https://mastra.ai/guides/guide/coding-agent) pattern |
| IT helpdesk / password reset / provisioning | 🟡 | [Slack Assistant](https://mastra.ai/guides/guide/slack-assistant) + tools |
| Data-pipeline / ETL error handling | 🟡 | [Error Handling](https://mastra.ai/docs/workflows/error-handling) + [Signals](https://mastra.ai/docs/long-running-agents/signals) |
| Cloud-cost optimization / rightsizing | 🟠 | Composable; no example |
| APM / auto-remediation | 🟠 | Monitor + action; no example |

### Data & Analytics (BI)
| Use case | Depth | Mastra material |
|---|---|---|
| Natural-language querying of warehouses | 🟠 | Tools ([createTool()](https://mastra.ai/reference/tools/create-tool)) + structured output; no example |
| Automated report / narrative generation | 🟡 | Agent generation + workflows |
| Proactive anomaly detection + root-cause | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows) + [Signals](https://mastra.ai/docs/long-running-agents/signals) |
| Automated data tagging / cleaning / enrichment | 🟡 | [Structured Output](https://mastra.ai/docs/agents/structured-output), [ExtractParams](https://mastra.ai/reference/rag/extract-params) |
| KPI monitoring + next actions | 🟡 | Monitor pattern (Schedules/Signals) |
| Dashboard-insight summarization | 🟠 | Composable; no example |
| Embedded analytics narrative layer | 🟠 | Composable; no example |
| Data-catalog / metadata governance | 🟠 | Composable; no example |

### Legal, Risk & Compliance
| Use case | Depth | Mastra material |
|---|---|---|
| Contract review / clause red-flagging | 🟡 | [RAG](https://mastra.ai/docs/rag/overview) + [Structured Output](https://mastra.ai/docs/agents/structured-output) with confidence |
| Legal research / case summarization | 🟢 | [Research Assistant](https://mastra.ai/guides/guide/research-assistant) pattern (RAG) |
| Regulatory / policy-change monitoring + memo | 🟡 | [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows) + search |
| Contract drafting / redlining | 🟠 | Agent generation from templates; no example |
| E-discovery clustering / summarization | 🟡 | [GraphRAG](https://mastra.ai/docs/rag/graph-rag) |
| Due-diligence / KYC document review | 🟠 | RAG + structured output; no example |
| Whistleblower intake / severity routing | 🟠 | Classification workflow; no example |
| Trademark / IP fuzzy-matching watch | 🟠 | Monitor pattern; no example |
| Privacy / DSAR handling | 🟡 | [PIIDetector](https://mastra.ai/reference/processors/pii-detector) processor |

### Administrative & Personal Productivity
| Use case | Depth | Mastra material |
|---|---|---|
| Research assistant / web-briefing agent | 🟢 | [Web Search](https://mastra.ai/guides/guide/web-search), `template-claw-assistant` |
| Note-taking / transcription / action items | 🟢 | [template-meeting-notes](https://mastra.ai/reference/templates/overview) |
| Document drafting / summarization / translation | 🟡 | Agent generation + processors |
| Email triage / drafting / inbox summary | 🟠 | Tools + memory; no example (Gmail via MCP) |
| Meeting scheduling / calendar mgmt | 🟠 | Tools + schedules; no example |
| Travel planning / booking | 🟠 | [Browser agent](https://mastra.ai/docs/browser/overview) + tools; no example |
| Task / project management | 🟡 | [Task tools](https://mastra.ai/reference/tools/task-tools), tool integrations |
| Expense filing | 🟠 | Composable; no example |

### Knowledge Management & Training
| Use case | Depth | Mastra material |
|---|---|---|
| RAG-based internal Q&A | 🟢 | [Research Assistant](https://mastra.ai/guides/guide/research-assistant), [template-company-knowledge](https://mastra.ai/reference/templates/overview), [RAG overview](https://mastra.ai/docs/rag/overview) |
| Virtual TA / tutor with citations | 🟢 | [template-docs-expert](https://mastra.ai/reference/templates/overview) (citations + memory) |
| Onboarding / skills-training content gen | 🟡 | Agent generation |
| Adaptive learning / study coach | 🟠 | [Working Memory](https://mastra.ai/docs/memory/working-memory) to track learner; no example |
| Curriculum-gap analysis vs. standards | 🟠 | RAG + structured output; no example |

---

## Part 2 — Industry-specific (vertical) use cases

This is where Mastra's *examples* thin out sharply. Almost none of the vertical use cases have a
dedicated walkthrough; the framework provides the parts, not the assembled vertical product.
Representative assessment (the pattern repeats across every industry):

| Vertical | Best Mastra fit | Typical depth |
|---|---|---|
| **Healthcare** — clinical scribe, record summarization, triage intake | [template-meeting-notes](https://mastra.ai/reference/templates/overview) (scribe-like), [RAG](https://mastra.ai/docs/rag/overview), [PIIDetector](https://mastra.ai/reference/processors/pii-detector) | 🟠 Composable — no healthcare example. Radiology/pathology imaging = ⚪ out of scope. |
| **Financial Services** — fraud, AML/KYC, claims, underwriting | Monitor pattern ([Signals](https://mastra.ai/docs/long-running-agents/signals)), RAG, [Guardrails](https://mastra.ai/docs/agents/guardrails) | 🟠 Composable. Photo damage assessment / risk-scoring models = ⚪. |
| **Retail & E-commerce** — conversational shopping, catalog enrichment, reviews | [WhatsApp Bot](https://mastra.ai/guides/guide/whatsapp-chat-bot), [Structured Output](https://mastra.ai/docs/agents/structured-output) | 🟠 Composable. Dynamic pricing / demand forecasting = ⚪. |
| **Manufacturing** — operator assistant, predictive maintenance, digital twin | RAG assistant; [Signals](https://mastra.ai/docs/long-running-agents/signals) for alerts | 🟠 for assistant. Vision defect detection / predictive-maintenance ML / digital-twin sim = ⚪. |
| **Supply Chain & Logistics** — route planning, ETA messaging, customs docs | Workflows, [Scheduled Workflows](https://mastra.ai/docs/workflows/scheduled-workflows), tools | 🟠 Composable. Route optimization solvers = ⚪. |
| **Energy & Utilities** — outage forecasting, crew dispatch, emissions reporting | Monitor + workflows | 🟠 for reporting/dispatch coordination. Load-shift/grid optimization + drone imagery = ⚪. |
| **Real Estate & Construction** — listing generation, permit tracking, feasibility packets | [Browser agent](https://mastra.ai/docs/browser/overview) (permit portals), [Firecrawl](https://mastra.ai/guides/guide/firecrawl) (feasibility research) | 🟡 for portal/research tasks; 🟠 for the rest. BIM/drone progress = ⚪. |
| **Media & Entertainment** — script coverage, clipping/captioning, moderation | Agent generation; [ModerationProcessor](https://mastra.ai/reference/processors/moderation-processor) | 🟡 moderation; 🟠 script coverage. Video clipping/dubbing/NPC AI = ⚪. |
| **Education** — TA chatbot, grading, learning paths | [template-docs-expert](https://mastra.ai/reference/templates/overview) (TA w/ citations) | 🟢 for TA chatbot; 🟠 for grading/paths. Proctoring vision = ⚪. |
| **Government** — citizen-service assistant, FOIA processing, case management | [template-docs-expert](https://mastra.ai/reference/templates/overview), RAG, workflows | 🟡 for citizen Q&A; 🟠 for the rest. |
| **Agriculture** — market monitoring; crop/pest detection | Monitor for market data | 🟠 for market monitoring. Satellite/imagery/yield models = ⚪. |
| **Hospitality & Travel** — concierge, itinerary, review analysis | [WhatsApp Bot](https://mastra.ai/guides/guide/whatsapp-chat-bot), [Browser agent](https://mastra.ai/docs/browser/overview), review classification | 🟡/🟠. Yield/dynamic pricing = ⚪. |
| **Telecommunications** — troubleshooting, churn, SIM-swap fraud | RAG assistant; monitor pattern | 🟠 Composable. Network self-healing / fraud ML = ⚪. |
| **Professional Services & Consulting** — proposals, research synthesis, KB search, deliverable QA | [Research Assistant](https://mastra.ai/guides/guide/research-assistant), [template-company-knowledge](https://mastra.ai/reference/templates/overview), [Evals](https://mastra.ai/docs/evals/overview) for QA | 🟡 — closest vertical to Mastra's shipped examples. |

---

## Specific use cases with NO dedicated Mastra example

These appear in the catalog but are **not** implemented by any Mastra guide or template. They split
into two groups.

### A. Buildable but no walkthrough (🟠 — primitives exist, you assemble them)

*Customer service:* smart upsell recommender · automated refund/return adjudication · sentiment
early-warning / churn.
*Sales:* SDR outbound drafting · proposal/quote/RFP generation · meeting scheduling · lead
scoring/routing · pipeline hygiene · deal-risk/forecast analysis · renewal/churn outreach.
*Marketing:* social-listening · campaign-brief writer · audience segmentation · influencer
discovery · marketing analytics/attribution.
*HR:* interview scheduling · onboarding concierge · pulse-survey analysis · exit-survey clustering ·
skills matching · skills-gap/learning recs · payroll issue detection.
*Finance:* ledger anomaly flagging · journal-entry drafting · credit underwriting/memos ·
invoice/three-way matching · expense-report processing · AR/collections · P&L root-cause ·
procurement quote-to-requisition · transaction fraud · audit/controls monitoring.
*IT/Data:* log root-cause · cloud-cost optimization · APM auto-remediation · NL warehouse querying ·
dashboard-insight summarization · embedded-analytics narrative · data-catalog governance.
*Legal:* contract drafting/redlining · due-diligence/KYC review · whistleblower intake ·
trademark/IP watch.
*Admin:* email triage/drafting · calendar management · travel booking · expense filing.
*Training:* adaptive study coach · curriculum-gap analysis.
*Verticals:* essentially every healthcare, financial-services, retail, manufacturing (assistant
parts), logistics, energy (reporting/dispatch), real-estate, media (script coverage),
government (case mgmt/FOIA), agriculture (market monitoring), telecom, and professional-services
use case not explicitly listed as 🟢/🟡 above.

### B. Out of scope for an LLM-agent framework (⚪ — needs vision/ML/optimization, not agents)

- Creative-variation/image resizing; automated video/podcast clipping, captioning, dubbing
- Ad-budget pacing / bid adjustment; email A/B multi-armed-bandit optimization
- Financial forecasting/budgeting *models* (the narrative around them is buildable; the model isn't)
- Dynamic pricing / markdown optimization; demand forecasting; yield management
- Vision-based quality control / defect detection; radiology/pathology image pre-screening
- Predictive-maintenance ML; digital-twin simulation; route-optimization solvers
- Load-shift/battery/grid optimization; drone/sensor imagery analysis; BIM progress checking
- Crop/soil/pest detection from imagery; yield prediction models
- Proctoring / exam-integrity vision; network self-healing & fraud-scoring ML models

> Note: Mastra can still *orchestrate* these — call an external vision/ML/optimization service as a
> [tool](https://mastra.ai/reference/tools/create-tool) and reason over the result. What it doesn't
> provide is the model itself, and it ships no example wiring one up.

---

## Coverage summary

| Depth | Count (approx.) | Reading |
|---|---|---|
| 🟢 Dedicated example | ~18 use cases | Concentrated in: code (agent/review/PR), RAG/docs Q&A, research/multi-agent, meeting notes, resume screening, TA-with-citations, personal/browser assistants. |
| 🟡 Direct capability | ~35 use cases | Mostly the capability patterns + anything that is "monitor," "voice," "channel-deployed chat," "structured extraction," "eval/QA," or "HITL approval" flavored. |
| 🟠 Composable, no example | ~70+ use cases | The long tail of horizontal functions and nearly all verticals. |
| ⚪ Out of scope | ~20 use cases | Vision, forecasting/pricing/optimization ML, media transcoding. |

**Bottom line for the course:** Mastra covers the *agentic capability patterns* (Part 3)
essentially completely and at good depth, and ships strong end-to-end examples in a handful of
horizontal areas — **software engineering, knowledge Q&A/RAG, research & multi-agent orchestration,
meeting notes, and recruiting**. Coverage of *industry-specific* use cases is almost entirely at the
"compose the primitives yourself" level, with no vertical walkthroughs, and a meaningful slice of
the catalog (vision/ML/optimization) sits outside the framework's remit altogether.
