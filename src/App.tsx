import { useEffect, useRef, useState, type ReactNode } from "react";
import portrait from "./assets/portrait.webp";
import { navigation, projects, skills } from "./data";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function SectionTitle({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme remains available without storage. */
    }
  }, [theme]);
  useEffect(() => {
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#home" title="Youssef El Amrani, home">
            youssef<span>.</span>
            <span className="brand-sub">AI ENGINEERING</span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
            </button>
            <a href="#contact" className="header-contact">
              Let’s connect <Arrow />
            </a>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              onClick={() => setMenu(!menu)}
            >
              <span aria-hidden="true">{menu ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          hidden={!menu}
          aria-label="Mobile navigation"
        >
          {[...navigation, ["contact", "Contact"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
              <Arrow />
            </a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section tabIndex={-1} id="home" className="hero shell">
          <div className="hero-copy">
            <p className="availability">
              <span className="status-dot" /> OPEN TO PFE INTERNSHIPS · FEB 2027
            </p>
            <p className="hero-name">Hi, I’m Youssef El Amrani.</p>
            <h1>
              Building practical
              <br />
              <span className="accent">AI solutions.</span>
              <br />
              From models
              <br className="desktop-break" /> to applications.
            </h1>
            <p className="hero-description">
              Aspiring AI Engineer & final-year master’s student. Exploring the
              intersection of machine learning, generative AI and intelligent
              agents.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="button primary">
                Explore my projects <Arrow />
              </a>
              <a href="#contact" className="button secondary">
                Get in touch <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hero-location">
              <span aria-hidden="true">◎</span> Casablanca, Morocco{" "}
              <span className="divider" /> On-site / Hybrid
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="visual-coordinate" aria-hidden="true">
              IDEAS → EXPERIMENTS → APPLICATIONS
            </span>
            <figure className="portrait-frame">
              <img
                src={portrait}
                width="494"
                height="619"
                alt="Portrait of Youssef El Amrani"
                fetchPriority="high"
              />
              <figcaption>
                <span className="status-dot" /> YOUSSEF EL AMRANI
                <span>ASPIRING AI ENGINEER</span>
              </figcaption>
            </figure>
            <div className="visual-label label-top">
              <span aria-hidden="true">✳</span> Generative AI & agents
            </div>
            <div className="visual-corner" aria-hidden="true">
              PYTHON / ML / LLMs
            </div>
          </div>
        </section>
        <div className="focus-strip">
          <div className="shell flex flex-wrap items-center justify-between gap-5">
            <span className="eyebrow">AREAS OF INTEREST</span>
            {[
              "Generative AI",
              "Intelligent agents",
              "Machine learning",
              "Computer vision",
            ].map((x) => (
              <span key={x} className="focus-item">
                <span aria-hidden="true">✳</span>
                {x}
              </span>
            ))}
          </div>
        </div>
        <section tabIndex={-1} id="about" className="shell section">
          <SectionTitle
            number="01"
            eyebrow="A LITTLE ABOUT ME"
            title="Curiosity, turned into code."
          />
          <div className="about-grid">
            <p className="large-copy">
              I enjoy turning an idea into an end-to-end application — from
              preparing data to designing model workflows and developing APIs.
            </p>
            <div className="body-copy">
              <p>
                I’m a final-year master’s student in Advanced Machine Learning
                and Multimedia Intelligence at the Faculté des Sciences Dhar El
                Mehraz in Fès. My work brings together machine learning, deep
                learning, software engineering and generative AI.
              </p>
              <p>
                Through academic projects and an AI engineering internship, I’ve
                practiced building document-based question-answering systems, AI
                agents, predictive models and computer vision prototypes.
              </p>
              <div className="internship-note">
                <span className="status-dot" />
                <p>
                  <strong>Looking for my next learning opportunity</strong>
                  <br />A 4–6 month, full-time PFE internship from February 2027
                  in AI Engineering, Machine Learning or Generative AI.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section tabIndex={-1} id="experience" className="section shell">
          <SectionTitle
            number="02"
            eyebrow="HANDS-ON EXPERIENCE"
            title="Learning by building."
          />
          <article className="experience-card">
            <div className="experience-meta">
              <span className="eyebrow">JUN — AUG 2026</span>
              <h3>
                Btechnologie<span className="accent">.</span>
              </h3>
              <p>Casablanca, Morocco</p>
              <span className="tag">Internship</span>
            </div>
            <div>
              <h4>AI Engineer Intern</h4>
              <p className="muted mb-6">
                Supported AI proof-of-concept applications and backend
                components for data-driven workflows.
              </p>
              <ul className="contributions">
                <li>
                  Contributed to an analytics assistant combining SQL queries,
                  document retrieval and LLM-generated summaries.
                </li>
                <li>
                  Created Python preprocessing utilities and documented FastAPI
                  endpoints.
                </li>
                <li>Implemented unit tests for data validation.</li>
                <li>
                  Presented experimental results, technical trade-offs and
                  deployment considerations to the team.
                </li>
              </ul>
              <div className="tags mt-7">
                {[
                  "Python",
                  "FastAPI",
                  "SQL",
                  "LLM applications",
                  "Testing",
                ].map((x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>
        <section
          tabIndex={-1}
          id="projects"
          className="section projects-section"
        >
          <div className="shell">
            <SectionTitle
              number="03"
              eyebrow="SELECTED AI PROJECTS"
              title="From questions to systems."
            >
              Academic and portfolio projects exploring practical applications
              of AI. Each starts with a problem worth understanding.
            </SectionTitle>
            <div className="projects-grid">
              {projects.map((p, i) => (
                <article key={p.title} className="project-card">
                  <div className={`project-visual visual-${i}`}>
                    <span className="project-number">
                      0{i + 1} / CONCEPTUAL WORKFLOW
                    </span>
                    <div className="flow-icon" aria-hidden="true">
                      {p.icon}
                    </div>
                    <div
                      className="project-flow"
                      aria-label="Conceptual workflow"
                    >
                      {p.flow.map((step, j) => (
                        <span key={step}>
                          {j > 0 && <b aria-hidden="true">→</b>}
                          <span>{step}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-content">
                    <p className="eyebrow">{p.category}</p>
                    <h3>{p.title}</h3>
                    <p className="project-challenge">{p.challenge}</p>
                    <p className="muted">{p.solution}</p>
                    <div className="tags">
                      {p.stack.map((x) => (
                        <span className="tag" key={x}>
                          {x}
                        </span>
                      ))}
                    </div>
                    <details>
                      <summary>
                        Approach & outcome <span aria-hidden="true">+</span>
                      </summary>
                      <div className="project-details">
                        <p>{p.outcome}</p>
                        <p>{p.detail}</p>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section tabIndex={-1} id="skills" className="section shell">
          <SectionTitle
            number="04"
            eyebrow="TECHNICAL TOOLKIT"
            title="The tools behind the work."
          >
            A foundation across AI, data and software engineering, developed
            through coursework, projects and internship practice.
          </SectionTitle>
          <div className="skills-grid">
            {skills.map(([number, title, text]) => (
              <article key={title} className="skill-card">
                <span className="eyebrow">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section tabIndex={-1} id="education" className="section shell">
          <SectionTitle
            number="05"
            eyebrow="EDUCATION"
            title="A foundation for what’s next."
          />
          <div className="education-list">
            <article className="education-row">
              <div className="education-date">
                2024 — 2027<span>EXPECTED JULY 2027</span>
              </div>
              <div>
                <p className="eyebrow">MASTER’S DEGREE</p>
                <h3>
                  Advanced Machine Learning
                  <br />
                  and Multimedia Intelligence
                </h3>
                <p>Faculté des Sciences Dhar El Mehraz</p>
                <p className="muted">
                  Université Sidi Mohamed Ben Abdellah · Fès, Morocco
                </p>
                <div className="tags mt-5">
                  {[
                    "Deep Learning",
                    "NLP",
                    "Computer Vision",
                    "MLOps",
                    "Reinforcement Learning",
                  ].map((x) => (
                    <span className="tag" key={x}>
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            <article className="education-row">
              <div className="education-date">2021 — 2024</div>
              <div>
                <p className="eyebrow">BACHELOR’S DEGREE</p>
                <h3>Computer Science</h3>
                <p>Faculté des Sciences et Techniques de Settat</p>
                <p className="muted">Université Hassan Ier · Settat, Morocco</p>
                <p className="muted mt-4">
                  Algorithms, databases, software engineering, mathematics and
                  web development.
                </p>
              </div>
            </article>
          </div>
          <div className="learning-languages">
            <div>
              <p className="eyebrow">CONTINUING TO LEARN</p>
              <h3>Certifications & learning</h3>
              <ul className="learning-list">
                <li>Machine Learning Specialization</li>
                <li>Python for Data Science and AI</li>
              </ul>
              <p className="small-note">
                Program titles supplied; credential details are not provided.
              </p>
            </div>
            <div>
              <p className="eyebrow">COMMUNICATION</p>
              <h3>Languages</h3>
              <dl className="language-list">
                <div>
                  <dt>Arabic</dt>
                  <dd>Native</dd>
                </div>
                <div>
                  <dt>French</dt>
                  <dd>Professional working proficiency</dd>
                </div>
                <div>
                  <dt>English</dt>
                  <dd>Professional working proficiency</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section tabIndex={-1} id="contact" className="section shell">
          <div className="contact-card">
            <div>
              <p className="eyebrow">
                <span className="status-dot" /> LET’S BUILD SOMETHING USEFUL
              </p>
              <h2>
                A new challenge.
                <br />
                <span className="accent">A conversation away.</span>
              </h2>
              <p>
                Have a PFE internship opportunity or an interesting AI project?
                I’d love to hear from you.
              </p>
              <a
                className="button primary"
                href="mailto:youse.elamrrani@gmail.com"
              >
                Let’s talk <Arrow />
              </a>
            </div>
            <div className="contact-links">
              <a href="mailto:youse.elamrrani@gmail.com">
                <span>
                  <small>EMAIL</small>youse.elamrrani@gmail.com
                </span>
                <Arrow />
              </a>
              <a href="tel:+212633556612">
                <span>
                  <small>PHONE</small>+212 633 556 612
                </span>
                <Arrow />
              </a>
              <a
                href="https://github.com/youssef"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <small>GITHUB</small>github.com/youssef
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
                <Arrow />
              </a>
              <a
                href="https://linkedin.com/in/youssef"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <small>LINKEDIN</small>linkedin.com/in/youssef
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
                <Arrow />
              </a>
              <p className="small-note">
                Social links supplied for this portfolio demo; account ownership
                has not been verified.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        © {new Date().getFullYear()} Youssef El Amrani.
      </footer>
    </>
  );
}
export default App;
