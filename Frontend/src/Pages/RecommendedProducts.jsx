// src/Pages/RecommendedProducts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendedProducts.css";
import { motion } from "framer-motion";

// Define product categories
const categories = ["treatment", "sunscreen", "cleanser", "serum", "moisturizer", "cream"];

function RecommendedProducts() {
  const [image, setImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState("Detected: Dry Skin");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const uploaded = localStorage.getItem("uploadedImage");
  
    const resultData = localStorage.getItem("detectionResultData");
    let displayResult = "Detected: Dry Skin";
  
    if (resultData) {
      try {
        const parsedResult = JSON.parse(resultData);
        displayResult = `Detected: ${parsedResult.prediction || "Unknown"} (${(parsedResult.confidence * 100).toFixed(2)}%)`;
      } catch (error) {
        console.error("Failed to parse detection result from localStorage:", error);
      }
    }
  
    setImage(uploaded);
    setDetectionResult(displayResult);
  }, []);
  

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(
        `http://skinalyze-5d2b840fe5fa.herokuapp.com/recommend?category=${category}`
      );
      const data = await response.json();
      const productsArray = Array.isArray(data.products) ? data.products : [];
      setProducts(productsArray);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]); // Reset products on error
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  return (
    <div className="recommended-page">
      {/* Page title with fade-in animation */}
      <motion.h1
        className="page-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Skincare Recommendations
      </motion.h1>

      {/* Display uploaded image and detection result */}
      <div className="analyzer-section">
        {image ? (
          <img src={image} alt="Uploaded" className="face-image" />
        ) : (
          <p>No image uploaded.</p>
        )}
        <motion.p
          className="detection-text"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {detectionResult}
        </motion.p>
      </div>

      {/* Button to navigate back to upload page */}
      <button className="upload-btn" onClick={() => navigate("/dashboard/derma-detection")}>
        Upload Another Image
      </button>

      {/* Section heading */}
      <h2 className="section-heading">Recommended Products</h2>

      {/* Category selection buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product list with fade-in animation */}
      <motion.div
        className="products-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.length > 0 ? (
          products.map((prod, index) => (
            <div className="product-card" key={index}>
              {prod.image ? (
                <img src={prod.image} alt={prod.name} className="product-img" />
              ) : (
                <p className="no-image">No image available</p>
              )}
              <h3>{prod.name || "Unnamed Product"}</h3>
              <p>{prod.description || "No description available."}</p>
            </div>
          ))
        ) : selectedCategory ? (
          <p className="no-products">No products found.</p>
        ) : (
          <p className="no-products">Select a category to see products.</p>
        )}
      </motion.div>
    </div>
  );
}

export default RecommendedProducts;
