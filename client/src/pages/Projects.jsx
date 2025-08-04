import { Container } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <>
      <Container fluid className="py-5">
        <h2 className="text-center mb-5 text-uppercase fw-bold text-success">
          My Projects
        </h2>
        <ProjectCard />
      </Container>
    </>
  );
}
