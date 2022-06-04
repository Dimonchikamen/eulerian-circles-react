import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const saverToPDF = (theme: string) => {
    const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
    });
    html2canvas(document.querySelector("#capture"), {
        scale: 3,
        allowTaint: true,
        useCORS: true,
        backgroundColor: theme === "light" ? "#ffffff" : "#000000",
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        doc.addImage(imgData, "PNG", 10, 10, 280, 120);
        doc.save("circles.pdf");
    });
};
