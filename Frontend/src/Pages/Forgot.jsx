import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      console.error("Error sending reset email: ", error);
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Send Reset Link
        </button>
        {message && <p className="reset-message">{message}</p>}
        <p className="back-to-login" onClick={handleBackToLogin} style={{ cursor: 'pointer', color: 'blue' }}>
          Back to Login
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
