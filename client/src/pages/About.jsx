export default function About() {
  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git & GitHub",
    "REST API",
    "Bootstrap",
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">About Me</h2>

      <div className="row align-items-center">
        <div className="col-md-4 text-center mb-4 ">
          <img
            src="https://via.placeholder.com/200"
            alt="Czar"
            className="img-fluid rounded-circle shadow"
          />
        </div>
        <div className="col-md-8">
          <p>
            Hi! I'm <strong>Pravinkumar </strong>, a passionate developer
            building full-stack web apps using the MERN stack. I enjoy learning
            new technologies and solving real-world problems with clean,
            functional code.
          </p>
          <p>
            I’ve built several hands-on projects and continuously improve my
            skills in JavaScript, React, Node.js, Express, MongoDB, and data
            structures.
          </p>
        </div>
      </div>

      <hr className="my-5" />
      <h4 className="mb-3">Skills</h4>
      <div className="row">
        {skills.map((skill, id) => (
          <div className="col-md-3 col-sm-6 mb-2" key={id}>
            <div className="bagde bg-secondary p-2 w-100 text-center">
              {skill}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
