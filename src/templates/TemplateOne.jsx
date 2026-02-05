export default function TemplateOne({ data }) {
  return (
    <div className="bg-white text-gray-900 p-10 w-[794px] min-h-[1123px] mx-auto shadow font-serif">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide">
          {data.personal.name || "Your Name"}
        </h1>

        {data.personal.title && (
          <p className="italic text-lg mt-1">
            {data.personal.title}
          </p>
        )}

        <div className="text-sm mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.email && <span>• {data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
        </div>
      </div>

      <hr className="border-gray-400 mb-5" />

{/* ===== OBJECTIVE ===== */}
{data.objective && (
  <Section title="OBJECTIVE">
    <p className="text-sm leading-relaxed">
      {data.objective}
    </p>
  </Section>
)}


      {/* ===== EXPERIENCE ===== */}
      {data.experience.length > 0 && (
        <Section title="PROFESSIONAL EXPERIENCE">
          {data.experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{e.role}</span>
                <span className="text-sm font-normal">{e.duration}</span>
              </div>

              <div className="flex justify-between italic text-sm mb-1">
                <span>{e.company}</span>
                {e.location && <span>{e.location}</span>}
              </div>

              {e.description && (
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {e.description
                    .split("\n")
                    .filter(Boolean)
                    .map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}
      
      {/* ===== EDUCATION ===== */}
      {data.education.length > 0 && (
  <Section title="EDUCATION">
    {data.education.map((e, i) => (
      <div key={i} className="mb-3">
        <div className="flex justify-between items-start">
          
          {/* LEFT SIDE */}
          <div>
            <div className="font-semibold">
              {e.degree}
            </div>
            <div className="italic text-sm">
              {e.college}
              {e.branch && ` — ${e.branch}`}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="text-right text-sm">
            <div>{e.year}</div>
            {e.pergpa && (
              <div className="italic">{e.pergpa}</div>
            )}
          </div>

        </div>
      </div>
    ))}
  </Section>
)}

{/* ===== PROJECTS ===== */}
{data.projects && data.projects.length > 0 && (
  <Section title="PROJECTS">
    {data.projects.map((p, i) => (
      <div key={i} className="mb-3">
        <div className="font-semibold text-sm">
          {p.title}
        </div>

        {p.description && (
          <ul className="list-disc ml-5 text-sm space-y-1">
            {p.description
              .split("\n")
              .filter(Boolean)
              .map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
          </ul>
        )}
      </div>
    ))}
  </Section>
)}



{/* ===== SKILLS ===== */}
{data.skills.length > 0 && (
  <Section title="SKILLS">
    <p className="text-sm leading-relaxed">
      {data.skills.join(", ")}
    </p>
  </Section>
)}




      {/* ===== CERTIFICATIONS ===== */}
      {data.certifications.length > 0 && (
        <Section title="CERTIFICATIONS">
          <ul className="list-disc ml-5 text-sm space-y-1">
            {data.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>
      )}
      
{/* ===== HOBBIES ===== */}
{data.hobbies && data.hobbies.length > 0 && (
  <Section title="HOBBIES">
    <p className="text-sm">
      {data.hobbies.join(" • ")}
    </p>
  </Section>
)}

    </div>
  );
}

/* ===== SECTION COMPONENT ===== */
function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold tracking-widest mb-1">
        {title}
      </h2>
      <hr className="border-gray-400 mb-2" />
      {children}
    </div>
  );
}



