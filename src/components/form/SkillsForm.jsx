import { useResumeStore } from "../../store/resumeStore";
import { useState } from "react";

export default function SkillsForm() {
  const skills = useResumeStore((s) => s.resume.skills);
  const update = useResumeStore((s) => s.updateField);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    update("skills", [...skills, input.trim()]);
    setInput("");
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Skills</h2>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Type skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          enterKeyHint="done"
          inputMode="text"
        />

        <button
          type="button"
          onClick={add}
          className="px-3 py-2 bg-black text-white rounded text-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((s, i) => (
          <span
            key={i}
            className="bg-slate-200 px-3 py-1 rounded cursor-pointer"
            onClick={() =>
              update("skills", skills.filter((_, x) => x !== i))
            }
          >
            {s} ✕
          </span>
        ))}
      </div>
    </div>
  );
}
