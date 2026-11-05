import { content } from "../content";

export function Experience() {
  return (
    <section id="experience" className="section reveal-on-scroll">
      <div className="wrap">
        <h2>Experience</h2>
        <ol className="rule-list">
          {content.experience.map((job) => (
            <li key={job.org}>
              <div className="job-head">
                <span className={job.org.includes("ITI") ? "logo-plain" : "logo-chip"}>
                  <img src={job.logoSrc} alt={job.logoAlt} />
                </span>
                <div>
                  <strong className="job-role">{job.role}</strong>
                  <div className="job-meta">
                    <a href={job.href} target="_blank" rel="noopener noreferrer">
                      {job.org}
                    </a>{" "}
                    · {job.period}
                  </div>
                </div>
              </div>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
