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
import MarketAnalyticsPage from './pages/MarketAnalyticsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  console.log('App Rendering...');
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
          <Route path="/crops" element={<ProtectedRoute><AppLayout><CropsPage /></AppLayout></ProtectedRoute>} />
          <Route path="/rentals" element={<ProtectedRoute><AppLayout><MachineRentalPage /></AppLayout></ProtectedRoute>} />
          <Route path="/market-analytics" element={<ProtectedRoute><AppLayout><MarketAnalyticsPage /></AppLayout></ProtectedRoute>} />
          <Route path="/disease-detection" element={<ProtectedRoute><AppLayout><DiseaseDetectionPage /></AppLayout></ProtectedRoute>} />
          <Route path="/ai-agronomist" element={<ProtectedRoute><AppLayout><AIAgronomistPage /></AppLayout></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;