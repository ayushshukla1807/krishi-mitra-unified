import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import AIAgronomistPage from './pages/AIAgronomistPage';
import LoginPage from './pages/LoginPage';
import CropsPage from './pages/CropsPage';
import MachineRentalPage from './pages/MachineRentalPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/crops" element={<CropsPage />} />
                  <Route path="/rentals" element={<MachineRentalPage />} />
                  <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
                  <Route path="/ai-agronomist" element={<AIAgronomistPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;