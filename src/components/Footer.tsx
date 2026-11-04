import { content } from "../content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlock: "1.5rem",
        color: "var(--muted)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>
          © {year} {content.person.name}
        </span>
        <div style={{ display: "flex", gap: "1rem" }}>
          {content.socials.slice(0, 2).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
