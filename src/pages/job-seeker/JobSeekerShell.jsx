import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import JobSeekerSidebar from '../../components/job-seeker/JobSeekerSidebar';
import JobSeekerHeader from '../../components/job-seeker/JobSeekerHeader';

const JobSeekerShell = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/jobseeker/dashboard') || location.pathname.includes('/jobseeker');

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background-primary pt-16">
        <JobSeekerHeader/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar - Only show on desktop and dashboard routes */}
          {isDashboardRoute && (
            <div className="hidden md:block w-64 mr-8 fixed left-0 top-16 bottom-0 overflow-y-auto">
              <JobSeekerSidebar />
            </div>
          )}
          
          {/* Main content */}
          <main className={`flex-1 py-6 ${isDashboardRoute ? 'md:ml-64' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerShell;