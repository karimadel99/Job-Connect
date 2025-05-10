import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLogOut, FiBell } from 'react-icons/fi';
import DarkModeToggle from '../components/DarkModeToggle';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background flex flex-col bg-light-primary-50 dark:bg-dark-background-primary">
      {/* Enhanced Topbar */}
      <header className="w-full h-16 bg-white dark:bg-dark-neutral-800 flex items-center justify-between px-6 shadow-sm border-b border-light-neutral-200 dark:border-dark-neutral-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 rounded-full transition-colors">
            <FiBell className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 rounded-lg transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main content with enhanced padding and max-width */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-6 space-y-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 