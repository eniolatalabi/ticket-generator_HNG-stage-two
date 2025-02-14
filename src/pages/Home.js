import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import InputField from "../components/InputField";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Conference Ticket Generator</h1>
          <p>Generate tickets seamlessly for upcoming events.</p>
          <Button text="View All Events" onClick={() => navigate("/events")} />
        </div>
      </section>

      {/* About Section - Improved */}
      <section className="about-section">
        <div className="about-content">
          <h2>About the Conference</h2>
          <p>
            Join top industry leaders, professionals, and tech enthusiasts at our annual 
            conference. Gain insights into the latest trends, engage in thought-provoking discussions, 
            and expand your professional network.
          </p>
          <p>
            Whether you're a developer, entrepreneur, or just curious about emerging technologies, 
            our conference is the place to be!
          </p>
          <Button text="Learn More" onClick={() => navigate("/about")} />
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

      {/* Contact Section - Improved */}
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
    </div>
  );
};

export default Home;
