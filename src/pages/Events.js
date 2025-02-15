import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import "../css/Events.css";

const EventPage = () => {
  const navigate = useNavigate();

  // Sample events data with descriptions and times
  const events = [
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
    {
      id: 3,
      title: "Frontend Developers Meetup",
      date: "May 22, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "San Francisco",
      description:
        "A gathering of frontend developers to share knowledge, tools, and best practices. Perfect for networking and learning about the latest trends in web development.",
    },
    {
      id: 4,
      title: "Cybersecurity Symposium",
      date: "June 5, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "London",
      description:
        "Explore the latest trends and challenges in cybersecurity. Hear from top experts and learn how to protect your organization from emerging threats.",
    },
    {
      id: 5,
      title: "Cloud Computing Expo",
      date: "July 20, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Berlin",
      description:
        "Dive into the world of cloud computing. Learn about the latest tools, platforms, and strategies for optimizing cloud infrastructure.",
    },
  ];

  return (
    <div className="event-page">
      <section className="event-header">
        <h1>Upcoming Events</h1>
        <p>Discover the latest conferences and tech events <br/> happening soon.</p>
      </section>

      <section className="event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
          />
        ))}
      </section>

      <div className="event-button-container">
        <Button text="Go Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default EventPage;
