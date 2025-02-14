import React, { useState } from "react";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage"; 
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";
import { validateForm } from "../utils/validations";
import "../css/EventCard.css";

const EventCard = ({ title, date, location, description }) => {
  const [formData, setFormData] = useState({ name: "", email: "", avatar: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle ticket generation
  const handleGenerateTicket = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save ticket to local storage with event title
    const existingTickets = getFromLocalStorage("tickets") || [];
    const newTicket = { ...formData, event: title };
    saveToLocalStorage("tickets", [...existingTickets, newTicket]);

    // Show success message
    setSuccess(true);
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{date}</p>
      </div>
      <p className="event-location">{location}</p>
      <p className="event-description">{description}</p>

      {!success ? (
        <>
          <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <ErrorMessage message={errors.name} />}
          
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <ErrorMessage message={errors.email} />}
          
          <InputField label="Avatar URL" type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
          {errors.avatar && <ErrorMessage message={errors.avatar} />}
          
          <button className="event-button" onClick={handleGenerateTicket}>Generate Ticket</button>
        </>
      ) : (
        <div className="success-message">
          <p>✅ Ticket successfully generated for {title}!</p>
          <button className="event-button" onClick={() => window.location.href = "/my-tickets"}>View Tickets</button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
