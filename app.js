// DGLF site JS — navigation, smooth scroll, mobile menu, year auto-fill
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Mobile menu toggle (show/hide nav links under 900px)
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector("nav.primary");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const links = nav.querySelectorAll("a.boutton");
      const anyHidden = Array.from(links).some(
        (l) =>
          l.style.display === "none" ||
          window.getComputedStyle(l).display === "none"
      );
      links.forEach(
        (l) => (l.style.display = anyHidden ? "inline-block" : "none")
      );
    });
  }

  // --- Legacy snippet from your previous App.js (disabled by default) ---
  // If you ever need to hide some buttons or remove the devise line dynamically,
  // you can uncomment and adapt the code below.
  /*
  let boutton = document.querySelectorAll(".boutton");
  // boutton[3].remove();
  // boutton[2].remove();
  // boutton[1].textContent = "Objectifs";
  let devise = document.querySelector(".devise");
  // if (devise) devise.remove();
  */
})();
