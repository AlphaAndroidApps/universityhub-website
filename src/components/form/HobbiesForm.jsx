import { useResumeStore } from "../../store/resumeStore";
import { useState } from "react";

export default function HobbiesForm() {
  const hobbies = useResumeStore((s) => s.resume.hobbies || []);
  const update = useResumeStore((s) => s.updateField);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    update("hobbies", [...hobbies, input.trim()]);
    setInput("");
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Hobbies (Optional)</h2>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Type hobby and press Enter (e.g. Reading, Chess)"
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
        {hobbies.map((h, i) => (
          <span
            key={i}
            onClick={() =>
              update("hobbies", hobbies.filter((_, x) => x !== i))
            }
            className="px-2 py-0.5 border border-gray-300 rounded text-sm cursor-pointer"
          >
            {h} ✕
          </span>
        ))}
      </div>
    </div>
  );
}
