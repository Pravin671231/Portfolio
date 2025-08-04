import { createContext, useContext, useState } from "react";
// import projectData from "../Data/ProjectData";
const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects] = useState();

  return (
    <ProjectContext.Provider
      value={{ projects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
