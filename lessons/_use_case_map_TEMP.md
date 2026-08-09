# TEMP — Use Case → Instance Map

**Throwaway file. Delete once the real instances carry their own tags.**

Every use case in `course_design/use_case_coverage.md` gets exactly one planned
instance here, so the linter's hard `uc-instance` rule reads green and the
Matrix tab (Use case × Instance) shows where each case is *intended* to land.
Nothing here is real content — the day, type, and competency are the plan for
where that use case will be carried once the example/activity is actually
written. When a case's real file exists and tags itself, delete its section
below.

Leading `_` keeps Quarto from rendering it; the linter reads it because it sits
in `lessons/` and ends in `.md`.

`type:` is deliberately honest: only the cases we expect to ship as **runnable
code** are `example`. The rest are case studies / activities, which satisfy the
hard rule but leave the soft `uc-example` rule flagged — that gap is the real
signal to look at.

---

## Media & Gaming — NPC dialogue from one LLM call

<!--
  id: ucmap-media-gaming
  type: example
  day: 1_1
  competency: 1.1.1, 1.1.3
  use_case: media-gaming
-->

## Education — pick a model for a tutor bot

<!--
  id: ucmap-education
  type: practice
  day: 1_1
  competency: 1.1.2
  use_case: education
-->

## Retail — custom tool over store inventory

<!--
  id: ucmap-retail
  type: example
  day: 1_2
  competency: 1.4.1
  use_case: retail
-->

## Supply Chain — tool that answers "where is the shipment"

<!--
  id: ucmap-supply-chain
  type: practice
  day: 1_2
  competency: 1.4.1
  use_case: supply-chain
-->

## Agriculture — wrap a field-sensor CSV as a tool

<!--
  id: ucmap-agriculture
  type: example
  day: 1_3
  competency: 1.4.1
  use_case: agriculture
-->

## Energy — reading: grid-load agents in the wild

<!--
  id: ucmap-energy
  type: prep_reading
  day: 1_3
  competency: 5.4, 5.5
  use_case: energy
-->

## Real Estate — listing text into structured output

<!--
  id: ucmap-real-estate
  type: example
  day: 1_4
  competency: 1.1.3
  use_case: real-estate
-->

## Legal — schema for contract-clause extraction

<!--
  id: ucmap-legal
  type: practice
  day: 1_4
  competency: 1.1.3
  use_case: legal
-->

## Hospitality — concierge that remembers the conversation

<!--
  id: ucmap-hospitality
  type: example
  day: 1_5
  competency: 1.3.1
  use_case: hospitality
-->

## Healthcare — long-term memory of patient intake preferences

<!--
  id: ucmap-healthcare
  type: practice
  day: 1_5
  competency: 1.3.2
  use_case: healthcare
-->

## Telecom — MCP server for network ticket lookup

<!--
  id: ucmap-telecom
  type: example
  day: 1_6
  competency: 1.4.2
  use_case: telecom
-->

## Automation — chain two MCP servers into one routine

<!--
  id: ucmap-automation
  type: practice
  day: 1_6
  competency: 1.4.2
  use_case: automation
-->

## Software & Technology — an MCP pulled straight from GitHub

<!--
  id: ucmap-software-technology
  type: example
  day: 1_7
  competency: 1.4.2, 5.4
  use_case: software-technology
-->

## IT & DevOps — reading: judging whether an ops MCP is maintained

<!--
  id: ucmap-it-devops
  type: prep_reading
  day: 1_7
  competency: 5.4
  use_case: it-devops
-->

## Manufacturing — subagents triaging plant maintenance requests

<!--
  id: ucmap-manufacturing
  type: example
  day: 1_8
  competency: 1.6
  use_case: manufacturing
-->

## Transportation & Logistics — delegate routing to a sub-agent

<!--
  id: ucmap-transportation-logistics
  type: practice
  day: 1_8
  competency: 1.6
  use_case: transportation-logistics
-->

## Emergency Response — human-in-the-loop before dispatch

<!--
  id: ucmap-emergency-response
  type: in_class
  day: 1_10
  competency: 1.5.1
  use_case: emergency-response
-->

## Customer Support — what makes a support agent bad

<!--
  id: ucmap-customer-support
  type: in_class
  day: 2_1
  competency: 2.3.2
  use_case: customer-support
-->

## Financial Services — reading: named failure modes in finance agents

<!--
  id: ucmap-financial-services
  type: prep_reading
  day: 2_2
  competency: 2.3.2
  use_case: financial-services
-->

## Analytics — read the trace of a reporting agent

<!--
  id: ucmap-analytics
  type: example
  day: 2_4
  competency: 2.1.2, 2.1.3
  use_case: analytics
-->

## Government — golden dataset for benefits-eligibility answers

<!--
  id: ucmap-government
  type: example
  day: 2_5
  competency: 2.2.3, 2.2.4
  use_case: government
-->

## Non-profit — deterministic evaluator for donor-message tone

<!--
  id: ucmap-non-profit
  type: practice
  day: 2_7
  competency: 2.2.1
  use_case: non-profit
-->

## Professional Services — reading: scoping an agent for a consulting firm

<!--
  id: ucmap-professional-services
  type: prep_reading
  day: 3_1
  competency: 3.1
  use_case: professional-services
-->

## Sales — plan two harness architectures for a pipeline agent

<!--
  id: ucmap-sales
  type: in_class
  day: 3_2
  competency: 3.6
  use_case: sales
-->
