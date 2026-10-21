
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
