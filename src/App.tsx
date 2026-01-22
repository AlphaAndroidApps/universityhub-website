import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>University Hub</h1>
        <p>
          The all-in-one student app for engineering & pharmacy students.
        </p>
        <div className="buttons">
          <a
            href="https://play.google.com/store/apps/details?id=com.ku.engineering"
            target="_blank"
          >
            Get it on Play Store
          </a>
        </div>
      </header>

      <section className="features">
        <h2>What you get</h2>
        <div className="grid">
          <div>📚 Syllabus & Materials</div>
          <div>🔔 University Updates</div>
          <div>💬 Student Community</div>
          <div>🤖 Ask AI</div>
          <div>💼 Jobs & Internships</div>
        </div>
      </section>

      <section className="universities">
        <h2>Supported Universities</h2>
        <p>JNTU • Kakatiya University</p>
        <p>More coming soon…</p>
      </section>

      <footer>
        <p>© 2026 University Hub</p>
        <p>support@universityhub.co.in</p>
      </footer>
    </div>
  );
}
