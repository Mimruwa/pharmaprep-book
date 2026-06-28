/* =========================================================
   PharmaPrep Website JavaScript
   File: script.js
   ========================================================= */

(function () {
  "use strict";

  const html = document.documentElement;
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const currentYear = document.getElementById("current-year");
  const revealElements = document.querySelectorAll(".reveal");

  /* ------------------------------
     Enable JS-specific animations
  ------------------------------ */
  html.classList.add("js-enabled");

  /* ------------------------------
     Current Year
  ------------------------------ */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ------------------------------
     Mobile Navigation
  ------------------------------ */
  function openNavigation() {
    body.classList.add("nav-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close navigation menu");
    }
  }

  function closeNavigation() {
    body.classList.remove("nav-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    }
  }

  function toggleNavigation() {
    if (body.classList.contains("nav-open")) {
      closeNavigation();
    } else {
      openNavigation();
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleNavigation);

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeNavigation();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    document.addEventListener("click", function (event) {
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeNavigation();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        closeNavigation();
      }
    });
  }

  /* ------------------------------
     Smooth Anchor Scrolling
  ------------------------------ */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const headerOffset = 82;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  /* ------------------------------
     Reveal On Scroll Animations
  ------------------------------ */
  function showAllRevealElements() {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    showAllRevealElements();
  }

  /* ------------------------------
     Header Shadow On Scroll
  ------------------------------ */
  const siteHeader = document.querySelector(".site-header");

  function updateHeaderState() {
    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 12) {
      siteHeader.style.boxShadow = "0 12px 34px rgba(6, 19, 38, 0.08)";
    } else {
      siteHeader.style.boxShadow = "none";
    }
  }

  updateHeaderState();

  window.addEventListener("scroll", updateHeaderState, {
    passive: true
  });

  /* ------------------------------
     FAQ Behavior
     Keeps FAQ clean by closing others
  ------------------------------ */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) {
        return;
      }

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  /* ------------------------------
     Coming Soon Buy Button Notice
  ------------------------------ */
  const buyButton = document.querySelector("#buy .btn-primary");

  if (buyButton) {
    buyButton.addEventListener("click", function (event) {
      event.preventDefault();

      alert(
        "The full PharmaPrep eBook purchase link is coming soon. For now, you can download the free sample PDF."
      );
    });
  }
})();