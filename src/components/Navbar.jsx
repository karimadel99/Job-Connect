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
} from 'react-icons/hi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

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
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logoLight (1).svg" alt="Job Connect Logo" className="h-8 w-auto hidden dark:block" />
            <img src="/assets/logoDark (1).svg" alt="Job Connect Logo" className="h-8 w-auto block dark:hidden" />
            <span className="text-2xl font-bold mt-2">Job Connect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'jobseeker' && (
                  <>
                    <Link to="/jobseeker/find-jobs" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Find Jobs</Link>
                    <Link to="/jobseeker/find-employers" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Find Employers</Link>
                    <Link to="/jobseeker/dashboard" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Dashboard</Link>
                  </>
                )}
                {user.role === 'employer' && (
                  <>
                    <Link to="/employer/dashboard" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Dashboard</Link>
                    <button onClick={handleLogout} className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Logout</button>
                  </>
                )}
                <DarkModeToggle />
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Login</Link>
                <Link to="/register/jobseeker" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Job Seeker Register</Link>
                <Link to="/register/employer" className="hover:text-light-primary-600 dark:hover:text-dark-primary-500">Employer Register</Link>
                <DarkModeToggle />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={handleNavToggle} className="p-2 rounded-md hover:text-light-primary-600 dark:hover:text-dark-primary-500">
              {isMenuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              {user.role === 'jobseeker' && (
                <>
                  <Link to="/jobseeker/find-jobs" onClick={() => setIsMenuOpen(false)} className="block py-2">Find Jobs</Link>
                  <Link to="/jobseeker/find-employers" onClick={() => setIsMenuOpen(false)} className="block py-2">Find Employers</Link>
                  <div className="border-t mt-2 pt-2">
                    <p className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">Dashboard</p>
                    {dashboardLinks.map(({ name, href, icon: Icon }) => (
                      <Link key={name} to={href} onClick={() => setIsMenuOpen(false)} className="flex items-center py-2">
                        <Icon className="mr-3 h-5 w-5" />
                        {name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {user.role === 'employer' && (
                <>
                  <Link to="/employer/overview" onClick={() => setIsMenuOpen(false)} className="block py-2">Overview</Link>
                  <Link to="/employer/post-job" onClick={() => setIsMenuOpen(false)} className="block py-2">Post a Job</Link>
                  <Link to="/employer/my-jobs" onClick={() => setIsMenuOpen(false)} className="block py-2">My Jobs</Link>
                  <Link to="/employer/settings" onClick={() => setIsMenuOpen(false)} className="block py-2">Settings</Link>
                  <button onClick={handleLogout} className="block w-full text-left py-2">Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2">Login</Link>
              <Link to="/register/jobseeker" onClick={() => setIsMenuOpen(false)} className="block py-2">Job Seeker Register</Link>
              <Link to="/register/employer" onClick={() => setIsMenuOpen(false)} className="block py-2">Employer Register</Link>
            </>
          )}
          <div className="border-t pt-2 mt-2">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;