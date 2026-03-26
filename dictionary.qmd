---
title: "Agentic AI Dictionary"
---

Terms are listed alphabetically and introduced in the order of the course. The unit and day where each term first appears is noted in parentheses.

---

### Agent
A software system that takes in information, reasons about what to do, and takes actions — often repeatedly — to achieve a goal. Agents differ from regular LLMs in that they can plan, use tools, and loop through tasks rather than just generating a single response. *(Unit 1, Day 1)*

### Agentic AI
An approach to AI where systems are designed as autonomous or semi-autonomous agents that plan, use tools, maintain memory, and act over multiple steps. Contrasted with a plain LLM that simply responds to a single prompt. *(Unit 1, Day 1)*

### API (Application Programming Interface)
A set of rules that lets software systems communicate with each other. In this course, your agent uses an API every time it calls an LLM, searches the web, or reads from a service like Canvas or Google Calendar. Hiding your API key is covered as a critical first practice. *(Unit 1, Day 1)*

### API Key
A secret credential used to authenticate requests to an API. Exposing your API key can lead to unauthorized usage and unexpected charges. Always store keys in environment variables, never in your code. *(Unit 1, Day 1)*

### Chain (Run Type)
A sequence of steps executed together as a single logical unit in LangSmith. One of the six run types you will identify in traces: LLM, Retriever, Tool, Chain, Prompt, and Parser. *(Unit 2, Day 1)*

### Checkpointing
Saving an agent's progress mid-task so it can pause, resume, or recover without starting over. Especially important for long-running or high-stakes tasks. *(Unit 3)*

### Context
Everything currently loaded into a language model's awareness: the system prompt, conversation history, tool results, and any documents provided. The model can only work with what is in the context window at the time of each call. *(Unit 1, Day 1)*

### Context Engineering
The art and science of shaping the entire context window with just the right mix of information for the next step. Broader and more powerful than prompt engineering alone — it includes what you include, what you leave out, and how you manage context as a task grows. *(Unit 3, Day 2)*

### Context Management
Strategies for keeping context from growing too large or too noisy. The main types covered in this course are: **truncation** (cut off old messages), **summarization** (compress old messages), **selection** (retrieve only the relevant messages), **file write** (offload to disk), **database** (store externally), and **isolate/delegation** (hand off to a subagent). *(Unit 3, Day 3)*

### Context Self-Adaptation
An agent's ability to automatically adjust what it keeps or discards in its context window based on the current task — without being told explicitly each time. *(Unit 3)*

### Context Window
The maximum amount of text a language model can process at one time. Every API call resends the full conversation history, so cost and context length grow together. Once the limit is exceeded, older content is dropped or the model fails. *(Unit 1, Day 1)*

### Conversation History
The record of prior messages between user and agent that is passed back to the model on every call. Managing conversation history is the foundation of statefulness. *(Unit 1, Day 5)*

### Cost (Token Cost)
LLMs charge per token. Because each new call resends the full conversation history, cost grows quadratically without limits — paying for 1 message, then 2, then 3, and so on summing to N(N+1)/2. Context management is the primary way to control this. *(Unit 2, Day 4)*

### Daytona
A sandboxing tool used alongside LangChain in this course to run agent code in an isolated environment, preventing unintended effects on your system. *(Unit 1 Project)*

### Diagnostic Report
A structured document that identifies what is wrong with a broken agent, why it is happening, and what fix was applied. The Unit 2 project deliverable. *(Unit 2, Day 8)*

### Evaluation (Evals)
A method for measuring how well an agent performs against a defined set of success criteria. Includes building a golden test set, judging outputs, and tracking metrics like correctness, latency, and token usage. *(Unit 2, Day 5)*

### Failure Patterns
Recurring categories of agent misbehavior. Identifying and labeling failure patterns is the first step in diagnosis — you cannot fix what you have not categorized. Common types are covered in Unit 2. *(Unit 2, Day 2)*

### File System (as a Tool)
Giving an agent the ability to read, write, and navigate files on a computer. Allows agents to save notes, load documents, and persist information across tasks. *(Unit 3)*

### Forgetting Vector
A mechanism for selectively removing or down-weighting old memories in an agent's context, allowing it to "forget" information that is no longer relevant. *(Unit 3, Day 3)*

### Function Calling / Tool Calling
The structured mechanism by which an agent chooses and invokes a tool — a function, API, or external service — rather than responding with text alone. The agent uses the tool's description to decide when and how to call it. *(Unit 1, Day 2)*

### Golden Test Set
A small, curated set of example inputs with known correct outputs used to evaluate an agent consistently over time. Lets you detect regressions when you change the agent. *(Unit 2, Day 5)*

### Grounding
Connecting an agent's responses to real, verified data sources to improve accuracy and reduce hallucinations. Related to RAG (Retrieval-Augmented Generation). *(Unit 3)*

### Hallucination
When a language model confidently states something false. A key reason observability, evals, and grounding matter. *(Unit 2)*

### Handoff
The process of one agent passing a task or partial result to another agent. Related to routing and subagent architecture. *(Unit 1, Day 8)*

### Human-in-the-Loop (HITL)
A workflow where a human reviews or approves an agent's actions before they are executed. Important for high-stakes or irreversible decisions. *(Unit 3)*

### Intent Engineering
Designing an agent's behavior around understanding the user's deeper goal — not just their literal words. Operates at four levels: session, user, organization, and world (e.g. web search context). *(Unit 3)*

### LangChain
An open-source framework for building agents. Provides tools, memory connectors, model wrappers, and community integrations. The primary framework used in this course. *(Unit 1, Day 1)*

### LangGraph
An extension of LangChain that adds support for stateful, multi-step agent workflows using a graph-based execution model. Used in this course to introduce statefulness and track agent state across steps. *(Unit 1, Day 5)*

### LangSmith
An observability platform for LangChain agents. Records every prompt, tool call, and response as a trace so you can see exactly what your agent did and why. The primary debugging tool in Unit 2. *(Unit 2, Day 1)*

### LLM (Large Language Model)
A neural network trained on large amounts of text that can generate, summarize, classify, and reason over language. The core reasoning engine inside an agent — but not an agent by itself. *(Unit 1, Day 1)*

### MCP (Model Context Protocol)
A standard developed by Anthropic that lets agents connect to external tools and services in a consistent way. In this course you connect to Canvas, Google Calendar, Slack, and other services via MCP without writing custom integration code for each. *(Unit 1, Day 6)*

### MCP Logging
The built-in logging capability of an MCP server. Reviewed in class to understand what the server is doing and to troubleshoot connection issues. *(Unit 1, Day 6)*

### MCP stdio
A locally hosted MCP server that communicates over standard input/output. The first type of MCP connection launched in this course. *(Unit 1, Day 6)*

### Memory
Information an agent stores and reuses across turns or tasks. Introduced in Unit 1 in two forms:
- **Manual memory:** conversation history you manage yourself
- **Built-in memory:** memory handled by the framework (LangGraph) automatically *(Unit 1, Day 5)*

### Metadata (in LangSmith)
Additional structured information attached to a run or trace, such as model name, temperature settings, user ID, or custom tags. Used to filter and analyze agent behavior in LangSmith. *(Unit 2, Day 1)*

### Multi-Agent System
A system where multiple agents work together, each with a different role. One agent might plan, another search, and a third write. Introduced at the end of Unit 1. *(Unit 1, Day 8)*

### Observability
The ability to see what an agent is doing internally — its prompts, tool calls, decisions, and errors. LangSmith is the observability platform used throughout Unit 2. *(Unit 2, Day 1)*

### Orchestration
The coordination of agent steps, tools, and subagents so work happens in the right order and failures are handled. An orchestrator agent directs subagents rather than doing all the work itself. *(Unit 1, Day 8)*

### Parallelization
Running multiple subagent tasks at the same time rather than one after another, reducing total time. Contrasted with serialization. Explored through the Ralph Wiggam Loop exercise. *(Unit 3)*

### Parser (Run Type)
A component that converts raw LLM output into a structured format (like JSON or a list). One of the six run types visible in LangSmith traces. *(Unit 2, Day 1)*

### Prompt
Instructions or input given to a language model. Three types are used in this course:
- **System prompt:** high-level rules and behavior for the agent
- **User prompt:** the input from the user each turn
- **Tool result prompt:** information returned from a tool call that is fed back into context *(Unit 1, Day 1)*

### Prompt Engineering
Crafting the text of prompts to improve model behavior. Distinguished in Unit 3 from context engineering (which controls the whole window) and intent engineering (which targets user goals). *(Unit 3, Day 2)*

### Prompt Injection
A security attack where malicious text in a user message or tool result attempts to override the agent's instructions — for example, a web page telling the agent to ignore its system prompt. *(Unit 1)*

### RAG (Retrieval-Augmented Generation)
A technique where relevant documents are retrieved at runtime and added to the context before the model responds. Allows agents to answer questions about data too large to fit in the context window at once. *(Unit 3)*

### Response Format
The structured shape of an agent's output — for example, plain text, JSON, or a typed schema. Defined explicitly so downstream tools or humans can reliably parse the result. *(Unit 1, Day 4)*

### Retriever (Run Type)
A component that fetches relevant documents or data from a store. One of the six run types visible in LangSmith traces. *(Unit 2, Day 1)*

### Router
A component that decides which agent, tool, or branch to send a task to based on the input. Related to handoffs and multi-agent architecture. *(Unit 1, Day 8)*

### Run
A single recorded step in LangSmith — one LLM call, one tool invocation, one retrieval, etc. Multiple runs make up a trace. *(Unit 2, Day 1)*

### Sampling Rate (in Monitoring)
The fraction of agent runs that are logged and monitored. Setting a sampling rate lets you observe a representative subset of traffic without storing every run. Covered alongside automation rules and alerts. *(Unit 2, Day 7)*

### Sandboxing
Running agent code in an isolated environment so it cannot accidentally affect the rest of your system. Used in this course via LangChain and Daytona. *(Unit 1 Project)*

### Serialization
Running subagent tasks one after another in sequence, where each step depends on the result of the previous. Contrasted with parallelization. Explored through the deep market research agent exercise. *(Unit 3)*

### Skill (vs. Tool)
A tool is a capability the agent calls at runtime. A skill is a reusable pattern or behavior saved as code — more efficient and predictable than regenerating the same behavior through prompting each time. *(Unit 1, Day 8)*

### State
All information that defines where an agent is in a task at a given moment: its memory, progress, tool results, and conversation history. Managed explicitly in LangGraph. *(Unit 1, Day 5)*

### Statefulness
Whether an agent remembers what happened earlier in a conversation or task. A stateless agent treats every message as if it is the first; a stateful agent maintains context across turns. Both are explored hands-on in Unit 1. *(Unit 1, Day 5)*

### Subagent
An agent called by an orchestrator agent to handle a specific subtask. Allows complex work to be broken up, parallelized, or delegated. *(Unit 1, Day 8)*

### System Prompt
High-level instructions given to the model at the start of every conversation that define its role, behavior, and constraints. Configured alongside temperature and token limits in Unit 1. *(Unit 1, Day 1)*

### Temperature
A model configuration parameter that controls how random or deterministic the model's outputs are. Higher temperature = more creative and varied; lower = more predictable and focused. *(Unit 1, Day 1)*

### Token
The basic unit of text that LLMs process — roughly one word or part of a word. Models are billed per token and have a maximum number they can handle at once (the context window). *(Unit 1, Day 1)*

### Token Limit
The maximum number of tokens allowed in a single API call, set either by the model or by you in configuration. Covered as part of model setup in Unit 1 and revisited in cost analysis in Unit 2. *(Unit 1, Day 1)*

### Tool
An external capability an agent can invoke: a function, API, database, web search, file system, or another agent. Tools are what give agents power beyond generating text. *(Unit 1, Day 2)*

### Tool Decorator (`@tool`)
The simplest way to turn a Python function into a LangChain agent tool. Adding `@tool` above a function makes it discoverable and callable by the agent automatically. *(Unit 1, Day 2)*

### Tool Description
The natural language explanation of what a tool does, attached to the tool definition. The agent reads this description to decide when and whether to call the tool — making a clear description critical to correct behavior. *(Unit 1, Day 2)*

### Tool Wrapper
A structure that packages a function or API call into a standardized tool format the agent can use. Explored in depth in Unit 1, Day 3, including community-provided wrappers from LangChain. *(Unit 1, Day 3)*

### Trace
The full recorded sequence of what an agent did for a given task — every prompt sent, every tool called, every response received. The primary unit of analysis in LangSmith. *(Unit 2, Day 1)*

### Tracing
The act of recording agent runs into traces. Enabled by connecting your agent to LangSmith via an API key and environment variables. *(Unit 2, Day 3)*

### Truncation
A context management strategy that removes the oldest messages from conversation history when the context window fills up. Simple but loses information permanently. *(Unit 3, Day 3)*
