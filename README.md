# Ingobyi Emergency Management System

A full-stack web application for managing emergency medical services with real-time ambulance tracking, insurance verification, and hospital coordination.

## Features

### Patient Module
- Request emergency assistance
- Real-time ambulance tracking
- Medical history management
- Insurance verification

### Driver Module
- Accept emergency requests
- Real-time navigation
- Status updates
- Trip management

### Insurance Module
- Patient insurance verification
- Payment processing
- Claims management
- Coverage tracking

### Hospital Module
- Pre-admission alerts
- Patient status tracking
- Resource management

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.IO Client
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Real-time**: Socket.IO
- **Maps**: Google Maps API
- **Authentication**: JWT
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher)
- npm or Yarn
- MongoDB Atlas account
- Google Maps API Key (optional)
- GitHub account
- Vercel account (for deployment)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/pmugabo/INGOBYI.git
cd INGOBYI
```

### 2. Backend Setup
```bash
cd server
npm install
```

#### Backend Environment Variables
Create a `.env` file in the `server` directory with:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

#### Frontend Environment Variables
Create a `.env` file in the `client` directory with:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run the Application

#### Start Backend
```bash
cd ../server
npm start
```

#### Start Frontend
```bash
cd ../client
npm start
```

Deployment
