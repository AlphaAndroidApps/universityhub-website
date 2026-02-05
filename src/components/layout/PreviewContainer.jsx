import ResumePreview from "../preview/ResumePreview";
import DownloadATSButton from "../DownloadATSButton";

export default function PreviewContainer() {
  return (
    <div className="w-full bg-gray-100 px-2 lg:px-6 py-3 overflow-hidden">

      {/* Action bar */}
      <div className="flex justify-end mb-3">
        <DownloadATSButton />
      </div>

      {/* Preview area */}
      <div className="flex justify-center overflow-x-hidden">
        
        {/* Scaling wrapper */}
        <div
          className="
            origin-top
            scale-[0.55]
            sm:scale-[0.7]
            md:scale-[0.8]
            lg:scale-100
          "
        >
          <ResumePreview containerId="resume-print" />
        </div>

      </div>

    </div>
  );
}
