import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EmergencyRequest = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [emergencyType, setEmergencyType] = useState('medical');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Reverse geocode to get address
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results[0]) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/emergency/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          location,
          address,
          emergencyType,
          description,
          userId: user?.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/emergency/tracking/${data.requestId}`);
      } else {
        setError(data.message || 'Failed to submit emergency request');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Emergency Request
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please provide details about your emergency
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                placeholder="Enter your location"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emergencyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Emergency Type
              </label>
              <select
                id="emergencyType"
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              >
                <option value="medical">Medical Emergency</option>
                <option value="accident">Accident</option>
                <option value="fire">Fire</option>
                <option value="crime">Crime</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                placeholder="Describe your emergency..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Request Emergency Assistance'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For immediate assistance, you can also call our emergency hotline at{' '}
            <a href="tel:911" className="font-medium text-red-600 hover:text-red-500">
              911
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
