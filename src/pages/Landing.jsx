import "../index.css";
import preview from "../assets/app-preview.jpg";

export default function Landing() {
  return (
    <div className="bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      {/* <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          University Hub
        </h1>
        <a
          href="https://play.google.com/store/apps/details?id=com.ku.engineering"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Get App
        </a>
      </nav> */}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            The all-in-one app for<br />
            <span className="text-indigo-600">
              university students
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Syllabus, materials, official updates, jobs and AI help — 
            everything in one place for engineering & pharmacy students.
          </p>

          <div className="flex gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.ku.engineering"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Download App
            </a>
            <a
    href="#/dashboard"
    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
  >
    Become a Contributor
  </a>
            <button
  onClick={() => {
    const el = document.getElementById("features");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="border border-gray-300 px-6 py-3 rounded-lg"
>
  Learn more
</button>


          </div>

          <p className="text-sm text-gray-500 mt-4">
            Trusted by students from JNTU & Kakatiya University
          </p>
        </div>

        <div className="relative mx-auto w-[360px]">
  <div className="absolute -inset-1 bg-indigo-500 rounded-[42px] blur opacity-30"></div>
  <div className="relative bg-black p-2 rounded-[40px]">
    <img
      src={preview}
      className="rounded-[32px]"
      alt="University Hub App"
    />
  </div>
</div>

      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          Everything you need
        </h3>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            ["📚", "Syllabus & Materials", "Complete semester wise syllabus"],
            ["🔔", "University Updates", "Official notifications instantly"],
            ["💬", "Student Community", "Ask, answer, discuss"],
            ["🤖", "Ask AI", "Get instant explanations"],
            ["💼", "Jobs & Internships", "Daily curated opportunities"],
            ["📄", "PDF Tools", "Summaries & converters"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="bg-slate-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          How it works
        </h3>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            ["1", "Install the app"],
            ["2", "Select university & course"],
            ["3", "Get updates & materials"],
          ].map(([step, text]) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step}
              </div>
              <p className="font-semibold">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="bg-white py-20 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Supported Universities
        </h3>
        <p className="text-lg">
          JNTU • Kakatiya University
        </p>
        <p className="text-gray-500 mt-2">
          More universities coming soon
        </p>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Ready to simplify your student life?
        </h3>
        <a
          href="https://play.google.com/store/apps/details?id=com.ku.engineering"
          className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg"
        >
          Download University Hub
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © 2026 University Hub • support@universityhub.co.in
      </footer>
    </div>
  );
}
