import jsPDF from "jspdf";

export function exportResumeToPDF(resume) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const PAGE_WIDTH = 595;
  let y = 40;

  /* ---------- HELPERS ---------- */

  const addText = (text, x, yPos, size = 11, bold = false) => {
    doc.setFont("Times", bold ? "Bold" : "Normal");
    doc.setFontSize(size);
    doc.text(text, x, yPos);
  };

  const addWrappedText = (text, x, yPos, maxWidth, size = 11) => {
    doc.setFont("Times", "Normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return lines.length * (size + 2);
  };

  const sectionTitle = (title) => {
    y += 16;
    doc.setFont("Times", "Bold");
    doc.setFontSize(12);
    doc.text(title.toUpperCase(), 40, y);
    y += 4;
    doc.line(40, y, PAGE_WIDTH - 40, y);
    y += 12;
  };

  /* ---------- HEADER ---------- */

  addText(resume.personal.name || "Your Name", PAGE_WIDTH / 2, y, 20, true);
  doc.text(
    `${resume.personal.email || ""}  |  ${resume.personal.phone || ""}  |  ${resume.personal.location || ""}`,
    PAGE_WIDTH / 2,
    y + 18,
    { align: "center" }
  );

  y += 40;

  /* ---------- OBJECTIVE ---------- */
  if (resume.objective) {
    sectionTitle("Objective");
    y += addWrappedText(resume.objective, 40, y, PAGE_WIDTH - 80);
  }

  /* ---------- EDUCATION ---------- */
  if (resume.education.length) {
    sectionTitle("Education");

    resume.education.forEach((e) => {
      addText(e.degree, 40, y, 11, true);
      addText(e.year || "", PAGE_WIDTH - 40, y, 10, false);
      y += 14;

      addText(
        `${e.college}${e.branch ? " — " + e.branch : ""}`,
        40,
        y,
        10,
        false
      );
      if (e.perGPA) {
        addText(e.perGPA, PAGE_WIDTH - 40, y, 10, false);
      }
      y += 18;
    });
  }

  /* ---------- SKILLS ---------- */
  if (resume.skills.length) {
    sectionTitle("Skills");
    y += addWrappedText(resume.skills.join(" • "), 40, y, PAGE_WIDTH - 80);
  }

  /* ---------- PROJECTS ---------- */
  if (resume.projects.length) {
    sectionTitle("Projects");

    resume.projects.forEach((p) => {
      addText(p.title, 40, y, 11, true);
      y += 14;

      if (p.description) {
        const bullets = p.description.split("\n").filter(Boolean);
        bullets.forEach((b) => {
          doc.circle(45, y - 3, 1.2, "F");
          y += addWrappedText(b, 55, y, PAGE_WIDTH - 95, 10);
        });
      }
      y += 6;
    });
  }

  /* ---------- EXPERIENCE ---------- */
  if (resume.experience.length) {
    sectionTitle("Experience");

    resume.experience.forEach((e) => {
      addText(e.role, 40, y, 11, true);
      addText(e.duration || "", PAGE_WIDTH - 40, y, 10);
      y += 14;

      addText(e.company, 40, y, 10);
      y += 14;

      if (e.description) {
        y += addWrappedText(e.description, 40, y, PAGE_WIDTH - 80, 10);
      }
      y += 6;
    });
  }

  /* ---------- HOBBIES ---------- */
  if (resume.hobbies?.length) {
    sectionTitle("Hobbies");
    y += addWrappedText(resume.hobbies.join(" • "), 40, y, PAGE_WIDTH - 80);
  }

  /* ---------- SAVE ---------- */
  const fileName = `${resume.personal.name || "resume"}.pdf`;
  doc.save(fileName);
}
