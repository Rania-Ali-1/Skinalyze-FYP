import React, { useState } from "react";
import { db, auth } from "../firebase"; // Make sure these paths are correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Import Firestore functions
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User created: ", user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });

      console.log("User data saved to Firestore!");
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account: ", error);
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="reg-cont">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            <label>I accept terms of privacy policy</label>
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
          <p className="signin-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
