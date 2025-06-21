import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await api.post("/contact", formData);
      if (res.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="vh-100">
      <Container id="contact" className="py-5">
        <h2 className="text-center mb-4 text-uppercase py-3 fw-bolder">
          Contact Me
        </h2>
        <Row>
          {/* Contact Info and Social Links */}
          <Col md={6}>
            <div className="mb-4">
              <h5>Get in Touch</h5>
              <p>
                <a
                  href="mailto:pravinkumar671231@gmail.com?subject=Contact%20from%20Portfolio&body=Hello%20Pravin,"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope className="me-2" /> pravinkumar671231@gmail.com
                </a>
              </p>
              <p>
                <FaPhoneAlt className="me-2" /> +91 8220839631
              </p>
              <p>
                <FaMapMarkerAlt className="me-2" /> Coimbatore, TamilNadu
              </p>
            </div>
            {/* Contact Form */}

            <div>
              <h5 className="fs-4">Follow Me</h5>
              <div className="d-flex gap-3">
                <Button
                  as="a"
                  href="https://linkedin.com/in/pravinkumar31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black fw-bolder"
                >
                  <FaLinkedin className="me-2" /> LinkedIn
                </Button>

                <Button
                  as="a"
                  href="https://github.com/Pravin671231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black fw-bolder"
                >
                  <FaGithub className="me-2" /> GitHub
                </Button>
              </div>
            </div>
          </Col>

          <Col md={6}>
            {status === "success" && (
              <Alert variant="success">Message sent successfully!</Alert>
            )}
            {status === "error" && (
              <Alert variant="danger">Something went wrong. Try again.</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="fs-6"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
