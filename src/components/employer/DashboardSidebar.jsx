// src/components/employer/DashboardSidebar.jsx
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FiBarChart2, FiPlus, FiBriefcase, FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const DashboardSidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      to: "/employer/overview",
      label: "Overview",
      icon: FiBarChart2
    },
    {
      to: "/employer/post-job",
      label: "Post a Job",
      icon: FiPlus
    },
    {
      to: "/employer/my-jobs",
      label: "My Jobs",
      icon: FiBriefcase
    },
    {
      to: "/employer/settings",
      label: "Settings",
      icon: FiSettings
    }
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen shadow-sm">
      <div className="flex flex-col h-full p-4 pt-10">
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
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
    </aside>
  );
};

export default DashboardSidebar;
