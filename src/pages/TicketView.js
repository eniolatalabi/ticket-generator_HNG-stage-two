import React from "react";
import Navbar from "../components/Navbar";
import TicketDisplay from "../components/TicketDisplay";
import Footer from "../components/Footer";
import useLocalStorage from "../hooks/useLocalStorage";
import "../css/TicketView.css";

const TicketView = () => {
  const [tickets, setTickets, deleteTickets] = useLocalStorage("userTickets", []);

  const handleDelete = () => {
    deleteTickets(); // Clear stored tickets
    setTickets([]); // Reset state
  };

  return (
    <div className="ticket-view-container">
      <Navbar />
      <section className="ticket-section">
        <h1>My Tickets</h1>

        {tickets.length > 0 ? (
          <>
            {tickets.map((ticket, index) => (
              <TicketDisplay 
                key={index}
                name={ticket.name}
                email={ticket.email}
                avatar={ticket.avatar}
                onDelete={handleDelete}
              />
            ))}
          </>
        ) : (
          <p className="no-ticket-message">No tickets found. Generate one now!</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default TicketView;
