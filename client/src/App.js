import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/HomePage';
import About from './pages/About';
import Services from './pages/Services';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import EmergencyRequest from './pages/EmergencyRequest';
import PatientDashboard from './pages/PatientDashboard';
import DriverDashboard from './pages/DriverDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import EMTDashboard from './pages/EMTDashboard';
import AdminDashboard from './pages/AdminDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'patient':
        return <Navigate to="/dashboard/patient" replace />;
      case 'driver':
        return <Navigate to="/dashboard/driver" replace />;
      case 'hospital':
        return <Navigate to="/dashboard/hospital" replace />;
      case 'emt':
        return <Navigate to="/dashboard/emt" replace />;
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'insurance':
        return <Navigate to="/dashboard/insurance" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emergency" element={<EmergencyRequest />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/patient"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/driver"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/hospital"
          element={
            <ProtectedRoute allowedRoles={['hospital']}>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/emt"
          element={
            <ProtectedRoute allowedRoles={['emt']}>
              <EMTDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/insurance"
          element={
            <ProtectedRoute allowedRoles={['insurance']}>
              <InsuranceDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
