import { Card, Col, Container, Image, Row } from "react-bootstrap";
import aboutImg from "../assets/about_01.png";
import { skills } from "../Data/skills";

export default function About() {
 

  return (
    <section>
      <Container className="pt-5">
        <Row className="align-items-center mt-4">
          <Col md={5} className="text-center mb-4">
            <Image src={aboutImg} alt="aboutImg" fluid className="shadow-lg" />
          </Col>
          <Col md={7}>
            <h2 className="text-center mb-4 text-uppercase py-3 fw-bolder">
              About Me
            </h2>
            <p className="h4 text-muted">
              Hi! I'm <strong>Pravinkumar</strong>, a passionate developer
              building full-stack web apps using the MERN stack. I enjoy
              learning new technologies and solving real-world problems with
              clean, functional code.
            </p>
            <br />
            <p className="h4 text-muted">
              I’ve built several hands-on projects and continuously improve my
              skills in JavaScript, React, Node.js, Express, MongoDB, and data
              structures.
            </p>
          </Col>
          <h2 className="text-center my-4">Skills</h2>
          <Row className="justify-content-center">
            {skills.map((skill, idx) => (
              <Col md={3} sm={6} xs={12} key={idx} className="mb-4">
                <Card className="text-center shadow-lg h-100 p-3 bg-white">
                  <Card.Img
                    variant="top"
                    src={skill.img}
                    alt={skill.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      margin: "0 auto",
                      background: "white",
                    }}
                  />
                  <Card.Body className="bg-white">
                    <Card.Title className="fs-5 mt-2 bg-white">
                      {skill.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </section>
  );
}
