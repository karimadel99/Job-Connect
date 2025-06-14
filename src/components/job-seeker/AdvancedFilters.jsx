import React from 'react';

const AdvancedFilters = ({
  isOpen,
  selectedFilters,
  handleFilterChange,
  experienceOptions,
  salaryRanges,
  jobTypes,
  workPlace,
  educationLevels
}) => {
  if (!isOpen) return null;

  // Ensure selectedFilters has all required properties with default values
  const filters = {
    jobType: [],
    workplace: [],
    education: [],
    experience: '',
    salary: '',
    ...selectedFilters
  };

  return (
    <div className="relative z-50 mt-6">
      <div className="absolute left-0 right-0 bg-white dark:bg-dark-neutral-800 rounded-xl shadow-2xl border border-light-neutral-200 dark:border-dark-neutral-700 p-6 animate-slide-down">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Advanced Filters
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Refine your job search with detailed criteria
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                Experience Level
              </h4>
              {filters.experience && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  1 selected
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {experienceOptions.map((exp) => (
                <label
                  key={exp}
                  className="flex items-center group cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="experience"
                    className="h-4 w-4 text-light-primary-600 dark:text-dark-primary-400 border-light-neutral-300 dark:border-dark-neutral-600 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:ring-2"
                    checked={filters.experience === exp}
                    onChange={() => handleFilterChange('experience', exp)}
                  />
                  <span className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200">
                    {exp}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                Salary Range
              </h4>
              {filters.salary && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  1 selected
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {salaryRanges.map((range) => (
                <label
                  key={range}
                  className="flex items-center group cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="salary"
                    className="h-4 w-4 text-light-primary-600 dark:text-dark-primary-400 border-light-neutral-300 dark:border-dark-neutral-600 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:ring-2"
                    checked={filters.salary === range}
                    onChange={() => handleFilterChange('salary', range)}
                  />
                  <span className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200">
                    {range}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                Job Type
              </h4>
              {filters.jobType.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  {filters.jobType.length} selected
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {jobTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center group cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-light-primary-600 dark:text-dark-primary-400 border-light-neutral-300 dark:border-dark-neutral-600 rounded focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:ring-2"
                    checked={type === 'All' ? filters.jobType.length === 0 : filters.jobType.includes(type)}
                    onChange={() => handleFilterChange('jobType', type)}
                  />
                  <span className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Place */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                Work Location
              </h4>
              {filters.workplace.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  {filters.workplace.length} selected
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {workPlace.map((place) => (
                <label
                  key={place}
                  className="flex items-center group cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-light-primary-600 dark:text-dark-primary-400 border-light-neutral-300 dark:border-dark-neutral-600 rounded focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:ring-2"
                    checked={place === 'All' ? filters.workplace.length === 0 : filters.workplace.includes(place)}
                    onChange={() => handleFilterChange('workplace', place)}
                  />
                  <span className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200">
                    {place}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                Education Level
              </h4>
              {filters.education.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  {filters.education.length} selected
                </span>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {educationLevels.map((level) => (
                <label
                  key={level}
                  className="flex items-center group cursor-pointer hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-light-primary-600 dark:text-dark-primary-400 border-light-neutral-300 dark:border-dark-neutral-600 rounded focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:ring-2"
                    checked={level === 'All' ? filters.education.length === 0 : filters.education.includes(level)}
                    onChange={() => handleFilterChange('education', level)}
                  />
                  <span className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with quick actions */}
        <div className="mt-6 pt-4 border-t border-light-neutral-200 dark:border-dark-neutral-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Tip: Select multiple options to broaden your search results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // Clear all filters
                  handleFilterChange('experience', '');
                  handleFilterChange('salary', '');
                  handleFilterChange('jobType', 'All');
                  handleFilterChange('workplace', 'All');
                  handleFilterChange('education', 'All');
                }}
                className="px-3 py-1.5 text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;