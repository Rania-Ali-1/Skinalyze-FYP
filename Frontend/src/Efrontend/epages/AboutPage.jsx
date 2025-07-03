import React, { useEffect, useRef } from "react";
import serumImg from "../assets/serm.webp";
import sunscreenImg from "../assets/sunscreen.webp";
import cleanserImg from "../assets/cleanser.webp";
import moisturizer   from "../assets/moisturizer.avif";
import cream from "../assets/cream.jpg";

import "./AboutUs.css";
import ENavbar  from "../ecomponents/ENavbar";

const AboutUs = () => {
  const spiralRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spiralRef.current.classList.add("animate-spiral");
        }
      },
      { threshold: 0.5 }
    );

    if (spiralRef.current) {
      observer.observe(spiralRef.current);
    }

    return () => {
      if (spiralRef.current) {
        observer.unobserve(spiralRef.current);
      }
    };
  }, []);

  return (
    <div className="about-page-wrapper">
    
    
    <div>
      {/* Top Yellow Bar with Back Arrow */}
     <ENavbar />

      {/* About Us Section */}
      <div className="about-container">
        <h1 className="about-heading">About Us</h1>
        <p className="about-description">
          Skinalyze is an AI-powered system that helps analyze your skin, recommend the right products, and connect you with professional consultations. Our goal is to help your skin heal naturally.
        </p>
      </div>

      {/* Spiral Animation Section */}
      <div className="spiral-container" ref={spiralRef}>
        <svg viewBox="0 0 600 600" className="spiral-svg">
          <path
            className="spiral-path"
            d="M300,300 
              m-10,0 
              a10,10 0 1,0 20,0 
              a10,10 0 1,0 -20,0 
              m-15,0 
              a25,25 0 1,0 50,0 
              a25,25 0 1,0 -50,0 
              m-25,0 
              a50,50 0 1,0 100,0 
              a50,50 0 1,0 -100,0 
              m-40,0 
              a90,90 0 1,0 180,0 
              a90,90 0 1,0 -180,0 
              m-55,0 
              a145,145 0 1,0 290,0 
              a145,145 0 1,0 -290,0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>
        <div className="steps-overlay">
          <p className="step">1. Use model detection and get result</p>
          <p className="step">2. Get recommended products</p>
          <p className="step">3. Buy products from our store</p>
          <p className="step">4. Clear doubts by consulting the doctor</p>
          <p className="step">5. Get your skin fresh and new</p>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="image-grid-section">
        <p className="quote">Healing your skin by helping your skin heal itself.</p>
     
          <div className="image-grid">
  <img src={serumImg} alt="Serum" className="grid-img" />
  <img src={sunscreenImg} alt="Sunscreen" className="grid-img" />
  <img src={cleanserImg} alt="Cleanser" className="grid-img" />
    <img src={cream} alt="cream" className="grid-img" />
  <img src={moisturizer} alt="moisturizer" className="grid-img" />
</div>

       
      </div>
    </div>
    </div>
  );
};

export default AboutUs;