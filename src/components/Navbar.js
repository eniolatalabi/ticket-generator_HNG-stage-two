import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Scroll smoothly to the "featured-events" section on Home
  const scrollToEvents = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("featured-events");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home, navigate there first then scroll
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("featured-events");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo (Acts as Home Link) */}
        <Link to="/" className="logo">
          Conf<span>Tickets</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/events" activeclassname="active">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/tickets" activeclassname="active">
              My Tickets
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">
              About
            </NavLink>
          </li>
          <li className="hide-on-desktop">
            <button className="btn-primary" onClick={scrollToEvents}>
              Get Ticket
            </button>
          </li>
        </ul>

        {/* Right-Side Button for Desktop */}
        <button className="btn-primary hide-on-mobile" onClick={scrollToEvents}>
          Get Ticket
        </button>

        {/* Hamburger Menu */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
