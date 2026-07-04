import { logout } from "./authGuard.js";

const LINKS = [
  { href: "index.html", label: "Dashboard", icon: "◧" },
  { href: "catalogo.html", label: "Catalogo", icon: "▤" },
  { href: "magazzino.html", label: "Magazzino", icon: "▣" },
  { href: "ordini.html", label: "Ordini", icon: "↻" },
  { href: "inviati.html", label: "Inviati", icon: "✔" },
];

export function renderNav(current) {
  const nav = document.getElementById("nav");
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-brand">Carico &amp; Scarico</div>
    <div class="nav-links">
      ${LINKS.map(
        (l) => `
        <a href="${l.href}" class="nav-link ${current === l.href ? "active" : ""}">
          <span>${l.icon}</span> ${l.label}
        </a>`
      ).join("")}
    </div>
    <button id="logoutBtn" class="btn btn-outline nav-logout">Esci</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", logout);
}
