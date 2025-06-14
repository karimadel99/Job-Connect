import React from 'react';
import { HiOutlineSearch, HiOutlineLocationMarker, HiChevronDown, HiChevronUp, HiFilter } from 'react-icons/hi';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  locationQuery, 
  setLocationQuery,
  isAdvancedFilterOpen,
  setIsAdvancedFilterOpen,
  handleSearch 
}) => {
  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Job Title/Keyword Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400 group-focus-within:text-light-primary-500 dark:group-focus-within:text-dark-primary-400 transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="Job title, keywords, company..."
            className="block w-full pl-12 pr-4 py-3 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-all duration-200 hover:border-light-primary-300 dark:hover:border-dark-primary-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search for jobs by title, keywords, or company name"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-light-neutral-400 hover:text-light-text-primary dark:text-dark-neutral-400 dark:hover:text-dark-text-primary transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Location Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOutlineLocationMarker className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400 group-focus-within:text-light-primary-500 dark:group-focus-within:text-dark-primary-400 transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="City, state, or remote"
            className="block w-full pl-12 pr-4 py-3 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-all duration-200 hover:border-light-primary-300 dark:hover:border-dark-primary-600"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            aria-label="Search by location"
          />
          {locationQuery && (
            <button
              type="button"
              onClick={() => setLocationQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-light-neutral-400 hover:text-light-text-primary dark:text-dark-neutral-400 dark:hover:text-dark-text-primary transition-colors duration-200"
              aria-label="Clear location"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search and Filter Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Advanced Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
            className={`inline-flex items-center justify-center px-4 py-3 border font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-offset-dark-background transition-all duration-200 shadow-sm hover:shadow-md ${
              isAdvancedFilterOpen
                ? 'bg-light-primary-50 dark:bg-dark-primary-900/30 border-light-primary-200 dark:border-dark-primary-700 text-light-primary-700 dark:text-dark-primary-300'
                : 'bg-white dark:bg-dark-neutral-700 border-light-neutral-200 dark:border-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-600'
            }`}
            aria-label={isAdvancedFilterOpen ? 'Hide advanced filters' : 'Show advanced filters'}
            aria-expanded={isAdvancedFilterOpen}
          >
            <HiFilter className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {isAdvancedFilterOpen ? (
              <HiChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <HiChevronDown className="ml-2 h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Search Suggestions (could be enhanced with real data) */}
      {(searchQuery || locationQuery) && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Popular searches:</span>
          {['Software Engineer', 'Marketing Manager', 'Data Analyst', 'Remote', 'New York', 'San Francisco'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                if (['Remote', 'New York', 'San Francisco'].includes(suggestion)) {
                  setLocationQuery(suggestion);
                } else {
                  setSearchQuery(suggestion);
                }
              }}
              className="px-2 py-1 text-xs bg-light-neutral-100 dark:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-primary-100 dark:hover:bg-dark-primary-900/30 hover:text-light-primary-700 dark:hover:text-dark-primary-300 transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;