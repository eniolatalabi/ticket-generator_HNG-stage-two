import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import "../css/AttendeeDetailsOverlay.css";

const AttendeeDetailsOverlay = ({ event, onClose, onTicketBooked }) => {
  // Steps: 1 = Ticket Selection, 2 = Attendee Details, 3 = Confirmation
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState("Free"); // Options: Free, VIP, VVIP
  const [numTickets, setNumTickets] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Optional Cloudinary/image URL
  const [avatarError, setAvatarError] = useState("");

  // Refs for file input and ticket container (for download)
  const fileInputRef = useRef(null);
  const ticketRef = useRef(null);

  // Utility: Validate image URL
  const validateImageUrl = (url) => {
    const imageRegex = /\.(jpeg|jpg|png|gif|bmp|webp)$/i;
    return imageRegex.test(url);
  };

  // Generate a consistent barcode
  const generateBarcode = () => Math.random().toString(36).substring(7);

  // STEP 1: Ticket Selection
  const handleStep1Next = () => {
    setStep(2);
  };

  // STEP 2: Attendee Details
  const handleStep2Back = () => {
    setStep(1);
  };

  const handleStep2Next = (e) => {
    e.preventDefault();
    if (!avatarFile && !avatarUrl) {
      setAvatarError("Please upload a profile photo or enter a valid avatar URL.");
      return;
    }
    let finalAvatar = "";
    if (avatarUrl) {
      if (!validateImageUrl(avatarUrl)) {
        setAvatarError("Invalid avatar URL. Please provide a valid image link.");
        return;
      } else {
        finalAvatar = avatarUrl;
      }
    } else if (avatarFile) {
      finalAvatar = avatarPreview;
    }
    const barcode = generateBarcode();
    const ticket = {
      event,
      ticketType,
      numTickets,
      name,
      email,
      specialRequest,
      avatar: finalAvatar,
      barcode,
    };
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    if (onTicketBooked) onTicketBooked(ticket);
    setStep(3);
  };

  // STEP 3: Confirmation - Download Ticket as Image
  const handleDownloadTicket = () => {
    if (!ticketRef.current) return;
    html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "ticket.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
      }, "image/png");
    });
  };

  const handleBookAnother = () => {
    setStep(1);
    setTicketType("Free");
    setNumTickets(1);
    setName("");
    setEmail("");
    setSpecialRequest("");
    setAvatarFile(null);
    setAvatarPreview("");
    setAvatarUrl("");
    setAvatarError("");
  };

  // Avatar Upload (File)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setAvatarFile(file);
      setAvatarPreview(preview);
      setAvatarError("");
      // Reset file input value to allow reselecting the same file
      e.target.value = null;
    } else {
      setAvatarError("Invalid file. Please select an image.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setAvatarFile(file);
      setAvatarPreview(preview);
      setAvatarError("");
    } else {
      setAvatarError("Invalid file. Please select an image.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Avatar URL input change handler
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setAvatarUrl(url);
    if (validateImageUrl(url)) {
      setAvatarPreview(url);
      setAvatarError("");
      setAvatarFile(null);
    }
  };

  // RENDER PAGE 1: Ticket Selection
  const renderStep1 = () => (
    <div className="contain">
      <div className="body">
        <div className="ticket-head">
          <h2>Ticket Selection</h2>
          <p>Step 1/3</p>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: "33.3333%" }}></div>
        </div>
        <div className="second-body">
          <div className="fest">
            <h3>{event.title || "Techember Fest ’25"}</h3>
            <p>
              Join us for an unforgettable experience at <br />
              {event.title || "[Event Name]"}! Secure your spot now.
            </p>
            <p className="event-location">
              <span>📍 {event.location || "[Event Location]"} </span> ||{" "}
              <span>
                {event.date || "March 15, 2025"} | {event.time || "7:00 PM"}
              </span>
            </p>
          </div>
          <hr className="line2" />
          <div className="ticket-type">
            <p>Select Ticket Type:</p>
            <div className="ticket-card">
              <button
                className={`card1 ${ticketType === "Free" ? "selected" : ""}`}
                onClick={() => setTicketType("Free")}
              >
                <h6>Free</h6>
                <p>Regular Access</p>
                <span>20/52</span>
              </button>
              <button
                className={`card2 ${ticketType === "VIP" ? "selected" : ""}`}
                onClick={() => setTicketType("VIP")}
              >
                <h6>$150</h6>
                <p>VIP Access</p>
                <span>20/52</span>
              </button>
              <button
                className={`card2 ${ticketType === "VVIP" ? "selected" : ""}`}
                onClick={() => setTicketType("VVIP")}
              >
                <h6>$150</h6>
                <p>VVIP Access</p>
                <span>20/52</span>
              </button>
            </div>
          </div>
          <div className="number">
            <p>Number of Tickets</p>
            <input
              type="number"
              name="tickets"
              value={numTickets}
              onChange={(e) => setNumTickets(e.target.value)}
            />
          </div>
          <div className="ticket-button">
            <button className="button1" onClick={onClose}>
              Cancel
            </button>
            <button className="button2" onClick={handleStep1Next}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // RENDER PAGE 2: Attendee Details
  const renderStep2 = () => (
    <div className="contain">
      <div className="body">
        <div className="ticket-head">
          <h2>Attendee Details</h2>
          <p>Step 2/3</p>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: "66.6667%" }}></div>
        </div>
        <div className="second-body">
          <div className="step-two">
            <div className="form-tab">
              <div className="upload-div">
                <p>Upload Profile Photo</p>
                <div className="upload">
                  <form>
                    <label className="file-label">
                      <input
                        accept="image/*"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                      <div
                        className="upload-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <img
                          alt="Upload Icon"
                          className="cloud-icon"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI7SURBVHgB7VbdUcMwDHZS+nfXh25ARigTYCYAJqBMAEwAGwATNEwAGyRMAEzQMEH70Lv+t3zq2UFVkzZt6RP57nSRbUmWJVmOUjly/Hc4agfM5/P6eDz2wDZc1+1i3C0Wi6E6NPr9voeNH0ejUQc0T6AWyahDAMZvUjZdITh5n9VuphSQQYT5gU2FoK/pdPpJA6TBcxznCqzHZPxSqXSt9gVC2mSn6wwGg9sNsm0WiUe1Dyif3GCv12tk1IlrBGOtdgG81zAQWEPD4fAhqy5kL5jeq9oG5oq9ysKS1W0cbJnK19IOc75DNtP2c+UEDAdQuGBT4Ww2u6tWqxGXm0wmHj5NokKh4KnVg7wbto66aWRywFwfKxzB+xNU8lmlUnlSWwJOR5aHg0Faj3CF1027Oa7YWa1W+1R/B4pUIJ2IHaCcqt97HMqQ74AQh7im9IGPzJwHJ1pc6MgyEKyjmdjhu7RmipPXxinnEeJ4gHfhDbYisL6ZeqKixFcTwdYx1r+XHOAgZ+QcFLq4Utp0PImmIYIPGV8KIBovOL0mnmoLn4UDcQpQbKHl0VrPEzYhGeqC6+oiwunvkhbgVF1tAm88aQ+K7HSM2uteQt5RuZwjjSNMH2CttxHS8UxvPkIYoTBDI6eporku8npZLpff2LrHlilt2vDrHylSTjnhUvXSo5TWpjH2U57qdqb/BRJKMNKSckYmbV5uHiRtvvZ/gK6eaaOkGKeAry+M4IaIA2ijQwXdpQKXMjly5LD4Abg0ZLbQRnXnAAAAAElFTkSuQmCC"
                        />
                        <p>Drag &amp; drop or click to upload</p>
                      </div>
                    </label>
                  </form>
                </div>
              </div>
            </div>
            {/* Optional Avatar URL Input */}
            <div className="avatar-url">
              <label>Or enter Avatar URL (Cloudinary or image link)</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={handleUrlChange}
                placeholder="https://example.com/your-image.jpg"
              />
            </div>
            {/* Preview Container */}
            {(avatarPreview || (avatarUrl && validateImageUrl(avatarUrl))) && (
              <div className="preview-container">
                <img
                  className="preview-image"
                  src={avatarPreview || avatarUrl}
                  alt="Preview"
                />
              </div>
            )}
            <hr className="line2" />
            <div className="form-container">
              <form onSubmit={handleStep2Next}>
                <label htmlFor="fullName">Enter your name</label>
                <br />
                <input
                  placeholder="Enter your name"
                  required
                  type="text"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="email">Enter your email *</label>
                <br />
                <input
                  placeholder="dst@hng.com"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="message">Special request</label>
                <br />
                <textarea
                  name="message"
                  placeholder="Enter Special Request"
                  required
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                ></textarea>
                <br />
                <div className="ticket-button">
                  <button className="button1" type="button" onClick={handleStep2Back}>
                    Back
                  </button>
                  <button className="button2" type="submit">
                    Get Ticket
                  </button>
                </div>
              </form>
            </div>
            {avatarError && <p className="error-message">{avatarError}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="contain" ref={ticketRef}>
      <div className="body">
        <div className="ticket-head">
          <h2>Ready</h2>
          <p>Step 3/3</p>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: "100%" }}></div>
        </div>
        <div className="second-body">
          <div className="step-three">
            <div className="head3">
              <h2>Your Ticket is Booked!</h2>
              <p>Check your email for a copy or you can download</p>
            </div>
            <div className="main-ticket">
              <div className="ticket-container">
                <div className="ticket">
                  <div className="head4">
                    <h3>{event.title}</h3>
                    <p>📍 {event.location}</p>
                    <p>
                      📅 {event.date} | {event.time}
                    </p>
                  </div>
                  <img alt="Uploaded" src={avatarPreview || avatarUrl} />
                  <div className="display-container">
                    <table className="table">
                      <tbody>
                        <tr className="row">
                          <td className="column">
                            <label>Enter your name</label>
                            <div className="value">{name}</div>
                          </td>
                          <td className="column">
                            <label>Enter your email *</label>
                            <div className="value">{email}</div>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="column">
                            <label>Ticket for :</label>
                            <div className="value">{numTickets}</div>
                          </td>
                          <td className="column">
                            <label>Ticket Type:</label>
                            <div className="value">{ticketType}</div>
                          </td>
                        </tr>
                        <tr className="row textarea">
                          <td colSpan="2">
                            <label>Special request</label>
                            <div className="value textarea">
                              {specialRequest || "None"}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
            </div>
          </div>
          <div className="ticket-button">
            <button className="button1" onClick={handleBookAnother}>
              Get Another Ticket
            </button>
            <button className="button2" onClick={handleDownloadTicket}>
              Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const overlayContent = (
    <>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </>
  );

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {overlayContent}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AttendeeDetailsOverlay;
