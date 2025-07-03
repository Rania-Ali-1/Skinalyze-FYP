// src/Pages/RecommendationPage.js this is used rn
import React, { useState } from 'react';
import RecommendationForm from '../components/RecommendationForm'; // Adjust the path based on where your form is

const RecommendedProducts = () => {
  const [recommendations, setRecommendations] = useState(null);

  const handleRecommendations = (data) => {
    // Assuming you have an API that gives recommendations
    setRecommendations(data);
  };

  return (
    <div className="recommendation-page">
      <h1>Get Product Recommendations</h1>
      <RecommendationForm onRecommendations={handleRecommendations} />

    </div>
  );
};

export default RecommendedProducts;