# Unit 5 — Learning Diary Entry #1: Three JavaScript Ideas
**Course:** COMP266 — Introduction to Web Design
**Student:** Kossi Emile Aholou
**Date:** June 2026

---

## Introduction

Unit 5 asks me to identify three ways JavaScript could meaningfully improve the experience of my portfolio website. Each idea below is directly grounded in the personas and scenarios I developed in Unit 1. Rather than adding interactivity for its own sake, I have chosen features that solve real problems identified by real user types — a student, a recruiter, a developer — who would visit this site with different goals and different levels of patience.

The three ideas together are designed to be implemented as a cohesive set, covering the full range of required JavaScript constructs: variables, arrays, functions, classes and objects, sequence, selection, and iteration. I also intend to make use of regular expressions in Idea 3.

---

## Idea 1 — Dynamic Skills Section with Animated Progress Bars

### What it does

This script will render a full "Skills" section of the portfolio dynamically using JavaScript. Rather than hard-coding each skill bar in HTML, I will define an array of skill objects — each containing a name, a proficiency level (as a percentage), and a category (Frontend, Backend, Tools) — and use a loop and a class to generate the corresponding HTML elements programmatically.

The bars will animate when the user scrolls to the skills section, using the IntersectionObserver API to detect visibility. Each bar grows from 0% to its target width when it enters the viewport, creating a smooth and professional visual effect.

```
Example data structure:
const skills = [
  { name: "JavaScript", level: 80, category: "Frontend" },
  { name: "Python",     level: 70, category: "Backend"  },
  { name: "CSS",        level: 85, category: "Frontend" },
  ...
];
```

### Persona and scenario justification

**Maxwell Adana** (Persona 6, Recruiter) spends less than three minutes on a portfolio. He skims rather than reads, and he explicitly needs to quickly identify a developer's skills and technical level. A visual, animated skills section gives him that overview in seconds — far more efficiently than a bulleted list buried in text. His scenario (Scenario 6) shows him going directly from the homepage to the projects section and then to the contact page: the skills section needs to be immediately readable on the way.

**Amina Okafor** (Persona 2, Front-End Developer) is frustrated by portfolios where "important information is buried in the text" and where there is no evidence of skill development. A skills section that shows both the categories and the levels directly addresses her frustration, and demonstrates that the site owner is thoughtful about presenting technical information clearly.

**Lucas Martin** (Persona 3, Full-Stack Developer) looks for technical details and explicit evidence of a developer's stack. Grouping skills by category (Frontend, Backend, Tools) gives him the structured view he expects.

This idea directly serves the site's core purpose: to tell the story of a developer's technical evolution in a clear and compelling way.

---

## Idea 2 — Multi-Criteria Project Filter with Live Text Search

### What it does

The Projects page currently has a filter by technology (built in Unit 4) that shows or hides cards based on a `data-tech` attribute. This idea significantly extends that functionality by adding a live text search bar. As the user types, the script filters the project cards in real time — combining both the active technology button and the search query simultaneously.

The logic will work as follows: a card is shown only if it matches both the selected technology filter AND contains the search text in its title or description. If no card matches the combined criteria, a message ("No projects match your search") appears automatically. Clearing the search bar or clicking "All" resets the view.

This will require iterating over all cards, reading multiple data attributes, and applying compound conditional logic — making it a meaningful extension of the simpler Unit 4 filter.

### Persona and scenario justification

**Sandra Rodriguez** (Persona 4, Software Engineering Student) is a "butterfly" user who browses between projects and seeks inspiration. She is specifically frustrated by the lack of filters and search options, and by the absence of clear hierarchy between projects. Her scenario (Scenario 2) explicitly shows her using technology filters to compare React implementations — the addition of a text search means she can narrow results even further, for example finding all projects tagged "React" that also mention "hooks" or "API."

**Lucas Martin** (Persona 3) analyzes open-source projects and wants to compare multiple projects quickly. A text search allows him to find specific architectural terms or technologies across the portfolio without reading every card.

**Linh Tran** (Persona 5, Data Science Student) has difficulty finding projects related to a specific topic. She would use the text search to find data visualization or machine learning projects directly, without relying solely on technology tags.

This idea is also strongly supported by Scenario 5 (Amina browsing on her phone and using filters by technology), as combining text search with technology filters makes the experience faster and more precise for any user type.

---

## Idea 3 — Contact Form with Real-Time Validation

### What it does

This script will add complete client-side validation to the contact form. As the user fills in each field, the script checks the input in real time and displays feedback directly below the field — either a green confirmation or a clear error message. The submission button remains disabled until all fields pass validation.

The validation rules are:
- **Name field**: must not be empty and must contain at least two characters
- **Email field**: must match a standard email format, validated using a regular expression
- **Message field**: must contain at least 20 characters; a character counter will display the current count

The email regex will be written and explained explicitly in the code comments, as it is one of the more advanced techniques the course expects students to demonstrate.

```
Example regex for email:
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

When all fields are valid, the submit button activates and a success message appears. No data is actually sent (no backend), but the validation logic is complete and fully functional on the client side.

### Persona and scenario justification

**Maxwell Adana** (Persona 6) needs to be able to contact the developer quickly and efficiently. His scenario ends with him going to the Contact page — if the form is broken, unclear, or confusing, he moves on. A form with real-time, friendly feedback removes all friction from that final step. Clear error messages (not just a generic "form invalid") match his expectation of a professional, well-designed site.

**Amina Okafor** (Persona 2) is frustrated by the absence of clear calls-to-action. A well-designed, validated contact form is itself a call-to-action — it signals to visitors that contact is easy, expected, and taken seriously. For a developer portfolio, the contact form is also evidence of technical skill: a form that validates intelligently says more than one that doesn't.

From a technical standpoint, this idea introduces regular expressions into the project, which the Unit 5 instructions explicitly list as an advanced technique that can improve the grade. It also demonstrates good accessibility practice: error messages are text-based (not just colour-based), the submit button state is meaningful, and the character counter provides immediate, useful feedback.

---

## Summary

| Idea | Primary Personas | Key JS Concepts |
|------|-----------------|-----------------|
| 1 — Animated Skills Section | Maxwell, Amina, Lucas | Arrays, classes, loops, IntersectionObserver, DOM |
| 2 — Multi-Criteria Project Filter | Sandra, Lucas, Linh, Amina | Arrays, loops, compound conditions, events, DOM |
| 3 — Contact Form Validation | Maxwell, Amina | Functions, regex, events, conditions, DOM, variables |

Together, these three ideas cover all required Unit 5 constructs (sequence, selection, iteration, variables, arrays, functions, classes and objects), include at least one use of regular expressions (extra marks), and are grounded in six of the six personas defined in Unit 1. Each idea makes the site more useful, more readable, and more professional for a clearly defined type of visitor.
