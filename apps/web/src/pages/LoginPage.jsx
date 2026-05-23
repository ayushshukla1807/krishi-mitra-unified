// src/pages/LoginPage.jsx - FINAL VERIFIED VERSION
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import './LoginPage.css';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const generateRecaptcha = () => {
    if (window.recaptchaVerifier || !auth) return; // Prevent re-rendering or crash
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => { /* reCAPTCHA solved */ }
    });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      if (!auth) {
        alert("Authentication service is currently unavailable. Please try again later.");
        return;
      }
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const fullPhoneNumber = `+91${phone}`;

      signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult);
          setStep(2);
        }).catch((error) => {
          console.error("Firebase OTP Error:", error);
          alert("Error sending OTP. Please check the console for details or try again.");
          // Reset reCAPTCHA for next attempt
          window.recaptchaVerifier.render().then(function(widgetId) {
            grecaptcha.reset(widgetId);
          });
        });
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6 && confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          const user = result.user;
          login({ phoneNumber: user.phoneNumber }); // Save user info
          navigate('/crops');
        }).catch((error) => {
          console.error("Firebase OTP Verification Error:", error);
          alert("Invalid OTP. Please try again.");
        });
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{t('login_title')}</h2>
        <p>{t('login_subtitle')}</p>
        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="phone">{t('phone_number')}</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 9876543210" maxLength="10"/>
            </div>
            <button type="submit" className="login-btn">{t('send_otp')}</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">{t('enter_otp')}</label>
              <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="e.g., 123456" maxLength="6"/>
            </div>
            <button type="submit" className="login-btn">{t('login')}</button>
          </form>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};
export default LoginPage;