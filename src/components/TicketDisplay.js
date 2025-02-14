import React from "react";
import "../css/TicketDisplay.css";

const TicketDisplay = ({ name, email, avatar, onDelete }) => {
  if (!name || !email || !avatar) return null; // Hide if no ticket info

  return (
    <div className="ticket-display">
      <h2 className="ticket-title">Your Conference Ticket</h2>
      <div className="ticket-content">
        <img src={avatar} alt="User Avatar" className="ticket-avatar" />
        <div className="ticket-details">
          <p className="ticket-name">{name}</p>
          <p className="ticket-email">{email}</p>
        </div>
      </div>
      {onDelete && ( // Only show delete button if onDelete is provided
        <button className="delete-button" onClick={onDelete}>
          Delete Ticket
        </button>
      )}
    </div>
  );
};

export default TicketDisplay;