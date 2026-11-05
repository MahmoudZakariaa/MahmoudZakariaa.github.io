import { content } from "../content";

export function About() {
  return (
    <section id="about" className="section reveal-on-scroll">
      <div className="wrap">
        <h2>About</h2>
        <div className="measure">
          <p className="muted">{content.about.summary}</p>
          <p>{content.about.aiSentence}</p>
          <p className="muted">{content.about.education}</p>
          <p className="muted">{content.about.languages}</p>
        </div>
      </div>
    </section>
  );
}
