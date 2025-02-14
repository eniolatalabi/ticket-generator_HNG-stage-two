import React from "react";
import "../css/EventCard.css";

const EventCard = ({ title, date, location, description, onGenerateTicket }) => {
  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{date}</p>
      </div>
      <p className="event-location">{location}</p>
      <p className="event-description">{description}</p>
      <button className="event-button" onClick={onGenerateTicket}>
        Generate Ticket
      </button>
    </div>
  );
};

export default EventCard;
