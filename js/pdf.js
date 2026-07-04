// Richiede che jspdf e jspdf-autotable siano già caricati in pagina via <script> CDN.

export function generateOrderPdf({ responsabile, orderDate, items }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("ORDINE RIFORNIMENTO", 14, 18);
  doc.setFontSize(10);
  doc.text(`Responsabile: ${responsabile}`, 14, 28);
  doc.text(`Data: ${orderDate}`, 14, 34);

  doc.autoTable({
    startY: 42,
    head: [["Prodotto", "Formato", "Quantità da inviare"]],
    body: items.map((i) => [i.product_name, i.format, String(i.ordine)]),
    headStyles: { fillColor: [30, 33, 40] },
  });

  const filename = `ordine-${orderDate}.pdf`;
  doc.save(filename);
  return filename;
}

export function generateBollaPdf({ responsabile, orderDate, confirmedAt, items }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("BOLLA DI CARICO", 14, 18);
  doc.setFontSize(10);
  doc.text(`Responsabile: ${responsabile}`, 14, 28);
  doc.text(`Data ordine: ${orderDate}`, 14, 34);
  doc.text(
    `Confermato il: ${confirmedAt ? new Date(confirmedAt).toLocaleString("it-IT") : "-"}`,
    14,
    40
  );

  doc.autoTable({
    startY: 48,
    head: [["Prodotto", "Formato", "Ordinato", "Caricato"]],
    body: items.map((i) => [i.product_name, i.format, String(i.ordine), String(i.carico ?? 0)]),
    headStyles: { fillColor: [30, 33, 40] },
  });

  const filename = `bolla-${orderDate}.pdf`;
  doc.save(filename);
  return filename;
}
