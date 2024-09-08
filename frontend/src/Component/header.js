import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar">
      <h3 className="logo">
        <span style={{ color: "#1E2A5E", fontSize: "40px" }}>
          ChalkBoard
        </span>
        <span>LMS</span>
      </h3>
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <li>
          <a
            href="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </a>
        </li>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
}

export default Header;
