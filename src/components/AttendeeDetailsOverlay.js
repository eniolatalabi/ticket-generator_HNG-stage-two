import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/AttendeeDetailsOverlay.css";

const AttendeeDetailsOverlay = ({ event, onClose }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Attendee Details</h2>
        <div className="upload-section" {...getRootProps()}>
          <input {...getInputProps()} />
          {file ? (
            <img src={file} alt="Avatar Preview" className="preview" />
          ) : (
            <div className="upload-placeholder">Drag & drop or click to upload</div>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Special request (optional)"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
        />
        <div className="overlay-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn">Confirm Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetailsOverlay;
