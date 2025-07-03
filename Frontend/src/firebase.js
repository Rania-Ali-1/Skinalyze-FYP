// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJjmaiVsWxlVemtFE7hcvRzz8Ll7Vc79I",
    authDomain: "final-year-8c540.firebaseapp.com",
    projectId: "final-year-8c540",
    storageBucket: "final-year-8c540.firebasestorage.app",
    messagingSenderId: "650588338205",
    appId: "1:650588338205:web:73fc1922301c756c022ef4",
    measurementId: "G-ZGY7XGYYBQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
