// DGLF site JS — navigation, smooth scroll, mobile menu, year auto-fill
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    });
  });

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const links = nav.querySelectorAll('a.boutton');
      const anyHidden = Array.from(links).some(l => l.style.display === 'none' || window.getComputedStyle(l).display === 'none');
      links.forEach(l => l.style.display = anyHidden ? 'inline-block' : 'none');
    });
  }
})();
