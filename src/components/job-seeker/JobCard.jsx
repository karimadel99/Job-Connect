import React from 'react';
import { Link } from 'react-router-dom';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';

const JobCard = ({ job, viewMode, isSaved, onToggleSave }) => {
  const getLogoIcon = (logo) => {
    const firstLetter = (logo && typeof logo === 'string' && logo.length > 0) ? logo.charAt(0).toUpperCase() : '?';
    return <span className="text-lg font-bold">{firstLetter}</span>;
  };

  return (
    <div className={`bg-white dark:bg-dark-neutral-800 rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${viewMode === 'grid' ? 'mb-6' : 'mb-4'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start">
          <div className={`w-12 h-12 flex-shrink-0 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300`}>
            {getLogoIcon(job.logo || job.title || '')}
          </div>
          <div className="flex-grow w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 transition-colors duration-200 pr-8 sm:pr-0">
                  {job.title || 'Untitled'}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  {(job.company || 'Unknown Company')} • {(job.location || 'Unknown Location')}
                </p>
              </div>
              <button 
                onClick={() => onToggleSave(job.id)}
                className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto text-light-neutral-400 dark:text-dark-neutral-400 hover:text-light-primary-500 dark:hover:text-dark-primary-500 transition-colors duration-200"
              >
                {isSaved ? <HiBookmark className="w-5 h-5" /> : <HiOutlineBookmark className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-neutral-100 text-light-text-primary dark:bg-dark-neutral-700 dark:text-dark-text-primary">
                {job.type || job.jobType || 'N/A'}
              </span>
              {job.remote && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-neutral-100 text-light-text-primary dark:bg-dark-neutral-700 dark:text-dark-text-primary">
                  Remote
                </span>
              )}
            </div>
            {viewMode === 'list' && (
              <div className="mt-3">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {(job.salary || job.minSalary || job.maxSalary || 'N/A')} • {(job.daysRemaining !== undefined ? job.daysRemaining : 'N/A')} Days Remaining
                </p>
              </div>
            )}
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center ${viewMode === 'grid' ? 'mt-4' : 'mt-3'}`}>
              {viewMode === 'grid' && (
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3 sm:mb-0">
                  {job.salary || job.minSalary || job.maxSalary || 'N/A'}
                </p>
              )}
              <Link
                to={`/jobseeker/job-details/${job.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-light-primary-600 hover:bg-light-primary-700 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-offset-dark-background transition-all duration-200"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;