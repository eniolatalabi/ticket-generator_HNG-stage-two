import React from "react";
import Navbar from "../components/Navbar";
import TicketDisplay from "../components/TicketDisplay";
import Footer from "../components/Footer";
import useLocalStorage from "../hooks/useLocalStorage";
import "../css/TicketView.css";

const TicketView = () => {
  const [tickets, setTickets] = useLocalStorage("tickets", []);

  // Delete single ticket by filtering it out
  const handleDelete = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  // Group tickets by event name
  const groupedTickets = tickets.reduce((acc, ticket) => {
    acc[ticket.event] = acc[ticket.event] || [];
    acc[ticket.event].push(ticket);
    return acc;
  }, {});

  return (
    <div className="ticket-view-container">
      <Navbar />
      <section className="ticket-section">
        <h1>My Tickets</h1>

        {tickets.length > 0 ? (
          Object.entries(groupedTickets).map(([event, eventTickets]) => (
            <div key={event} className="event-ticket-group">
              <h2 className="event-title">{event}</h2>
              {eventTickets.map((ticket, index) => (
                <TicketDisplay 
                  key={index}
                  name={ticket.name}
                  email={ticket.email}
                  avatar={ticket.avatar}
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </div>
          ))
        ) : (
          <p className="no-ticket-message">No tickets found. Generate one now!</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default TicketView;
