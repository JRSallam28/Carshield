
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

  const whatsappNumber = "01015090067";


const text = `*New Quote Request - CarShield*

*Name:* ${name}
*Phone:* ${phone}
*Vehicle:* ${car}
*Service:* ${service}
*Message:* ${message || "No message provided"}`;


  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

