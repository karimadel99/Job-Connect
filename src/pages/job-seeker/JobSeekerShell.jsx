import React from 'react';
import { useLocation } from 'react-router-dom';
import JobSeekerSidebar from '../../components/job-seeker/JobSeekerSidebar';
import JobSeekerHeader from '../../components/job-seeker/JobSeekerHeader';

const JobSeekerShell = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/jobseeker/dashboard') || location.pathname.includes('/jobseeker');

  return (
    <div className="pt-16 min-h-screen bg-light-background dark:bg-dark-primary-50">
      {/* Header */}
      <div className="sticky top-16 z-30 hidden lg:block">
        <JobSeekerHeader />
      </div>
      
      {/* Main content area with sidebar */}
      <div className="flex flex-col lg:flex-row lg:space-x-0">
        {/* Sidebar - Only show on dashboard routes and lg screens */}
        {isDashboardRoute && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div
              className="fixed top-32 w-64 h-[calc(100vh-8rem)] overflow-y-auto bg-white dark:bg-dark-neutral-800 scrollbar-thin scrollbar-thumb-light-neutral-300 dark:scrollbar-thumb-dark-neutral-600"
            >
              <JobSeekerSidebar />
            </div>
          </div>
        )}
        {/* Main content area */}
        <main 
          className={`flex-1 min-h-[calc(100vh-8rem)] transition-all duration-300 overflow-x-auto ${
            isDashboardRoute ? 'lg:pl-4' : ''
          }`}
        >
          <div className="h-full px-2 sm:px-4 py-4 sm:py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobSeekerShell;