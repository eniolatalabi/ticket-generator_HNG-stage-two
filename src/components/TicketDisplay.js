import React from "react";
import Button from "./Button";
import "../css/TicketDisplay.css";

const TicketDisplay = ({ name, email, avatar, onDelete }) => {
  if (!name || !email || !avatar) return null; 

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
      <Button text="Delete Ticket" onClick={onDelete} className="delete-button" />
    </div>
  );
};

export default TicketDisplay;
