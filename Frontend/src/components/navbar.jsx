import React from "react";
import { useNavigate } from "react-router-dom";
// import logo from "./assets/logo2.png";
import "./Navbar.css";

 // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
        <div className="dashboard-logo">
  {/* <img src={logo} alt="Skinalyze Logo" className="dashboard-logo-img" /> */}
  <h1 className="dashboard-logo-text">Skinalyze</h1>
</div>
      <div className="navbar-container">
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="navbar-button"
            onClick={() => navigate("/register")} >Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
