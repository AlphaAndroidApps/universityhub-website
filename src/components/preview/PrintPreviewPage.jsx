import ResumePreview from "./ResumePreview";

export default function PrintPreviewPage() {
  const handlePrint = () => {
    window.print(); // ✅ MUST be user initiated
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-4">
      
      {/* Resume */}
      <div id="resume-print">
        <ResumePreview />
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="fixed bottom-4 px-6 py-3 bg-black text-white rounded shadow-lg"
      >
        Save as PDF
      </button>
    </div>
  );
}
