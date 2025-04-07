// src/components/employer/OverviewStats.jsx
import React from 'react';
import { FaBriefcase, FaUsers } from 'react-icons/fa';

const OverviewStats = ({ jobsCount, candidatesCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Recently Posted Jobs Card */}
      <div className="p-4 bg-gradient-to-r from-light-primary-300 to-light-primary-400 dark:from-dark-primary-300 dark:to-dark-primary-400 text-light-background dark:text-dark-text-primary shadow-lg rounded">
        <div className="flex items-center">
          <div className="mr-4 text-3xl">
            <FaBriefcase />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Recently Posted Jobs</h2>
            <p className="text-2xl font-bold">{jobsCount}</p>
          </div>
        </div>
      </div>

      {/* Total Candidates Card */}
      <div className="p-4 bg-gradient-to-r from-light-primary-400 to-light-primary-500 dark:from-dark-primary-400 dark:to-dark-primary-500 text-light-background dark:text-dark-text-primary shadow-lg rounded">
        <div className="flex items-center">
          <div className="mr-4 text-3xl">
            <FaUsers />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Candidates</h2>
            <p className="text-2xl font-bold">{candidatesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
