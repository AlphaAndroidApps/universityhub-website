import { useState } from "react";
import CertificateTemplate from "./CertificateTemplate";
import { downloadCertificatePNG } from "../services/useCertificateDownload";

export default function AdminCertificates({ user }) {
  if (user === undefined) return <div className="p-6">Checking session...</div>;
  if (!user) return <div className="p-6">Please login</div>;
  if (user.email !== "appdroidplus7@gmail.com")
    return <div className="p-6">Access denied</div>;

  const [data, setData] = useState({
    name: "",
    task: "",
    level: "Elite Contributor",
    contributions: "",
    id: `UH-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`
  });

  return (
    <div className="flex gap-6 p-6">
      {/* FORM */}
      <div className="w-1/3 space-y-3">
        <h2 className="text-xl font-bold">Issue Certificate</h2>

        <input
          className="border p-2 w-full"
          placeholder="Student Name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Task / Project"
          onChange={e => setData({ ...data, task: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Contributions"
          onChange={e =>
            setData({ ...data, contributions: e.target.value })
          }
        />

        <select
          className="border p-2 w-full"
          onChange={e => setData({ ...data, level: e.target.value })}
        >
          <option>Elite Contributor</option>
          <option>Core Contributor</option>
          <option>Verified Builder</option>
          <option>Top 5% Performer</option>
        </select>

        <button
          onClick={() =>
            downloadCertificatePNG(`UniversityHub_${data.name}`)
          }
          className="bg-black text-white px-4 py-2 w-full"
        >
          Download as PNG
        </button>
      </div>

      {/* CERTIFICATE PREVIEW */}
      <div className="w-2/3 flex justify-center">
        <CertificateTemplate data={data} />
      </div>
    </div>
  );
}
