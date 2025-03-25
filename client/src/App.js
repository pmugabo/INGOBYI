import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Pages
import HomePage from './pages/HomePage';
import About from './pages/About';
import Services from './pages/Services';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import EmergencyRequest from './pages/EmergencyRequest';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import EMTDashboard from './pages/EMTDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Dashboard from './pages/Dashboard';

// Components
import Layout from './components/Layout';

// Context
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/help" element={<Layout><Help /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/emergency" element={<Layout><EmergencyRequest /></Layout>} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout><Dashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={['admin']}>
                  <Layout><AdminDashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/driver"
              element={
                <PrivateRoute roles={['driver']}>
                  <Layout><DriverDashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/emt"
              element={
                <PrivateRoute roles={['emt']}>
                  <Layout><EMTDashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hospital"
              element={
                <PrivateRoute roles={['hospital']}>
                  <Layout><HospitalDashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/insurance"
              element={
                <PrivateRoute roles={['insurance']}>
                  <Layout><InsuranceDashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/patient"
              element={
                <PrivateRoute roles={['patient']}>
                  <Layout><PatientDashboard /></Layout>
                </PrivateRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
