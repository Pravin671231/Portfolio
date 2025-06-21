import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useProjectContext } from "../context/ProjectContext";
import Image from "./Image";
// import ProjectModel from "./ProjectModel";

const ProjectCard = () => {
  const { projects } = useProjectContext();

  return (
    <>
      <Row>
        {projects.map((project, id) => (
          <Col
            md={4}
            key={id}
            className="mb-4 justify-content-between"
            // onClick={() => setSelectedProject(project)}
            style={{ cursor: "pointer" }}
          >
            <Card className="h-100 shadow p-3 glass-card text-white">
              {/* <Card.Img
                variant="top"
                src={project.imageUrl}
                alt={project.title}
                style={{
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              /> */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "2px solid black",
                }}
              />
              <Card.Body>
                <Card.Title className="text-dark fw-bolder">
                  {project.title}
                </Card.Title>
                <div className="text-dark py-3">{project.description}</div>
                <div className="d-flex flex-wrap">
                  {project.techStack.map((tech, id) => (
                    <Badge
                      key={id}
                      bg="success"
                      text="white"
                      className="me-2 mb-2"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer className="bg-transparent border-top-0">
                <Button
                  variant="light"
                  size="sm"
                  className="me-2"
                  href={project.githubLink}
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  href={project.liveLink}
                  target="_blank"
                >
                  Live
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <ProjectModel /> */}
    </>
  );
};

export default ProjectCard;
