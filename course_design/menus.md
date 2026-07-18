## About

Menus, for lack of a better term, are competencies that feel more like changeable lists. Here they become sub-competencies, but are softer, more subject to change

How this is used is in flux

## Menus

1.1.3 Implement common model features from documentation

- token limits, system prompt, temperature, structured output, web search, thinking, function calling, caching, other data types

1.2.1 Design an agent's instructions and prompts

- system prompt, tool descriptions, skills, persona, few-shot, output format

1.2.2.2 Organize state by function and choose a substrate

- md/text, 
- objects, 
- SQL, 
- vector 
for each: 
- conversational, 
- working, 
- knowledge, and 
- operational/metadata state

1.2.3 Extend the agent with tools and services

- Define, register, and invoke custom tool
- Connect external tools through Model Context Protocol (MCP)
- Connect external tools through CLI
- Slack
- Google Calendar
- Their file system
- TODO what would be easy to connect and useful for a student?

1.2.4 Constrain the agent with deterministic safety

- human-in-the-loop
- sandbox (arbitrary code)
- permissions/authorization
- errors and retries

1.3.1 Set up a publishable local environment

- API secret standards, environment tooling with uv, git basics

1.3.3 Set up a publishable local environment

- Vercel, phone, or Slack app

2.1.3 Distinguish run types

- LLM, tool, retriever, chain, prompt, parser

2.2.1 Write and implement deterministic evaluators for hard constraints 

- regex, schema validation, exact match, did-it-call-the-tool

3.3 Choose which quality dimensions matter for an agent

- correctness
- safety
- tone
- format
- completeness
- latency
- cost

3.6.1 Decide how each piece of context should be delivered - its mechanism and actual location

- system prompt, file system, tool description, database, schema, example, sub-agent handoff

3.7 Author intent into durable artifacts that are both agent- and human-readable 

- CONSTITUTION.md, CONTEXT.md, AGENTS.md, specs, schemas, user stories,  other docs; or principles, instructions, context, success criteria, schemas, tool definitions, and curated examples

4.1 Use current industry terminology correctly

- agentic AI vs. LLM, API, runs/traces/tracing, alignment

5.2 Find and evaluate trusted people and communities

- thought leaders, professionals, forums, YouTube, blogs, in person

5.4 Find and evaluate software, judging whether it is maintained and current

- companies, GitHub repos, MCPs