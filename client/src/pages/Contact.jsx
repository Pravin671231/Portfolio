import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
 import {
  FaEnvelope, 
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import api from "../api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await api.post("/contact", formData);
      if (res.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
    <Container className="py-5">
        <h2 className="text-center text-uppercase fw-bold text-success mb-5">
          Contact Me
        </h2>
        <Row className="g-4">
          {/* Left: Contact Info */}
          <Col md={6}>
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Get in Touch</h5>
              <p>
                <a
                  href="mailto:pravinkumar671231@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark d-flex align-items-center"
                >
                  <FaEnvelope className="me-2" /> pravinkumar671231@gmail.com
                </a>
              </p>
              <p className="d-flex align-items-center">
                <FaPhoneAlt className="me-2" /> +91 8220839631
              </p>
              <p className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" /> Coimbatore, Tamil Nadu
              </p>
            </div>

            <div>
              <h5 className="fw-bold mb-3">Follow Me</h5>
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  as="a"
                  href="https://linkedin.com/in/pravinkumar31"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-success"
                  className="d-flex fw-bold align-items-center gap-2"
                >
                  <FaLinkedin />
                  LinkedIn
                </Button>

                <Button
                  as="a"
                  href="https://github.com/Pravin671231"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-dark"
                  className="d-flex fw-bold align-items-center gap-2"
                >
                  <FaGithub />
                  GitHub
                </Button>

                <Button
                  as="a"
                  href="https://wa.me/918220839631" // WhatsApp link
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-success"
                  className="d-flex fw-bold align-items-center gap-2"
                >
                  <FaWhatsapp />
                  WhatsApp
                </Button>

                <Button
                  as="a"
                  href="tel:+918220839631" // Phone call link (with + and country code)
                  variant="outline-primary"
                  className="d-flex fw-bold align-items-center gap-2"
                >
                  <FaPhoneAlt />
                  Call
                </Button>
              </div>
            </div>
          </Col>

          {/* Right: Contact Form */}
          <Col md={6}>
            {status === "success" && (
              <Alert variant="success" className="mb-4">
                Message sent successfully!
              </Alert>
            )}
            {status === "error" && (
              <Alert variant="danger" className="mb-4">
                Something went wrong. Please try again.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="px-4"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    
  );
}
