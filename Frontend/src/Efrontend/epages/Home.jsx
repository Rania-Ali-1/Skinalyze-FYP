import React from "react";
import homeImage from '../assets/homebac.jpg';
import './HomePage.css';
import  ENavbar  from "../ecomponents/ENavbar";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <ENavbar />

      {/* Main Content */}
      <div className="content">
        {/* Hero Section */}
        <div className="hero">
          <img src={homeImage} alt="Hero" className="hero-image" />
        </div>

        {/* Info Box */}
        <div className="info-box">
          <div className="description">
            <h2>Welcome to Skinalyze</h2>
            <p>
              Discover premium skincare tailored to your needs. Skinalyze
              recommends top-quality products backed by science and selected by
              experts.
            </p>
          </div>
          <div className="links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <div className="site-name">Skinalyze</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
