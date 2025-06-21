import { Container } from "react-bootstrap";

import ProjectCard from "../components/ProjectCard";
// import ProjectModel from "../components/ProjectModel";

export default function Projects() {
  return (
    <section>
      <Container>
        <h2 className="text-center mb-4 text-uppercase py-3 fw-bolder">My Projects</h2>
        <ProjectCard />
        {/* <ProjectModel /> */}
      </Container>
    </section>
  );
}
