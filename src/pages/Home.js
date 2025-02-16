import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AttendeeDetailsOverlay from "../components/AttendeeDetailsOverlay";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Innovators Summit",
      date: "March 15, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Virtual",
      description:
        "Join the brightest minds in tech as they discuss the future of innovation, AI, and blockchain. Network with industry leaders and explore cutting-edge technologies.",
    },
    {
      id: 2,
      title: "AI & Blockchain Conference",
      date: "April 10, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "New York",
      description:
        "Discover the latest advancements in AI and blockchain technology. Learn from experts and explore real-world applications of these transformative technologies.",
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);

  // --- Contact Form State & Handlers ---
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactError("");
    setContactSuccess("");

    if (!contactEmail) {
      setContactError("Please enter your email address.");
      return;
    }
    if (!validateEmail(contactEmail)) {
      setContactError("Please enter a valid email address.");
      return;
    }
    if (!contactMessage) {
      setContactError("Please enter your message.");
      return;
    }

    // Simulate sending email
    setTimeout(() => {
      setContactSuccess("Your message has been sent to demo@conference.com!");
      setContactEmail("");
      setContactMessage("");
    }, 1000);
  };

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

      {/* About Section */}
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

      {/* Featured Events Section with ID for scrolling */}
      <section id="featured-events" className="events-section">
        <h2>Featured Events</h2>
        <div className="event-list">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              onGenerateTicket={() => setSelectedEvent(event)}
            />
          ))}
        </div>
        <Button text="View All Events" onClick={() => navigate("/events")} />
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-form">
          <InputField
            label="Email"
            type="email"
            name="contactEmail"
            placeholder="Enter your email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <InputField
            label="Message"
            type="text"
            name="contactMessage"
            placeholder="Your message..."
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
          />
          <Button text="Send Message" onClick={handleContactSubmit} />
          {contactError && <p className="error-message">{contactError}</p>}
          {contactSuccess && <p className="success-message">{contactSuccess}</p>}
        </div>
        <div className="contact-details">
          <p>📞 +123 456 7890</p>
          <p>📧 contact@conference.com</p>
          <p>🌐 Follow us on Social Media</p>
        </div>
      </section>

      {/* AttendeeDetailsOverlay Modal */}
      {selectedEvent && (
        <AttendeeDetailsOverlay
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Home;
