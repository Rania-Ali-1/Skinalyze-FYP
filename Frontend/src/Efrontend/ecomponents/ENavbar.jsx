import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ENavbar.css";

const ENavbar = () => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="enavbar-container">
      {/* Top Bar */}
      <div className="top-bar">
        <a href="/dashboard" className="back-arrow">← Back to Dashboard</a>
        <a href="/ecommerce/about-page">About</a>
        <a href="/ecommerce/contact-page">Contact Us</a>
      </div>

      {/* Second Navigation */}
      <div className="second-bar">
        <div className="left-section">
          {/* <input type="text" placeholder="Search..." className="search-bar" /> */}
          <a href="/ecommerce/home">Home</a>
          <a href="/ecommerce/product">Products</a>
         
          
        </div>
 <div className="logo">Skinalyze</div>
        <div className="navcart">
          <Link to="/ecommerce/cart">Cart ({cartItems.length})</Link>
        </div>
      
    </div>
     </div>
  );
};

export default ENavbar;
