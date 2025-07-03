import React, { useRef } from "react";
import  ENavbar  from "../ecomponents/ENavbar";


const ContactPage = () => {
  const textRefs = useRef([]); // ✅ Initialize textRefs using useRef

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload
    console.log("Form submitted!"); // Replace with your form handling logic
  };

  return (
    
    <>
      <style>
        {`
           .contact-us-section {
  width: 100%;
  height: auto;
  text-align: center;


}

.contact-us-container {
  display: flex;
  justify-content: space-between; /* Push form and image apart */
  align-items: center;
  gap: 6rem; /* Increased space between form and image */
  width: 100%; /* Make the container wider */
  max-width: 1200px; /* Allow it to grow on larger screens */
  margin: 0 auto; /* Center the section */
}

.form-container {
  width: 50%; /* Make form take 50% of the space */
  max-width: 600px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-input,
.contact-textarea {
  width: 100%;
  padding: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: border-color 0.3s;
}

.contact-input:focus,
.contact-textarea:focus {
  border-color: #2d9c89;
}

.submit-button {
  background-color: #575f5d;
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.submit-button:hover {
  background-color: #246f61;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 50%; /* Increase image container width */
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-image {
  width: 90%; /* Make image bigger */
  max-width: 500px;
  height: auto;
  border-radius: 12px;
}

/* Adjust body width to match navbar */
body {
  width: 100%;
  max-width: 1500px; /* Increase overall pa


        `}
      </style>

       {/* Top Yellow Bar with Back Arrow */}
      <ENavbar />
      <div className="contact-us-section">
        <h1 ref={(el) => (textRefs.current[0] = el)} className="title">
          Contact Us
        </h1>
        <p ref={(el) => (textRefs.current[2] = el)} className="description">
          Our team is available 24/7 to help you with your queries
        </p>
        <div className="contact-us-container">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="contact-form">
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
              <button type="submit" className="submit-button">Submit</button>
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
     
    </>
  );
};

export default ContactPage;
