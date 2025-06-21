import { Button, Col, Container, Row } from "react-bootstrap";
import { Typewriter } from "react-simple-typewriter";
import homeImg from "../assets/home.webp";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="home-section d-flex align-items-center">
      <Container className="vh-100 d-flex align-items-center p-4">
        <Row className="w-100 justify-content-center align-items-center text-center">
          <Col
            xs={12}
            md={6}
            className="mb-4 mb-md-0 d-flex justify-content-center"
          >
            <img
              src={homeImg}
              alt="Home"
              className="img-fluid w-100"
              style={{
                maxWidth: "450px",
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Col>
          <Col xs={12} md={6} className="text-center text-md-start">
            <h3 className="fs-1 fw-bold mb-2">
              <span className="text-success">I'm</span> PravinKumar K
            </h3>
            <h1 className="mb-3 text-success">
              <Typewriter
                words={["MERN Stack Developer", "Full Stack Developer"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <p className="h5 text-muted mb-4 ">
              A Full Developer passionate about building user-friendly and
              interactive web apps. With a touch of creativity and efficiency, I
              turn ideas into smooth digital experiences
            </p>
            <Button
              variant="success"
              className="fs-5 fw-bold  px-4 py-2"
              onClick={() => navigate("/projects")}
            >
              View Projects <FaArrowRight className="ms-2" />
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
