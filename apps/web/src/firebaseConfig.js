// src/firebaseConfig.js - FINAL AND CORRECT VERSION

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // We only need getAuth for OTP login

// Your web app's Firebase configuration
// This object contains your real, unique credentials.
const firebaseConfig = {
  apiKey: "AIzaSyB8rUDYl-YVyqsiEqTJA0KvzmpwT0qvJb4",
  authDomain: "krishi-mitra-auth.firebaseapp.com",
  projectId: "krishi-mitra-auth",
  storageBucket: "krishi-mitra-auth.firebasestorage.app",
  messagingSenderId: "399162076389",
  appId: "1:399162076389:web:ac99295741d19afca4b80c",
  measurementId: "G-1G5XWE5JGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service.
// This is what our LoginPage will use.
export const auth = getAuth(app);