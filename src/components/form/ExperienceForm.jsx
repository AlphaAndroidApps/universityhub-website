import { useResumeStore } from "../../store/resumeStore";

export default function ExperienceForm() {
  const experience = useResumeStore((s) => s.resume.experience);
  const update = useResumeStore((s) => s.updateField);

  const add = () =>
    update("experience", [...experience, { role: "", company: "", duration: "", description: "" }]);

  const change = (i, field, value) => {
    const copy = [...experience];
    copy[i][field] = value;
    update("experience", copy);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Experience / Internship</h2>

      {experience.map((e, i) => (
        <div key={i} className="mb-3">
          <input className="input" placeholder="Role" value={e.role} onChange={(ev) => change(i, "role", ev.target.value)} />
          <input className="input" placeholder="Company" value={e.company} onChange={(ev) => change(i, "company", ev.target.value)} />
          <input className="input" placeholder="Duration" value={e.duration} onChange={(ev) => change(i, "duration", ev.target.value)} />
          <textarea className="input" placeholder="Description" value={e.description} onChange={(ev) => change(i, "description", ev.target.value)} />
        </div>
      ))}

      <button className="btn" onClick={add}>+ Add Experience</button>
    </div>
  );
}
