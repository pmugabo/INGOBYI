import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Transforming Emergency Medical Response
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Ingobyi is revolutionizing emergency medical services in Rwanda through innovative technology and coordinated response.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                To provide fast, reliable, and accessible emergency medical services to all Rwandans through innovative technology and coordinated response systems.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                To be the leading emergency medical response platform in Africa, setting new standards for emergency healthcare delivery through technology.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h3>
              <ul className="mt-4 space-y-2 text-lg text-gray-500 dark:text-gray-400">
                <li>• Speed and Efficiency in Emergency Response</li>
                <li>• Quality and Professional Healthcare</li>
                <li>• Innovation and Technology Integration</li>
                <li>• Accessibility and Inclusivity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Impact</h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Through our platform, we've significantly reduced emergency response times and improved medical outcomes across Rwanda. Our integration with insurance providers has made emergency care more accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
