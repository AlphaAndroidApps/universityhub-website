import { useResumeStore } from "../../store/resumeStore";
import TemplateOne from "../../templates/TemplateOne";

export default function ResumePreview({ containerId }) {
  const resume = useResumeStore((s) => s.resume);

  return (
    <div id={containerId || undefined}>
      <TemplateOne data={resume} />
    </div>
  );
}
