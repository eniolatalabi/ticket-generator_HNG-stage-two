import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <li><NavLink to="/events" activeClassName="active">Events</NavLink></li>
          <li><NavLink to="/my-tickets" activeClassName="active">My Tickets</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li className="hide-on-desktop">
            <Link to="/get-ticket" className="btn-primary">Get Ticket</Link>
          </li>
        </ul>

        {/* Right-Side Button */}
        <Link to="/get-ticket" className="btn-primary hide-on-mobile">Get Ticket</Link>

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
