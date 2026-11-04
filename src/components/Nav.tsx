import { useEffect, useId, useState } from "react";
import { content } from "../content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="wrap site-nav" aria-label="Primary">
        <a href="#top" className="site-brand" onClick={closeMenu}>
          {content.person.name}
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>
        <ul id={menuId} className={`site-nav-links${open ? " is-open" : ""}`}>
          {content.nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
