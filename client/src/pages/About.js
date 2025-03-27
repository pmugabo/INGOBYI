import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Emergency Response</span>
                  <span className="block text-[#004F98]">Made Simple</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We're revolutionizing emergency medical response with cutting-edge technology
                  and a commitment to saving lives. Our platform connects patients, emergency
                  responders, and healthcare providers in real-time.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/help#contact"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ingobyi-blue-500 hover:bg-ingobyi-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ingobyi-blue-500"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ingobyi-blue-600/80 via-ingobyi-blue-500/40 to-ingobyi-blue-200/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-9 py-4 text-3xl font-medium rounded-md shadow-sm text-white bg-gray-900">
              TEAM
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[17rem] bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/images/me1.jpg"
                  alt="Patricia Mugabo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-base font-semibold text-gray-900">Patricia Mugabo</h3>
                <p className="mt-0.5 text-xs text-blue-600">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-[#004F98]">Join our network today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#004F98] hover:bg-[#003d7a]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
