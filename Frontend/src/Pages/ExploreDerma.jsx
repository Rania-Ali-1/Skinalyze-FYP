import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore setup
import { collection, getDocs } from "firebase/firestore";
import "./ExploreDerma.css";

const ExploreDerma = () => {
  const [search, setSearch] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [diseaseDetails, setDiseaseDetails] = useState({});

  // Fetch diseases from Firestore
  useEffect(() => {
    const fetchDiseases = async () => {
      const diseasesCollection = collection(db, "diseases");
      const diseaseSnapshot = await getDocs(diseasesCollection);
      const diseaseData = {};

      const diseaseNames = diseaseSnapshot.docs.map((doc) => {
        const data = doc.data();
        diseaseData[data.name] = data;
        return data.name;
      });

      setDiseases(diseaseNames);
      setDiseaseDetails(diseaseData);
    };

    fetchDiseases();
  }, []);

  const filteredDiseases = diseases.filter((disease) =>
    disease.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore-page">
      {/* Sidebar for Search & Disease List */}
      <aside className="explore-sidebar">
        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search diseases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-reset" onClick={() => setSearch("")}>
            &#8634;
          </button>
        </div>

        {/* Disease List */}
        <div className="disease-list">
          {filteredDiseases.map((disease) => (
            <button
              key={disease}
              className={`disease-item ${selectedDisease === disease ? "active" : ""}`}
              onClick={() => setSelectedDisease(disease)}
            >
              {disease}
            </button>
          ))}
        </div>
      </aside>

      {/* Disease Details Section */}
      <main className="disease-details">
        {selectedDisease ? (
          <>
            <h2>{diseaseDetails[selectedDisease]?.name || "Loading..."}</h2>
            <div className="detail-box">
              <h3>Description</h3>
              <p>{diseaseDetails[selectedDisease]?.description || "Loading..."}</p>
            </div>
            <div className="detail-box">
              <h3>Symptoms</h3>
              <p>{diseaseDetails[selectedDisease]?.symptoms || "Loading..."}</p>
            </div>
            <div className="detail-box">
              <h3>Causes</h3>
              <p>{diseaseDetails[selectedDisease]?.causes || "Loading..."}</p>
            </div>
          </>
        ) : (
          <h2>Select a disease to see details</h2>
        )}
      </main>
    </div>
  );
};

export default ExploreDerma;
