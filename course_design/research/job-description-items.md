# Job Description Items — Organized by Theme (by Claude Code)

Source material for course-outcome development. These are responsibilities and
qualifications pulled verbatim from several agentic-AI job postings (an enterprise
agent-framework role, an AI-coding-agent platform role, and a quant/trading
production-AI role). The raw postings skew senior (15+ years, "P5 Master level"),
so the *language* is often above a college course's altitude — but the *themes*
underneath are the signal we care about.

**How to read this file:**
- **Importance** rates the theme for *this course's* purposes, not the original role's.
- ***My read*** (italic blockquote) is my (Claude Code) commentary — how it maps to our outcomes.
  This is mine, not theirs.
- **From the postings** lists the actual wording, quoted. This is theirs, not mine.

Sections are ordered by course relevance: course-critical themes first, supporting
themes next, then reference material, then themes that are deliberately out of scope.

---

## 1. Context engineering as a durable, in-repo artifact

**Importance: Very High** — the single most repeated theme across postings, and the
biggest daylight against our current outcomes.

> ***My read:*** This is intent engineering made concrete as a *deliverable* —
> authoring the durable, version-controlled context that steers an agent (AGENTS.md /
> CLAUDE.md, feature manifests, schemas, in-repo docs), not just selecting context at
> runtime. Our outcomes have runtime context *selection* and a clean GitHub repo, but
> nothing about the repo-as-source-of-truth artifact. Strongest candidate to promote
> from the parked "intent engineering" note.

**From the postings:**
- "Build and maintain context engineering frameworks (e.g., AGENTS.md files, in-repo documentation, feature manifests) to enhance AI reasoning and performance"
- "Establish repository-as-source-of-truth models with machine-readable, version-controlled artifacts"
- "Familiarity with context engineering, including structuring repositories, schemas, and documentation for effective AI agent reasoning"
- "Create multi-session, multi-context workflows enabling incremental AI-driven development through progress tracking and environment scaffolding"

---

## 2. Using AI coding agents / AI-first development (the meta-skill)

**Importance: Very High** — every posting assumes the person builds *with* coding
agents, a skill our course does not currently name.

> ***My read:*** Distinct from building agents: this is developing *with* Claude Code /
> Cursor / Codex, defining intent-constraints-validation as the mode of work. Natural
> for us to make explicit since the course is already taught through these tools.

**From the postings:**
- "1+ year of hands-on experience working with AI coding agents (e.g., Claude Code, Codex CLI, Cursor, Windsurf, or similar) in real-world development environments"
- "AI development tools such as Claude Code, Codex CLI, Cursor, Windsurf, or similar platforms"
- "Experience working in AI-first or agent-assisted development environments, where engineers define intent, constraints, and validation approaches"
- "Design and implement structured agent harnesses and orchestration frameworks that enable AI coding agents to operate reliably across enterprise codebases"

---

## 3. CI/CD and automated feedback loops

**Importance: High** — our Deploy outcome stops at "basic UI"; this pushes past it.

> ***My read:*** We have the *evaluators* but not their *integration into an automated
> loop*: pipeline gating, regression testing, LLM-as-reviewer in CI. Deploy currently
> ends at a basic interface and connecting services.

**From the postings:**
- "Implement automated feedback loops such as CI validation, end-to-end testing, and LLM-based review systems to continuously improve system performance"
- "Collaborate with engineering teams to integrate AI-driven development workflows into CI/CD pipelines and developer tooling ecosystems"
- "CI/CD platforms and developer tooling ecosystems supporting automated testing and validation workflows"

---

## 4. Agent orchestration, planning loops & control-flow patterns

**Importance: High** — present in our outcomes but buried; the postings treat it as a
first-class discipline.

> ***My read:*** We have "Architect multi-agent / sub-agent delegation" and control
> flow tucked inside guardrails, but named agent-planning and orchestration patterns
> (planning loops, workflow vs. autonomous, composition) aren't surfaced on their own.

**From the postings:**
- "Deep expertise in designing reusable agent orchestration frameworks, including execution models, control flow patterns, state handling, and composition strategies for multi-step and tool-augmented workflows"
- "Hands-on knowledge of planning loops and deterministic workflow design that balance flexibility with predictability, traceability, and supportability across enterprise agentic use cases"
- "Deliver scalable agentic engineering infrastructure that supports multi-agent workflows and continuous improvement cycles"
- "Orchestrate multi-step workflows – from code generation and backtesting to execution integration"
- "Create workflows where AI agents manage context, call tools, and make decisions across complex tasks"
- "Experience with agent-based systems using tool calling, orchestration, or multi-step reasoning"
- "1+ year of experience with agent orchestration or tool-use patterns, including MCP servers, APIs, or multi-agent frameworks"

---

## 5. Memory & context management

**Importance: High** — well covered by our Build outcome; included for completeness.

> ***My read:*** Our Build outcome already handles short/long-term memory, state
> persistence, and retrieval. The postings confirm we're pitched right here.

**From the postings:**
- "Strong command of memory patterns, including short-term and long-term context strategies, state persistence, retrieval interfaces, and mechanisms for safe and relevant memory use across agent lifecycles"
- "Build context management and retrieval pipelines so models have the right data at the right time"
- "Worked with retrieval-augmented generation connected to real data pipelines"
- "Understand context management, prompt design at the system level, and model integration patterns"

---

## 6. Tool calling, MCP & service integration

**Importance: High** — well covered; included for completeness.

> ***My read:*** Custom tools, tool-definition quality, and MCP are already in Build.
> The postings add "interface contracts" framing, which is a bit more senior but aligns.

**From the postings:**
- "Experience engineering robust tool calling abstractions, interface contracts, and execution patterns that enable reliable integration with enterprise systems, services, and developer tools"
- "Integrate AI systems with internal APIs, market data, and quantitative tools"
- "Internal repositories, documentation systems, and agent orchestration frameworks (e.g., MCP servers, tool-use APIs, multi-agent architectures)"

---

## 7. Evaluation, simulation harnesses & testbeds

**Importance: High** — matches our Evaluate outcome; sharpens the offline/online and
regression angles.

> ***My read:*** Our Evaluate outcome covers observe/measure/experiment/diagnose. The
> postings add "simulator harnesses / testbeds" and "regression detection" — the
> repeatable, scenario-driven testing side we treat lightly.

**From the postings:**
- "Experience building simulator harnesses and execution testbeds that enable repeatable testing, scenario simulation, policy validation, and controlled experimentation for agentic workflows"
- "Strong understanding of eval integration, including offline and online assessment patterns, benchmark design, regression detection, and framework-level hooks for continuous quality measurement"
- "Proven ability to create reusable framework guardrails, deterministic harness patterns, and evaluation-connected developer workflows that enable safe, testable, and scalable adoption at enterprise scale"
- "Leads and is responsible for the end-to-end test strategy/creation/adherence, and the integration between teams for a program/portfolio solution"

---

## 8. Guardrails, governance, policy & regulated controls

**Importance: Medium-High** — our guardrails competency is the seed; the enterprise
governance framing is thin (and partly senior-level).

> ***My read:*** We flagged our guardrails competency as "deserves more." The
> concept of policy-as-enforced-guardrail (permissions, validation, human-in-the-loop)
> is course-appropriate; the audit/compliance/regulated-environment framing is senior.

**From the postings:**
- "Proven ability to implement policy hooks and runtime interception points that enforce governance, validation, safety, observability, and enterprise controls throughout agent execution"
- "Develop and enforce architectural constraints and guardrails, including dependency rules, custom linters, and structural validation tests"
- "Experience engineering solutions in highly regulated environments with strong SDLC, risk, audit, and control requirements"
- "Reduce risk and improve quality across our technology portfolio by aligning to a single enterprise architecture strategy and delivering governance that enables consistency, integration and automation"

---

## 9. Production reliability & operations

**Importance: Medium-High** — present in our outcomes as a one-liner; the postings
treat reliability as a core identity.

> ***My read:*** We have "handle errors and retries" and production observability, but
> monitoring/alerting/regression as an *operational discipline* is underweighted. The
> "not just prototypes" line is a recurring refrain.

**From the postings:**
- "Design and build agentic AI systems that operate reliably in production environments"
- "Ensure production readiness with solid testing, monitoring, and error handling"
- "Built AI systems that run in production – not just prototypes"
- "Focus on reliability – because your systems don't just run, they're depended on"

---

## 10. Software-engineering fundamentals & code quality

**Importance: Medium** — assumed as baseline by the postings; our course is
agent-centric and light on plain SWE hygiene.

> ***My read:*** Clean maintainable code, architecture patterns, testing, and tooling
> are the assumed floor. Worth deciding how much we own vs. treat as a prerequisite.

**From the postings:**
- "5+ years of experience in software engineering fundamentals, including architecture, CI/CD pipelines, automated testing, and developer tooling"
- "Strong understanding of application architecture patterns and enterprise-scale development practices (P5 – Master level preferred)"
- "Write clean, maintainable code that others can build on"
- "Comfortable working across languages and systems – whether it's Python, .NET, or something else"
- "Exposure to or proficiency with multiple programming languages or frameworks (e.g., .NET, Node.js, Python)"

---

## 11. Communication, documentation & stakeholder collaboration

**Importance: Medium** — maps to our Communicate outcome; adds the docs-as-artifact
angle.

> ***My read:*** Our Communicate outcome covers technical/non-technical audiences. The
> postings add playbooks/runbooks/developer guides and turning domain intuition into
> testable specs — the latter overlaps our "Translate ambiguity" outcome.

**From the postings:**
- "Experience creating technical documentation, such as playbooks, runbooks, or developer guides"
- "Collaborate closely with traders, quants, and engineers to turn market ideas into testable strategies"
- "You collaborate closely and value strong, direct feedback"

---

## 12. Dispositions & mindset

**Importance: Reference** — traits, not teachable competencies, but useful for framing.

> ***My read:*** Ownership, systems thinking, and curiosity echo our self-learning and
> ethics outcomes. Keep as tone/framing rather than outcomes.

**From the postings:**
- "You take ownership and build things that last"
- "You think in systems, not just components"
- "You're curious, hands-on, and not afraid to challenge how things are done"
- "Explores state-of-the-art technologies to improve development efficiencies, quality of test/QA coverage, and release management"

---

## 13. Baseline qualifications & tooling (reference)

**Importance: Reference** — entry bar and environment, not course outcomes.

**From the postings:**
- "High School Diploma or GED equivalent"
- "Bachelor's degree in Computer Science, Engineering, or a related technical field"
- "Microsoft Office (Excel, Word, Outlook, Teams)"

---

## Out of scope by design (senior / staff-level)

**Importance: Excluded** — noted so the exclusion reads as a deliberate choice, not an
oversight. These are staff/principal responsibilities, correctly outside a course
targeting entry-level competence.

> ***My read:*** Enterprise-architecture *leadership*, designing SDKs/APIs/CLIs *for
> other developers*, and taking frameworks to enterprise-scale adoption all presuppose
> years of seniority. Out of scope, but worth a one-line acknowledgment in the outcomes.

### Enterprise architecture & technical leadership
- "Develops the engineering approach for the entire program/portfolio solution and works with Architecture, to develop/analyze/deliver the implementation of technical enablers"
- "Leads the planning, definition, and design of the complex features which span multiple teams and explore solution alternatives"
- "Creates ideas on designing complex technology and solution development approaches"
- "Leads the technical oversight for teams in solution development including design reviews and code within own domain"
- "Defines the technology tool stack for the solution within range of internally approved and supported technologies"
- "Improve the experience for our developers, making it easier to deliver industry-leading solutions, while managing work efficiently and with the right controls"
- "Advance our technology platforms through innovation"
- "15+ years of engineering experience with deep technical leadership in enterprise software platforms, developer tooling, or AI-enabled engineering systems"
- "Demonstrated ownership of architecture, standards, and engineering direction for shared platforms used across multiple delivery teams or lines of business"
- "Ability to influence senior technology leaders, platform teams, and risk partners through clear technical strategy, architecture guidance, and engineering standards"

### SDK, API, CLI & developer-interface design (for other developers)
- "Hands-on collaboration with platform engineering, product, and developer experience teams to design intuitive SDKs, APIs, and CLIs that simplify adoption of agent frameworks and harness capabilities"
- "Strong foundation in developer-centered API design, abstraction layering, extensibility models, versioning strategies, and interface ergonomics required to support broad enterprise engineering use"
- "Experience leading framework design for composability, determinism, debuggability, and interoperability across SDK, runtime, orchestration, and evaluation layers"
- "Familiarity with CLI workflows, configuration design, local development harnesses, and packaging patterns required to make enterprise agentic tooling accessible, supportable, and efficient for delivery teams"

### Framework scale, governance & enterprise adoption
- "Ability to define framework standards, execution models, governance patterns, and developer enablement approaches that continuously improve correctness, reuse, and delivery efficiency"
- "Proven track record taking agent framework and harness capabilities from incubation to enterprise-scale adoption through measurable improvements in composability, testability, governance, and developer experience"
- "Demonstrated success connecting framework engineering investments to delivery acceleration, quality improvement, operational consistency, and reduced friction across engineering workflows"
- "Experience evaluating orchestration models, harness strategies, policy extensibility, and interface designs to guide teams toward scalable, supportable, and high-value enterprise use cases"
- "Experience building or contributing to developer platforms, internal tooling, or reusable reference architectures used across engineering teams"