// EmployerShell.jsx
import React from 'react';
import EmployerHeader from '../../components/employer/EmployerHeader';
import DashboardSidebar from '../../components/employer/DashboardSidebar';
import '../../styles/employer.css';

const EmployerShell = ({ children }) => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <EmployerHeader />

      <div className="flex min-h-screen relative">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 relative z-0 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerShell;
