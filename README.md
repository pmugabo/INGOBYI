# Ingobyi Emergency Management System

A full-stack web application for managing emergency medical services with real-time ambulance tracking, insurance verification, and hospital coordination.

## Features

- **Patient Module**
  - Request emergency assistance
  - Real-time ambulance tracking
  - Medical history management
  - Insurance verification

- **Driver Module**
  - Accept emergency requests
  - Real-time navigation
  - Status updates
  - Trip management

- **Insurance Module**
  - Patient insurance verification
  - Payment processing
  - Claims management
  - Coverage tracking

- **Hospital Module**
  - Pre-admission alerts
  - Patient status tracking
  - Resource management

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.IO Client
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Maps**: Google Maps API
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Maps API Key
- NPM or Yarn

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ingobyi.git
cd ingobyi
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Start the development servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm start
```

## API Documentation

### Authentication Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Emergency Routes
- POST /api/emergency - Create emergency request
- PUT /api/emergency/:requestId/status - Update request status
- GET /api/emergency/:requestId - Get request details

### Insurance Routes
- POST /api/insurance/verify/:requestId - Verify insurance
- POST /api/insurance/payment/:requestId - Process payment
- GET /api/insurance/records - Get insurance records

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
