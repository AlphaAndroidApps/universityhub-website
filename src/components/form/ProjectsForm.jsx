import { useResumeStore } from "../../store/resumeStore";

export default function ProjectsForm() {
  const projects = useResumeStore((s) => s.resume.projects);
  const update = useResumeStore((s) => s.updateField);

  const add = () =>
    update("projects", [...projects, { title: "", description: "" }]);

  const change = (i, field, value) => {
    const copy = [...projects];
    copy[i][field] = value;
    update("projects", copy);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Projects</h2>

      {projects.map((p, i) => (
        <div key={i} className="mb-3">
          <input className="input" placeholder="Project Title" value={p.title} onChange={(e) => change(i, "title", e.target.value)} />
          <textarea className="input" placeholder="Description" value={p.description} onChange={(e) => change(i, "description", e.target.value)} />
        </div>
      ))}

      <button className="btn" onClick={add}>+ Add Project</button>
    </div>
  );
}
