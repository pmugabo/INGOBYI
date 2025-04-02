import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './components/PublicLayout';

// Pages
import HomePage from './pages/HomePage';
import About from './pages/About';
import Services from './pages/Services';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import EmergencyRequest from './pages/EmergencyRequest';
import Dashboard from './pages/Dashboard';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import EMTDashboard from './pages/EMTDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// GitHub Pages base URL
const basename = process.env.NODE_ENV === 'production' ? '/ingobyi-github' : '';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      // Public Routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/emergency",
        element: <EmergencyRequest />,
      },
    ],
  },
  // Dashboard Routes (No Layout wrapper, as they use DashboardLayout internally)
  {
    path: "/emergency-request",
    element: <ProtectedRoute><EmergencyRequest /></ProtectedRoute>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/patient-dashboard",
    element: <ProtectedRoute><PatientDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/driver-dashboard",
    element: <ProtectedRoute><DriverDashboard /></ProtectedRoute>,
  },
  {
    path: "/emt-dashboard",
    element: <ProtectedRoute><EMTDashboard /></ProtectedRoute>,
  },
  {
    path: "/hospital-dashboard",
    element: <ProtectedRoute><HospitalDashboard /></ProtectedRoute>,
  },
  {
    path: "/insurance-dashboard",
    element: <ProtectedRoute><InsuranceDashboard /></ProtectedRoute>,
  },
], {
  basename,
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
