# 🌾 Krishi Mitra — Multilingual AgriTech Farmer Assistant

> A production-ready web platform designed to empower Indian farmers with crop guidance, machine rental, and AI-powered disease detection — available in English, Hindi, and Marathi.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)](https://firebase.google.com)
[![i18n](https://img.shields.io/badge/i18next-Multilingual-26A69A)](https://www.i18next.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🔗 Links

- 🌐 **Live Demo:** [krishi-mitra-blue-one.vercel.app](https://krishi-mitra-blue-one.vercel.app)
- 💻 **GitHub:** [github.com/ayushshukla1807/krishi-mitra](https://github.com/ayushshukla1807/krishi-mitra)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **OTP Authentication** | Firebase phone-number based OTP login — no passwords |
| 🌍 **3-Language Support** | Full UI in English, Hindi (हिंदी), and Marathi (मराठी) via react-i18next |
| 🌱 **Crop Knowledge Base** | Detailed info on 10+ crops — season, water needs, soil type, market prices, best practices |
| 🚜 **Machine Rental Marketplace** | Browse and list agricultural equipment for peer-to-peer rental |
| 🩺 **AI Disease Detection** | Upload crop leaf image → get disease name, confidence score, and treatment advice |
| 🛡️ **Protected Routes** | React Context API-based auth guard on all main pages |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 7, React Router v7
- **Authentication:** Firebase Auth (Phone/OTP)
- **Internationalization:** react-i18next, i18next-browser-languagedetector
- **Styling:** Vanilla CSS
- **Icons:** react-icons

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/ayushshukla1807/krishi-mitra.git
cd krishi-mitra

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/       # Header, Footer, CropCard, MachineCard
├── pages/            # CropsPage, MachineRentalPage, DiseaseDetectionPage, LoginPage
├── context/          # AuthContext (Firebase session management)
├── i18n/             # Locale files: en.json, hi.json, mr.json
├── Data/             # cropData.js, machineData.js
└── firebaseConfig.js # Firebase Auth initialization
```

---

## 🌐 Supported Languages

| Language | Locale | Status |
|---|---|---|
| English | `en` | ✅ Complete |
| Hindi | `hi` | ✅ Complete |
| Marathi | `mr` | ✅ Complete |

---

## 📸 Screenshots

> Login with Firebase OTP → Browse crops by category → Detect disease from leaf image → Rent farming equipment

---

## 👨‍💻 Author

**Ayush Shukla** — [github.com/ayushshukla1807](https://github.com/ayushshukla1807)

---

## 📄 License

MIT License — feel free to fork and build upon this project.
