import React, { useState } from 'react';
import axios from 'axios';
import './RecommendationForm.css';

const RecommendationForm = ({ onRecommendations }) => {
  const [category, setCategory] = useState('');
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState(['']);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(''); // ✅ NEW STATE

  const handleConcernChange = (index, value) => {
    const updatedConcerns = [...concerns];
    updatedConcerns[index] = value;
    setConcerns(updatedConcerns);
  };

  const addConcernField = () => {
    setConcerns([...concerns, '']);
  };

  const removeConcernField = (index) => {
    const updatedConcerns = concerns.filter((_, i) => i !== index);
    setConcerns(updatedConcerns);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://skinalyze-5d2b840fe5fa.herokuapp.com/recommend',
        {
          category,
          skinType,
          concerns: concerns.filter(c => c !== '')
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setRecommendations(response.data.recommendations);
      setSelectedLabel(''); // reset filter on new search

      if (onRecommendations) {
        onRecommendations(response.data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const concernOptions = [
    "acne", "acne scars", "blackheads", "combination skin", "dry skin",
    "eczema", "fungal infection", "hyperpigmentation", "melasma",
    "oily skin", "psoriasis", "redness", "ringworm", "rosacea"
  ];

  return (
    <div className="recommendation-form-container">
      <h2>Find Your Recommended Products</h2>
      <form onSubmit={handleSubmit} className="form-box">
        {/* <label htmlFor="category">What kind of product are you looking for?</label> */}
        {/* <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="treatment">Treatment</option>
          <option value="sunscreen">Sunscreen</option>
          <option value="cleanser">Cleanser</option>
          <option value="moisturizer">Moisturizer</option>
          <option value="cream">Cream</option>
          <option value="serum">Serum</option>
        </select> */}

        <label htmlFor="skinType">What is your skin type?</label>
        <select id="skinType" value={skinType} onChange={(e) => setSkinType(e.target.value)} required>
          <option value="">Select Skin Type</option>
          <option value="normal">Normal</option>
          <option value="oily">Oily</option>
          <option value="sensitive">Sensitive</option>
          <option value="combination">Combination</option>
        </select>

        <label>What are your skin concerns?</label>
        {concerns.map((concern, index) => (
          <div key={index} className="concern-select-row">
            <select
              value={concern}
              onChange={(e) => handleConcernChange(index, e.target.value)}
              required
            >
              <option value="">Select Concern</option>
              {concernOptions.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
            {concerns.length > 1 && (
              <button type="button" onClick={() => removeConcernField(index)} className="remove-btn">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addConcernField} className="add-btn">+ Add Concern</button>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="results-box">
          <h3>Recommended Products</h3>

          {/* ✅ Filter dropdown */}
          <label htmlFor="label">Filter by Product Type:</label>
          <select
            id="label"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            <option value="">All</option>
            <option value="cleanser">Cleanser</option>
            <option value="cream">Cream</option>
            <option value="treatment">Treatment</option>
          </select>

          <ul className="recommendation-list">
            {recommendations
              .filter((product) =>
                selectedLabel === '' || product.label.toLowerCase() === selectedLabel
              )
              .map((product, index) => (
                <li key={index} className="product-item">
                  <img src={product.url} alt={product.name} className="product-image" />
                  <p>{product.name}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
