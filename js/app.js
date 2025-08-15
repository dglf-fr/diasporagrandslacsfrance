// DGLF — scripts du site (menu mobile, scroll fluide, thème, formulaire adhésion)
(function () {
  // Année automatique
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll fluide pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Menu mobile
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector("nav.primary");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const links = nav.querySelectorAll("a.boutton");
      const anyHidden = Array.from(links).some(
        (l) =>
          l.style.display === "none" || getComputedStyle(l).display === "none"
      );
      links.forEach(
        (l) => (l.style.display = anyHidden ? "inline-block" : "none")
      );
    });
  }

  // Thème (persisté en localStorage)
  const applyTheme = (value) => {
    const theme = value && value !== "defaut" ? value : "defaut";
    document.documentElement.setAttribute(
      "data-theme",
      theme === "defaut" ? "" : theme
    );
  };
  const savedTheme = localStorage.getItem("dglf_theme") || "defaut";
  applyTheme(savedTheme);
  document.querySelectorAll("#theme").forEach((sel) => {
    sel.value = savedTheme;
    sel.addEventListener("change", (e) => {
      localStorage.setItem("dglf_theme", e.target.value);
      applyTheme(e.target.value);
    });
  });

  // Formulaire d'adhésion (localStorage + export CSV)
  const form = document.getElementById("adhesionForm");
  const status = document.getElementById("status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const list = JSON.parse(localStorage.getItem("dglf_adherents") || "[]");
      data.date = new Date().toISOString();
      list.push(data);
      localStorage.setItem("dglf_adherents", JSON.stringify(list));
      if (status)
        status.textContent =
          "✔ Adhésion enregistrée localement (non transmise). Vous pouvez exporter en CSV.";
      form.reset();
      const rgpd = document.getElementById("rgpd");
      if (rgpd) rgpd.checked = false;
    });

    const btnCsv = document.getElementById("exportCsv");
    if (btnCsv) {
      btnCsv.addEventListener("click", () => {
        const list = JSON.parse(localStorage.getItem("dglf_adherents") || "[]");
        if (!list.length) {
          alert("Aucune adhésion enregistrée.");
          return;
        }
        const cols = [
          "date",
          "nom",
          "prenom",
          "email",
          "telephone",
          "type",
          "ville",
        ];
        const lines = [cols.join(",")].concat(
          list.map((o) =>
            cols
              .map((c) => {
                const v = (o[c] || "").toString().replaceAll('"', '""');
                return /[,"\n]/.test(v) ? '"' + v + '"' : v;
              })
              .join(",")
          )
        );
        const blob = new Blob([lines.join("\n")], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "adherents_dglf.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
})();
