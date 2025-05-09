import React from "react";
const JobHeader = ({ job, setShowModal }) => {
  // Compose salary string

  // Format job type
  const jobType = job.jobType ? job.jobType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : "-";
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 bg-gradient-to-r from-primary-900 to-primary-700 rounded-lg shadow-lg relative">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img src={`/company-logos/${job.logo || 'default'}.png`} alt={job.company || job.title} className="h-16 w-16 rounded-full border-2 border-white shadow" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{job.title}</h1>
          <div className="text-light-text-secondary dark:text-dark-text-secondary text-base">{job.location || "-"}</div>
          <div className="flex gap-4 mt-2">
            <span className="bg-primary-600 text-white px-3 py-1 rounded text-xs font-semibold">{jobType}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 md:mt-0 md:ml-auto bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-lg shadow-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        Apply Now
      </button>
    </div>
  );
};
export default JobHeader;