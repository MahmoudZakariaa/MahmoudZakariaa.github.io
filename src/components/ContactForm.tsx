import { useState, type FormEvent } from "react";
import { content } from "../content";
import { encodeFormBody } from "../lib/encodeFormBody";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      "form-name": "contact",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      "bot-field": String(fd.get("bot-field") ?? ""),
    };
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormBody(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <h2>Contact</h2>
        <p style={{ color: "var(--muted)" }}>
          <a href={`mailto:${content.person.email}`}>{content.person.email}</a>
          {" · "}
          <a href={content.person.phoneHref}>{content.person.phone}</a>
        </p>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, flexWrap: "wrap" }}>
          {content.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          style={{
            marginTop: "1.5rem",
            display: "grid",
            gap: "0.85rem",
            maxWidth: "32rem",
          }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ position: "absolute", left: "-10000px" }} aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <label>
            Name
            <input
              required
              name="name"
              type="text"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </label>
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              rows={5}
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                resize: "vertical",
              }}
            />
          </label>
          <button className="btn" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
          {status === "success" ? <p role="status">Message sent. Thanks — I’ll reply soon.</p> : null}
          {status === "error" ? (
            <p role="alert">Couldn’t send right now. Email me directly instead.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
