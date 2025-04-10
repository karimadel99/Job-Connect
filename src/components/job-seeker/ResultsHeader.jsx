import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';

const ResultsHeader = ({ 
  jobCount, 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div className="p-6 border-b border-light-neutral-200 dark:border-dark-neutral-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-light-primary-100 text-light-primary-600 dark:bg-dark-primary-900 dark:text-dark-primary-400'
                  : 'text-light-neutral-500 dark:text-dark-neutral-400 hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
              aria-label="Grid View"
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-light-primary-100 text-light-primary-600 dark:bg-dark-primary-900 dark:text-dark-primary-400'
                  : 'text-light-neutral-500 dark:text-dark-neutral-400 hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
              aria-label="List View"
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {jobCount} jobs found
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-sm border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader; 