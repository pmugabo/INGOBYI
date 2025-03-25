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

      {/* Feature Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#004F98] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A Better Way to Handle Emergencies
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#004F98] text-white">
                    {/* Icon */}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Tracking</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Track emergency vehicles in real-time and get accurate ETAs for better response coordination.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#004F98] text-white">
                    {/* Icon */}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Instant Communication</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Direct communication between patients, drivers, and medical facilities.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#004F98] text-white">
                    {/* Icon */}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Insurance Integration</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Seamless insurance verification and claims processing for faster service.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#004F98] text-white">
                    {/* Icon */}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Hospital Network</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Connected network of hospitals and medical facilities for optimal patient care.
                </dd>
              </div>
            </dl>
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
