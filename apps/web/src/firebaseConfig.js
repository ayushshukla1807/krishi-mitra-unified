// src/firebaseConfig.js - FINAL AND CORRECT VERSION
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8rUDYl-YVyqsiEqTJA0KvzmpwT0qvJb4",
  authDomain: "krishi-mitra-auth.firebaseapp.com",
  projectId: "krishi-mitra-auth",
  storageBucket: "krishi-mitra-auth.firebasestorage.app",
  messagingSenderId: "399162076389",
  appId: "1:399162076389:web:ac99295741d19afca4b80c",
  measurementId: "G-1G5XWE5JGV"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export const auth = app ? getAuth(app) : null;