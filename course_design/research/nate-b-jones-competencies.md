# About

Nate B Jones is an AI consultant and podcaster. I (James) find him to be very insightful and knowledgable. I asked Gemini to give the low down on a video I watched so it could be saved as context. It is essentially on the most valuable skills for this course - and the market pushing for them: [The AI Job Market Split in Two. One Side Pays $400K and Can't Hire Fast Enough.](https://www.youtube.com/watch?v=4cuT-LKcmWs)

# TLDR

1. Specification Precision (or Clarity of Intent)

2. Evaluation and Quality Judgment
   - Edge case detection

3. Decomposing Tasks and Delegating
   - Sizing work for the agentic harness (project scoping)

4. Failure Pattern Recognition
   - Context degradation
   - Specification drift
   - Sycophantic confirmation
   - Tool selection errors
   - Cascading failure rate
   - Silent failure

5. Trust and Security Design

6. Context Architecture
   - Persistent context vs. per-session context

7. Cost and Token Economics
   - Model choice

# Summary

Here is the breakdown of the seven highly sought-after AI skills and their specific sub-components based on the transcript:

### **1. Specification Precision (or Clarity of Intent)**

This is the modern evolution of "prompting"—speaking to machines in a literal way, as they cannot read between the lines or reliably infer human intent.

* Agents require extreme specificity and are poor at filling in the blanks.


* It involves defining exact parameters, such as instructing an agent to handle specific ticket tiers, define customer sentiment from specific documents, and log every escalation with a reason code.


* The foundational skills for this are highly familiar to technical writers, lawyers, and QA engineers.



### **2. Evaluation and Quality Judgment**

Cited as the most frequent skill across AI job postings, this focuses on evaluating whether an AI actually produced the desired result.

* Involves building systems (like evaluation harnesses, automated evals, and simulation runs) that can consistently test AI performance.


* Requires advanced error detection to combat an AI's tendency to be "fluently wrong" or confidently incorrect.


* Involves resisting the temptation to mistake an AI's fluent output for competence or correctness.


* Includes edge case detection and writing evaluation tasks clearly enough that multiple engineers would agree on a pass/fail outcome.



### **3. Decomposing Tasks and Delegating**

A managerial skill required to build and operate complex multi-agent systems.

* Involves breaking large workflows into logical, manageable chunks.


* Requires providing very clear guardrails, initial intent, and infrastructure, as agents are not intuitively flexible like human workers.


* Relies on structuring planner agents to maintain records of tasks and successfully hand off workstreams to sub-agents.


* Requires the technical ability to accurately size and scope work to fit the specific agentic harness you have available.



### **4. Failure Pattern Recognition**

The critical ability to look at failing AI systems, diagnose the root cause, and implement a fix. There are six specific failure types you need to recognize:

* 
**Context degradation:** Output quality naturally drops during long sessions because the context window becomes polluted.


* 
**Specification drift:** An agent effectively forgets its original instructions over a long task unless the harness is designed to forcibly remind it.


* 
**Sycophantic confirmation:** An agent confidently confirms incorrect data fed to it, and then builds an entire incorrect system based on those flawed assumptions.


* 
**Tool selection errors:** An agent chooses the wrong tool for the job, often because tools were incorrectly framed in the system prompt, too numerous, or too long.


* 
**Cascading failure rate:** One agent makes an error that propagates through the entire chain of agents because proper loops and verification mechanisms were not in place.


* **Silent failure:** The most dangerous failure. The agent produces plausible, correct-looking output, but hidden variables (like a warehouse mismatch) mean the actual, real-world result was completely wrong.



### **5. Trust and Security Design**

This skill is about knowing where to draw the line between humans and agents, and keeping automated systems on predictable guardrails.

* Requires analyzing the "cost of error" (the blast radius) to understand the worst-case scenario before deploying a system.


* Assessing the reversibility of an action (e.g., an unsent email draft can be fixed; a completed wire transfer cannot).


* Evaluating frequency metrics to properly calculate a system's true risk profile.


* Insisting on verifiability and "functional correctness" (the output is factually accurate and useful) rather than settling for "semantic correctness" (the output just sounds plausible).



### **6. Context Architecture**

This is the process of structuring data so that AI agents can find exactly what they need at scale.

* Requires differentiating between persistent context (what is always there) and per-session context (what is needed for a single run).


* Involves organizing data objects so they are highly traversable, while keeping out dirty or polluting data that confuses the agent.


* Comparable to building a "Dewey decimal system for agents," making it a highly valuable skill for librarians, database managers, and technical writers.



### **7. Cost and Token Economics**

A senior-level skill focused on the financial viability of agentic systems.

* Involves mathematically calculating the cost per token to prove whether assigning an agent to a task is worth the investment.


* Requires managing "model choice," which means dynamically matching the right tier of AI model to the specific economics of the task in a rapidly changing pricing landscape.


* Entails building spreadsheet models and prototypes to test token burns and calculate blended costs, ensuring the organization sees a solid ROI.