import React, { useState } from "react";
import AttendeeDetailsOverlay from "../css/AttendeeDetailsOverlay.css";
import "../css/EventCard.css";

const EventCard = ({ event }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="event-card">
      {/* Event Image */}
      <div className="event-image">
        <img src={event.image} alt={event.name} />
      </div>

      {/* Event Details */}
      <div className="event-content">
        <h3>{event.name}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <p>📍 <span>{event.location}</span></p>
          <p>📅 <span>{event.date}</span></p>
          <p>⏰ <span>{event.time}</span></p>
        </div>

        <div className="event-footer">
          <p className="event-price">🎟️ {event.price}</p>
          <button className="get-ticket-btn" onClick={() => setShowOverlay(true)}>
            Get Ticket
          </button>
        </div>
      </div>

      {/* Ticket Booking Overlay */}
      {showOverlay && <AttendeeDetailsOverlay event={event} onClose={() => setShowOverlay(false)} />}
    </div>
  );
};

export default EventCard;
