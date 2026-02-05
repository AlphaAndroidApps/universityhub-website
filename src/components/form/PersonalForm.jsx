import { useResumeStore } from "../../store/resumeStore";

export default function PersonalForm() {
  const personal = useResumeStore((s) => s.resume.personal);
  const update = useResumeStore((s) => s.updateField);

  const handleChange = (e) => {
    update("personal", { ...personal, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Personal Details</h2>

      <input className="input" name="name" placeholder="Full Name" value={personal.name || ""} onChange={handleChange} />
      <input className="input" name="email" placeholder="Email" value={personal.email || ""} onChange={handleChange} />
      <input className="input" name="phone" placeholder="Phone" value={personal.phone || ""} onChange={handleChange} />
      <input className="input" name="location" placeholder="City, State" value={personal.location || ""} onChange={handleChange} />
    {/* Career Objective */}
<textarea
  className="input"
  rows={3}
  placeholder="Career Objective (optional)
Example: Motivated B.Tech student seeking an entry-level role to apply technical and problem-solving skills."
  value={useResumeStore((s) => s.resume.objective)}
  onChange={(e) =>
    useResumeStore.getState().updateField("objective", e.target.value)
  }
/>

    </div>
  );
}
