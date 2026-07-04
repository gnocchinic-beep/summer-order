export const CATEGORIES = [
  "Vodka",
  "Rum",
  "Gin",
  "Tequila",
  "Champagne",
  "Bibite",
  "Birre",
  "Altro",
];

export const CATEGORY_ICON = {
  Vodka: "🍸",
  Rum: "🥃",
  Gin: "🌿",
  Tequila: "🌵",
  Champagne: "🥂",
  Bibite: "🥤",
  Birre: "🍺",
  Altro: "📦",
};

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
