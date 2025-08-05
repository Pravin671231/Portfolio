import { useEffect, useRef } from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Header from "../components/Header";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowRight } from "react-icons/fa";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import homeImg from "../assets/home.webp";

export default function Home() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (id) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    };

    refs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return (
    <>
      <Header scrollToSection={scrollToSection} />
      {/* Hero Section */}
      <section
        ref={homeRef}
        id="home"
        className="section-bg d-flex align-items-center"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
      >
        <Container>
          <Row className="align-items-center">
            {/* Image Column */}
            <Col md={5} className="text-center">
              <Image
                src={homeImg}
                alt="Developer illustration"
                fluid
                className="hero-image"
              />
            </Col>
            {/* Text Column */}
            <Col md={7} className="text-center text-md-start mb-4 mb-md-0">
              <h1 className="display-5 fw-bold mb-3">
                👋Hi, I’m <span className="text-success">PravinKumar</span>
              </h1>

              <h2
                className="text-success text-center mb-4"
                style={{ fontSize: "1.75rem" }}
              >
                <Typewriter
                  words={[
                    "MERN Stack Developer",
                    "Full Stack Developer",
                    "Problem Solver",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h2>

              <p className="lead mb-4" style={{ maxWidth: "650px" }}>
                I'm a full-stack developer with a passion for building fast,
                scalable, and user-friendly applications using the MERN stack.
                From idea to deployment, I love creating clean solutions to
                real-world problems.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="success"
                  className="fs-5 fw-bold px-4 py-2"
                  onClick={() => scrollToSection("projects")}
                >
                  View Projects <FaArrowRight className="ms-2" />
                </Button>

                <Button
                  variant="outline-dark"
                  className="fs-5 fw-semibold px-4 py-2"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in Touch
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
        // className="section-bg-dark"
      >
        <About />
      </section>
      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
        className="section-bg-dark"
      >
        <Projects />
      </section>
      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
        className="section-bg"
      >
        <Contact />
      </section>
    </>
  );
}
