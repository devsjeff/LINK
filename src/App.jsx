import "./App.css";

export default function App() {
  const open = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container">

      {/* HEADER */}
      <header className="header">
        <h1>🚀 Dev's Quick Notes Hub</h1>
        <p>
          Built by <b>devsjeff</b> | 📧 devendra.outlook@gmail.com | 
          <a href="https://github.com/devsjeff" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </header>

      {/* WEB */}
      <section>
        <h2>🌐 Web Development</h2>

        <div className="card">
          <h3>Basics</h3>
          <button onClick={() => open("https://htmlcsstailwand.netlify.app/")}>
            HTML + CSS + Tailwind
          </button>
        </div>

        <div className="card">
          <h3>JavaScript</h3>
          <button onClick={() => open("https://devsjeffjs.netlify.app/")}>
            JS Notes
          </button>
        </div>

        <div className="card">
          <h3>React</h3>

          <button onClick={() => open("https://react-quick-notes.vercel.app/")}>
            React Master Hub
          </button>

          <button onClick={() =>
            open("https://claude.ai/public/artifacts/6b9c99ce-7e97-486c-b173-8ab592be08df")
          }>
            Quick Review
          </button>

          <button onClick={() =>
            open("https://pagestohost-e6jf.vercel.app/")
          }>
            Advanced Topics
          </button>
        </div>

        <div className="card">
          <h3>Next.js</h3>
          <button onClick={() => open("https://next-js-ten-gold-17.vercel.app/")}>
            Next Notes
          </button>
        </div>

        <div className="card">
          <h3>Express + Node + TS</h3>
          <button onClick={() =>
            open("https://express-js-gilt-three.vercel.app/")
          }>
            Express.js
          </button>

          <button onClick={() =>
            open("https://typescriptandnodejs.netlify.app/")
          }>
            TypeScript + Node
          </button>
        </div>
      </section>

      {/* DATABASES */}
      <section>
        <h2>🗄️ Databases</h2>

        <div className="card">
          <h3>PostgreSQL (JS)</h3>
          <button onClick={() => open("https://databaseforjs.netlify.app/")}>
            JS Notes
          </button>
        </div>

        <div className="card">
          <h3>PostgreSQL (Python)</h3>
          <button onClick={() => open("https://devsjeffdb.netlify.app/")}>
            Python Notes
          </button>
        </div>
      </section>

      {/* PYTHON */}
      <section>
        <h2>🐍 Python</h2>

        <div className="card">
          <button onClick={() => open("https://pythononly.netlify.app/")}>
            Python Basics
          </button>

          <button onClick={() =>
            open("https://async-aiohttps-others.netlify.app/")
          }>
            Async / AIOHTTP
          </button>

          <button onClick={() =>
            open("https://fastapiandpydentic.netlify.app/")
          }>
            FastAPI + Pydantic
          </button>

          <button onClick={() =>
            open("https://playwrightselenium.netlify.app/")
          }>
            Playwright + Selenium
          </button>
        </div>
      </section>

      {/* AI */}
      <section>
        <h2>🤖 AI / LLM / RAG</h2>

        <div className="card">
          <button onClick={() =>
            open("https://llmsragss.vercel.app/")
          }>
            LLM + RAG + Agents
          </button>
        </div>
      </section>

      {/* DEVOPS */}
      <section>
        <h2>⚙️ DevOps & Cloud</h2>

        <div className="card">
          <button onClick={() =>
            open("https://gitandgithubs.netlify.app/")
          }>
            Git & GitHub
          </button>

          <button onClick={() =>
            open("https://cloudawsazuregcp.netlify.app/")
          }>
            AWS / Azure / GCP
          </button>

          <button onClick={() =>
            open("https://dockerandk8s.netlify.app/")
          }>
            Docker & Kubernetes
          </button>

          <button onClick={() =>
            open("https://devops-opal.vercel.app/")
          }>
            DevOps Hub
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Made with ⚡ by devsjeff</p>
      </footer>
    </div>
  );
}