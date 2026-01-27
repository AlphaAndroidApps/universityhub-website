import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AdminCertificates({ user }) {
  if (user === undefined) return <div className="p-6">Checking session...</div>;
  if (!user) return <div className="p-6">Please login</div>;
  if (user.email !== "appdroidplus7@gmail.com")
    return <div className="p-6">Access denied</div>;

  const [data, setData] = useState({
    name: "",
    task: "",
    level: "Elite Contributor",
    start: "",
    end: "",
    place: "Warangal, Telangana, India",
    id: `UH-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`
  });

  const generatePDF = async () => {
    const element = document.getElementById("certificate");

    const canvas = await html2canvas(element, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(`UniversityHub_${data.name}.pdf`);
  };

  const downloadPNG = async () => {
  const element = document.getElementById("certificate");

  const canvas = await html2canvas(element, {
    scale: 4,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const link = document.createElement("a");
  link.download = `UniversityHub_${data.name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};


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

        <select
          className="border p-2 w-full"
          onChange={e => setData({ ...data, level: e.target.value })}
        >
          <option>Elite Contributor</option>
          <option>Core Contributor</option>
          <option>Verified Builder</option>
          <option>Top 5% Performer</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full"
          onChange={e => setData({ ...data, start: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 w-full"
          onChange={e => setData({ ...data, end: e.target.value })}
        />

        <button
  onClick={downloadPNG}
  className="bg-black text-white px-4 py-2 w-full"
>
  Download as PNG (Best for LinkedIn)
</button>

<button
  onClick={generatePDF}
  className="border border-black px-4 py-2 w-full"
>
  Download as PDF
</button>

      </div>

      {/* CERTIFICATE */}
      <div className="w-2/3 flex justify-center">
        <div
          id="certificate"
          style={{
            width: "800px",
            height: "900px",
            padding: "30px",
            background: "white",
            color: "#111",
            border: "5px solid #000",
            fontFamily: "Georgia, serif",
            position: "relative"
          }}
        >
          {/* INNER BORDER */}
          <div
            style={{
              border: "2px solid #000",
              height: "100%",
              padding: "25px"
            }}
          >
            {/* HEADER */}
            <img
              src="/uh-logo.png"
              alt="University Hub"
              style={{
                width: "70px",
                display: "block",
                margin: "0 auto 6px"
              }}
            />

            <h1 style={{ textAlign: "center", fontSize: "34px", letterSpacing: "2px" }}>
              UNIVERSITY HUB
            </h1>

            <p style={{ textAlign: "center", fontSize: "16px", marginTop: "4px" }}>
              Certificate of Contribution
            </p>

            <hr style={{ margin: "20px 0" }} />

            {/* BODY */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ fontSize: "16px" }}>This is to certify that</p>

              <h2 style={{ fontSize: "30px", margin: "14px 0" }}>
                {data.name || "Participant Name"}
              </h2>

              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                has successfully contributed to the project
              </p>

              <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "8px" }}>
                {data.task || "Project / Task Title"}
              </p>

              <p style={{ marginTop: "22px", fontSize: "16px" }}>
                and is hereby awarded the designation of
              </p>

              <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "6px" }}>
                {data.level}
              </p>

              <p style={{ marginTop: "22px", fontSize: "14px" }}>
                Duration: {data.start || "____"} to {data.end || "____"}
              </p>
            </div>

            {/* FOOTER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "60px"
              }}
            >
              <div>
                <p style={{ fontSize: "14px" }}>Issued By</p>
                <p style={{ fontWeight: "bold", marginTop: "14px" }}>
                  Aravind Merugu
                </p>
                <p style={{ fontSize: "14px" }}>Founder, University Hub</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "14px" }}>Certificate ID</p>
                <p style={{ fontFamily: "monospace", marginTop: "14px" }}>
                  {data.id}
                </p>
                <p style={{ fontSize: "13px" }}>
                  Verify at universityhub.co.in/verify
                </p>
              </div>
            </div>

            <hr style={{ margin: "30px 0" }} />

            <div style={{ textAlign: "center", fontSize: "13px" }}>
              Issued on {new Date().toLocaleDateString()}  
              <br />
              Place: {data.place}
              <br /><br />
              University Hub is a registered Micro Enterprise under MSME, Govt. of India  
              <br />
              Udyam Registration No: UDYAM-TS-32-0037106
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
