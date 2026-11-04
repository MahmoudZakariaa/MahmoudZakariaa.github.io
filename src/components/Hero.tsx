import { content } from "../content";

export function Hero() {
  const { hero } = content;
  return (
    <section
      id="top"
      className="reveal"
      style={{
        position: "relative",
        minHeight: "78vh",
        display: "grid",
        alignItems: "end",
        overflow: "hidden",
      }}
    >
      <img
        src={hero.backgroundSrc}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,15,20,0.55), rgba(11,15,20,0.92))",
          zIndex: 1,
        }}
      />
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBlock: "5rem" }}>
        <p
          style={{
            margin: "0 0 0.75rem",
            color: "var(--muted)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            maxWidth: "40rem",
          }}
        >
          {hero.role}
        </p>
        <p style={{ margin: "0 0 1.5rem", maxWidth: "36rem", fontSize: "1.125rem" }}>
          {hero.blurb}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a className="btn" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
