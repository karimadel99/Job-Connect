// src/pages/employer/MyJobsPage.jsx
import React, { useEffect, useState } from 'react';
import JobRow from '../../components/employer/JobRow'; 
import { getAllJobs } from '../../api/employerApi'; // <-- Import your API function
import Loader from '../../components/Loader';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 5; //  how many jobs to show per page

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      const result = await getAllJobs();
      if (result.success) {
        setJobs(result.data);
      } else {
        setError(result.error || 'Failed to fetch jobs');
      }
      setLoading(false);
    };
    fetchJobs();
  }, []); // Remove filterType dependency - filtering is done client-side

  // Handle job deletion
  const handleDeleteJob = (deletedJobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== deletedJobId));
  };

  // 1) Filter the jobs based on filterType
  const filteredJobs = jobs.filter((job) => {
    if (filterType === 'all') return true;
    
    // Determine if job is expired based on daysRemaining or expirationDate
    const isExpired = job.daysRemaining <= 0 || 
                     (job.expirationDate && new Date(job.expirationDate) < new Date());
    
    if (filterType === 'active') return !isExpired;
    if (filterType === 'expired') return isExpired;
    
    return true;
  });

  // 2) Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Whenever we change the filter, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
        My Jobs ({filteredJobs.length})
      </h2>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex items-center justify-center min-h-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-center">
            <Loader />
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your jobs...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center min-h-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Failed to load jobs
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Show content only when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 bg-light-background dark:bg-dark-background p-3 rounded-lg">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap
                ${filterType === 'all' 
                  ? 'bg-light-primary-500 dark:bg-dark-primary-600 text-white' 
                  : 'bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600'
                }
              `}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilterType('active')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap
                ${filterType === 'active' 
                  ? 'bg-light-primary-500 dark:bg-dark-primary-600 text-white' 
                  : 'bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600'
                }
              `}
            >
              Active
            </button>
            <button
              onClick={() => setFilterType('expired')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap
                ${filterType === 'expired' 
                  ? 'bg-light-primary-500 dark:bg-dark-primary-600 text-white' 
                  : 'bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600'
                }
              `}
            >
              Expired
            </button>
          </div>


          {/* Jobs List */}
          <div className="bg-light-background dark:bg-dark-background shadow rounded">
            {paginatedJobs.map((job) => (
              <JobRow key={job.id} job={job} onDelete={handleDeleteJob} />
            ))}

            {/* If no jobs match the filter */}
            {filteredJobs.length === 0 && (
              <div className="flex items-center justify-center min-h-32 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM8 14v.01M12 14v.01M16 14v.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filterType === 'all' 
                      ? "You haven't posted any jobs yet." 
                      : `No ${filterType} jobs found.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`
                      w-10 h-10 flex items-center justify-center font-medium transition-colors duration-200
                      ${
                        currentPage === pageNumber
                          ? 'bg-light-primary-500 dark:bg-dark-primary-600 text-white rounded-full'
                          : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-700 rounded-lg'
                      }
                    `}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyJobsPage;
