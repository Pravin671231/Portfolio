import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Carousel,
} from "react-bootstrap";
import Image from "./Image";
import { projects } from "../Data/ProjectData";
const ProjectCard = () => {
  const [selectedProject, setSelectedProject] = useState(
    projects.length > 0 ? projects[0] : null
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container className="my-5">
      <Row className="g-4 align-items-start">
        {/* Left Column - Sticky Carousel or placeholder */}
        <Col
          md={6}
          className="text-center"
          style={{ position: "sticky", top: "100px", alignSelf: "flex-start" }}
        >
          {selectedProject ? (
            <>
              <h5
                className="mb-3 fs-3 fw-bold"
                style={{ letterSpacing: "0.5px" }}
              >
                {selectedProject.title}
              </h5>

              {selectedProject.imageUrls &&
              selectedProject.imageUrls.length > 0 ? (
                <Carousel
                  key={selectedProject.title}
                  variant="dark"
                  indicators
                  interval={null}
                >
                  {selectedProject.imageUrls.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <Image
                        src={img}
                        alt={`${selectedProject.title} - image ${idx + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          maxHeight: "400px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #198754",
                          padding: "12px",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p className="text-muted">No images uploaded yet.</p>
              )}
            </>
          ) : (
            <p className="text-muted">Click a project to preview images</p>
          )}
        </Col>

        {/* Right Column - Project List */}
        {/* Right Column - Scrollable Project List (2 cards visible) */}
        <Col md={6}>
          <div
            className="scrollable-project-list"
            style={{
              maxHeight: "700px",
              overflowY: "auto",
              paddingRight: "8px",
            }}
          >
            {projects.map((project, id) => (
              <Card
                key={id}
                className={`shadow-sm border-0 mb-4 ${
                  selectedProject?.title === project.title
                    ? "border-success border-2"
                    : ""
                }`}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer", minHeight: "250px" }}
              >
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold text-dark mb-2">
                    {project.title}
                  </Card.Title>
                  <Card.Text
                    className="text-black"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {expandedDescriptions[id]
                      ? project.description
                      : project.description.split(" ").slice(0, 30).join(" ") +
                        (project.description.split(" ").length > 50
                          ? "..."
                          : "")}
                  </Card.Text>

                  {project.description.split(" ").length > 50 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(id);
                      }}
                    >
                      {expandedDescriptions[id] ? "Read less" : "Read more"}
                    </Button>
                  )}

                  <div className="d-flex flex-wrap mt-3">
                    {project.techStack.map((tech, idx) => (
                      <Badge
                        key={idx}
                        bg="success"
                        className="me-2 mb-2"
                        style={{ fontSize: "0.75rem", padding: "6px 10px" }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>

                <Card.Footer className="bg-light border-0 px-4 pb-4 d-flex justify-content-between">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    href={project.githubLink}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </Button>

                  <Button
                    variant="success"
                    size="sm"
                    href={project.liveLink}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectCard;
