// EmployerShell.jsx
import React from 'react';
import EmployerHeader from '../../components/employer/EmployerHeader';
import DashboardSidebar from '../../components/employer/DashboardSidebar';

const EmployerShell = ({ children }) => {
  return (
    <div className="pt-16 min-h-screen bg-light-background dark:bg-dark-primary-50">
      <EmployerHeader />

      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-4 text-light-text-primary dark:text-dark-text-primary bg-light-background dark:bg-dark-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployerShell;
