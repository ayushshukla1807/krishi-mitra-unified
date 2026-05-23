import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaChevronLeft } from 'react-icons/fa';
import './Header.css';
const Header = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'bn', name: 'বাংলা' }
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="header-container bg-[#0a0a0c]/80 backdrop-blur-3xl border-b border-white/5 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#a3e635]">
          {t('welcome', { name: user ? user.name : 'Farmer' })} 👋
        </h1>
        <div className="flex items-center gap-3 text-gray-400">
           <div className="p-2 bg-[#10b981]/10 rounded-lg">
             <FaMapMarkerAlt className="text-[#10b981]" />
           </div>
           <span className="text-xs font-mono tracking-widest uppercase">Ranpise Nagar, Barshitakli, Akola</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end mr-4 hidden lg:flex">
           <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Soil Moisture</span>
           <span className="text-lg font-black text-white">42% <small className="text-[#10b981]">Optimum</small></span>
        </div>
        <div className="header-actions flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"> 
            <FaChevronLeft className="text-[8px]" /> {t('change_location')} 
          </button>
          <select onChange={changeLanguage} value={i18n.language} className="bg-[#10b981] text-black font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest outline-none border-none shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Header;
