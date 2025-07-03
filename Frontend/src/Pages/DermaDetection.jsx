import React from "react";
import { useNavigate } from "react-router-dom";
import SkinScanUploader from "../components/SkinScanUploader"; // Ensure correct import
import "./DermaDetection.css";

function DermaDetection() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/dashboard/recommended-products');
  };

  return (
    <div className="derma-detection-container">
      <h1 className="page-title">My Skin Detection</h1>
      <div className="detection-content">
        {/* Image Upload Section */}
        <div className="image-upload">
          <SkinScanUploader /> 
         <div class="submit-btn-wrapper">
              <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DermaDetection;
