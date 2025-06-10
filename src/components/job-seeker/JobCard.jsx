import React from 'react';
import { Link } from 'react-router-dom';
import { HiBookmark, HiOutlineBookmark, HiClock, HiExclamation } from 'react-icons/hi';

const JobCard = ({ job, viewMode, isSaved, onToggleSave }) => {
  const getLogoIcon = (logo) => {
    const firstLetter = (logo && typeof logo === 'string' && logo.length > 0) ? logo.charAt(0).toUpperCase() : '?';
    return <span className="text-lg font-bold">{firstLetter}</span>;
  };

  // Ensure isSaved is treated as a boolean
  const isJobSaved = Boolean(isSaved || job.saved || job.isSaved);
  
  // Check if job is expired
  const isExpired = job.daysRemaining === 0 || job.isExpired;

  return (
    <div className={`bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:scale-[1.02] border border-light-neutral-100 dark:border-dark-neutral-700 ${viewMode === 'grid' ? 'mb-6' : 'mb-4'} ${isExpired ? 'opacity-75' : ''}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start">
          <div className={`w-12 h-12 flex-shrink-0 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex items-center justify-center ${isExpired ? 'bg-light-neutral-100 text-light-neutral-500 dark:bg-dark-neutral-700 dark:text-dark-neutral-400' : 'bg-light-primary-50 text-light-primary-600 dark:bg-dark-primary-50 dark:text-dark-primary-400'}`}>
            {getLogoIcon(job.logo || job.title || '')}
          </div>
          <div className="flex-grow w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-medium ${isExpired ? 'text-light-text-secondary dark:text-dark-text-secondary' : 'text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-400'} transition-colors duration-200 pr-8 sm:pr-0`}>
                    {job.title || 'Untitled'}
                  </h3>
                  {isExpired && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <HiExclamation className="w-3 h-3 mr-1" />
                      Expired
                    </span>
                  )}
                </div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  {(job.company || job.employer?.companyName || job.employerName ||'Unknown Company')} • {(job.location || 'Unknown Location')}
                </p>
              </div>
              <button 
                onClick={() => onToggleSave(job.id)}
                className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto text-light-neutral-400 dark:text-dark-neutral-400 hover:text-light-primary-500 dark:hover:text-dark-primary-500 transition-colors duration-200"
                aria-label={isJobSaved ? "Remove from favorites" : "Add to favorites"}
              >
                {isJobSaved ? 
                  <HiBookmark className="w-5 h-5 text-light-primary-500 dark:text-dark-primary-400" /> : 
                  <HiOutlineBookmark className="w-5 h-5" />
                }
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isExpired ? 'bg-light-neutral-100 text-light-neutral-600 dark:bg-dark-neutral-700 dark:text-dark-neutral-300' : 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-100 dark:text-white'}`}>
                {job.type || job.jobType || 'N/A'}
              </span>
              {job.remote && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isExpired ? 'bg-light-neutral-100 text-light-neutral-600 dark:bg-dark-neutral-700 dark:text-dark-neutral-300' : 'bg-light-accent-primary/10 text-light-accent-primary dark:bg-dark-accent-primary/20 dark:text-dark-accent-primary'}`}>
                  Remote
                </span>
              )}
              {job.maxSalary && job.minSalary && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isExpired ? 'bg-light-neutral-100 text-light-neutral-600 dark:bg-dark-neutral-700 dark:text-dark-neutral-300' : 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-100 dark:text-white'}`}>
                  {job.minSalary} - {job.maxSalary} $ /{job.salaryType}
                </span>
              )}
            </div>
            {viewMode === 'list' && (
              <div className="mt-3">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <span className={`font-medium ${isExpired ? 'text-light-text-secondary dark:text-dark-text-secondary' : 'text-light-primary-600 dark:text-dark-primary-400'}`}>{(job.salary || job.minSalary || job.maxSalary || 'N/A')}</span> • {isExpired ? 'Expired' : `${(job.daysRemaining !== undefined ? job.daysRemaining : 'N/A')} Days Remaining`}
                </p>
              </div>
            )}
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center ${viewMode === 'grid' ? 'mt-4' : 'mt-3'}`}>
              {viewMode === 'grid' && (
                <p className={`text-sm font-medium flex items-center gap-2 ${isExpired ? 'text-light-text-secondary dark:text-dark-text-secondary' : 'text-light-primary-600 dark:text-dark-primary-400'} mb-3 sm:mb-0`}>
                  <HiClock className="w-4 h-4" /> {job.postedDate || job.createdAt || 'N/A'}
                </p>
              )}
              {isExpired ? (
                <button
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 text-sm font-medium rounded-lg shadow-sm text-light-neutral-500 dark:text-dark-neutral-400 bg-light-neutral-100 dark:bg-dark-neutral-700 cursor-not-allowed transition-all duration-200"
                >
                  Expired
                </button>
              ) : (
                <Link
                  to={`/jobseeker/job-details/${job.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-light-text-inverse bg-light-primary-600 hover:bg-light-primary-700 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-offset-dark-background-primary transition-all duration-200"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;