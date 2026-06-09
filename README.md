# AI-Driven Customer Intelligence Platform

## Project Overview

AI-Driven Customer Intelligence Platform is a full-stack web application that transforms customer data into actionable business insights. The platform includes segmentation, churn prediction, product recommendation, and interactive dashboard visualizations.

## Features

- Customer clustering using K-Means segmentation
- Churn prediction with a Random Forest model
- Personalized product and offer recommendations
- Dark-themed responsive dashboard with charts
- API-driven backend built with FastAPI
- React frontend with Vite, Tailwind-inspired styling, Axios, and Chart.js
- SQLite-based dataset initialization and analytics

## Folder Structure

```
AI-Customer-Intelligence/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── routes/
│   │   ├── segmentation.py
│   │   ├── churn.py
│   │   └── recommendation.py
│   ├── ml/
│   │   ├── train_segmentation.py
│   │   ├── train_churn.py
│   │   └── predict.py
│   ├── database/
│   │   ├── db.py
│   │   └── schema.sql
│   └── models/
│       ├── segmentation.pkl
│       ├── churn.pkl
│       └── scaler.pkl
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── services/api.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── CustomerTable.jsx
│       │   └── Charts/
│       │       ├── PieChart.jsx
│       │       ├── BarChart.jsx
│       │       └── LineChart.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── CustomerSegmentation.jsx
│           ├── ChurnPrediction.jsx
│           ├── Recommendations.jsx
│           └── About.jsx
├── dataset/
│   └── customer_data.csv
└── README.md
```

## Installation Steps

### Backend Setup

1. Open a terminal at the project root.
2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Start the backend server:
   ```bash
   uvicorn backend.app:app --reload
   ```

### Frontend Setup

1. Open a terminal in the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```

## Run Commands

- Backend: `uvicorn backend.app:app --reload`
- Frontend: `cd frontend && npm run dev`

## API Endpoints

- `GET /segment` - Returns customer segmentation distribution and dashboard metrics
- `POST /predict-churn` - Returns churn prediction for a customer
- `GET /recommend/{segment}` - Returns recommended offers for a segment

## ML Models Used

- K-Means clustering for customer segmentation
- Random Forest classifier for churn prediction
- StandardScaler preprocessing for churn input data
- Models are saved with `joblib` and loaded automatically at startup

## Future Scope

- Add user authentication and role-based analytics
- Support real-time customer event ingestion
- Enable dynamic model retraining from new labeled data
- Add exportable reports and CSV download features
- Enhance recommendation engine with collaborative filtering
