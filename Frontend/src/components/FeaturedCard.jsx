import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCard.css"; // Import the CSS file

const FeaturedCard = forwardRef(({ featuredItem }, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className="featured-card">
      <h2 className="featured-card-title">{featuredItem.title}</h2>
      <p className="featured-card-description">{featuredItem.description}</p>
      <button
        className="featured-card-button"
        onClick={() => navigate(`${featuredItem.navigateUrl}`)}
      >
        Explore
      </button>
    </div>
  );
});

export default FeaturedCard;
