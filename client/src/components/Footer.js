import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-2xl font-bold text-white">INGOBYI</h2>
            <p className="text-gray-300 text-base">
              Revolutionizing emergency medical response with cutting-edge technology and a commitment to saving lives.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-bold text-gray-300 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-300" />
                <span className="text-base text-gray-300">Our hotline 707</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-300" />
                <span className="text-base text-gray-300">emergency@ingobyi.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-gray-300" />
                <span className="text-base text-gray-300">Available 24/7</span>
              </li>
            </ul>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold text-gray-300 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/emergency" className="text-base text-gray-300 hover:text-white">
                      Emergency Request
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-base text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="text-base text-gray-300">
                      Privacy Policy
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-300">
                      Terms of Service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/help" className="text-base text-gray-300 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base text-gray-300 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-300 xl:text-center">
            &copy; {new Date().getFullYear()} INGOBYI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
