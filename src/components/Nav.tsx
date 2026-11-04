import { content } from "../content";

export function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(11,15,20,0.85)",
      }}
    >
      <nav
        className="wrap"
        aria-label="Primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          minHeight: "4rem",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(1.25rem, 2.2vw, 1.5rem)",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          {content.person.name}
        </a>
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {content.nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} style={{ color: "var(--muted)" }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
