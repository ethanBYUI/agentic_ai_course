# Agentic AI Course

Welcome to the **Agentic AI Course**, a hands-on program designed to teach you how to design, build, and scale agentic AI systems using modern LLM frameworks and tooling.  

---

## Course Objectives

By the end of this course, students will be able to:

- Design, diagram, implement, evaluate, productize, and scale agentic AI systems.
- Identify and evaluate problems suitable for agentic AI solutions versus traditional software or non-agentic LLM approaches.
- Clearly define Agentic AI and related concepts, including agents, tools, planning, grounding, orchestration, evaluation, and human-in-the-loop workflows.
- Develop ethical guidelines for the use of LLMs and agentic AI, including responsible data usage, AI governance principles, safety, privacy, and organizational policies.
- Independently learn, evaluate, and adapt to new AI models, tools, and paradigms in a rapidly evolving AI ecosystem.

---

## Module Setup

### Module 1: Setup and Intro to LLM Programming (Weeks 1–2)
**Topics:**
- Gemini APIs and SDKs  
- Prompting vs structured outputs  
- Determinism, temperature, schemas  
- Function calling basics  

**Project:** Build a single-task Gemini agent (e.g., document summarizer, code reviewer, tutor)

---

### Module 2: Prompt Engineering → Agent Design (Week 3)
**Topics:**
- System vs user vs tool prompts  
- Memory types (short term vs long term)  
- Instruction hierarchies  
- Role-based prompting  

**Project:** Convert the single-task agent into a multi-step reasoning agent

---

### Module 3: Structure, State, and Diagramming (Week 4)
**Topics:**
- Agent loops  
- State machines  
- DAGs vs planners  
- Mermaid / architecture diagrams  

**Project:** Design and implement a stateful agent workflow with diagrams

---

### Module 4: Agent Orchestration and Planning (Week 5)
**Topics:**
- ReAct, Plan-Execute, Reflection  
- Tool selection strategies  
- Multi-agent vs single-agent systems  
- Failure modes  

**Project:** Build an agent that plans tasks before execution

---

### Module 5: Connections: Tools, MCP, APIs, Web (Week 6)
**Topics:**
- Tool calling in Gemini  
- MCP concepts  
- REST APIs  
- Web search and scraping (ethically)  

**Project:** Build an agent that queries live APIs and web data

---

### Module 6: Grounding → Databases, SQL, Vector Stores (Week 7)
**Topics:**
- RAG vs fine-tuning  
- SQL generation  
- Embeddings and retrieval  
- Hybrid search  

**Project:** Build a grounded agent over a database

---

### Module 7: Diagnostics and Evaluation (Week 8)
**Topics:**
- Tracing agent runs  
- Debugging hallucinations  
- Token and latency analysis  
- Regression testing agents  

**Project:** Add observability and evaluation to a prior agent

---

### Module 8: Safety, Alignment, and Guardrails (Week 9)
**Topics:**
- Prompt injection  
- Data leakage  
- Tool abuse  
- Policy enforcement  
- Gemini safety tooling  

**Project:** Harden an agent against prompt injection and misuse

---

### Module 9: Human in the Loop and UX (Week 10)
**Topics:**
- Approval flows  
- Editable plans  
- Feedback loops  
- UI vs CLI agents  

**Project:** Build an agent with human approval checkpoints

---

### Module 10: Production, Scaling, and Interfaces (Week 11)
**Topics:**
- Rate limits  
- Caching  
- Async workflows  
- Frontends (web/chat)  
- Cost control  

**Project:** Deploy an agent with a real interface

---

### Module 11: Retraining, Fine-Tuning, and Weight Adjustments (Week 12)
**Topics:**
- When to fine-tune vs RAG  
- Data curation  
- Eval-driven tuning  
- Gemini fine-tuning workflows  

**Project:** Improve an agent via data-driven iteration

---

### Modules 12: Capstone Agent System (Weeks 13–14)
**Final Project:** Build a production-ready agent system with:  
- Planning  
- Tools  
- Grounding  
- Evaluations  
- Safety  
- UI  
- Observability

---

## Getting Started

To render the Quarto website locally:

```bash
quarto render
