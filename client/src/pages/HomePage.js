import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Ingobyi Emergency Management System
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Fast, reliable emergency response with real-time tracking and seamless insurance integration
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Register Now
              </Link>
              <Link
                to="/emergency"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white border-red-600 hover:bg-red-50"
              >
                Request Emergency
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Real-time Tracking</h3>
            <p className="mt-2 text-gray-500">Track ambulance location and estimated arrival time in real-time</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Insurance Integration</h3>
            <p className="mt-2 text-gray-500">Seamless insurance verification and claims processing</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Hospital Network</h3>
            <p className="mt-2 text-gray-500">Connected to major hospitals for quick response and admission</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">Emergency Contact</h2>
            <p className="mt-2 text-xl">Call: 112</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
