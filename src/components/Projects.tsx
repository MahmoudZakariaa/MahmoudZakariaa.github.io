import { content } from "../content";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2>Projects</h2>
        <div style={{ display: "grid", gap: "2.5rem" }}>
          {content.projects.map((p) => (
            <article
              key={p.title}
              style={{
                display: "grid",
                gap: "1.25rem",
                gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)",
                alignItems: "start",
                borderTop: "1px solid var(--border)",
                paddingTop: "1.5rem",
              }}
            >
              <img
                src={p.coverSrc}
                alt=""
                style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--border)" }}
              />
              <div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  {p.logoSrc ? (
                    <span className="logo-chip">
                      <img src={p.logoSrc} alt={p.logoAlt ?? ""} />
                    </span>
                  ) : null}
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display)" }}>{p.title}</h3>
                </div>
                <p style={{ color: "var(--muted)" }}>{p.stack}</p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b} style={{ color: "var(--muted)" }}>
                      {b}
                    </li>
                  ))}
                </ul>
                {p.href ? (
                  <a className="btn btn-ghost" href={p.href} target="_blank" rel="noopener noreferrer">
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
