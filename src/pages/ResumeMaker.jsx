import FormContainer from "../components/layout/FormContainer";
import PreviewContainer from "../components/layout/PreviewContainer";

export default function ResumeMaker() {
  return (
    <div className="bg-slate-100">

      {/* Editor Area */}
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-64px)]">

        {/* Forms Panel */}
        <div className="w-full lg:w-[420px] border-r bg-white lg:overflow-y-auto">
          <FormContainer />
        </div>

        {/* Preview Panel */}
        <div className="w-full flex-1 bg-gray-200 lg:overflow-y-auto">
          <PreviewContainer />
        </div>

      </div>
    </div>
  );
}
