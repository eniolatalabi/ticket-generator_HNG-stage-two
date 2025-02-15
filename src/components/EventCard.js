import React, { useState } from "react";
import AttendeeDetailsOverlay from "./AttendeeDetailsOverlay";
import "../css/EventCard.css";

const EventCard = ({ title, date, time, location, description }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{date}</p>
      </div>
      <div className="event-details">
        <p className="event-location">📍 {location}</p>
        <p className="event-time">⏰ {time}</p>
        <p className="event-description">{description}</p>
      </div>
      <button className="event-button" onClick={() => setShowOverlay(true)}>
        Get Ticket
      </button>
      {showOverlay && (
        <AttendeeDetailsOverlay
          event={{ title, date, time, location, description }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
};

export default EventCard;
