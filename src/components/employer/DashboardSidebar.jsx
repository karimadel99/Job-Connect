// src/components/employer/DashboardSidebar.jsx
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const DashboardSidebar = () => {

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };
  return (
    // "hidden md:block" means hidden on mobile, visible on md+ screens
    <aside className="
    hidden md:block
    w-64
    bg-light-primary-50 dark:bg-dark-primary-50
    text-light-text-primary dark:text-dark-text-primary
    p-4
    sticky
    top-[65px]            
    h-[calc(100vh-70px)]     
    overflow-y-auto
  "
    >
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/employer/overview"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded font-bold bg-light-primary-200 dark:bg-dark-primary-200"
                  : "block py-2 px-4 rounded hover:bg-light-primary-100 dark:hover:bg-dark-primary-100"
              }
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employer/post-job"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded font-bold bg-light-primary-200 dark:bg-dark-primary-200"
                  : "block py-2 px-4 rounded hover:bg-light-primary-100 dark:hover:bg-dark-primary-100"
              }
            >
              Post a Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employer/my-jobs"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded font-bold bg-light-primary-200 dark:bg-dark-primary-200"
                  : "block py-2 px-4 rounded hover:bg-light-primary-100 dark:hover:bg-dark-primary-100"
              }
            >
              My Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employer/settings"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded font-bold bg-light-primary-200 dark:bg-dark-primary-200"
                  : "block py-2 px-4 rounded hover:bg-light-primary-100 dark:hover:bg-dark-primary-100"
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="border-t border-light-neutral-200 dark:border-dark-neutral-700 pt-4 mt-4">
        <button
        onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700 hover:text-light-primary-600 dark:hover:text-dark-primary-500 rounded-md transition-colors duration-200"
        >
          <HiOutlineLogout className="mr-3 h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
