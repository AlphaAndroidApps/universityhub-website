import html2pdf from "html2pdf.js";
import ResumePreview from "./ResumePreview";

export default function PrintPreviewPage() {
  const handlePrint = async () => {
    const element = document.getElementById("resume-print");
    if (!element) return;

    const options = {
      margin: 0,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
    };

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    try {
      if (isIOS) {
      // iOS Safari blocks direct downloads; open PDF in a new tab instead.
        const newWindow = window.open("", "_blank");
        const blob = await html2pdf()
          .set(options)
          .from(element)
          .outputPdf("blob");
        const blobUrl = URL.createObjectURL(blob);
        if (newWindow) {
          newWindow.location = blobUrl;
        } else {
          window.location.href = blobUrl;
        }
        return;
      }

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("Resume PDF download failed:", error);
      window.print();
    }
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
