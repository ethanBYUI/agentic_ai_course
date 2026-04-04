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
├── _variables.yml          # Variables used throughout qmd files (such as repo link)
├── styles.css              # Custom CSS overrides
├── TODO.md                 # To do for devs and instructors
├── Assets/
│   └── Images/             # Logo, images used across the site
├── lessons/
│   ├── unit1.qmd           # Unit 1 overview page
│   ├── lesson1_1.qmd       # Unit 1, Day 1
│   ├── lesson1_2.qmd       # Unit 1, Day 2
│   │   ...
│   ├── lesson1_12.qmd      # Unit 1, Day 12
│   ├── unit2.qmd           # Unit 2 overview page
│   ├── lesson2_1.qmd       # Unit 2, Day 1
│   └── ...
├── examples/               # Examples for in-class use
│   ├── example1_1.qmd      # Unit 1, Day 1
│   └── ...
├── instructor_notes/       # Instructor notes by class day
│   ├── notes1_1.qmd        # Unit 1, Day 1
│   └── ...
├── lecture_slides/         # Slide decks and presentation assets
│   ├── slide1_1.qmd        # Unit 1, Day 1
│   └── ...
├── practice/               # Practice assignments
│   ├── practice1_1.qmd     # Unit 1, Day 1
│   └── ...
├── primers/                # Primer materials
│   ├── slide1_1.qmd        # Unit 1, Day 1
│   └── ...
├── templates/              # Prompt templates
│   └── lesson_template_prompt.md
└── docs/                   # Rendered output — do not edit directly
    ├── lessons/
    ├── instructor_notes/
    │   ...
    └── practice/
```

### Naming Convention

| File | Purpose |
|------|---------|
| `lessons/unit1.qmd` | Unit overview — goal, topics, project, outcomes |
| `lessons/lesson1_1.qmd` | Individual lesson — Unit 1, Day 1 |
| `lessons/lesson2_5.qmd` | Individual lesson — Unit 2, Day 5 |
| `instructor_notes/notes1_1.qmd` | Instructor notes for a specific lesson |
| `practice/practice1_1.qmd` | Practice assignment linked from lesson pages |
| `primers/primer2_1.qmd` | Primer content for Unit 2, Day 1 |
| `lecture_slides/slide2_1.pptx` | Slide deck for Unit 2, Day 1 |
| `examples/example2_1.qmd` | In-class example page for Unit 2, Day 1 |

Additional filename rules:
- Use the same `unit_day` suffix across linked assets for one class meeting (for example: `lesson2_1.qmd`, `practice2_1.qmd`, `primer2_1.qmd`, `slide2_1.pptx`, `example2_1.qmd`).
- Instructor notes follow `notes<unit>_<day>.qmd` (for example: `notes1_1.qmd`).
- Lesson-to-lesson navigation links should target lesson files in `lessons/` (for example: `lesson2_2.qmd`).

Days are numbered **within each unit** (1–12), not across the whole course.

---

## Adding a New Lesson Page

1. Create the file in `lessons/` following the naming convention (e.g., `lessons/lesson2_7.qmd`)
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

## Broken Links

Some links are dependent on the location of the repo, such as links to examples that are meant to open in Google Colab. Some of those breaks were planned for, and can be edited easily in the _variables.yml file.

If other links break, open a GitHub issue so the repo owner can go through and fix them.

---

## Questions or Issues

Post in the **ChatClass** Slack channel or open a GitHub issue in this repo.

---

## Credits

This course was created by:
[James Beeson](https://www.linkedin.com/in/james-m-beeson/)
[Ethan Saline](https://www.linkedin.com/in/ethan-saline/)
[Wil Jones](https://www.linkedin.com/in/wilkin-jones/)
[Ian Blad](https://www.linkedin.com/in/ianblad/)
[Camilla Ramirez](https://www.linkedin.com/in/camila-ramirez-suarez/)
[Kimberly Juarez](https://www.linkedin.com/in/kimberly-juarez-palomino/)