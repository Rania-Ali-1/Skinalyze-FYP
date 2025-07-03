import React from 'react';
import "./footer.css";
 

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © 2025 | All rights reserved
        </div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/huda-ramzan-753703289/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="footer-brand">
          <span className="footer-title">Skinalyze</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
