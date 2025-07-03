import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot');
  };

  return (
    <div className="log-cont">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign In </h2>
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
          <button type="submit" className="submit-button">
            Login
          </button>
          <p className="signup-link">
            Don't have an account? <a href="/Register">Create account</a>
          </p>
          <p className="forgot-password" onClick={handleForgotPassword} style={{ cursor: 'pointer', color: 'blue' }}>
            Forgot your password?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
