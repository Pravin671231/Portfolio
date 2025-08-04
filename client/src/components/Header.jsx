import { useEffect, useState } from "react";
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

const menuItems = [
  { label: "Home", id: "home", icon: <FaHome /> },
  { label: "About", id: "about", icon: <FaUser /> },
  { label: "Projects", id: "projects", icon: <FaProjectDiagram /> },
  { label: "Contact", id: "contact", icon: <FaEnvelope /> },
];

export default function Header({ scrollToSection }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "home";
      for (const { id } of menuItems) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (id) => {
    scrollToSection(id);
    setExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavClick("home");
          }}
        >
          Portfolio
        </a>

        <button
          className="navbar-toggler"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-3">
            {menuItems.map(({ label, id, icon }) => (
              <li key={id} className="nav-item">
                <a
                  href={`#${id}`}
                  className={`nav-link d-flex align-items-center ${
                    activeSection === id ? "active text-success" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(id);
                  }}
                >
                  <span className="me-2" style={{ fontSize: "1.2rem" }}>
                    {icon}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
