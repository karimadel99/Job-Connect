import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { HiSortAscending } from 'react-icons/hi';

const ResultsHeader = ({ 
  jobCount, 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy,
  searchQuery,
  setSearchQuery
}) => {
  const sortOptions = [
    { value: 'latest', label: 'Latest First', icon: '📅' },
    { value: 'oldest', label: 'Oldest First', icon: '📆' },
    { value: 'salary_high', label: 'Salary: High to Low', icon: '💰' },
    { value: 'salary_low', label: 'Salary: Low to High', icon: '💵' },
    { value: 'title', label: 'Alphabetical (A-Z)', icon: '🔤' },
  ];

  return (
    <div className="p-6 border-b border-light-neutral-200 dark:border-dark-neutral-700 bg-gradient-to-r from-light-background-primary to-light-background-secondary dark:from-dark-background-secondary dark:to-dark-background-tertiary">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between sm:justify-start space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-light-neutral-100 dark:bg-dark-neutral-700 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-dark-neutral-600 text-light-primary-600 dark:text-dark-primary-400 shadow-sm'
                  : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:bg-white/50 dark:hover:bg-dark-neutral-600/50'
              }`}
              aria-label="Grid View"
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-dark-neutral-600 text-light-primary-600 dark:text-dark-primary-400 shadow-sm'
                  : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:bg-white/50 dark:hover:bg-dark-neutral-600/50'
              }`}
              aria-label="List View"
              title="List View"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>

          {/* Job Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{jobCount.toLocaleString()}</span> 
              {jobCount === 1 ? ' job found' : ' jobs found'}
            </span>
            {jobCount > 0 && (
              <div className="hidden sm:flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Quick Search (if provided) */}
          {setSearchQuery && (
            <div className="hidden md:block relative w-48 lg:w-64">
              <input
                type="text"
                placeholder="Quick search..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-3 pr-4 py-2 text-sm border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors duration-200"
              />
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <HiSortAscending className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <select
              className="block w-full min-w-[140px] pl-3 pr-8 py-2 text-sm border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors duration-200 cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort jobs by"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Additional Info Row */}
      {jobCount > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            Showing results in <span className="font-medium capitalize">{viewMode}</span> view, 
            sorted by <span className="font-medium">{sortOptions.find(opt => opt.value === sortBy)?.label.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Active jobs
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Expired jobs
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsHeader; 