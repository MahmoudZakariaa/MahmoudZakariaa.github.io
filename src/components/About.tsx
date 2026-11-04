import { content } from "../content";

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <h2>About</h2>
        <p style={{ maxWidth: "42rem", color: "var(--muted)" }}>{content.about.summary}</p>
        <p style={{ maxWidth: "42rem" }}>{content.about.aiSentence}</p>
        <p style={{ color: "var(--muted)" }}>{content.about.education}</p>
        <p style={{ color: "var(--muted)" }}>{content.about.languages}</p>
      </div>
    </section>
  );
}
