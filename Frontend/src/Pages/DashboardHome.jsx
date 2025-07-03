import React from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  return (
    
      <div className="dashboardhome-content">
  {/* Welcome Section */}
  <h1>Welcome to Skinalyze 🧴</h1>
  <p>
    Your personalized skincare assistant! Whether you're a beginner or an expert, we provide 
    you with the best tools, insights, and product recommendations for your skin.
  </p>

  {/* Section 1: Why Skincare Matters */}
  <div className="dashboard-section">
    <div className="text-content">
      <h2>✨ Why Skincare Matters?</h2>
      <p>
        Healthy skin is not just about beauty—it's about self-care and confidence. 
        A good skincare routine helps prevent aging, protects against environmental damage, 
        and keeps your skin glowing.
      </p>
    </div>
    <img src="https://static.vecteezy.com/system/resources/thumbnails/024/128/252/small_2x/healthy-skin-prevent-sun-damaged-skin-on-woman-face-illustration-on-white-background-protect-from-premature-aging-wrinkling-photoaging-sun-damage-and-skin-damage-from-sun-exposure-vector.jpg" alt="Healthy Skincare" className="dashboard-image"/>
  </div>

  {/* Section 2: Quick Tips & Tricks */}
  <div className="dashboard-section reverse">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFMb2L3hpGX4pJXfB853gesHRNwJxem2Aapw&s" alt="Skincare Routine" className="dashboard-image"/>
    <div className="text-content">
      <h2>💡 Quick Tips & Tricks</h2>
      <ul>
        <li>🔹 Always apply sunscreen to protect your skin from UV damage.</li>
        <li>🔹 Stay hydrated to keep your skin plump and fresh.</li>
        <li>🔹 Use a gentle cleanser suited to your skin type.</li>
        <li>🔹 Moisturize daily to lock in hydration.</li>
        <li>🔹 Avoid touching your face frequently to reduce breakouts.</li>
      </ul>
    </div>
  </div>

  {/* Section 3: Personalized Skincare Solutions */}
  <div className="dashboard-section">
    <div className="text-content">
      <h2>🔍 Personalized Skincare Solutions</h2>
      <p>
        Skinalyze offers AI-powered skin analysis and personalized recommendations tailored 
        to your skin type and concerns. Get started with our **Derma Detection** tool now!
      </p>
    </div>
    <img src="https://c.files.bbci.co.uk/EA5B/production/_118559995_03_derm-photo.png" alt="AI Skin Analysis" className="dashboard-image"/>
  </div>

  {/* Section 4: Featured Products */}
  <div className="dashboard-section reverse">
    <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1k6cms.img?w=2000&h=1000&m=4&q=100" alt="Best Skincare Products" className="dashboard-image"/>
    <div className="text-content">
      <h2>🛍️ Best Skincare Products</h2>
      <p>
        We curate dermatologist-recommended products to help you build an effective routine.  
        Check out our <strong>Buy Product</strong> section to explore the best skincare items.
      </p>
    </div>
  </div>

  {/* Call to Action */}
  <div className="dashboard-cta">
    <h2>🚀 Start Your Skincare Journey Today!</h2>
    <p>Analyze your skin, explore the best products, and build a routine that works for you.</p>
  
  </div>
</div>

  
  );
};

export default DashboardHome;
