# Unit 5 — Learning Diary Entry #2: Coding Reflection
**Course:** COMP266 — Introduction to Web Design
**Student:** Kossi Emile Aholou
**Date:** June 2026

---

## What This Step Asked Me to Do

Step 3 of Unit 5 required me to implement the three JavaScript programs I had designed in Step 2 and discussed with my professor in Step 1. Each script had to make meaningful use of the required programming constructs — variables, arrays, functions, classes and objects, loops, and conditions — and all code had to be clearly commented to demonstrate understanding.

The three scripts I implemented are:

1. **Script 1** — A dynamic Skills section with animated progress bars, rendered from a JavaScript array using a class and triggered by the IntersectionObserver API.
2. **Script 2** — A multi-criteria project filter combining technology buttons with a live text search bar, extending the Unit 4 filter.
3. **Script 3** — A contact form with real-time field validation, including email format checking with a regular expression.

---

## Script 1 — Dynamic Skills Section

### How it works

The script starts with a global array called `skills`, where each element is an object containing a `name`, a `level` (percentage), and a `category` (Frontend, Backend, or Tools). Rather than writing the HTML for each skill bar by hand, I wrote a `Skill` class whose `render()` method produces the HTML string for one bar dynamically.

The `groupByCategory()` function takes the array and returns a plain object whose keys are category names — this is how I organised the bars into three visual groups without hardcoding the groups themselves. The `renderSkills()` function then loops over those groups and calls `new Skill(...)` and `.render()` for each entry, building up a long HTML string that gets injected into the page in one shot.

The animation is handled separately. `animateBar()` simply sets a bar's CSS `width` to its `data-level` attribute value — the smooth growing effect comes from a CSS `transition` defined in the stylesheet. The `initObserver()` function uses the IntersectionObserver API to wait until the skills section is at least 20% visible before triggering the animation, so visitors who never scroll down never see a half-finished animation.

### What I learned

The most important thing I understood writing this script is the difference between **data** and **presentation**. The `skills` array is just data — it has no opinion about how it looks. The `Skill` class is the bridge between the data and the DOM. Changing a skill level in the array automatically changes the bar the next time the page loads, without touching any HTML directly.

I also learned that the IntersectionObserver is a much cleaner solution than the older approach of listening to the `scroll` event and doing manual calculations. It tells you when something enters the viewport and lets you stop watching — which is exactly what `observer.unobserve()` does after the first animation.

---

## Script 2 — Multi-Criteria Project Filter with Live Text Search

### How it works

This script extends the Unit 4 filter in a significant way. Unit 4's filter worked on a single criterion — the technology tag on each card. Script 2 adds a second criterion: a live text search bar that filters simultaneously.

Two global variables — `currentFilter` and `searchQuery` — act as the shared state of the page. Every time either one changes (a button click or a keystroke), `applyFilters()` is called. That function loops over all project cards and evaluates two boolean conditions: `techMatch` (does the card's `data-tech` attribute match the active filter?) and `textMatch` (does the card's title or description contain the search text?). A card is shown only if **both** conditions are true.

This compound conditional logic is the most important programming pattern in the script. It means a visitor can type "API" in the search bar while the "React" filter is active and only see React projects that mention APIs — a precise, useful result.

The `showNoResults()` function watches the running count of visible cards. If every card is hidden, a message appears: *"No projects match your search."* This is a small but important usability detail — without it, the user sees a blank grid and does not know whether they made a mistake or whether the site is broken.

### What I learned

The biggest lesson here was the importance of **separating concerns**. Rather than putting all logic inside the click listener as I did in Unit 4, I split the responsibilities: `setFilter()` updates the state, `setSearch()` updates the state, and `applyFilters()` reads the state and updates the DOM. None of these functions does more than one thing. That made the code much easier to read and to test — I could change the filter and the search independently without one breaking the other.

---

## Script 3 — Contact Form with Real-Time Validation

### How it works

The script validates three fields in real time: name, email, and message. A global `formState` object tracks whether each field is currently valid. The submit button starts disabled and only becomes active when all three properties in `formState` are `true`.

Each field has its own validation function, attached to the `input` event so it fires on every keystroke. `validateName()` checks the length. `validateEmail()` uses a regular expression: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. This pattern checks for characters before the `@`, a domain name after it, a dot, and an extension — and rejects anything with spaces, which are not valid in email addresses. `validateMessage()` checks the length and also updates a live character counter below the textarea.

The `showFeedback()` function is shared between all three validators. It writes a short text message below the field and applies either the `valid` CSS class (green) or the `invalid` CSS class (red). Importantly, the feedback is always text — not just a colour change — which makes it readable for users who cannot distinguish colours.

### What I learned

Writing the email regex was the most technically challenging part of Unit 5. Regular expressions look intimidating at first, but once I broke the pattern into its parts — what each character or group of characters means — it became readable. The key insight is that `[^\s@]` means "any character except a space or an @", which is a precise and correct description of what an email segment looks like.

I also learned something about user experience. A form that does nothing until you click Submit — then shows a wall of red errors — is frustrating. Real-time validation changes the dynamic: each field gives feedback the moment the user finishes typing, so errors are fixed immediately rather than discovered all at once at the end.

---

## How the Code Serves the Personas

All three scripts were built with specific visitors in mind, not as abstract technical exercises.

**Maxwell Adana** (Recruiter, Persona 6) visits the contact page to reach out quickly. The form validation removes all friction from that final step. He cannot accidentally submit an empty or malformed email address, and the button state makes it clear exactly when the form is ready to send.

**Amina Okafor** (Front-End Developer, Persona 2) values polish and evidence of technical skill. Animated progress bars, a validated form, and a project filter that responds instantly to typing are exactly the kind of thoughtful details that signal a careful developer.

**Sandra Rodriguez** (Student, Persona 4) and **Linh Tran** (Data Science Student, Persona 5) use the project filter. Sandra can combine a technology filter with a keyword search to find exactly the kinds of projects she is looking for. Linh can type "machine learning" or "data" and find relevant projects without needing to scroll through everything.

**Lucas Martin** (Full-Stack Developer, Persona 3) benefits from the Skills section. He can see at a glance how the developer's stack is distributed across Frontend, Backend, and Tools, without reading through a text-based resume.

---

## Critique and Limitations

### Strengths

The three scripts work well together and cover the full range of Unit 5 requirements. The code is consistently commented, the functions are small and focused, and the user-facing behaviour is smooth and accessible.

### Weaknesses

**Script 1:** The IntersectionObserver is not supported in very old browsers (Internet Explorer 11 and below). A fallback could be added by calling `renderSkills()` directly after a short delay if the API is unavailable. In practice this is unlikely to matter for a developer portfolio, whose visitors are likely to be developers using modern browsers.

**Script 2:** The text search uses `indexOf()`, which does exact substring matching. It would not find "react" if the user types "Reac" without a lowercase match. Adding a `.toLowerCase()` on both sides — which the script already does — solves this, but it still cannot handle typos. A more advanced implementation could use fuzzy matching.

**Script 3:** The form performs client-side validation only. No data is actually sent anywhere. In a real application, server-side validation would also be required, because client-side JavaScript can be bypassed. For the scope of this course, client-side validation is sufficient and appropriate.

---

## Evidence

- Script 1 (Skills): `skills.html` — `<script>` block at bottom of `<body>`
- Script 2 (Filter): `projects.html` — `<script>` block at bottom of `<body>`
- Script 3 (Contact): `contact.html` — `<script>` block at bottom of `<body>`
- Shared styles for all three scripts: `css/style.css` (Unit 5 sections at bottom of file)

---

## Resources Consulted

All three scripts were written as original work. The following references were consulted during the learning and implementation process. No code was copied directly; these sources informed my understanding of specific APIs, methods, and patterns that I then applied independently.

**Script 1 — Dynamic Skills Section with Animated Progress Bars**

- MDN Web Docs — Intersection Observer API  
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API  
  *Used to understand how to detect when an element enters the viewport, which is the basis for the scroll-triggered animation in `initObserver()`.*

- MDN Web Docs — JavaScript Classes  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes  
  *Consulted to understand class syntax and the constructor/method pattern used in the `Skill` class.*

- MDN Web Docs — Array.prototype.forEach()  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach  
  *Used throughout all three scripts for iterating over arrays and NodeLists.*

**Script 2 — Multi-Criteria Project Filter with Live Text Search**

- MDN Web Docs — Document.querySelectorAll()  
  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll  
  *Used to select all project cards and filter buttons by CSS class.*

- MDN Web Docs — String.prototype.indexOf()  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf  
  *Used in `applyFilters()` to check whether the search query appears in a card's title or description.*

- MDN Web Docs — HTMLElement.dataset  
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset  
  *Used to read the `data-tech` attribute on each project card for the technology filter.*

**Script 3 — Contact Form with Real-Time Validation**

- MDN Web Docs — Regular Expressions  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions  
  *Used to understand regex syntax before writing the email validation pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.*

- Stack Overflow — "How can I validate an email address in JavaScript?"  
  https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript  
  *Consulted to understand common approaches to email regex validation. The pattern I used is a widely referenced minimal email regex; I understood each component before applying it (see the code comments in `contact.html`).*

- MDN Web Docs — EventTarget.addEventListener()  
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener  
  *Used to understand how to attach `input` events to form fields for real-time feedback.*

**General JavaScript Reference**

- W3Schools JavaScript Tutorial  
  https://www.w3schools.com/js/  
  *Used as a quick reference for syntax across all three scripts, particularly for event handling and DOM manipulation basics.*
