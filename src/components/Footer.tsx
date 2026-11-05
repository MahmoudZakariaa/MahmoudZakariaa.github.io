import { content } from "../content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <span>
          © {year} {content.person.name}
        </span>
        <div className="site-footer-links">
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
