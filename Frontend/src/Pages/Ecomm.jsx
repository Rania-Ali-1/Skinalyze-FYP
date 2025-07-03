import React, { useEffect, useState } from "react";
import Home from "../Efrontend/epages/Home";

const Ecomm = () => {
  const [showHome, setShowHome] = useState(false);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOutIntro(true), 1800);
    const timer2 = setTimeout(() => setExpand(true), 2000);
    const timer3 = setTimeout(() => setShowHome(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={`ecommerce-container ${expand ? "fullscreen" : ""}`}>
      {!showHome ? (
        <div className={`ecommerce-box ${fadeOutIntro ? "fade-out" : ""}`}>
          <h2 className="ecommerce-title">Discover Your Perfect Product</h2>
          <h4 className="ecommerce-subtitle">Your Trusted Shopping Destination</h4>
          <p className="ecommerce-text">
            Explore a world of quality products handpicked just for you.
          </p>
          <p className="ecommerce-text">
            Whether you're looking for fashion, electronics, or daily essentials, we have everything you need.
          </p>
          <p className="ecommerce-text">
            Join our community of happy customers. Don't miss out on our exclusive deals!
          </p>
        </div>
      ) : (
        <div className="ecommerce-home-wrapper">
          <Home />
        </div>
      )}

      <style>{`
        .ecommerce-container {
          padding: 20px;
          background-color: #F5F2FB;
          transition: all 0.8s ease;
          min-height: 100vh;
          overflow: hidden;
        }

        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          padding: 0;
          margin: 0;
          z-index: 9999;
          background: #F5F2FB;
        }

        .ecommerce-box {
          max-width: 700px;
          margin: auto;
          text-align: center;
          padding: 40px;
          border-radius: 10px;
          background-color: #F5F2FB;
          animation: fadeIn 0.8s ease;
        }

        .fade-out {
          animation: fadeOut 0.7s forwards;
        }

        .ecommerce-title {
          font-size: 32px;
          font-weight: bold;
          color: #1f2937;
        }

        .ecommerce-subtitle {
          font-size: 22px;
          color: #6b7280;
          margin-top: 12px;
        }

        .ecommerce-text {
          color: #374151;
          font-size: 18px;
          margin-top: 20px;
          line-height: 1.6;
        }

        .ecommerce-home-wrapper {
          animation: fadeInUp 0.6s ease forwards;
          height: 100vh;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Ecomm;
