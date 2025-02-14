import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import Footer from "../components/Footer";
import "../css/Events.css";

const EventPage = () => {
  const navigate = useNavigate();

  // Sample events data (this will be replaced by real data if needed)
  const events = [
    { id: 1, title: "Tech Innovators Summit", date: "March 15, 2025", location: "Virtual" },
    { id: 2, title: "AI & Blockchain Conference", date: "April 10, 2025", location: "New York" },
    { id: 3, title: "Frontend Developers Meetup", date: "May 22, 2025", location: "San Francisco" },
    { id: 4, title: "Cybersecurity Symposium", date: "June 5, 2025", location: "London" },
  ];

  return (
    <div className="event-page">
      <Navbar />
      <section className="event-header">
        <h1>Upcoming Events</h1>
        <p>Discover the latest conferences and tech events happening soon.</p>
      </section>

      <section className="event-list">
        {events.map((event) => (
          <EventCard key={event.id} title={event.title} date={event.date} location={event.location} />
        ))}
      </section>

      <div className="event-button-container">
        <Button text="Go Home" onClick={() => navigate("/")} />
      </div>

      <Footer />
    </div>
  );
};

export default EventPage;
