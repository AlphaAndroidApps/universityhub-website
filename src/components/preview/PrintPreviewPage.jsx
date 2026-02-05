import ResumePreview from "./ResumePreview";

export default function PrintPreviewPage() {
  const handlePrint = () => {
    // ✅ Mobile-safe print trigger
    setTimeout(() => {
      window.print();
    }, 100);
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
