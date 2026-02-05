import { useResumeStore } from "../../store/resumeStore";
import { useState } from "react";

export default function CertificationsForm() {
  const certs = useResumeStore((s) => s.resume.certifications);
  const update = useResumeStore((s) => s.updateField);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    update("certifications", [...certs, input.trim()]);
    setInput("");
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Certifications</h2>

      <input
        className="input"
        placeholder="Type certification and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
      />

      <ul className="mt-2 list-disc ml-5">
        {certs.map((c, i) => (
          <li key={i} onClick={() => update("certifications", certs.filter((_, x) => x !== i))}
              className="cursor-pointer">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
