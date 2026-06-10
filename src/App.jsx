import { useEffect } from "react";
import "./App.css";

export default function App() {
  const open = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const Card = ({ badge, title, url }) => (
    <div className="link-card" onClick={() => open(url)}>
      <span className="card-badge">{badge}</span>
      <div className="card-title">{title}</div>
      <span className="card-arrow">↗</span>
    </div>
  );

  return (
    <>
      {/* ══════════════════ HERO / PORTFOLIO INTRO ══════════════════ */}
      <section className="hero">
        <p className="hero-eyebrow">Portfolio</p>

        <h1 className="hero-name">
          <span className="grad">Devendra</span>
        </h1>

        <p className="hero-title">
          <span>AI Engineer</span>
          <span className="sep">·</span>
          <span>Full Stack Dev</span>
          <span className="sep">·</span>
          <span>Builder</span>
        </p>

        <p className="hero-bio">
          Self-taught developer from Bhopal, India — building AI applications with LLMs, RAG
          systems, AI Agents, and MCP servers. Currently learning Advanced RAG, Agentic
          Workflows, and Rust. Open to startup opportunities and open-source collaboration.
        </p>

        <div className="hero-tags">
          <span className="tag tag-mint">Python</span>
          <span className="tag tag-violet">FastAPI</span>
          <span className="tag tag-blue">React</span>
          <span className="tag tag-blue">Next.js</span>
          <span className="tag tag-mint">LLMs / RAG</span>
          <span className="tag tag-pink">Node.js</span>
          <span className="tag tag-violet">PostgreSQL</span>
          <span className="tag tag-yellow">Playwright</span>
          <span className="tag tag-pink">Docker</span>
          <span className="tag tag-mint">AWS</span>
        </div>

        <div className="hero-links">
          <a
            className="btn-primary"
            href="https://github.com/devsjeff"
            target="_blank"
            rel="noreferrer"
          >
            ⚡ GitHub Profile
          </a>
          <button className="btn-ghost" onClick={() => open("mailto:devendra.outlook@gmail.com")}>
            📧 Get in Touch
          </button>
        </div>

        <div className="scroll-hint">
          <span>study notes</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════ QUICK NOTES HUB ══════════════════ */}
      <main className="notes-section">
        <div className="section-header reveal">
          <span className="section-label">// knowledge base</span>
          <h2 className="section-title">
            Quick Notes <span className="accent">Hub</span>
          </h2>
        </div>

        {/* WEB DEV */}
        <div className="category cat-web reveal">
          <div className="cat-heading">
            <span className="cat-icon">🌐</span> Web Development
          </div>
          <div className="card-grid">
            <Card badge="Basics" title="HTML + CSS + Tailwind" url="https://htmlcsstailwand.netlify.app/" />
            <Card badge="JS" title="JavaScript Notes" url="https://devsjeffjs.netlify.app/" />
            <Card badge="React" title="React Master Hub" url="https://react-quick-notes.vercel.app/" />
            <Card badge="React" title="Quick Review" url="https://claude.ai/public/artifacts/6b9c99ce-7e97-486c-b173-8ab592be08df" />
            <Card badge="React" title="Advanced Topics" url="https://pagestohost-e6jf.vercel.app/" />
            <Card badge="Next.js" title="Next.js Notes" url="https://next-js-ten-gold-17.vercel.app/" />
            <Card badge="Express" title="Express.js" url="https://express-js-gilt-three.vercel.app/" />
            <Card badge="TS + Node" title="TypeScript + Node" url="https://typescriptandnodejs.netlify.app/" />
          </div>
        </div>

        {/* DATABASES */}
        <div className="category cat-db reveal">
          <div className="cat-heading">
            <span className="cat-icon">🗄️</span> Databases
          </div>
          <div className="card-grid">
            <Card badge="PostgreSQL · JS" title="JS Notes" url="https://databaseforjs.netlify.app/" />
            <Card badge="PostgreSQL · Python" title="Python Notes" url="https://devsjeffdb.netlify.app/" />
          </div>
        </div>

        {/* PYTHON */}
        <div className="category cat-python reveal">
          <div className="cat-heading">
            <span className="cat-icon">🐍</span> Python
          </div>
          <div className="card-grid">
            <Card badge="Python" title="Python Basics" url="https://pythononly.netlify.app/" />
            <Card badge="Async" title="Async / AIOHTTP" url="https://async-aiohttps-others.netlify.app/" />
            <Card badge="FastAPI" title="FastAPI + Pydantic" url="https://fastapiandpydentic.netlify.app/" />
            <Card badge="Testing" title="Playwright + Selenium" url="https://playwrightselenium.netlify.app/" />
            <Card badge="Playwright" title="Playwright + Boto3" url="https://playwrightboto3.vercel.app/" />
          </div>
        </div>

        {/* AI */}
        <div className="category cat-ai reveal">
          <div className="cat-heading">
            <span className="cat-icon">🤖</span> AI / LLM / RAG
          </div>
          <div className="card-grid">
            <Card badge="AI" title="LLM + RAG + Agents" url="https://llmsragss.vercel.app/" />
          </div>
        </div>

        {/* DSA */}
        <div className="category cat-ai reveal">
          <div className="cat-heading">
            <span className="cat-icon">🧩</span> DSA
          </div>
          <div className="card-grid">
            <Card badge="DSA" title="Data Structures & Algorithms" url="https://dsa-delta-nine.vercel.app/" />
          </div>
        </div>

        {/* DEVOPS */}
        <div className="category cat-devops reveal">
          <div className="cat-heading">
            <span className="cat-icon">⚙️</span> DevOps &amp; Cloud
          </div>
          <div className="card-grid">
            <Card badge="Git" title="Git &amp; GitHub" url="https://gitandgithubs.netlify.app/" />
            <Card badge="Cloud" title="AWS / Azure / GCP" url="https://cloudawsazuregcp.netlify.app/" />
            <Card badge="Containers" title="Docker &amp; Kubernetes" url="https://dockerandk8s.netlify.app/" />
            <Card badge="DevOps" title="DevOps Hub" url="https://devops-opal.vercel.app/" />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        Made with <span>⚡</span> by devsjeff &nbsp;·&nbsp; devendra.outlook@gmail.com
      </footer>
    </>
  );
}