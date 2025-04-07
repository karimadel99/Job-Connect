import React from 'react';

const AdvancedFilters = ({
  isOpen,
  selectedFilters,
  handleFilterChange,
  experienceOptions,
  salaryRanges,
  jobTypes,
  educationLevels
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-4 w-2/3 bg-white dark:bg-dark-neutral-800 rounded-xl shadow-xl border border-light-neutral-200 dark:border-dark-neutral-700 p-4 sm:p-6 animate-slide-down">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Experience */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-base font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Experience
          </h4>
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {experienceOptions.map((exp) => (
              <div key={exp} className="flex items-center group">
                <input
                  type="radio"
                  id={`exp-${exp}`}
                  name="experience"
                  className="form-radio"
                  checked={selectedFilters.experience === exp}
                  onChange={() => handleFilterChange('experience', exp)}
                />
                <label
                  htmlFor={`exp-${exp}`}
                  className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary cursor-pointer group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200"
                >
                  {exp}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-base font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Salary Range
          </h4>
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {salaryRanges.map((range) => (
              <div key={range} className="flex items-center group">
                <input
                  type="radio"
                  id={`salary-${range}`}
                  name="salary"
                  className="form-radio"
                  checked={selectedFilters.salary === range}
                  onChange={() => handleFilterChange('salary', range)}
                />
                <label
                  htmlFor={`salary-${range}`}
                  className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary cursor-pointer group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200"
                >
                  {range}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-base font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Job Type
          </h4>
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center group">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  className="form-checkbox"
                  checked={type === 'All' ? selectedFilters.jobType.length === 0 : selectedFilters.jobType.includes(type)}
                  onChange={() => handleFilterChange('jobType', type)}
                />
                <label
                  htmlFor={`type-${type}`}
                  className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary cursor-pointer group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-base font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Education Level
          </h4>
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {educationLevels.map((level) => (
              <div key={level} className="flex items-center group">
                <input
                  type="checkbox"
                  id={`edu-${level}`}
                  className="form-checkbox"
                  checked={level === 'All' ? selectedFilters.education.length === 0 : selectedFilters.education.includes(level)}
                  onChange={() => handleFilterChange('education', level)}
                />
                <label
                  htmlFor={`edu-${level}`}
                  className="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary cursor-pointer group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;