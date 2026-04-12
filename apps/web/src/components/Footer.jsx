import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
const Footer = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng) => { i18n.changeLanguage(lng); };
  return ( <footer className="footer"> <div className="language-switcher"> <span>{t('footer_change_language')}</span> <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>English</button> <button onClick={() => changeLanguage('hi')} className={i18n.language === 'hi' ? 'active' : ''}>हिन्दी</button> <button onClick={() => changeLanguage('mr')} className={i18n.language === 'mr' ? 'active' : ''}>मराठी</button> </div> </footer> );
};
export default Footer;