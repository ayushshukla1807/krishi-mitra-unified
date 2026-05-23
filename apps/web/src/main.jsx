import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './i18n/i18n';

window.onerror = function(message, source, lineno, colno, error) {
  console.log('GLOBAL ERROR CAUGHT:', message, error);
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
    <h1>Application Crash</h1>
    <p>${message}</p>
    <pre>${error?.stack || ''}</pre>
  </div>`;
};

console.log('Mounting Krishi Mitra App...');
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  console.error('CRITICAL: ROOT ELEMENT NOT FOUND');
  document.body.innerHTML = '<h1>Error: Root element missing</h1>';
}
