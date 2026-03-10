# Agentic AI Course — Site Repository

This repo contains the source files for the Agentic AI course website, built with [Quarto](https://quarto.org). The site renders to the `docs/` folder and is served via GitHub Pages.

---

## Prerequisites

Install Quarto before working with this repo:

```bash
# Check if already installed
quarto --version

# Download from https://quarto.org/docs/get-started/
```

No other dependencies are required — Quarto handles all rendering.

---

## Local Development

**Preview the site with live reload:**
```bash
quarto preview
```
This spins up a local server at `http://localhost:4567` and automatically refreshes when you save changes.

**Build the site for deployment:**
```bash
quarto render
```
This outputs all rendered HTML to the `docs/` folder, which GitHub Pages serves.

---

## Repo Structure

```
/
├── index.qmd               # Course homepage (student-facing)
├── dictionary.qmd          # Agentic AI glossary
├── _quarto.yml             # Site config: navbar, theme, output settings
├── styles.css              # Custom CSS overrides
├── docs/                   # Rendered output — do not edit directly
├── Assets/
│   └── Images/             # Logo, images used across the site
└── units/
    ├── unit1.qmd           # Unit 1 overview page
    ├── unit1_1.qmd         # Unit 1, Day 1
    ├── unit1_2.qmd         # Unit 1, Day 2
    │   ...
    ├── unit1_12.qmd        # Unit 1, Day 12
    ├── unit2.qmd           # Unit 2 overview page
    ├── unit2_1.qmd         # Unit 2, Day 1
    │   ...
    ├── unit2_12.qmd        # Unit 2, Day 12
    ├── unit3.qmd           # Unit 3 overview page
    ├── unit3_1.qmd         # Unit 3, Day 1
    │   ...
    └── unit3_12.qmd        # Unit 3, Day 12
```

### Naming Convention

| File | Purpose |
|------|---------|
| `units/unit1.qmd` | Unit overview — goal, topics, project, outcomes |
| `units/unit1_1.qmd` | Individual lesson — Unit 1, Day 1 |
| `units/unit2_5.qmd` | Individual lesson — Unit 2, Day 5 |

Days are numbered **within each unit** (1–12), not across the whole course.

---

## Adding a New Lesson Page

1. Create the file in `units/` following the naming convention (e.g., `units/unit2_7.qmd`)
2. Add a YAML header at the top:

```yaml
---
title: "Unit 2 — Day 7: Prompt Failure Patterns"
---
```

3. Write your content in Markdown below the header
4. The page is already linked in `_quarto.yml` — no changes needed there
5. Run `quarto preview` to verify it renders correctly

---

## Editing the Navbar

The navbar is defined in `_quarto.yml`. Each unit has its own dropdown menu with week dividers and day links. If you add, remove, or rename a page, update the corresponding entry in `_quarto.yml`.

---

## Deployment

The site deploys automatically to GitHub Pages from the `docs/` folder.

**To deploy updates:**
1. Run `quarto render` to rebuild the site
2. Commit and push the changes including the updated `docs/` folder:

```bash
quarto render
git add .
git commit -m "your message"
git push
```

GitHub Pages will serve the updated site within a minute or two.

**GitHub Pages setup** (one-time, already configured):
- Go to repo Settings → Pages
- Set source to `Deploy from a branch`
- Set branch to `main`, folder to `/docs`

---

## Course Structure

| Unit | Weeks | Days | Theme |
|------|-------|------|-------|
| Unit 1 | 1–4 | 1–12 | Build a "Bad" Agent |
| Unit 2 | 5–8 | 1–12 | Diagnostics |
| Unit 3 | 9–12 | 1–12 | Context Engineering + Battle of the Bots |

Each unit has 4 weeks × 3 days = 12 lessons.

---

## Questions or Issues

Post in the **ChatClass** Slack channel or open a GitHub issue in this repo.
