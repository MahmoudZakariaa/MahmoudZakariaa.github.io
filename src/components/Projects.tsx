import { content } from "../content";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2>Projects</h2>
        <div className="project-list">
          {content.projects.map((p) => (
            <article key={p.title} className="project-card">
              <img className="project-cover" src={p.coverSrc} alt="" />
              <div className="project-body">
                <div className="project-heading">
                  {p.logoSrc ? (
                    <span className="logo-chip">
                      <img src={p.logoSrc} alt={p.logoAlt ?? ""} />
                    </span>
                  ) : null}
                  <h3>{p.title}</h3>
                </div>
                <p className="project-stack">{p.stack}</p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {p.href ? (
                  <a
                    className="btn btn-ghost"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.hrefLabel ?? "Open"}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
