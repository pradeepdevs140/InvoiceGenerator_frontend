import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdfFromElement = async (
  HTMLElement,  
  fileName = "invoice.pdf",
  returnBlob = false
) => {
  const canvas = await html2canvas(HTMLElement, {  // Fixed: use HTMLElement instead of element
    scale: 2,
    useCORS: true,
    backgroundColor: "white",
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  if (returnBlob) {
    return pdf.output("blob");
  } else {
    pdf.save(fileName);
  }
};