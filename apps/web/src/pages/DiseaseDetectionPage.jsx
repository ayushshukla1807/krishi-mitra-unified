import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { FaUpload, FaStethoscope } from 'react-icons/fa';
import './DiseaseDetectionPage.css';
const DiseaseDetectionPage = () => {
  const { t } = useTranslation(); const [isAnalyzing, setIsAnalyzing] = useState(false); const [result, setResult] = useState(null);
  const handleImageUpload = () => { setIsAnalyzing(true); setResult(null); setTimeout(() => { setResult({ disease: 'Tomato Late Blight', confidence: '95% Confidence', solution: 'Apply fungicides containing mancozeb or chlorothalonil. Ensure proper plant spacing for air circulation and avoid overhead watering.', }); setIsAnalyzing(false); }, 3000); };
  return ( <div> <Header /> <div className="detection-container"> <FaStethoscope className="main-icon" /> <h2>{t('disease_detection_title')}</h2> <p className="description">{t('disease_detection_desc')}</p> <button onClick={handleImageUpload} className="upload-btn" disabled={isAnalyzing}> {isAnalyzing ? ( <><div className="spinner"></div> {t('analyzing_image')}</> ) : ( <><FaUpload /> {t('upload_image')}</> )} </button> {result && ( <div className="result-card"> <h3>{t('diagnosis_result')}</h3> <p><strong>{t('disease')}:</strong> {result.disease}</p> <p><strong>{t('confidence')}:</strong> {result.confidence}</p> <div className="solution"> <h4>{t('recommended_solution')}</h4> <p>{result.solution}</p> </div> </div> )} </div> </div> );
};
export default DiseaseDetectionPage;