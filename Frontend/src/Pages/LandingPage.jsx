import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FeaturedCard from "../components/FeaturedCard";
import { FeaturedCardContent } from "../constants/FeaturedCardContent.jsx";
import SectionTitle from "../components/SectionTitle";
import { LandingSectionTitle } from "../constants/LandingSectionTitle .jsx";
import WhyChooseUs from "../components/whyChooseUs.jsx";
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const navigate = useNavigate();
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  const featuredCardGroups = [
    [0, 1, 2],
    [3, 4],
    [5, 6, 7],
  ];

  // Form state handlers (example placeholder, replace as needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  useEffect(() => {
    textRefs.current.forEach((ref, index) => {
      ref.classList.add("fade-in");
      ref.style.animationDelay = `${index * 0.2}s`;
    });

    imageRefs.current.forEach((ref, index) => {
      ref.classList.add("fade-in-image");
      ref.style.animationDelay = `${index * 0.3}s`;
    });
  }, []);

  console.log("Landing Page Loaded");


  return (
    <div className="landing-page">
      {/* ------------------------------- Navbar Section  -------------------------------- */}
      <Navbar />

      {/* -------------------------------  Landing Section  -------------------------------- */}
      <div className="landing-section">
        <div className="landing-text">
          <h2 ref={(el) => (textRefs.current[0] = el)} className="title">
            AI Powered
          </h2>
          <h2 ref={(el) => (textRefs.current[1] = el)} className="title">
            Skin Diagnosis
          </h2>
          <p ref={(el) => (textRefs.current[2] = el)} className="description">
            Explore the future of dermatological care with our AI-based tool{" "}
            <span className="highlight">Skinalyze </span>
            which harnesses the power of image processing to offer
            cost-effective and accessible skin condition assessments worldwide.
          </p>
          <button
            className="explore-button"
            onClick={() => navigate("/dashboard/dashboard-home")}
          >
            Explore Now
          </button>
        </div>
        <div className="landing-image">
          <img
            ref={(el) => (imageRefs.current[0] = el)}
            src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/LandingVector.png?updatedAt=1714966041467"
            alt="Landing"
          />
        </div>
      </div>

      {/* -------------------------------  Features Section  -------------------------------- */}
      <div className="features-section">
        <h1 ref={(el) => (textRefs.current[0] = el)} className="title">
          Features
        </h1>
        <p ref={(el) => (textRefs.current[2] = el)} className="description">
          Enjoy our best AI features to help you with Derma Disease Detection
        </p>
        <div className="featured-cards">
          {featuredCardGroups.map((group, index) => (
            <div key={index} className="featured-card-group">
              {group.map((itemIndex) => (
                <FeaturedCard
                  key={itemIndex}
                  featuredItem={FeaturedCardContent[itemIndex]}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------- Why Choose Us Section  -------------------------------- */}
      
      <WhyChooseUs />

      {/* ------------------------------- Contact Us Section  -------------------------------- */}

      <div className="contact-us-section">
      <h1 ref={(el) => (textRefs.current[0] = el)} className="title">
      Contact Us
        </h1>
        <p ref={(el) => (textRefs.current[2] = el)} className="description">
        Our team is available 24/7 to help you with your queries
        </p>
        <div className="contact-us-container">
          <div className="form-container">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email*"
                className="contact-input"
                required
              />
              <textarea
                id="message"
                name="message"
                placeholder="Write your query here*"
                className="contact-textarea"
                required
              />
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/ContactUs.png?updatedAt=1714965927940"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
        </div>
      </div>

      {/* -------------------------------  Footer Section  -------------------------------- */}
      <Footer />
    </div>
  );
};

export default LandingPage;
