// src/pages/CropsPage.jsx - FINAL UPDATED VERSION

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CropCard from '../components/CropCard';
import { crops } from '../Data/cropData';
import './CropsPage.css';

// --- NEW ADDITIONS START HERE ---
import { Link } from 'react-router-dom'; // Import the Link component for navigation
import { FaTractor, FaStethoscope } from 'react-icons/fa'; // Import icons for the new cards
// --- NEW ADDITIONS END HERE ---

const CropsPage = () => {
  const [filter, setFilter] = useState('All');
  const { t } = useTranslation();
  const filteredCrops =
    filter === 'All' ? crops : crops.filter((crop) => crop.category === filter);

  return (
    <div>
      <Header />
      <div className="filter-bar">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>{t('all')}</button>
        <button className={filter === 'Crop' ? 'active' : ''} onClick={() => setFilter('Crop')}>{t('crop')}</button>
        <button className={filter === 'Fruit' ? 'active' : ''} onClick={() => setFilter('Fruit')}>{t('fruit')}</button>
        <button className={filter === 'Vegetable' ? 'active' : ''} onClick={() => setFilter('Vegetable')}>{t('vegetable')}</button>
      </div>

      <div className="crop-list">
        {filteredCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      {/* --- THIS IS THE NEW NAVIGATION SECTION --- */}
      <div className="explore-section">
        <h2>{t('explore_more')}</h2>
        <div className="explore-grid">
          <Link to="/rentals" className="explore-card">
            <FaTractor className="explore-icon" />
            <div className="explore-text">
              <h3>{t('machine_rental_title')}</h3>
              <p>Rent or list your farming equipment.</p>
            </div>
          </Link>
          <Link to="/disease-detection" className="explore-card">
            <FaStethoscope className="explore-icon" />
            <div className="explore-text">
              <h3>{t('disease_detection_title')}</h3>
              <p>Diagnose crop diseases instantly.</p>
            </div>
          </Link>
        </div>
      </div>
      {/* --- END OF NEW NAVIGATION SECTION --- */}

    </div>
  );
};
export default CropsPage;