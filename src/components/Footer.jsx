import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-neutral-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/logoLight (1).svg"
              alt="Job Connect Logo"
              className="h-8 w-auto hidden dark:block"
            />
            <img
              src="/assets/logoDark (1).svg"
              alt="Job Connect Logo"
              className="h-8 w-auto block dark:hidden"
            />
            <span className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Job Connect
            </span>
          </Link>
        </div>
        
        {/* Add your footer content here */}
      </div>
    </footer>
  );
};

export default Footer;
