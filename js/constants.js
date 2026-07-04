export const CATEGORIES = [
  "Vodka",
  "Rum & Whisky",
  "Gin",
  "Tequila & Mezcal",
  "Vermouth & Bitter",
  "Liquori & Amari",
  "Champagne",
  "Bollicine",
  "Analcolici",
  "Post Mix",
  "Acqua",
  "Puree",
  "Birre",
  "Altro",
];
 
export const CATEGORY_ICON = {
  Vodka: "🍸",
  "Rum & Whisky": "🥃",
  Gin: "🌿",
  "Tequila & Mezcal": "🌵",
  "Vermouth & Bitter": "🍷",
  "Liquori & Amari": "🍯",
  Champagne: "🥂",
  Bollicine: "🍾",
  Analcolici: "🥤",
  "Post Mix": "🧃",
  Acqua: "💧",
  Puree: "🍓",
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
