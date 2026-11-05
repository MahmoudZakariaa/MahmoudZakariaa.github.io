import { content } from "../content";

export function Hero() {
  const { hero } = content;
  return (
    <section id="top" className="hero">
      <img
        className="hero-bg"
        src={hero.backgroundSrc}
        alt=""
        aria-hidden="true"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-content">
        <h1 className="hero-title">{content.person.name}</h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-blurb">{hero.blurb}</p>
        <div className="hero-actions">
          <a className="btn" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
