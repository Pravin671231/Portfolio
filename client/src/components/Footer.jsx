import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <hr className="border-light" />
        <p className="text-center small mb-0">
          &copy; 2025 Your Company. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
