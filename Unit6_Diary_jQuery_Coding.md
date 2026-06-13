# Unit 6 — Learning Diary: jQuery Implementation
**Course:** COMP266 — Introduction to Web Design
**Student:** Kossi Emile Aholou
**Date:** June 2026

---

## What This Unit Asked Me to Do

Unit 6 required me to extend my portfolio website with jQuery-powered interactivity. Based on the proposal I submitted and received feedback on, I implemented seven features using jQuery 3.7.1 and jQuery UI 1.13.3. Both libraries are stored as local copies in a `scripts/` folder rather than loaded from a CDN, which means the site works offline and does not depend on a third-party server.

The seven features are:

1. Sticky Navigation Bar
2. Animated Statistics Counter
3. Smooth Scroll
4. Back-to-Top Button
5. Resume Accordion (jQuery UI)
6. Fade-In Sections on Scroll
7. Tooltips on Skill Items (jQuery UI)

Features 1, 3, 4, and 6 are shared across all six pages and live in a single file: `scripts/main.js`. Features 2, 5, and 7 are page-specific and are written as inline `<script>` blocks at the bottom of `index.html`, `resume.html`, and `skills.html` respectively. This separation keeps the shared code in one maintainable place while keeping page-specific logic close to the HTML it affects.

---

## Feature 1 — Sticky Navigation Bar

### How it works

When the user scrolls more than 80 pixels down the page, jQuery adds the CSS class `scrolled` to the `<header>` element. When the user scrolls back up past that threshold, the class is removed. The visual change — a reduced padding, a darker background, and a drop shadow — is handled entirely by CSS transitions, not by jQuery's `.animate()`. This is intentional: CSS transitions are GPU-accelerated and produce smoother results than jQuery animation for properties like `padding` and `box-shadow`.

```javascript
$(window).scroll(function () {
  if ($(this).scrollTop() > 80) {
    $header.addClass('scrolled');
  } else {
    $header.removeClass('scrolled');
  }
});
```

### What I learned

The key insight here is that jQuery and CSS work best together rather than in competition. jQuery is good at detecting conditions (how far has the user scrolled?); CSS is good at describing visual states (what does the navbar look like when scrolled?). Mixing the two — using jQuery to toggle a class, CSS to define what that class means — is a cleaner pattern than animating every property individually in JavaScript.

I also learned about the importance of `position: sticky` in CSS, which keeps the header in the flow of the document until it would scroll off screen, at which point the browser pins it. This avoids the layout shifts that older `position: fixed` approaches caused.

---

## Feature 2 — Animated Statistics Counter

### How it works

The statistics bar on `index.html` shows years of experience and number of degrees. For the numeric values, I added `data-target` and `data-suffix` attributes to each `.stat-number` element. jQuery's `$({}).animate()` method — which can animate any numeric property of a plain object, not just CSS — is used to count from 0 to the target value. A `step` callback fires on every animation frame and writes the current integer into the element.

```javascript
$({ val: 0 }).animate(
  { val: target },
  {
    duration: 1500,
    easing: 'swing',
    step: function () {
      $el.text(Math.ceil(this.val) + suffix);
    }
  }
);
```

A scroll listener with a `counted` boolean flag triggers the animation once — the first time the stats bar scrolls into the viewport. The listener removes itself after the first run using jQuery's namespaced event syntax (`.off('scroll.counter')`), which prevents it from firing on every subsequent scroll event.

### What I learned

I had not used `$({}).animate()` before — I had only seen jQuery used to animate CSS properties. Learning that `.animate()` works on any numeric property of a JavaScript object, not just CSS, was a revelation. It turns jQuery's animation engine into a general-purpose numeric interpolator, which opens up many creative uses beyond visual transitions.

The namespaced event (`.on('scroll.counter')` / `.off('scroll.counter')`) was also new to me. Namespacing lets you attach and detach a specific listener without removing other listeners on the same event, which is important in a codebase where multiple scripts listen to the same event.

---

## Feature 3 — Smooth Scroll

### How it works

Any anchor link whose `href` starts with `#` is intercepted by jQuery. Instead of letting the browser jump instantly to the target, the default behaviour is prevented and `$('html, body').animate({ scrollTop: targetOffset })` scrolls the page smoothly over 600 milliseconds. A 70-pixel offset is subtracted from the target position to account for the sticky navbar, so the destination section is not hidden behind the header.

```javascript
$('a[href^="#"]').on('click', function (e) {
  var target = $(this).attr('href');
  if (target !== '#' && $(target).length) {
    e.preventDefault();
    $('html, body').animate(
      { scrollTop: $(target).offset().top - 70 },
      600, 'swing'
    );
  }
});
```

### What I learned

The `href^="#"` CSS attribute selector — "href starts with #" — was a useful pattern. It targets only internal anchor links, not external links or `href="#"` placeholder links, without needing to add a class to each element.

I also learned that `e.preventDefault()` must be called before the animation — not after — because the browser's default jump happens synchronously when the click fires, before any asynchronous code runs.

---

## Feature 4 — Back-to-Top Button

### How it works

Rather than adding a button manually to all six HTML files, the button is injected into every page's `<body>` by jQuery with a single `$('body').append(...)` call in `main.js`. This is a practical example of progressive enhancement: the button does not exist in the HTML source and requires JavaScript to appear, which is appropriate for a non-essential convenience feature. The button fades in after 300 pixels of scroll and fades out near the top. Clicking it animates the scroll back to the top over 500 milliseconds.

### What I learned

Injecting an element via jQuery rather than duplicating HTML across files is a maintenance decision as much as a technical one. If the button's markup needs to change — for example, to update the icon — I only need to change one line in `main.js`, not six separate HTML files. This reinforced the principle of keeping a single source of truth.

---

## Feature 5 — Resume Accordion (jQuery UI)

### How it works

The resume page has seven sections: Education, Professional Experience, Technical Skills, Academic Projects, Volunteer Experience, Languages, and Certifications. Rather than rewriting the HTML to match jQuery UI's expected accordion structure, I used jQuery to reorganise the existing DOM at runtime:

1. The decorative `<hr>` dividers are removed.
2. For each `.resume-block`, the `<h3>` title is extracted, the remaining content is wrapped in a panel `<div>`, and the `<h3>` is re-prepended — now in the format jQuery UI expects.
3. All blocks are wrapped in a single container `<div id="resume-accordion">`.
4. `.accordion()` is called on that container.

This approach means the resume still reads correctly if JavaScript is disabled — it falls back to the original stacked layout.

```javascript
$blocks.each(function () {
  var $block  = $(this);
  var heading = $block.find('h3.resume-section-title').text();
  $block.find('h3.resume-section-title').remove();
  $block.wrapInner('<div class="accordion-panel"></div>');
  $block.prepend('<h3>' + heading + '</h3>');
});
$blocks.wrapAll('<div id="resume-accordion"></div>');
$('#resume-accordion').accordion({ collapsible: true, active: 0, heightStyle: 'content' });
```

### What I learned

This was the most architecturally interesting feature. I learned the difference between building jQuery UI widgets from scratch in HTML versus constructing them dynamically from existing content. The dynamic approach requires a deeper understanding of what jQuery UI expects (an alternating sequence of headers and content `<div>` elements), but it avoids duplicating or restructuring content that already exists and is well-organised.

I also learned to override jQuery UI's default visual theme by adding specific CSS rules that target the accordion's generated class names. jQuery UI uses a well-documented set of class names (`ui-accordion-header`, `ui-accordion-content`, etc.) which makes theming predictable.

---

## Feature 6 — Fade-In Sections on Scroll

### How it works

Sections marked with the CSS class `fade-in-section` start invisible (`opacity: 0`, `transform: translateY(30px)`). A scroll listener checks, on every scroll event, whether each such section has entered the viewport. When a section's top edge is within the window, the class `visible` is added, which triggers a CSS transition that fades the section in and slides it up into its natural position.

Like Feature 1, the visual transition is handled by CSS rather than jQuery's `.animate()`. jQuery only adds the class at the right moment; CSS handles the smoothness.

### What I learned

This feature reinforced the lesson from Feature 1: jQuery and CSS transitions are complementary tools. jQuery's scroll detection is straightforward; CSS transitions are smooth and performant. Using both together produces a result that would be harder to achieve with either alone.

I also noticed the importance of calling `checkFadeIn()` once on page load, before any scrolling happens. Without this, sections that are already in the viewport when the page opens (such as the hero section) would remain invisible until the user scrolls.

---

## Feature 7 — Tooltips on Skill Items (jQuery UI)

### How it works

Each skill in the `skills` array was extended with a `tooltip` property — a short text description of what that skill covers. The `Skill` class's `render()` method was updated to include this text as the `title` attribute on each `.skill-item` element. After `renderSkills()` (from Unit 5) has injected all skill bars into the DOM, jQuery UI's `.tooltip()` is initialised on the `#skills-container`, targeting any element with a `title` attribute. jQuery UI replaces the browser's native tooltip with a styled, animated popup that matches the portfolio's design.

### What I learned

This feature showed me how jQuery UI's widget system builds on top of native HTML attributes. The `title` attribute is standard HTML — browsers already use it for native tooltips. jQuery UI intercepts that attribute and replaces the plain browser behaviour with something more visually refined and controllable. This is a good example of progressive enhancement: the skill description is still accessible as a native `title` tooltip if jQuery UI fails to load.

I also learned that initialising a jQuery UI widget after dynamically generated content (from Unit 5's JavaScript) requires waiting for that content to be in the DOM. Since both scripts run on `DOMContentLoaded` / `document.ready`, and the Unit 5 script runs synchronously before jQuery's `ready` callback, the elements are already there when `.tooltip()` is called.

---

## How the Features Serve the Personas

**Maxwell Adana** (Persona 6, Recruiter) benefits most from the sticky navbar — navigation is always available — and the animated counter, which gives him an instant visual summary (5+ years, 2 degrees) before he reads anything. The back-to-top button lets him navigate long pages quickly.

**Amina Okafor** (Persona 2, Front-End Developer) values the polished feel created by smooth scroll, fade-in sections, and the tooltips on skill items. The tooltips in particular give her the precise, detailed view of each skill's scope that she expects from a technically minded developer's portfolio.

**Lucas Martin** (Persona 3, Full-Stack Developer) benefits from the resume accordion, which lets him jump directly to the section he cares about (Technical Skills or Academic Projects) without scrolling through the full CV. The skill tooltips give him the depth of information he looks for.

**Sandra Rodriguez** (Persona 4, Student) and **Linh Tran** (Persona 5, Data Science Student) benefit from the fade-in effect, which gives the projects page a sense of progressive reveal rather than a static dump of cards.

---

## Critique and Limitations

### Strengths

The seven features work together coherently. The shared code in `main.js` is well-organised and heavily commented. Features that affect all pages are written once and applied everywhere. Features that are page-specific are co-located with their HTML. jQuery UI's accessibility features (ARIA roles, keyboard navigation) are inherited automatically for the accordion and tooltips.

### Weaknesses

**Performance:** The scroll event listener in `main.js` fires on every scroll tick, which can be many times per second. A production implementation would use `requestAnimationFrame` throttling or the IntersectionObserver API (as used in Unit 5's skills animation) rather than the raw `scroll` event. For a portfolio site with light content, this is not a practical problem, but it is worth noting.

**Accordion and print:** When the resume is printed, the accordion sections that are collapsed will not appear in the printed output. A print stylesheet that forces all accordion panels open would be needed for a production resume page.

**Tooltip on mobile:** jQuery UI tooltips respond to hover events, which do not exist on touchscreens. Mobile visitors will not see the skill descriptions. A tap-to-reveal mechanism or always-visible description would be needed for a fully mobile-accessible implementation.

---

## Resources Consulted

All features were written as original work. The following references were consulted during implementation. No code was copied directly.

**jQuery**

- jQuery API Documentation — `.scroll()`, `.addClass()`, `.removeClass()`
  https://api.jquery.com/scroll/
  *Used to understand the scroll event and class manipulation for the sticky navbar and fade-in features.*

- jQuery API Documentation — `.animate()`
  https://api.jquery.com/animate/
  *Used to understand how to animate a plain object's properties for the statistics counter, and how to animate `scrollTop` for smooth scroll and back-to-top.*

- jQuery API Documentation — `.on()` and `.off()` with event namespacing
  https://api.jquery.com/on/
  *Used to understand how to attach and detach named scroll listeners without affecting other listeners on the same event.*

- jQuery API Documentation — `.fadeIn()`, `.fadeOut()`
  https://api.jquery.com/fadein/
  *Used for the back-to-top button show/hide behaviour.*

- jQuery API Documentation — `.wrapAll()`, `.wrapInner()`, `.prepend()`
  https://api.jquery.com/wrapall/
  *Used to restructure the resume DOM dynamically for the accordion.*

**jQuery UI**

- jQuery UI Accordion Documentation
  https://jqueryui.com/accordion/
  *Used to understand the expected DOM structure, available options (`collapsible`, `heightStyle`, `animate`), and generated CSS class names for theming.*

- jQuery UI Tooltip Documentation
  https://jqueryui.com/tooltip/
  *Used to understand the `items` option, `position` configuration, and show/hide effects.*

- jQuery UI CSS Framework — Theming
  https://api.jqueryui.com/theming/css-framework/
  *Consulted to identify the correct class names to override for custom accordion and tooltip styles.*

**General Reference**

- MDN Web Docs — CSS position: sticky
  https://developer.mozilla.org/en-US/docs/Web/CSS/position
  *Consulted to understand how `position: sticky` works in combination with the scroll-triggered class added by jQuery.*

- MDN Web Docs — CSS transition
  https://developer.mozilla.org/en-US/docs/Web/CSS/transition
  *Used to understand how to pair CSS transitions with jQuery class toggles for smooth visual effects.*
