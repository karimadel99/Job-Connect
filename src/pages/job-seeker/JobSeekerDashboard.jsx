import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineBriefcase, HiOutlineBookmark, HiOutlineSearch, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const JobSeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/job-seeker', icon: HiOutlineViewGrid },
    { name: 'Applied Jobs', href: '/job-seeker/applied-jobs', icon: HiOutlineBriefcase },
    { name: 'Favorite Jobs', href: '/job-seeker/favorite-jobs', icon: HiOutlineBookmark },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-dark-neutral-800 transition duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between px-4 lg:h-20">
            <Link to="/job-seeker" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">JobPortal</span>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <HiOutlineX className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isCurrentPath = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isCurrentPath
                      ? 'bg-light-primary-50 text-light-primary-600 dark:bg-dark-primary-900/50 dark:text-dark-primary-500'
                      : 'text-light-text-primary hover:bg-light-neutral-100 dark:text-dark-text-primary dark:hover:bg-dark-neutral-700'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-6 w-6 flex-shrink-0 transition-colors duration-300 ${
                        isCurrentPath
                          ? 'text-light-primary-600 dark:text-dark-primary-500'
                          : 'text-light-text-primary dark:text-dark-text-primary'
                      }`}
                    />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isCurrentPath
                        ? 'bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900 dark:text-dark-primary-200'
                        : 'bg-light-neutral-100 text-light-text-primary dark:bg-dark-neutral-700 dark:text-dark-text-primary'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-light-neutral-200 dark:border-dark-neutral-700 p-4">
            <button
              className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 rounded-lg transition-colors duration-300"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11.707 4.707a1 1 0 0 0-1.414-1.414L10 9.586 8.707 8.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-dark-neutral-800 shadow lg:h-20">
          <button
            className="px-4 text-light-text-primary dark:text-dark-text-primary lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>

          {/* Search Bar */}
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex flex-1 items-center">
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiOutlineSearch className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    className="block w-full rounded-lg border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 pl-10 pr-3 text-sm text-light-text-primary dark:text-dark-text-primary placeholder-light-neutral-400 dark:placeholder-dark-neutral-400 focus:border-light-primary-500 dark:focus:border-dark-primary-500 focus:outline-none focus:ring-1 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="ml-4 flex items-center space-x-4">
              <Link
                to="/job-seeker/find-jobs"
                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-light-primary-600 hover:bg-light-primary-700 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-700 transition-colors duration-300"
              >
                <HiOutlineBriefcase className="h-5 w-5 mr-2" />
                Find Jobs
              </Link>
              <button className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;