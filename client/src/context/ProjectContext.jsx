import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to load Projects", err));
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
