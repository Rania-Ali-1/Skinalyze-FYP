import React from "react";
import "./DashboardWrapper.css";

const DashboardWrapper = ({ children }) => {
  return (
    <div className="dashboard-outer-wrapper">
      <div className="dashboard-inner-wrapper">
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
