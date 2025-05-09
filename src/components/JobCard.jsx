import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="p-4 rounded-lg shadow-md bg-light-primary-100 text-light-text-primary dark:bg-dark-primary-200 dark:text-dark-text-primary hover:scale-[102%] transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{job.type}</span>
        <span className="text-sm font-medium">{job.location}</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={job.companyLogo}
          alt={`${job.title} logo`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <h3 className="text-lg font-bold">{job.title}</h3>
      </div>
      <p className="text-sm mb-4">{job.category}</p>
      <p className="text-sm font-semibold mb-4">{job.salary}</p>
      <button className="px-4 py-2 rounded-lg font-medium bg-light-primary-400 text-light-background hover:bg-light-primary-500 dark:bg-dark-primary-300 dark:text-dark-text-primary dark:hover:bg-dark-primary-400 transition-all">
        Apply Now
      </button>
    </div>
  );
}