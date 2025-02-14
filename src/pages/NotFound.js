import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import "../css/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <Navbar />
      <div className="not-found-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Button text="Go to Home" onClick={() => navigate("/")} />
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
