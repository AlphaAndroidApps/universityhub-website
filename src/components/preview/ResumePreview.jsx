import { useResumeStore } from "../../store/resumeStore";
import TemplateOne from "../../templates/TemplateOne";

export default function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);

  return (
    <div id="resume-print">
      <TemplateOne data={resume} />
    </div>
  );
}
