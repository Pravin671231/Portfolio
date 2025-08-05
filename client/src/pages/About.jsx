import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import aboutImg from "../assets/about_01.png";
import { skills } from "../Data/skills";
import ProgressBar from "react-bootstrap/ProgressBar";

// Group skills by category
const groupByCategory = (skills) => {
  return skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
};

export default function About() {
  const categorizedSkills = groupByCategory(skills);

  return (
    <div>
      <Container className="py-5">
        {/* ✅ Updated About Section */}
        <Row className="align-items-center mb-5">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <Image
              src={aboutImg}
              alt="Pravinkumar"
              fluid
              className="shadow rounded-circle border border-3 border-white"
            />
          </Col>
          <Col md={7}>
            <h2 className="fw-bold text-uppercase mb-3 text-md-start text-center">
              About Me
            </h2>
            <p className="lead text-muted">
              Hi, I'm <strong>Pravinkumar</strong> — a dedicated full-stack
              developer with a passion for building intuitive, high-performance
              web applications.
            </p>
            <p className="text-muted">
              I specialize in the <strong>MERN stack</strong> and have strong
              experience in designing robust APIs, crafting responsive front-end
              interfaces, and solving complex backend challenges. I'm constantly
              learning and enjoy contributing to real-world projects that make a
              difference.
            </p>
            <p className="text-muted">
              Beyond coding, I'm passionate about creating seamless user
              experiences, optimizing performance, and developing scalable,
              production-ready solutions that grow with real-world demands.
            </p>
            {/* Resume + Social Links */}
            <div className="mt-4 d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              {/* Download Resume Button */}
              <a href="/resume.pdf" download className="btn btn-success px-4">
                Download Resume
              </a>

              {/* Social Links */}
              <a
                href="https://www.linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark d-flex align-items-center gap-2"
              >
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>

              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark d-flex align-items-center gap-2"
              >
                <i className="bi bi-github"></i> GitHub
              </a>
            </div>
          </Col>
        </Row>

        {/* Skills Section */}
        <h2 className="text-center fw-bold text-uppercase my-5">
          Tech Stack & Skills
        </h2>

        {Object.entries(categorizedSkills).map(([category, skills], idx) => (
          <div key={idx} className="mb-5">
            <h4 className="fw-semibold text-success mb-4">{category}</h4>
            <Row>
              {skills.map((skill) => (
                <Col md={6} key={skill.name} className="mb-3">
                  <ListGroup>
                    <ListGroup.Item className="d-flex align-items-center justify-content-between  border-0">
                      <div className="d-flex align-items-center">
                        <Image
                          src={skill.img}
                          alt={skill.name}
                          style={{
                            width: "28px",
                            height: "28px",
                            objectFit: "contain",
                            marginRight: "12px",
                          }}
                        />
                        <strong>{skill.name}</strong>
                      </div>
                      <div style={{ width: "50%" }}>
                        <ProgressBar
                          now={skill.level}
                          variant="success"
                          style={{ height: "8px", fontSize: "0.7rem" }}
                        />
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}
