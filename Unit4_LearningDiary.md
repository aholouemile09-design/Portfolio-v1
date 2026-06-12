# Unit 4 — Learning Diary Entry
**Course:** COMP266 — Introduction to Web Design  
**Student:** Kossi Emile Aholou  
**Date:** May 2026

---

## What This Unit Asked Me to Do

Unit 4 introduced JavaScript — the third and final layer of web development, after HTML (structure) and CSS (presentation). The task was to find an existing piece of open-source JavaScript code, incorporate it into my portfolio website, explain how it works, reflect critically on it, and modify it to better serve my users.

Unlike HTML and CSS, JavaScript is a real programming language. It adds behaviour and interactivity to a page — things like responding to clicks, showing or hiding content, and updating what the user sees without reloading the page. That shift in thinking — from describing what a page looks like to writing logic about what it does — was the most important thing I took away from this unit.

---

## The JavaScript I Chose — and Why

I chose to implement a **project filter by technology**, which lets visitors on my Projects page click a button (React, Python, JavaScript, etc.) to show only the projects that match that category.

The source I adapted from is the MDN Web Docs documentation on `querySelectorAll`:  
**URL:** https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll  
**License:** CC0 (public domain) — freely reusable without restriction

I chose this feature specifically because of the two personas I defined in Unit 1.

**Malik Johnson** (22, Computer Science student, mobile user) gets frustrated when he has to scroll through content that isn't relevant to him. He comes to a portfolio site to find projects quickly. A filter lets him go straight to what he cares about — say, JavaScript projects — without reading through everything else. That directly solves one of his main pain points.

**Amina Okafor** (27, Front-End Developer) wants the site to feel polished and demonstrate real technical capability. A working interactive filter tells any visitor — including potential employers — that the developer behind this portfolio understands how JavaScript actually behaves in the browser.

The choice wasn't random. It was a response to real user needs.

---

## How the Code Works

Here is the full script as it appears in my `projects.html` file:

```javascript
function filterProjects(tech) {
    var cards = document.querySelectorAll('.project-card');
    var buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.filter === tech) {
            btn.classList.add('active');
        }
    });

    cards.forEach(function(card) {
        if (tech === 'all' || card.dataset.tech === tech) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterProjects(this.dataset.filter);
    });
});
```

**Step by step:**

`document.querySelectorAll('.project-card')` collects all the HTML elements that have the class `project-card` into a list. It works the same way a CSS selector does — `.project-card` in CSS targets those same elements visually; here, JavaScript grabs them so we can control them programmatically.

The first `forEach` loop goes through every filter button and removes the `active` class from all of them, then adds it back only to the one that matches the filter that was clicked. This is what makes the active button appear darker — the CSS rule `.filter-btn.active` handles the visual change, but JavaScript is what decides which button gets that class.

The second `forEach` loop goes through every project card and checks its `data-tech` attribute. Each card in the HTML has been tagged like this: `data-tech="react"` or `data-tech="python"`. If that attribute matches the selected filter — or if the filter is `"all"` — the card is shown (`display: block`). Otherwise it is hidden (`display: none`).

`addEventListener('click', ...)` is what connects the buttons to the function. Without it, the function would exist in the code but nothing would ever call it. The event listener "watches" for a user click and triggers `filterProjects` each time one happens, passing along the value of `data-filter` from the button that was clicked.

---

## Critique of the Original Code

**Strengths:**

The script is clean and readable. The use of `querySelectorAll` with `forEach` is a modern, straightforward approach that works consistently across all major browsers. The logic is easy to follow — even someone new to JavaScript can read it and understand what each block does. The separation between the function definition and the event binding at the bottom also makes the code easier to maintain.

**Weaknesses:**

The original MDN-based approach only handled showing and hiding elements. It had no concept of which button was currently active — there was no visual feedback for the user about what filter was selected. This is a usability problem: if nothing on the screen tells you what you clicked, the interaction feels broken or unclear.

Additionally, the use of `var` instead of `const` or `let` is slightly outdated. Modern JavaScript (ES6 and later) recommends `const` for values that don't change and `let` for values that do. Using `var` works, but it has looser scoping rules that can cause unexpected bugs in more complex scripts.

Finally, the filter only works on exact string matches. If a card's `data-tech` attribute were slightly different in spelling or casing — `"React"` vs `"react"` — the filter would silently fail. A more robust version would normalize both strings to lowercase before comparing them.

---

## What I Modified — and Why

I added the **active button state management** — the three lines that remove and re-add the `active` CSS class on the buttons. This was not part of the original MDN example.

```javascript
buttons.forEach(function(btn) {
    btn.classList.remove('active');
    if (btn.dataset.filter === tech) {
        btn.classList.add('active');
    }
});
```

I also added the corresponding CSS rule:

```css
.filter-btn.active {
    background-color: #1a1a2e;
}
```

The reason is directly tied to Malik's persona. He is a mobile user who moves quickly. If he clicks "Python" and nothing visually confirms that the filter is now active, he might click it again or assume nothing happened. The active state gives him immediate, clear feedback — the button he selected turns darker, so he always knows what filter is on. That small addition makes the interaction trustworthy.

This modification also connects to a fundamental principle of good interface design: **every user action should have a visible response**. JavaScript makes that possible here — and it was the right place to use it.

---

## What I Learned About JavaScript

The most important thing I understood in this unit is that HTML, CSS, and JavaScript each have a distinct job, and none of them should try to do another's job.

HTML defines what exists on the page. CSS describes how it looks. JavaScript decides how it behaves. In the filter script, this separation is very visible: the cards are defined in HTML with `data-tech` attributes, the `.active` style is defined in CSS, and JavaScript is the only layer that actually moves between those states based on what the user does.

I also learned that JavaScript is fundamentally event-driven. Nothing happens until a user does something. The code sits quietly until a click is detected — then it runs, does its work, and goes back to waiting. Understanding that mental model made the `addEventListener` pattern click into place for me.

Finally, writing real JavaScript code — even a short script — showed me that programming is not just about knowing syntax. It's about thinking through a sequence of steps: what do I need to collect? What condition do I check? What do I change? That structured way of thinking is what makes JavaScript different from HTML and CSS, and it's what I'll be building on in future units.

---

## Evidence

- JavaScript filter script: `projects.html` (lines 118–148, `<script>` block at bottom of `<body>`)
- Active button CSS: `css/style.css` (`.filter-btn.active` rule)
- `data-tech` attributes: all six `.project-card` elements in `projects.html`
- Website archive for Unit 4: attached as `Unit4_site_code.zip`
