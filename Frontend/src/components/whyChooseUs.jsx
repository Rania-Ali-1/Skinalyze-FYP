
import React, { useRef, useEffect } from "react";
import './whychooseus.css';

const WhyChooseUs = () => {
  const imageRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    textRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.classList.add("fade-in");
        ref.current.style.animationDelay = `${index * 0.2}s`;
      }
    });

    if (imageRef.current) {
      imageRef.current.classList.add("fade-in-image");
    }
  }, []);

  return (

    <div className="why-choose-us">
      <div className="section-title">
        <h2>Why Choose Us</h2>
        <p>We are providing the best AI features to help you with Derma Disease Detection</p>
      </div>

      <div className="content-wrapper">
        <div className="image-wrapper">
          <img
            ref={imageRef}
            src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/WhyChooseUS.png?updatedAt=1714965959564"
            alt="Why Choose Us"
          />
        </div>

        <div className="text-content">
          <div className="text-block">
            <h3 className="highlight">Passwordless Authentication</h3>
            <p ref={textRefs[0]}>
              Passwordless authentication is an authentication method in which
              a user can log in <br/> to any particular product or system without
              entering (and having to remember) a password <br /> or any other
              knowledge-based secret.
            </p>
          </div>
          <div className="text-block">
            <h3 className="highlight">Google's Bard LLM</h3>
            <p ref={textRefs[1]}>
              Elevate your derma disease predictions with the power of Google's
              Bard Language Model <br />(LLM). Harness cutting-edge natural language
              processing to obtain comprehensive and <br /> accurate information,
              enhancing the capabilities of our application and  ensuring you
              receive <br /> the most up-to-date and relevant insights.
            </p>
          </div>
          <div className="text-block">
            <h3 className="highlight">
              Interactive Charts for Data Visualization
            </h3>
            <p ref={textRefs[2]}>
              Dive into your derma data like never before with our interactive
              charts. Uncover meaningful <br /> insights at a glance, thanks to
              dynamic visualizations that empower you to understand trends, <br />
              correlations, and patterns in your data, making informed
              decisions simpler than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );

};

export default WhyChooseUs;
