// src/components/employer/OverviewStats.jsx
import React from 'react';
import { FiBriefcase, FiUsers, FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, color, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden group">
      {/* Gradient overlay */}
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <div className={`p-4 rounded-xl ${color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <FiTrendingUp className="w-3 h-3" />
          <span className="font-semibold">Active</span>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className={`h-1 ${color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
};

const OverviewStats = ({ jobsCount, candidatesCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatCard
        title="Recently Posted Jobs"
        value={jobsCount || 0}
        icon={FiBriefcase}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
        description="Jobs you've posted recently"
      />
      
      <StatCard
        title="Total Candidates"
        value={candidatesCount || 0}
        icon={FiUsers}
        color="bg-gradient-to-br from-green-500 to-green-600"
        description="Candidates who applied to your jobs"
      />
    </div>
  );
};

export default OverviewStats;
