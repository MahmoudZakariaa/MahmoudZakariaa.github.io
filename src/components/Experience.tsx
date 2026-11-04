import { content } from "../content";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <h2>Experience</h2>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {content.experience.map((job) => (
            <li
              key={job.org}
              style={{
                borderTop: "1px solid var(--border)",
                paddingBlock: "1.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <span className="logo-chip">
                  <img src={job.logoSrc} alt={job.logoAlt} />
                </span>
                <div>
                  <strong>{job.role}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    <a href={job.href} target="_blank" rel="noopener noreferrer">
                      {job.org}
                    </a>{" "}
                    · {job.period}
                  </div>
                </div>
              </div>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b} style={{ color: "var(--muted)" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
