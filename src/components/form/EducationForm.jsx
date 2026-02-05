import { useResumeStore } from "../../store/resumeStore";

export default function EducationForm() {
  const education = useResumeStore((s) => s.resume.education);
  const update = useResumeStore((s) => s.updateField);

  const add = () =>
    update("education", [...education, { degree: "", branch: "", college: "", year: "" }]);

  const change = (i, field, value) => {
    const copy = [...education];
    copy[i][field] = value;
    update("education", copy);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Education</h2>

      {education.map((e, i) => (
        <div key={i} className="mb-3">
          <input className="input" placeholder="Degree" value={e.degree} onChange={(ev) => change(i, "degree", ev.target.value)} />
          <input className="input" placeholder="Branch" value={e.branch} onChange={(ev) => change(i, "branch", ev.target.value)} />
          <input className="input" placeholder="Institute Name" value={e.college} onChange={(ev) => change(i, "college", ev.target.value)} />
          <input className="input" placeholder="Year" value={e.year} onChange={(ev) => change(i, "year", ev.target.value)} />
          <input className="input" placeholder="percentage/gpa" value={e.pergpa} onChange={(ev) => change(i, "pergpa", ev.target.value)} />

        </div>
      ))}

      <button className="btn" onClick={add}>+ Add Education</button>
    </div>
  );
}
