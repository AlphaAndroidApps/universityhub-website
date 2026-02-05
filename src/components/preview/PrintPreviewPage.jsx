import ResumePreview
 from "./ResumePreview";
export default function PrintPreviewPage() {
  return (
    <div className="bg-white min-h-screen flex justify-center py-4">
      <div id="resume-print">
        <ResumePreview />
      </div>

      {/* Optional helper text */}
      <div className="fixed bottom-3 left-0 right-0 text-center text-xs text-gray-500">
        Use browser menu (⋮ / Share) → Print or Save as PDF
      </div>
    </div>
  );
}
