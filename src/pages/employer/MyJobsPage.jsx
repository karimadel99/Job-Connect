// src/pages/employer/MyJobsPage.jsx
import React, { useEffect, useState } from 'react';
import JobRow from '../../components/employer/JobRow'; 
import jobsData from '../../data/recentJobsData.json';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; //  how many jobs to show per page

  useEffect(() => {
    setJobs(jobsData);
  }, [filterType]);

  // 1) Filter the jobs based on filterType
  const filteredJobs = jobs.filter((job) => {
    if (filterType === 'all') return true;
    if (filterType === 'active') return job.status.toLowerCase() === 'active';
    if (filterType === 'expired') return job.status.toLowerCase() === 'expired';
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

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-4 bg-light-background dark:bg-dark-background p-3 rounded-lg">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200
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
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200
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
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200
            ${filterType === 'expired' 
              ? 'bg-light-primary-500 dark:bg-dark-primary-600 text-white' 
              : 'bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600'
            }
          `}
        >
          Expired
        </button>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 p-4 border-b border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-background">
        <div className="md:col-span-2 text-light-text-secondary dark:text-dark-text-secondary font-medium">Job Title</div>
        <div className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Status</div>
        <div className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Applications</div>
        <div className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Actions</div>
        <div className="text-right"></div>
      </div>

      {/* Jobs List */}
      <div className="bg-light-background dark:bg-dark-background shadow rounded">
        {paginatedJobs.map((job) => (
          <JobRow key={job.id} job={job} />
        ))}

        {/* If no jobs match the filter */}
        {filteredJobs.length === 0 && (
          <div className="p-4 text-center text-light-text-secondary dark:text-dark-text-secondary">
            No jobs found.
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
                      : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-700'
                  }
                `}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
