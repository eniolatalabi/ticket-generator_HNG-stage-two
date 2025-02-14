import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <Link to="/" className="footer-logo">
          Conf<span>Tickets</span>
        </Link>

        {/* Navigation Links */}
        <ul className="footer-links">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/my-tickets">My Tickets</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-text">© {new Date().getFullYear()} ConfTickets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
