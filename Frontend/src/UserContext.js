// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [prediction, setPrediction] = useState(() => {
    return localStorage.getItem("prediction") || null;
  });

  const [confidence, setConfidence] = useState(() => {
    const storedConfidence = localStorage.getItem("confidence");
    return storedConfidence ? parseFloat(storedConfidence) : null;
  });

  const [imageUrl, setImageUrl] = useState(() => {
    return localStorage.getItem("imageUrl") || null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Persist prediction, confidence, imageUrl to localStorage
  useEffect(() => {
    if (prediction) {
      localStorage.setItem("prediction", prediction);
    } else {
      localStorage.removeItem("prediction");
    }
  }, [prediction]);

  useEffect(() => {
    if (confidence !== null) {
      localStorage.setItem("confidence", confidence.toString());
    } else {
      localStorage.removeItem("confidence");
    }
  }, [confidence]);

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("imageUrl", imageUrl);
    } else {
      localStorage.removeItem("imageUrl");
    }
  }, [imageUrl]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        prediction,
        setPrediction,
        confidence,
        setConfidence,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
