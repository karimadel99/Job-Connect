// src/components/employer/RecentJobs.jsx
import React, { useState, useEffect } from 'react';
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
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
          Recently Posted Jobs
        </h2>
        <NavLink
          className="text-sm font-medium text-light-primary-400 dark:text-dark-primary-400 hover:underline"
          to="/employer/my-jobs"
        >
          View All
        </NavLink>
      </div>

      <div className="bg-light-background dark:bg-dark-primary-50 shadow rounded">
        {jobList.length > 0 ? (
          jobList.map((job) => (
            <JobRow key={job.id} job={job} onDelete={handleDelete} />
          ))
        ) : (
          <p className="p-4 text-center text-light-text-secondary dark:text-dark-text-secondary">
            No recent jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
