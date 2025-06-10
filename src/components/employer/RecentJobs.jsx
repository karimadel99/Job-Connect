// src/components/employer/RecentJobs.jsx
import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiArrowRight } from 'react-icons/fi';
import JobRow from './JobRow';
import { NavLink } from 'react-router-dom';

const RecentJobs = ({ jobs }) => {
  const [jobList, setJobList] = useState(jobs);

  // Sync internal state when jobs prop changes
  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  // Handle job deletion
  const handleDelete = (deletedId) => {
    setJobList((prevJobs) => prevJobs.filter(job => job.id !== deletedId));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-200 dark:border-gray-700 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
            <FiBriefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recently Posted Jobs
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage and track your job postings
            </p>
          </div>
        </div>
        <NavLink
          to="/employer/my-jobs"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 whitespace-nowrap"
        >
          View All
          <FiArrowRight className="w-4 h-4" />
        </NavLink>
      </div>

      {/* Content */}
      <div className="p-6">
        {jobList.length > 0 ? (
          <div className="space-y-4">
            {jobList.map((job) => (
              <JobRow key={job.id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiBriefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No jobs posted yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by posting your first job to attract talented candidates.
            </p>
            <NavLink
              to="/employer/post-job"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiBriefcase className="w-4 h-4" />
              Post Your First Job
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
