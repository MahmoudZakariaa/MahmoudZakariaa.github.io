import { content } from "../content";

export function Courses() {
  return (
    <section id="courses" className="section reveal-on-scroll">
      <div className="wrap">
        <h2>Courses & Training</h2>
        <ul className="rule-list">
          {content.courses.map((course) => (
            <li key={course.title}>
              <strong className="course-title">{course.title}</strong>
              {course.detail ? <div className="course-detail">{course.detail}</div> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
