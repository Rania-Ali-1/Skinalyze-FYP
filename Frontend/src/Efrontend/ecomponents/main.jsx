import React from "react";

const Main = () => {
  return (
    <>
      <style>
        {`
              .hero {
          position: relative;
          width: 100%;
          min-height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          background: url('/assets/s1.JPG') no-repeat center center/cover;
          background-color: black; 
          
        }
          .hero-overlay {
            background: rgba(0, 0, 0, 0.5); /* ✅ Dark overlay */
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
          .hero-content {
            position: relative;
            z-index: 1;
            padding: 20px;
            border-radius: 10px;
            max-width: 90%;
          }
          .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }
          .hero p {
            font-size: 1.2rem;
          }
        `}
      </style>

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>New Season Arrivals</h1>
          <p>Discover the latest trends in fashion, jewelry, and electronics.</p>
        </div>
      </div>
    </>
  );
};

export default Main;
