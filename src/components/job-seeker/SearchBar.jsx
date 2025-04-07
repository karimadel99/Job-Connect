import React from 'react';
import { HiOutlineSearch, HiOutlineLocationMarker, HiChevronDown, HiChevronUp } from 'react-icons/hi';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Job title, Keyword..."
            className="block w-full pl-10 pr-3 py-2.5 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineLocationMarker className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Location"
            className="block w-full pl-10 pr-3 py-2.5 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors duration-200"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-light-neutral-200 dark:border-dark-neutral-700 text-sm font-medium rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-offset-dark-background transition-colors duration-200"
          >
            <span>Advanced Filter</span>
            {isAdvancedFilterOpen ? (
              <HiChevronUp className="ml-2 h-5 w-5" />
            ) : (
              <HiChevronDown className="ml-2 h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;