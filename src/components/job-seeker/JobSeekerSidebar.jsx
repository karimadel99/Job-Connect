import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineCog,
  HiOutlineLogout
} from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';

const JobSeekerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  
  const navigation = [
    {
      name: 'Overview',
      href: '/jobseeker/dashboard/overview',
      icon: HiOutlineViewGrid
    },
    {
      name: 'Applied Jobs',
      href: '/jobseeker/dashboard/applied-jobs',
      icon: HiOutlineClipboardList
    },
    {
      name: 'Favorite Jobs',
      href: '/jobseeker/dashboard/favorite-jobs',
      icon: HiOutlineHeart
    },
    {
      name: 'Settings',
      href: '/jobseeker/dashboard/settings',
      icon: HiOutlineCog
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-full py-4 bg-white dark:bg-dark-neutral-800 shadow">
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`
              flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${isActive(item.href)
                ? 'bg-light-primary-50 dark:bg-dark-primary-900 text-light-primary-600 dark:text-dark-primary-500'
                : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700 hover:text-light-primary-600 dark:hover:text-dark-primary-500'
              }
            `}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                isActive(item.href)
                  ? 'text-light-primary-600 dark:text-dark-primary-500'
                  : 'text-light-text-secondary dark:text-dark-text-secondary'
              }`}
            />
            {item.name}
          </Link>
        ))}
      </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
          >
            <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">Logout</span>
          </button>
        </div>
    </div>
  );
};

export default JobSeekerSidebar;