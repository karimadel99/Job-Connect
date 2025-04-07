import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineCog,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch
} from 'react-icons/hi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/jobseeker/dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleNavToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const dashboardLinks = [
    { name: 'Overview', href: '/jobseeker/dashboard/overview', icon: HiOutlineViewGrid },
    { name: 'Applied Jobs', href: '/jobseeker/dashboard/applied-jobs', icon: HiOutlineClipboardList },
    { name: 'Favorite Jobs', href: '/jobseeker/dashboard/favorite-jobs', icon: HiOutlineHeart },
    { name: 'Settings', href: '/jobseeker/dashboard/settings', icon: HiOutlineCog },
  ];

  return (
    <nav className="dark:bg-dark-primary-50 bg-light-primary-50 dark:text-dark-text-primary text-light-text-primary fixed w-full z-30 shadow">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
          >
            Job Connect
          </Link>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button - visible on mobile */}
            <div className="md:hidden">
              <button
                onClick={handleNavToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <HiOutlineX className="block h-6 w-6" />
                ) : (
                  <HiOutlineMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'jobseeker' ? (
                  <>
                    <Link
                      to="/jobseeker/find-jobs"
                      className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                    >
                      Find Jobs
                    </Link>
                    <Link
                      to="/jobseeker/find-employers"
                      className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                    >
                      Find Employers
                    </Link>
                    <Link
                      to="/jobseeker/dashboard"
                      className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : user.role === 'employer' ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-dark-text-secondary rounded-md dark:hover:bg-dark-neutral-700"
                  >
                    Logout
                  </button>
                ) : null}
                <DarkModeToggle />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                >
                  Login
                </Link>
                <Link
                  to="/register/jobseeker"
                  className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                >
                  Job Seeker Register
                </Link>
                <Link
                  to="/register/employer"
                  className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500"
                >
                  Employer Register
                </Link>
                <DarkModeToggle />
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                user.role === 'jobseeker' ? (
                  <>
                    <Link
                      to="/jobseeker/find-jobs"
                      className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Find Jobs
                    </Link>
                    <Link
                      to="/jobseeker/find-employers"
                      className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Find Employers
                    </Link>

                    {/* Dashboard links in mobile menu when on dashboard routes */}
                    {(
                      <div className="border-t border-light-neutral-200 dark:border-dark-neutral-700 pt-2 mt-2">
                        <p className="px-3 py-2 text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                          Dashboard
                        </p>
                        {dashboardLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.name}
                              to={link.href}
                              className="flex items-center px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Icon className="mr-3 h-5 w-5" />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/employer/dashboard"
                    className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register/jobseeker"
                    className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Job Seeker Register
                  </Link>
                  <Link
                    to="/register/employer"
                    className="block px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Employer Register
                  </Link>
                </>
              )}
              <div className="border-t border-light-neutral-200 dark:border-dark-neutral-700 pt-2 mt-2">
                <DarkModeToggle />
                {user && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
