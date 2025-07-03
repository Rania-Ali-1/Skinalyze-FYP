import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cnavbar from "../ccomponents/cnavbar";
import './ChomePage.css';

function CHome() {
      const navigate = useNavigate();
      const textRefs = useRef([]);
      const imageRefs = useRef([]);

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
    <div className="home-page">
              {/* ------------------------------- Navbar Section  -------------------------------- */}

     <Cnavbar />
     
      {/* ------------------------------- home Section  -------------------------------- */}

     <div className="home-section">
        <div className="home-image">
          <img
            ref={(el) => (imageRefs.current[0] = el)}
            src="https://doc-on-call.vercel.app/static/media/headerimg.e4bd8015735c2e84691c.jpg"
            alt="Landing"
          />
        </div>

        <div className="home-text">
          <h2 ref={(el) => (textRefs.current[0] = el)} className="ctitle">
          Your Doctor 
          </h2>
          <h2 ref={(el) => (textRefs.current[1] = el)} className="ctitle">
          On-Demand: Anytime, Anywhere with Skinalyze.
          </h2>
          <p ref={(el) => (textRefs.current[2] = el)} className="description">
          Skinalyze is a telemedicine platform that provides you with virtual 
          medical care at your convenience. With DocOnCall, you can connect with
           certified healthcare professionals, including doctors, nurses, and specialists,
            from the comfort of your own home or wherever you are. Whether you have a minor
             health concern, need a prescription refill, or require ongoing treatment for a
              chronic condition, DocOnCall makes it easy for you to get the care you need 
              without having to visit a physical clinic. Our user-friendly platform is
               designed to make healthcare accessible and affordable for everyone, with
                secure video consultations, real-time chat, and easy scheduling options. 
                With DocOnCall, you can be confident
           that you're receiving high-quality medical care from the comfort of your own home.
          </p>
          <button
            className="consult"
            onClick={() => navigate("/video-chat")}
          >
            Explore Now
          </button>
        </div>
      </div>

     
      </div>
  );
};

export default CHome;