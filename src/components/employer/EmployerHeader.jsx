import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const EmployerHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex flex-col md:flex-row items-center justify-around gap-4 p-4 
                       bg-light-primary-100 text-light-text-primary 
                       dark:bg-dark-primary-100 dark:text-dark-text-primary 
                       shadow-sm">

      {/* Left Section: Greeting + Stats */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          {user?.name ? `Hello, ${user.name}!` : 'Hello, Employer!'}
        </h2>
        {/* Example Stats Row (Remove or Customize as needed) */}
      </div>

      {/* Right Section: Post Job  */}
      <div className="flex items-center space-x-4">
        <Link
          to="/employer/post-job"
          className="px-4 py-2 rounded-md font-medium
                     bg-light-primary-400 text-light-background 
                     hover:bg-light-primary-500
                     dark:bg-dark-primary-300 dark:text-dark-text-primary
                     dark:hover:bg-dark-primary-400
                     transition-colors"
        >
          Post a Job
        </Link>
      </div>
    </header>
  );
};

export default EmployerHeader;
