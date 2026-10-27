
const header = document.querySelector("#siteHeader");

if (header) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Scroll behavior
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  // Entrance animation
  if (!reduceMotion && typeof gsap !== "undefined") {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    tl.from(header.querySelector(".navbar-brand"), {
      opacity: 0,
      y: -15,
      duration: 0.7
    })
    .from(header.querySelectorAll(".nav-link"), {
      opacity: 0,
      y: -12,
      duration: 0.5,
      stagger: 0.08,
      clearProps: "all"
    }, "-=0.35")
    .from(header.querySelector(".btn-brand"), {
      opacity: 0,
      x: 15,
      duration: 0.5,
      clearProps: "all"
    }, "-=0.3");
  }
}


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const car = document.getElementById("car").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const whatsappNumber = "201063062413";


const text = `*New Request - CarShield*

*Name:* ${name}
*Phone:* ${phone}
*Vehicle:* ${car}
*Service:* ${service}
*Message:* ${message || "No message provided"}`;


  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Animation for the About section

document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector("#about");

  if (!about) return;

  // Remove previous animation classes
  about.classList.remove("about-motion", "is-visible");

  const elements = [
    about.querySelector(".about-visual"),
    about.querySelector(".eyebrow"),
    about.querySelector("h2"),
    about.querySelector(".body-copy"),
    ...about.querySelectorAll(".check"),
    about.querySelector(".text-link"),
  ].filter(Boolean);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) return;

  // Initial hidden state
  elements.forEach((el, index) => {
    el.classList.remove("opacity-0", "reveal");

    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";

    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    el.style.transitionDelay = `${index * 100}ms`;
  });

  let animated = false;

  function revealAbout() {
    if (animated) return;

    const rect = about.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.8;

    // Start ONLY when scrolling reaches the section
    if (rect.top < triggerPoint && rect.bottom > 0) {
      animated = true;

      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

      window.removeEventListener("scroll", revealAbout);
    }
  }

  // Animation starts on scroll, NOT on page load
  window.addEventListener("scroll", revealAbout, {
    passive: true,
  });
});

// Elevate every drive Animation

document.addEventListener("DOMContentLoaded", () => {
  const services = document.querySelector("#services");

  if (!services) return;

  const heading = services.querySelector(".section-heading");

  const cards = [...services.querySelectorAll(".service-card")].map(
    (card) => card.parentElement,
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !("animate" in Element.prototype)) return;

  // Different directions for each card
  const animations = [
    {
      element: heading,
      transform: "scale(0.9)",
      delay: 0,
    },
    ...cards.map((card, index) => ({
      element: card,
      transform:
        `translateX(${index % 2 === 0 ? -45 : 45}px) ` +
        `rotate(${index % 2 === 0 ? -2 : 2}deg) ` +
        "scale(0.95)",
      delay: 200 + index * 150,
    })),
  ].filter((item) => item.element);

  // Hide elements initially
  animations.forEach(({ element, transform }) => {
    element.style.opacity = "0";
    element.style.transform = transform;
  });

  let animated = false;

  function revealServices() {
    if (animated) return;

    const rect = services.getBoundingClientRect();

    // Trigger when scrolling reaches services
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      animated = true;

      animations.forEach(({ element, transform, delay }) => {
        const animation = element.animate(
          [
            {
              opacity: 0,
              transform,
            },
            {
              opacity: 1,
              transform: "translateX(0) rotate(0deg) scale(1)",
            },
          ],
          {
            duration: 900,
            delay,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );

        animation.onfinish = () => {
          element.style.opacity = "1";
          element.style.transform = "";
          animation.cancel();
        };
      });

      window.removeEventListener("scroll", revealServices);
    }
  }

  // Animation starts on scroll only
  window.addEventListener("scroll", revealServices, {
    passive: true,
  });
});

//Our portfolio section animation

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector("#gallery");

  if (!gallery) return;

  const eyebrow = gallery.querySelector(".eyebrow");
  const title = gallery.querySelector("h2");
  const link = gallery.querySelector(".text-link");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) return;

  const elements = [eyebrow, title, link].filter(Boolean);

  // Hide text only - don't touch gallery images
  elements.forEach((el) => {
    el.style.opacity = "0";
  });

  let animated = false;

  function revealGallery() {
    if (animated) return;

    const rect = gallery.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      animated = true;

      function playAnimation(element, keyframes, options) {
        if (!element) return;

        const animation = element.animate(keyframes, {
          duration: 900,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
          ...options,
        });

        animation.onfinish = () => {
          element.style.opacity = "1";
          animation.cancel();
        };
      }

      // Eyebrow - soft fade
      playAnimation(
        eyebrow,
        [
          { opacity: 0, transform: "translateY(-15px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { delay: 100, duration: 650 },
      );

      // Heading - cinematic text reveal
      playAnimation(
        title,
        [
          {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
          },
        ],
        { delay: 250, duration: 1100 },
      );

      // Link - slide from right
      playAnimation(
        link,
        [
          {
            opacity: 0,
            transform: "translateX(30px)",
          },
          {
            opacity: 1,
            transform: "translateX(0)",
          },
        ],
        { delay: 650, duration: 800 },
      );

      window.removeEventListener("scroll", revealGallery);
    }
  }

  // Starts only when user scrolls
  window.addEventListener("scroll", revealGallery, {
    passive: true,
  });
});

// Animation for Crafted with care

document.addEventListener("DOMContentLoaded", () => {
  const process = document.querySelector("#process");

  if (!process) return;

  const eyebrow = process.querySelector(".eyebrow");
  const title = process.querySelector("h2");
  const description = process.querySelector(".body-copy");

  const steps = [...process.querySelectorAll(".process-list > div")];

  const elements = [eyebrow, title, description, ...steps].filter(Boolean);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !("animate" in Element.prototype)) return;

  // Save original opacity
  const originalOpacity = new Map();

  elements.forEach((el) => {
    originalOpacity.set(el, el.style.opacity);
    el.style.opacity = "0";
  });

  let animated = false;

  function playAnimation(el, keyframes, delay, duration = 800) {
    if (!el) return;

    const animation = el.animate(keyframes, {
      duration,
      delay,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both",
    });

    animation.onfinish = () => {
      el.style.opacity = originalOpacity.get(el);
      animation.cancel();
    };
  }

  function revealProcess() {
    if (animated) return;

    const rect = process.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      animated = true;

      // 1. Eyebrow - Fade In
      playAnimation(eyebrow, [{ opacity: 0 }, { opacity: 1 }], 0, 600);

      // 2. Title - Vertical Wipe Reveal
      playAnimation(
        title,
        [
          {
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
          },
          {
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
          },
        ],
        150,
        850,
      );

      // 3. Description - Soft Slide
      playAnimation(
        description,
        [
          {
            opacity: 0,
            transform: "translateY(15px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        300,
        700,
      );

      // 4. Process Steps - Sequential Wipe
      steps.forEach((step, index) => {
        const delay = 350 + index * 200;

        playAnimation(
          step,
          [
            {
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
            },
            {
              opacity: 1,
              clipPath: "inset(0 0 0 0)",
            },
          ],
          delay,
          850,
        );

        // 5. Arrow movement
        const arrow = step.querySelector("i");

        if (arrow) {
          arrow.animate(
            [
              { transform: "translateX(-10px)" },
              { transform: "translateX(5px)" },
              { transform: "translateX(0)" },
            ],
            {
              duration: 450,
              delay: delay + 650,
              easing: "ease-out",
            },
          );
        }
      });

      window.removeEventListener("scroll", revealProcess);
    }
  }

  // Trigger only on scroll
  window.addEventListener("scroll", revealProcess, {
    passive: true,
  });
});

// Animation for Start your journey

document.addEventListener("DOMContentLoaded", () => {
  const contact = document.querySelector("#contact");

  if (!contact) return;

  const eyebrow = contact.querySelector(".eyebrow");
  const title = contact.querySelector("h2");
  const description = contact.querySelector(".body-copy");
  const details = [...contact.querySelectorAll(".contact-detail")];
  const form = contact.querySelector(".contact-form");
  const button = contact.querySelector(".btn-brand");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !Element.prototype.animate) return;

  const elements = [eyebrow, title, description, ...details, form].filter(
    Boolean,
  );

  // Hide elements until scroll
  const originalOpacity = new Map();

  elements.forEach((el) => {
    originalOpacity.set(el, el.style.opacity);
    el.style.opacity = "0";
  });

  let animated = false;

  function animateElement(el, frames, delay, duration = 850) {
    if (!el) return;

    const animation = el.animate(frames, {
      duration,
      delay,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both",
    });

    animation.onfinish = () => {
      el.style.opacity = originalOpacity.get(el);
      animation.cancel();
    };
  }

  function revealContact() {
    if (animated) return;

    const rect = contact.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      animated = true;

      // 1. Eyebrow - Soft fade
      animateElement(
        eyebrow,
        [
          { opacity: 0, transform: "translateY(-10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        0,
        600,
      );

      // 2. Title - Blur focus
      animateElement(
        title,
        [
          {
            opacity: 0,
            filter: "blur(8px)",
            transform: "scale(0.97)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            transform: "scale(1)",
          },
        ],
        150,
        1000,
      );

      // 3. Description - Smooth fade
      animateElement(
        description,
        [
          { opacity: 0, transform: "translateY(15px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        350,
        700,
      );

      // 4. Contact details - Pop effect
      details.forEach((detail, index) => {
        animateElement(
          detail,
          [
            {
              opacity: 0,
              transform: "scale(0.85) translateY(15px)",
            },
            {
              opacity: 1,
              transform: "scale(1) translateY(0)",
            },
          ],
          500 + index * 180,
          700,
        );
      });

      // 5. Contact form - 3D Tilt Reveal
      animateElement(
        form,
        [
          {
            opacity: 0,
            transform:
              "perspective(1000px) rotateY(8deg) translateX(40px) scale(0.95)",
          },
          {
            opacity: 1,
            transform:
              "perspective(1000px) rotateY(0deg) translateX(0) scale(1)",
          },
        ],
        250,
        1100,
      );

      // 6. Button - Red glow
      if (button) {
        button.animate(
          [
            { boxShadow: "0 0 0 rgba(220, 38, 38, 0)" },
            { boxShadow: "0 0 25px rgba(220, 38, 38, 0.4)" },
            { boxShadow: "0 0 0 rgba(220, 38, 38, 0)" },
          ],
          {
            duration: 1100,
            delay: 1400,
            easing: "ease-in-out",
          },
        );
      }

      window.removeEventListener("scroll", revealContact);
    }
  }

  window.addEventListener("scroll", revealContact, {
    passive: true,
  });
});

