import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const saverToPDF = ({ theme }: { theme: string }) => {
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });
  html2canvas(document.querySelector("#capture"), {
    scale: 3,
    allowTaint: true,
    useCORS: true,
    backgroundColor: theme === "light" ? "#fff" : "#000",
  }).then((canvas) => {
    let imgData = canvas.toDataURL("image/jpeg");
    doc.addImage(imgData, "PNG", 10, 10, 250, 100);
    doc.save("circles.pdf");
  });
};
