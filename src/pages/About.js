import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/About.css";

const About = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      <Navbar />

      {/* About Section with Scroll Effect */}
      <section className={`about-section ${scrolled ? "scrolled" : ""}`}>
        <div className="about-content">
          <h1>About the Conference Ticket Generator</h1>
          <p>
            Our platform simplifies the process of generating and managing tickets for conferences.
            Whether you're an organizer or an attendee, our system ensures a seamless experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <ul>
          <li>🎟 Easy and instant ticket generation</li>
          <li>🔐 Secure and reliable ticket storage</li>
          <li>📩 Seamless ticket sharing via email</li>
          <li>📅 Stay updated with event details</li>
        </ul>
      </section>

      <section className="hng-developers-section">
        <h2>Built by HNG Developers</h2>
        <p>
          This project is crafted by talented developers from the HNG Internship, dedicated to building
          real-world solutions and improving their technical expertise.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
