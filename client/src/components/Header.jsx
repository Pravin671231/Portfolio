import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaEnvelope, FaHome, FaProjectDiagram, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { to: "/", label: "Home", icon: <FaHome />, exact: true },
    { to: "/about", label: "About", icon: <FaUser /> },
    { to: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  const closeMenu = () => setExpanded(false);
  return (
    <header className="header h-50">
      <Navbar
        expand="lg"
        collapseOnSelect
        expanded={expanded}
        onToggle={setExpanded}
        className="border-bottom shadow-lg fixed-top bg-white "
      >
        <Container className="">
          <Navbar.Brand>Portfolio</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse>
            <Nav className="justify-content-between gap-3 ms-auto">
              {menuItems.map(({ to, label, icon, exact }, id) => (
                <Nav.Item key={id}>
                  <Nav.Link
                    as={NavLink}
                    to={to}
                    end={exact}
                    onClick={closeMenu}
                    key={label}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    {icon} {label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
