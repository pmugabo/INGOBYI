# Ingobyi Emergency Management System 🚑

Ingobyi is a cutting-edge emergency management platform designed to save lives and streamline emergency response in Rwanda. Our mission is to provide rapid, efficient, and coordinated emergency services.

## Key Features

✔ Patient Emergency Requests
✔ Real-time Driver Tracking
✔ Hospital Pre-admission Management
✔ Insurance Verification
✔ Admin System Management

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Heroicons

### Backend
- Node.js
- Express.js
- Socket.IO (Real-time Updates)

### Database
- MongoDB
- Mongoose ORM

### Additional Services
- Google Maps API (Location Tracking)
- JWT Authentication

## Getting Started

### 1️⃣ Prerequisites

Before you begin, ensure you have:
- Node.js (v18+)
- npm or yarn
- MongoDB
- Git

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/pmugabo/INGOBYI.git
cd INGOBYI
```

### 3️⃣ Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 4️⃣ Environment Setup

Create `.env` files in both `server` and `client` directories:

#### Server `.env`
```
MONGODB_URI=mongodb://localhost:27017/ingobyi
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Client `.env`
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5️⃣ Database Setup

```bash
# Start MongoDB service
mongod

# In the server directory, seed initial data (if needed)
npm run seed
```

### 6️⃣ Run the Application

```bash
# Start backend (in server directory)
npm run dev

# Start frontend (in client directory)
npm start
```

The app will be available at `http://localhost:3000`

## Security Features

- Encrypted Passwords
- Role-Based Access Control
- JWT Authentication
- Secure API Endpoints

## Modules

### 1. Patient Module
- Emergency Requests
- Real-time Tracking
- Medical History

### 2. Driver Module
- Request Management
- Navigation Integration
- Status Updates

### 3. Hospital Module
- Pre-admission Processing
- Bed Availability
- Patient Routing

### 4. Admin Module
- User Management
- System Analytics
- Configuration

### 5. Insurance Module
- Real-time Verification
- Coverage Details
- Payment Logging

## Upcoming Features

- Enhanced Real-time Tracking
- Multi-Language Support
- Advanced Analytics Dashboard
- Machine Learning Predictions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Your code could help save a life, provide critical support during emergencies, and make a real difference in our community.
"TOGETHER, WE SAVE LIVES"

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Lead: Patricia Mugabo
Email: p.mugabo@alustudent.com

