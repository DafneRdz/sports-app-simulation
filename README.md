# Sports Streaming App Simulation

A full-stack sports streaming web application featuring live REST API endpoints, real-time data fetching, and an integrated Stripe payment gateway for premium stream access.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-SDK-008CDD?style=flat&logo=stripe&logoColor=white)

---

## Live Links
- **Frontend App:** [sports-app-simulation.vercel.app](https://sports-app-simulation.vercel.app)
- **Backend API:** [sports-app-api-rvy4.onrender.com/api/streams](https://sports-app-api-rvy4.onrender.com/api/streams)

---

## Architecture & Tech Stack

### Monorepo Structure
text
sports-app-simulation/
├── client/          # React (Vite) Frontend hosted on Vercel
│   ├── src/
│   │   ├── App.jsx  # Main UI & Stripe Redirect Logic
│   │   └── App.css
│   └── package.json
└── server/          # FastAPI Backend hosted on Render
├── main.py      # REST Endpoints & Stripe Checkout Session Creator
└── requirements.txt

---

## 🛠️ Key Technologies

- **Backend Framework:** FastAPI (Python) running on Uvicorn
- **Frontend Framework:** React (Vite) with ES6 Promises & Hooks
- **Payment Gateway:** Stripe Checkout API & Python SDK
- **Hosting & Infrastructure:** Render (Backend API Web Service) & Vercel (Frontend App)
- **Version Control:** Git, GitHub, Automated Continuous Deployments

---

## ✨ Key Features

- **Live REST API Stream:** Delivers real-time JSON streaming data from the FastAPI backend to the React UI.
- **Dynamic Payment Unlocks:** Integrated Stripe Checkout session generation for $4.99 premium stream access.
- **CORS Configured Middleware:** Secure backend cross-origin configuration allowing safe communication with Vercel.
- **Automated CI/CD Pipeline:** Instant build & deployment triggered on `git push origin main` across Render and Vercel.
  
