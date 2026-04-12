import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import CropsPage from './pages/CropsPage';
import MachineRentalPage from './pages/MachineRentalPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/crops" element={<ProtectedRoute><CropsPage /></ProtectedRoute>} />
              <Route path="/rentals" element={<ProtectedRoute><MachineRentalPage /></ProtectedRoute>} />
              <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetectionPage /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/crops" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;