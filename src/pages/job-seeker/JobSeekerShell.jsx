import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobSeekerSidebar from '../../components/job-seeker/JobSeekerSidebar';
import JobSeekerHeader from '../../components/job-seeker/JobSeekerHeader';

const JobSeekerShell = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDashboardRoute = location.pathname.includes('/jobseeker/dashboard') || location.pathname.includes('/jobseeker');

  // Close sidebar on route change in mobile view
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="pt-16 min-h-screen bg-light-background dark:bg-dark-primary-50">
      {/* Header with hamburger menu */}
      <div className="sticky top-16 z-30"> {/* Position below Navbar */}
        <JobSeekerHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      
      {/* Main content area with sidebar */}
      <div className="flex flex-col md:flex-row md:space-x-0">
        {/* Sidebar - Only show on dashboard routes */}
        {isDashboardRoute && (
          <>
            {/* Mobile overlay */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            {/* Sidebar container - Fixed width space for sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              {/* Fixed sidebar */}
              <div
                id="sidebar"
                className={`fixed top-32 w-64 h-[calc(100vh-8rem)] overflow-y-auto transform bg-white dark:bg-dark-neutral-800 transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-light-neutral-300 dark:scrollbar-thumb-dark-neutral-600 ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
              >
                <JobSeekerSidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
              </div>
            </div>
            {/* Mobile sidebar */}
            <div
              className={`md:hidden fixed top-32 left-0 z-20 w-64 h-[calc(100vh-8rem)] overflow-y-auto transform bg-white dark:bg-dark-neutral-800 transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <JobSeekerSidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
            </div>
          </>
        )}
        {/* Main content area */}
        <main 
          className={`flex-1 min-h-[calc(100vh-8rem)] transition-all duration-300 overflow-x-auto ${
            isDashboardRoute ? 'md:pl-4' : ''
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