# About

Includes both outcomes and their sub-competencies; outcomes are headers, competencies bullets.

Outcomes and competencies are stated in transferable,
principle-level terms; the concrete vehicle (LangChain / LangGraph / LangSmith, mostly Gemini API) lives one layer down at the performance level, so the outcomes survive a stack change.

Grammar follows "Students can + verb" format. 


# Outcomes and Competencies

## Build AI agent harnesses

*Only implementation to exist functionally, design and deployment are out of scope. Students continuously evaluate and refine what they build; the iteration loop is carried in the wording, not given a separate outcome.*

- 1.1 *flag wording* Connect to the model (the "brain")
    - 1.1.1 Pick appropriate models for an agent or subagent
    - 1.1.2 Connect to an LLM provider's API
    - 1.1.3 Implement common model features from documentation <!-- token limits, system prompt, temperature, structured output, web search, thinking, function calling, caching, other data types -->
- 1.2 Design an agent's instructions and prompts <!-- system prompt, tool descriptions, skills, persona, few-shot, output format -->
- 1.3 Give the agent memory and manage its context
    - 1.3.1 Implement short-term memory
    - 1.3.2 Implement long-term memory
    - 1.3.3 Trim or reduce memory through context engineering
- 1.4 Extend the agent with tools and services
    - 1.4.1 Define, register, and invoke custom tools
    - 1.4.2 Connect external tools through Model Context Protocol (MCP) <!-- eg Slack, Google Calendar -->
    - 1.4.3 Connect external tools through CLI
- 1.5 Constrain the agent with deterministic safety guardrails
    - 1.5.1 Implment human-in-the-loop
    - 1.5.2 Connect a sandbox for arbitrary code execution
    - 1.5.3 Create permissions and authorization constraints
    - 1.5.4 Handle errors and retries
    - 1.5.5 *this deserves more attention*
- 1.6 Architect multi-agent / sub-agent delegation


## Evaluate agents using agent observability tools

*Students can observe, measure, and experiment on an agent's behavior to know whether and why it works, feeding each finding back into the next build.*

- 2.1 Observe agent performance <!-- (pre-production and production) -->
    - 2.1.1 *flag wording* Instrument tracing to see what the agent actually did
    - 2.1.2 Read runs, traces, and spans <!-- (inputs, outputs, metadata) -->
    - 2.1.3 Distinguish run types <!-- (LLM, tool, retriever, chain, prompt, parser) -->
    - 2.1.4 *flag existence* Observe both pre-production and in production agent runs
- 2.2 Measure agent performance <!-- choose an evaluator type to match the criterion -->
    - 2.2.1 Write and implement deterministic evaluators for hard constraints
    - 2.2.2 Create LLM-as-judge evaluators for subjective qualities 
        - 2.2.2.1 *flag existence* (pointwise and pairwise), and calibrate the judge *what needs to be specified under LLM-as-judge?*
    - 2.2.3 Build curated golden datasets from scratch
    - 2.2.4 Build datasets from in-production responses
    - 2.2.5 Run offline evals from datasets
    - 2.2.6 *flag existence* Compare two or more agent versions objectively to decide which is better <!-- pairwise; "Battle of the Bots" --> *not sure if this captures the meaning of pairwise, and the comparison should be explicit in an experiment, which this also doesn't capture*
- 2.3 Diagnose agent performance <!-- iterative, post-creation discovery -->
    - 2.3.1 Root-cause a failure from traces and eval results
    - 2.3.2 Classify failures into nameable failure modes
    - 2.3.3 Use human review to re-calibrate rubrics and judges

*The above competencies need further evaluating as to comprehensiveness. I'm troubled by how "Human Review" can fall under Measure and Diagnose. Maybe there is something wrong with the organization.*


## Translate ambiguous production goals into explicit architectural decisions and measurable success criteria

*Students can take a human objective from fuzzy intuition and convert it into explicit, decidable, measurable structure — both where AI fits and what success means. Defines the target that "Evaluate agents" measures against. Involves investigation, elicitation of clients, and internalizing.*

- 3.1 Define clearly the purpose and intent of an agent without digital tools
- 3.2 Make educated gut-check assessments of the viability for AI to solve a problem within constraints
    - 3.2.1 Demonstrate awareness of an LLM's limitations
    - 3.2.2 Identify the most expensive parts of a build
    - 3.2.3 Identify common failure points for a given situation
    - 3.2.4 Make a quick cost assessment
- 3.3 Define and operationalize success for an agent
    - 3.3.1 Choose which quality dimensions matter for an agent <!-- correctness, safety, tone, format, completeness, latency, cost -->
    - 3.3.2 Identify important safety guardrails
    - 3.3.3 Operationalize constraints into gradeable criteria
    - 3.3.4 Anchor criteria with concrete good/bad examples <!-- the seed of a golden dataset -->
    - 3.3.5 Revise success criteria from observed behavior
- 3.4 Find hidden domain knowledge, qualifications, and assumptions from employees and processes to make explicit to the agent
- 3.5 Anticipate, from the agent's perspective, what context it will and won't need at each point in its task
- 3.6 Plan multiple harness architectures that fit the problem definition
    - 3.6.1 *flag existence* Organize state by function and choose a substrate
- 3.7 Author intent into durable artifacts that are both agent- and human-readable <!-- eg CONSTITUTION.md, CONTEXT.md, AGENTS.md, specs, schemas, user stories,  other docs; or principles, instructions, context, success criteria, schemas, tool definitions, and curated examples -->

*This outcome has nearly taken shape, but still needs a little more consideration. AI has framed a new shape interestingly inside `outcomes_competencies_playground.md` which should be taken seriously with a grain of salt*


## Communicate about AI using language fitted to the audience

*Students can communicate their own competence and their agents' behavior to technical and non-technical audiences alike.*

- 4.1 Use current industry terminology correctly <!-- agentic AI vs. LLM, API, runs/traces/tracing, alignment -->
    - 4.1.1 Describe an agent from multiple definitions
    - 4.1.2 Articulate the agent development lifecycle
    - 4.1.3 Differentiate "Engineering" terms: Prompt, Context, Agent, Harness, Intent, and Software Engineering
    - *how specific should it get here (as opposed to actual lesson content)*
- 4.2 Demonstrate competence with AI to employers
    - 4.2.1 Publish work and lessons learned where employers can see it <!-- e.g., a LinkedIn post -->
    - 4.2.2 Explain agents they built, the decisions behind them, and what they learned from the process
- 4.3 Communicate an agent's behavior and results in the workplace
    - 4.3.1 Explain how an agent works to technical and non-technical colleagues
    - 4.3.2 Report an agent's measured performance and behavior to a manager or decision-maker
    - 4.3.3 Make recommendations on where an agent should improve or next steps
    - 4.3.4 Advocate strongly for ethical AI use to an employer or stakeholder

## Use quality sources to self-learn in an ever-changing AI landscape

*Students can find and judge sources of AI knowledge,preferring primary, current sources over stale tutorials and unreliable AI answers.*

- 5.1 Learn from primary-source documentation and tutorials
    - 5.1.1 Quickly discern a package's core functionality
    - 5.1.2 Find features deliberately to solve a predetermined problem
    - 5.1.3 Explore documentation to imagine new ways of doing things
- 5.2 Find and evaluate trusted people and communities <!-- thought leaders, professionals, forums, YouTube, blogs, in person --> *lacks something*
- 5.3 Evaluate relevance and currency of information, including online tutorials and AI/coding-agent output
- 5.4 Find and evaluate software, judging whether it is maintained and current <!-- companies, GitHub repos, MCPs -->
- 5.5 Develop a genuine excitement for AI use cases that propels continued learning

## Form and live a personal ethic for the use of AI agents

*Students can develop and act on a personal conviction for the ethical use of AI, grounded in gospel doctrine and informed by industry and societal context.*

- 6.1 Develop a personal conviction for ethical AI use that is genuinely their own
- 6.2 Define what ethical AI use means to them personally
- 6.3 Examine and remain conscious of how their AI use impacts themselves and others
- 6.4 Apply Church doctrine and gospel principles to real AI-use situations
- 6.5 Articulate how the industry frames alignment and AI ethics as fundamentally an ethics question

*Alternative: Develop personal guidelines for ethical use of LLMs and agentic AI.*