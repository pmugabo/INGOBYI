import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleColor = (role) => {
    const colors = {
      patient: 'bg-blue-500',
      emt: 'bg-red-500',
      driver: 'bg-green-500',
      hospital: 'bg-purple-500',
      insurance: 'bg-yellow-500',
      admin: 'bg-gray-500'
    };
    return colors[role] || 'bg-blue-500';
  };

  const getNavLinks = () => {
    const links = {
      patient: [
        { name: 'Request Ambulance', path: '/emergency' },
        { name: 'Insurance', path: '/patient/insurance' },
        { name: 'History', path: '/patient/history' }
      ],
      emt: [
        { name: 'Active Emergencies', path: '/emt/emergencies' },
        { name: 'Patient Records', path: '/emt/records' },
        { name: 'Equipment', path: '/emt/equipment' }
      ],
      driver: [
        { name: 'Active Trips', path: '/driver/trips' },
        { name: 'Vehicle Status', path: '/driver/vehicle' },
        { name: 'Route History', path: '/driver/routes' }
      ],
      hospital: [
        { name: 'Emergency Alerts', path: '/hospital/alerts' },
        { name: 'Bed Management', path: '/hospital/beds' },
        { name: 'Staff Schedule', path: '/hospital/schedule' }
      ],
      insurance: [
        { name: 'Claims', path: '/insurance/claims' },
        { name: 'Policies', path: '/insurance/policies' },
        { name: 'Reports', path: '/insurance/reports' }
      ],
      admin: [
        { name: 'Users', path: '/admin/users' },
        { name: 'System', path: '/admin/system' },
        { name: 'Reports', path: '/admin/reports' }
      ]
    };
    return links[user?.role] || [];
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Role Badge */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">INGOBYI</span>
            </div>
            <div className={`ml-4 px-3 py-1 rounded-full ${getRoleColor(user?.role)} text-white text-sm font-medium`}>
              {user?.role?.toUpperCase()}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {getNavLinks().map((link) => (
              <span
                key={link.path}
                className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-default"
              >
                {link.name}
              </span>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">{user?.fullName?.[0]?.toUpperCase()}</span>
                  </div>
                  <span className="ml-3 text-gray-700">{user?.fullName}</span>
                </button>
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="block px-4 py-2 text-sm text-gray-700">
                      {user?.email}
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
