import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => console.error("Failed to load projects"));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Projects</h2>

      <div className="row">
        {projects.map((project, id) => (
          <div className="col-md-4 mb-4" key={id}>
            <div className="card h-100 shodow-sm">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <p className="mb-2">
                  <strong>Tech</strong> {project.techStack.join(", ")}
                </p>
                <a
                  href={project.githubLink}
                  className="btn btn-outline-dark btn-sm me-2"
                  target="_blank"
                >
                  GitHub
                </a>
                <a
                  href={project.liveLink}
                  className="btn btn-primary btn-sm"
                  target="_blank"
                >
                  Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
