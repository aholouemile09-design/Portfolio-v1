/* ============================================================
   main.js — Unit 6 jQuery Features (shared across all pages)
   COMP266 — Kossi Emile Aholou

   Features implemented in this file:
     1. Sticky Navigation Bar      — $(window).scroll() + addClass/removeClass
     2. Smooth Scroll              — $('a[href^="#"]') + animate scrollTop
     3. Back-to-Top Button         — fadeIn/fadeOut + animate scrollTop: 0
     4. Fade-In Sections on Scroll — $(window).scroll() + fadeIn()

   Libraries used:
     - jQuery 3.7.1 (local copy: scripts/jquery-3.7.1.min.js)

   Source reference:
     - jQuery API Documentation: https://api.jquery.com/
     - jQuery .animate(): https://api.jquery.com/animate/
     - jQuery .scroll(): https://api.jquery.com/scroll/
     - jQuery .fadeIn() / .fadeOut(): https://api.jquery.com/fadein/
   ============================================================ */

$(document).ready(function () {

  /* ----------------------------------------------------------
     FEATURE 1 — STICKY NAVIGATION BAR
     When the user scrolls past 80px, the class 'scrolled' is
     added to the <header>. The CSS uses this class to shrink
     the navbar and add a drop shadow, giving a polished sticky
     effect without losing the original layout.

     Persona: All visitors benefit — keeps navigation accessible
     at all times without wasting screen space.
  ---------------------------------------------------------- */
  var $header = $('header');
  var stickyOffset = 80; // pixels before sticky kicks in

  $(window).scroll(function () {
    if ($(this).scrollTop() > stickyOffset) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
  });


  /* ----------------------------------------------------------
     FEATURE 3 — SMOOTH SCROLL
     Intercepts clicks on any internal anchor link (href="#...").
     Instead of the browser's instant jump, animates the page
     scroll to the target element over 600ms.

     Persona: Sandra Rodriguez (Persona 4) and all visitors who
     use the in-page navigation — a smoother, more professional
     experience than the browser default.
  ---------------------------------------------------------- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');

    // Only act if the target element actually exists on the page
    if (target !== '#' && $(target).length) {
      e.preventDefault();
      $('html, body').animate(
        { scrollTop: $(target).offset().top - 70 }, // 70px offset for sticky header
        600,
        'swing'
      );
    }
  });


  /* ----------------------------------------------------------
     FEATURE 4 — BACK-TO-TOP BUTTON
     A button is injected into the DOM by jQuery — no HTML
     needed in each page. It fades in after the user scrolls
     300px down, and fades out near the top. Clicking it
     animates the scroll back to the top over 500ms.

     Persona: Maxwell Adana (Persona 6) and any visitor on a
     long page who wants to get back to the navigation quickly.
  ---------------------------------------------------------- */

  // Inject the back-to-top button into the page
  $('body').append('<button id="back-to-top" title="Back to top"><i class="fa-solid fa-chevron-up"></i></button>');

  var $backToTop = $('#back-to-top');

  // Show or hide the button based on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $backToTop.fadeIn(300);
    } else {
      $backToTop.fadeOut(300);
    }
  });

  // Scroll back to the top when clicked
  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500, 'swing');
  });


  /* ----------------------------------------------------------
     FEATURE 6 — FADE-IN SECTIONS ON SCROLL
     Each element with the class 'fade-in-section' starts
     invisible (opacity 0, translateY 30px via CSS). When it
     enters the viewport, jQuery adds the class 'visible',
     triggering the CSS transition that fades it in and slides
     it up to its natural position.

     This is a lightweight approach: jQuery handles the scroll
     detection, CSS handles the visual transition (better
     performance than animating with jQuery directly).

     Persona: Amina Okafor (Persona 2) appreciates the polished,
     professional feel. All visitors benefit from the visual
     hierarchy that the staggered reveal creates.
  ---------------------------------------------------------- */
  function checkFadeIn() {
    var windowBottom = $(window).scrollTop() + $(window).height();

    $('.fade-in-section').each(function () {
      var elementTop = $(this).offset().top + 60; // 60px threshold before triggering

      if (windowBottom > elementTop) {
        $(this).addClass('visible');
      }
    });
  }

  // Run once on load (in case sections are already in view)
  checkFadeIn();

  // Run on every scroll event
  $(window).scroll(function () {
    checkFadeIn();
  });

}); // end document.ready
