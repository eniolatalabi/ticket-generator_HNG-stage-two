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
          </tbody>
        </table>
      </div>
      {/* Barcode Display (exactly as in the overlay) */}
      <div className="uniqueBarcodeContainer">
        <svg
          id="barcode"
          className="barcode"
          width="172px"
          height="70px"
          viewBox="0 0 172 70"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ transform: "translate(0,0)" }}
        >
          <rect x="0" y="0" width="172" height="70" style={{ fill: "none" }}></rect>
          <g transform="translate(10, 10)" style={{ fill: "#FFFFFF" }}>
            <rect x="0" y="0" width="3" height="50"></rect>
            <rect x="4.5" y="0" width="1.5" height="50"></rect>
            <rect x="9" y="0" width="4.5" height="50"></rect>
            <rect x="16.5" y="0" width="4.5" height="50"></rect>
            <rect x="22.5" y="0" width="3" height="50"></rect>
            <rect x="27" y="0" width="4.5" height="50"></rect>
            <rect x="33" y="0" width="1.5" height="50"></rect>
            <rect x="36" y="0" width="4.5" height="50"></rect>
            <rect x="42" y="0" width="3" height="50"></rect>
            <rect x="49.5" y="0" width="1.5" height="50"></rect>
            <rect x="57" y="0" width="1.5" height="50"></rect>
            <rect x="60" y="0" width="3" height="50"></rect>
            <rect x="66" y="0" width="3" height="50"></rect>
            <rect x="70.5" y="0" width="3" height="50"></rect>
            <rect x="75" y="0" width="6" height="50"></rect>
            <rect x="82.5" y="0" width="3" height="50"></rect>
            <rect x="88.5" y="0" width="1.5" height="50"></rect>
            <rect x="94.5" y="0" width="1.5" height="50"></rect>
            <rect x="99" y="0" width="4.5" height="50"></rect>
            <rect x="106.5" y="0" width="1.5" height="50"></rect>
            <rect x="111" y="0" width="3" height="50"></rect>
            <rect x="115.5" y="0" width="4.5" height="50"></rect>
            <rect x="121.5" y="0" width="1.5" height="50"></rect>
            <rect x="124.5" y="0" width="3" height="50"></rect>
            <rect x="132" y="0" width="3" height="50"></rect>
            <rect x="139.5" y="0" width="4.5" height="50"></rect>
            <rect x="145.5" y="0" width="1.5" height="50"></rect>
            <rect x="148.5" y="0" width="3" height="50"></rect>
          </g>
        </svg>
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
