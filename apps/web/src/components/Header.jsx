import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaChevronLeft } from 'react-icons/fa';
import './Header.css';
const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <div className="header-container">
      <button className="change-location-btn"> <FaChevronLeft /> {t('change_location')} </button>
      <div className="welcome-message">
        <h1>{t('welcome', { name: user ? user.name : 'Farmer' })} 👋</h1>
        <div className="location-info"> <FaMapMarkerAlt className="location-icon" /> <span>Ranpise Nagar, Barshitakli, Akola</span> </div>
      </div>
    </div>
  );
};
export default Header;