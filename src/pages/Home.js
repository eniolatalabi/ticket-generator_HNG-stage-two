import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Footer from "../components/Footer";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Conference Ticket Generator</h1>
          <p>Generate tickets seamlessly for upcoming events.</p>
          <Button text="View All Events" onClick={() => navigate("/events")} />
        </div>
      </section>

      {/* About Section with Scrolling Effect */}
      <section className={`about-section ${scrolled ? "scrolled" : ""}`}>
        <div className="about-content">
          <h2>About the Conference</h2>
          <p>
            Our conference brings together industry experts, professionals, and enthusiasts to 
            share insights, network, and explore new opportunities.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="events-section">
        <h2>Featured Events</h2>
        <div className="event-list">
          <EventCard title="Tech Innovators Summit" date="March 15, 2025" location="Virtual" />
          <EventCard title="AI & Blockchain Conference" date="April 10, 2025" location="New York" />
        </div>
        <Button text="View All Events" onClick={() => navigate("/events")} />
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-form">
          <InputField label="Email" type="email" name="email" placeholder="Enter your email" />
          <InputField label="Message" type="text" name="message" placeholder="Your message..." />
          <Button text="Send Message" />
        </div>
        <div className="contact-details">
          <p>📞 +123 456 7890</p>
          <p>📧 contact@conference.com</p>
          <p>🌐 Follow us on Social Media</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
