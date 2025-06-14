import React from "react";
import { HiUsers, HiCalendar, HiExclamation } from "react-icons/hi";

const JobHeader = ({ job, setShowModal, hasAlreadyApplied = false }) => {
  // Format job type
  const jobType = job.jobType ? job.jobType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : "-";
  
  // Check if job is expired
  const isExpired = job?.isExpired || job?.daysRemaining === 0;
  
  return (
    <div className={`flex flex-col p-6 bg-gradient-to-r ${isExpired ? 'from-gray-600 to-gray-500 dark:from-gray-700 dark:to-gray-600' : 'from-light-primary-900 to-light-primary-700 dark:from-dark-primary-800 dark:to-dark-primary-600'} rounded-lg shadow-lg relative`}>
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`h-16 w-16 rounded-full ${isExpired ? 'bg-white/5' : 'bg-white/10'} flex items-center justify-center text-white text-2xl font-bold`}>
            {job.employer?.companyName?.charAt(0) || 'C'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{job.title}</h1>
              {isExpired && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-200 border border-red-400/30">
                  <HiExclamation className="w-4 h-4 mr-1" />
                  Expired
                </span>
              )}
            </div>
            <div className="text-white/80">{job.employer?.companyName || "-"} • {job.location || "-"}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:ml-auto">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/80">
              <HiUsers className="w-5 h-5" />
              <span>{job.applicationsCount || 0} Applications</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <HiCalendar className="w-5 h-5" />
              <span>Posted {job.postedDate}</span>
            </div>
            {job.daysRemaining !== undefined && (
              <div className="flex items-center gap-2 text-white/80">
                <HiCalendar className="w-5 h-5" />
                <span>{isExpired ? 'Expired' : `${job.daysRemaining} days remaining`}</span>
              </div>
            )}
          </div>
          {isExpired ? (
            <button
              disabled
              className="px-8 py-3 bg-gray-500/50 text-gray-300 rounded-lg shadow-lg cursor-not-allowed font-bold text-lg tracking-wide border border-gray-400/30"
            >
              Job Expired
            </button>
          ) : hasAlreadyApplied ? (
            <button
              disabled
              className="px-8 py-3 bg-green-500/50 text-green-200 rounded-lg shadow-lg cursor-not-allowed font-bold text-lg tracking-wide border border-green-400/30"
            >
              Already Applied
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-white text-light-primary-700 dark:text-dark-primary-700 rounded-lg shadow-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-100 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className={`${isExpired ? 'bg-white/10' : 'bg-white/20'} text-white px-3 py-1 rounded-full text-sm`}>{jobType}</span>
        {job.tags && job.tags.map((tag, index) => (
          <span key={index} className={`${isExpired ? 'bg-white/5' : 'bg-white/10'} text-white px-3 py-1 rounded-full text-sm`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobHeader;