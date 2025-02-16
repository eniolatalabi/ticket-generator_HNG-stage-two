import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import html2canvas from "html2canvas";
import "../css/TicketView.css";

const MyTicketDisplay = ({ ticket, onDelete, onDownload }) => {
  // Download this ticket card as an image
  const handleDownloadClick = () => {
    const element = document.getElementById(`unique-ticket-${ticket.barcode}`);
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "ticket.png";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
          }
        }, "image/png");
      });
    }
  };

  return (
    <div className="uniqueTicketCard" id={`unique-ticket-${ticket.barcode}`}>
      <div className="uniqueTicketHeader">
        <h3>{ticket.event.title}</h3>
        <p>📍 {ticket.event.location}</p>
        <p>
          📅 {ticket.event.date} | {ticket.event.time}
        </p>
        {ticket.bookedAt && (
          <p className="uniqueTicketTimestamp">
            Booked on: {ticket.bookedAt}
          </p>
        )}
      </div>
      <img
        className="uniqueTicketImage"
        src={ticket.avatar}
        alt="Ticket Avatar"
      />
      <div className="uniqueTicketDetails">
        <table className="uniqueDetailTable">
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{ticket.name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{ticket.email}</td>
            </tr>
            <tr>
              <td><strong>Quantity:</strong></td>
              <td>{ticket.numTickets}</td>
            </tr>
            <tr>
              <td><strong>Type:</strong></td>
              <td>{ticket.ticketType}</td>
            </tr>
            <tr>
              <td><strong>Special Request:</strong></td>
              <td>{ticket.specialRequest || "None"}</td>
            </tr>
            <tr>
              <td><strong>Barcode:</strong></td>
              <td>{ticket.barcode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="uniqueTicketActions">
        <button className="uniqueDownloadBtn" onClick={handleDownloadClick}>
          Download Ticket
        </button>
        <button className="uniqueDeleteBtn" onClick={() => onDelete(ticket)}>
          Delete Ticket
        </button>
      </div>
    </div>
  );
};

const MyTicketView = () => {
  const [tickets, setTickets] = useLocalStorage("tickets", []);

  const handleDelete = (ticketToDelete) => {
    const updated = tickets.filter(
      (ticket) => ticket.barcode !== ticketToDelete.barcode
    );
    setTickets(updated);
  };

  const clearAllTickets = () => {
    setTickets([]);
  };

  // Group tickets by event title
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const eventKey = ticket.event.title;
    if (!acc[eventKey]) {
      acc[eventKey] = [];
    }
    acc[eventKey].push(ticket);
    return acc;
  }, {});

  return (
    <div className="myTicketPage">
      <section className="myTicketSection">
        <h1 className="myTicketHeading">My Tickets</h1>
        {tickets.length > 0 ? (
          <>
            {Object.entries(groupedTickets).map(([eventKey, eventTickets]) => (
              <div key={eventKey} className="myTicketGroup">
                <h2 className="myEventTitle">{eventKey}</h2>
                <div className="myTicketGrid">
                  {eventTickets.map((ticket, index) => (
                    <MyTicketDisplay
                      key={ticket.barcode || index}
                      ticket={ticket}
                      onDelete={handleDelete}
                      onDownload={() => {}}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="myClearContainer">
              <button className="myClearBtn" onClick={clearAllTickets}>
                Clear All Tickets
              </button>
            </div>
          </>
        ) : (
          <p className="myNoTicketMsg">
            No tickets found. Generate one now!
          </p>
        )}
      </section>
    </div>
  );
};

export default MyTicketView;
