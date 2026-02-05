import html2pdf from "html2pdf.js";
import ResumePreview from "./ResumePreview";

export default function PrintPreviewPage() {
  const handlePrint = () => {
    const element = document.getElementById("resume-print");
    if (!element) return;

    const options = {
      margin: 0,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-4">
      <div id="resume-print">
        <ResumePreview />
      </div>

      <button
        onClick={handlePrint}
        className="fixed bottom-4 z-50 px-6 py-3 bg-black text-white rounded shadow-lg"
      >
        Save as PDF
      </button>
    </div>
  );
}
