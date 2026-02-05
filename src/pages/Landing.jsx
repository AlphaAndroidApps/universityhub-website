import "../index.css";
import preview1 from "../assets/preview1.jpg";
import preview2 from "../assets/preview2.jpg";
import preview3 from "../assets/preview3.jpg";
import preview4 from "../assets/preview4.jpg";
import preview5 from "../assets/preview5.jpg";
import { useEffect, useState } from "react";

export default function Landing() {
  const images = [preview1, preview2, preview3, preview4, preview5];
  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % images.length);
        setIsFading(false);
      }, 250);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  const goTo = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent(index);
      setIsFading(false);
    }, 200);
  };
  const prev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + images.length) % images.length);
      setIsFading(false);
    }, 200);
  };
  const next = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % images.length);
      setIsFading(false);
    }, 200);
  };

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
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

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.ku.engineering"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto text-center"
            >
              Download App
            </a>
            <a
    href="#/dashboard"
    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto text-center"
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
  className="border border-gray-300 px-6 py-3 rounded-lg w-full sm:w-auto"
>
  Learn more
</button>


          </div>

          <p className="text-sm text-gray-500 mt-4">
            Trusted by students from JNTU & Kakatiya University
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
  <div className="absolute -inset-1 bg-indigo-500 rounded-[42px] blur opacity-30"></div>
  <div className="relative bg-black p-2 rounded-[40px] overflow-hidden">
    <div className="relative w-full">
      <img
        key={current}
        src={images[current]}
        className={`rounded-[32px] w-full object-cover block transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        alt={`University Hub App ${current + 1}`}
      />
    </div>

    <button
      onClick={prev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
      aria-label="Previous"
    >
      ‹
    </button>
    <button
      onClick={next}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
      aria-label="Next"
    >
      ›
    </button>

    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {images.map((_, idx) => (
        <button
          key={idx}
          onClick={() => goTo(idx)}
          className={`h-2 w-2 rounded-full ${
            idx === current ? "bg-white" : "bg-white/50"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
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
        © 2026 University Hub • admin@universityhub.co.in
      </footer>
    </div>
  );
}
