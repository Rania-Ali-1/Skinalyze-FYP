import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSearch,
  FaUserMd,
  FaStore,
  FaHome,
  FaSignOutAlt,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt
} from "react-icons/fa";
import { MdScience } from "react-icons/md";
import "./Dashboard.css";
import logo from "../components/assets/logo2.png";

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <div className="dashboard">
      {!isFullscreen && (
        <aside className="dashboard-sidebar">
          <div className="dashboard-logo">
  <img src={logo} alt="Skinalyze Logo" className="dashboard-logo-img" />
  <h1 className="dashboard-logo-text">Skinalyze</h1>
</div>

          <nav className="dashboard-menu">
            <Link to="/dashboard/dashboard-home" className="dashboard-menu-item">
              <FaTachometerAlt className="icon" /> Dashboard
            </Link>
            <Link to="/dashboard/derma-detection" className="dashboard-menu-item">
              <FaSearch className="icon" /> Derma Detection
            </Link>
            <Link to="/dashboard/recommended-products" className="dashboard-menu-item">
              <FaStore className="icon" /> Recommendations
            </Link>
            <Link to="/dashboard/explore-derma" className="dashboard-menu-item">
              <MdScience className="icon" /> Explore Derma
            </Link>
            <Link to="/dashboard/ecomm" className="dashboard-menu-item">
              <FaStore className="icon" /> Buy Product
            </Link>
            <Link to="/dashboard/doctor-consultation" className="dashboard-menu-item">
              <FaUserMd className="icon" /> Doctor Consultation
            </Link>
          </nav>
          <div className="dashboard-footer">
            <Link to="/" className="dashboard-menu-item">
              <FaHome className="icon" /> Home
            </Link>
            <Link to="/logout" className="dashboard-menu-item">
              <FaSignOutAlt className="icon" /> Logout
            </Link>
          </div>
        </aside>
      )}

      <div className={`dashboard-content-container ${isFullscreen ? "fullscreen" : ""}`}>
        <main className="dashboard-content">
          <button className="fullscreen-toggle" onClick={toggleFullscreen}>
            {isFullscreen ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
