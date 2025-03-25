import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmergencyRequest from './components/EmergencyRequest';
import EmergencyTracking from './components/EmergencyTracking';
import DriverDashboard from './components/DriverDashboard';
import InsuranceDashboard from './components/InsuranceDashboard';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Ingobyi"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<EmergencyRequest />} />
              <Route path="/track/:requestId" element={<EmergencyTracking />} />

              {/* Protected Routes */}
              <Route
                path="/driver"
                element={
                  <PrivateRoute roles={['driver']}>
                    <DriverDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/insurance"
                element={
                  <PrivateRoute roles={['insurance']}>
                    <InsuranceDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
