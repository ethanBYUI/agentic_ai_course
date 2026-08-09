# Project 1: Personal Assistant Agent

Build a personal assistant agent that you would actually use.

You start this in Week 1 and add to it as you learn new skills. It is due TBD.

## The Point

Build something you want. Wire it up to real tools and give it real power.

## Rules

- **No AI assistance.** No AI-written code, no AI-written prompts. Prompts must be your own words,
  not a classmate's and not copied from the internet.
- Get debugging help from class time and the Slack channel.
- Set a time limit on any problem you get stuck on. Bringing it to class unfinished is fine.

## What You Build

### 1. Your own repository

Create a GitHub repository for your agent. This is yours and it is public, so it can go in your
portfolio later.

Your agent's memory directory must be in `.gitignore`. It will hold real information about you and
that does not belong on GitHub. Commit an `example_memory/` folder with fake data instead so the
repo still runs for anyone who clones it.

### 2. A manager agent

One agent receives your prompt and decides what tools to use and what to delegate to subagents.

### 3. Personal memory

Allow your agent to store and retrieve information about you: your classes, your goals, your resume,
your preferences, whatever you want it to know.

### 4. At least 1 subagent of your choosing

Pick from this menu, or pitch your own idea to the instructor:

- **Job hunt.** Tailors your resume to a job description you paste in, tracks applications, drills
  interview questions.
- **Money.** Reads a CSV export from your bank, categorizes spending, answers questions about it.
  Or plans meals and groceries on a budget.
- **Coursework.** You paste in your syllabi. It answers questions about deadlines and requirements.
- **Scripture and study.** Come Follow Me preparation, talk prep, ministering, searching Conference
  talks.
- **Roommates.** Chore rotations, splitting bills, apartment logistics.
- **Your own code.** Points it at one of your repos. Explains it, finds your TODOs, drafts commit
  messages.

### 5. Required capabilities

Across the whole agent, you must use:

- Read and write to the file system
- Persistent personal memory file
- Conversation history
- Connect to Slack

## Setup Files

Download the starter ZIP from TBD and unzip it into the root of your repository. It contains sample
data to test your agent against.

Wiring these files into your agent is part of the project. Once you can connect these, you can
connect your own.

## Deliverables

1. **A working agent.** It runs and does something.
2. **Your agent posts to Slack.** Using its own tools, not you copying and pasting, your agent posts
   an introduction of itself to `#TBD`.
3. **A README.md in your repo.** What your agent does, how to run it, what subagents it has, and
   what it cannot do.
4. **A self-reflection in Canvas.** What your agent does well, what it does poorly, and where you expected it
   to work and it did not. Be specific. Include examples.

## Later in the Unit

Closer to the due date you will get a set of test prompts to run against your agent, and there will
be an in-class session where we stress test what you built.

Leaderboards will include categories such as most MCP servers connected, most tools used in a single
run, and funniest Slack post.
