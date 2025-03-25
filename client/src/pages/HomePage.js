import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-ingobyi-blue-50">
      {/* Hero Section */}
      <div className="bg-ingobyi-blue-500 shadow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              INGOBYI Emergency Management System
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white">
              Fast, reliable emergency response with real-time tracking and seamless insurance integration
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Real-Time Tracking</h3>
            <p className="text-gray-700">
              Monitor emergency response vehicles in real-time with our advanced GPS tracking system. Know exactly when help will arrive.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Insurance Integration</h3>
            <p className="text-gray-700">
              Seamless integration with major insurance providers ensures hassle-free claim processing and coverage verification.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">24/7 Support</h3>
            <p className="text-gray-700">
              Our dedicated support team is available around the clock to assist you with any emergency situation.
            </p>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-ingobyi-blue-500 mb-8">Our Insurance Partners</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Mutuelle de Santé</h3>
              <p className="text-gray-700">
                Community Based Health Insurance (Mutuelle de santé) is a solidarity health insurance system helping people with low income access medical care at affordable cost...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Military Medical Insurance</h3>
              <p className="text-gray-700">
                Military Medical Insurance (MMI) provides comprehensive healthcare coverage for military personnel and their families in Rwanda, ensuring access to quality medical services...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Radiant Insurance</h3>
              <p className="text-gray-700">
                Radiant Insurance offers innovative health insurance solutions with comprehensive coverage, including both inpatient and outpatient services across Rwanda...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">RSSB/RAMA Medical Insurance</h3>
              <p className="text-gray-700">
                Rwanda Social Security Board (RSSB) provides comprehensive health coverage for public and private sector employees, ensuring access to quality healthcare services...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Prime Medical Insurance</h3>
              <p className="text-gray-700">
                Prime Insurance delivers premium healthcare coverage with flexible plans, extensive network of providers, and streamlined claims processing...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-ingobyi-blue-500 mb-4">Britam Rwanda</h3>
              <p className="text-gray-700">
                The Britam corporate medical cover offers comprehensive inpatient and fund-managed outpatient coverage for companies, NGOs, and Chamas with more than 10 members...
              </p>
              <a href="#" className="mt-4 inline-block text-ingobyi-blue-500 font-medium hover:text-ingobyi-blue-600">Explore More →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Call Section */}
      <div className="bg-ingobyi-blue-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Need Emergency Assistance?
            </h2>
            <p className="mt-2 text-base leading-6 text-white">
              Our support team is available 24/7
            </p>
            <p className="mt-1 text-base leading-6 text-white">
              Call our hotline at <span className="font-bold text-lg">707</span>
            </p>
            <div className="mt-4">
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-ingobyi-blue-600 bg-white hover:bg-gray-50"
              >
                Request Emergency Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
