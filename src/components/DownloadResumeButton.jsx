import html2pdf from "html2pdf.js";

export default function DownloadResumeButton() {
  const downloadPDF = () => {
    const element = document.getElementById("resume-pdf");

    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      jsPDF: {
        unit: "px",
        format: [794, 1123], // A4 in px
        orientation: "portrait"
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={downloadPDF}
      className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
    >
      Download PDF
    </button>
  );
}
