import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-ingobyi-blue-500">
                INGOBYI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-black hover:border-ingobyi-blue-500 hover:text-ingobyi-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/emergency"
                className="border-transparent text-black hover:border-ingobyi-blue-500 hover:text-ingobyi-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Emergency
              </Link>
              <Link
                to="/services"
                className="border-transparent text-black hover:border-ingobyi-blue-500 hover:text-ingobyi-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="border-transparent text-black hover:border-ingobyi-blue-500 hover:text-ingobyi-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/help"
                className="border-transparent text-black hover:border-ingobyi-blue-500 hover:text-ingobyi-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Help
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={`/${user.role}`}
                  className="text-ingobyi-blue-500 hover:text-ingobyi-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-ingobyi-blue-500 hover:text-ingobyi-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-ingobyi-blue-500 hover:text-ingobyi-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ingobyi-blue-500 hover:bg-ingobyi-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
