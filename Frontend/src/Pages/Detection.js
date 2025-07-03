import React from "react";
import SkinScanUploader from "../components/SkinScanUploader"; 

const Detection = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Skin Condition Detection</h1>
            <SkinScanUploader />
        </div>
    );
};

export default Detection;
