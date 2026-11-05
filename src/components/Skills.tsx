import { content } from "../content";

export function Skills() {
  return (
    <section id="skills" className="section reveal-on-scroll">
      <div className="wrap">
        <h2>Skills</h2>
        <div className="skills-grid">
          {content.skills.map((g) => (
            <div key={g.title} className="skill-group">
              <h3 className="skills-title">{g.title}</h3>
              <ul className="skills-list">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="tech-logos" aria-label="Technology logos">
          {content.techLogos.map((t) => (
            <li key={t.name} title={t.name}>
              <img src={t.src} alt={t.name} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
