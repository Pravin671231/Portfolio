import { useState } from "react";
import axios from "axios";

export default function AddProject() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    imageUrl: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const techArray = project.techStack.split(",").map((tech) => tech.trim());

    try {
      await axios.post("http://localhost:5000/api/projects", {
        ...project,
        techStack: techArray,
      });
      setStatus("success");
      setProject({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Project</h2>

      {status === "success" && (
        <div className="alert alert-success">Project added!</div>
      )}
      {status === "error" && (
        <div className="alert alert-danger">Something went wrong.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={project.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            className="form-control"
            value={project.techStack}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            className="form-control"
            value={project.githubLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Live Link</label>
          <input
            type="url"
            name="liveLink"
            className="form-control"
            value={project.liveLink}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            className="form-control"
            value={project.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
}
