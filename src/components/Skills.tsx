import { content } from "../content";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <h2>Skills</h2>
        <p style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <span className="logo-chip">
            <img src={content.outsystems.logoSrc} alt={content.outsystems.label} />
          </span>
          <a href={content.outsystems.href} target="_blank" rel="noopener noreferrer">
            {content.outsystems.label}
          </a>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginTop: "1.5rem",
          }}
        >
          {content.skills.map((g) => (
            <div key={g.title}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{g.title}</h3>
              <ul style={{ paddingLeft: "1.1rem", color: "var(--muted)" }}>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul
          aria-label="Technology logos"
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
            marginTop: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {content.techLogos.map((t) => (
            <li key={t.name} title={t.name}>
              <img src={t.src} alt={t.name} style={{ height: 22, opacity: 0.85 }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
