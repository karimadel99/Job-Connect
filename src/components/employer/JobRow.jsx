import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaEllipsisV, FaTimesCircle } from 'react-icons/fa';

const JobRow = ({ job }) => {
  const {
    id,
    title,
    status,
    applications,
    jobType,
    daysRemaining,
    postedDate
  } = job;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = status.toLowerCase() === 'active';
  const isExpired = status.toLowerCase() === 'expired';

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 p-4 border-b border-light-primary-100 dark:border-dark-primary-200 items-center hover:bg-light-primary-50 dark:hover:bg-dark-primary-100 transition-colors">
      {/* Job Info */}
      <div className="md:col-span-2">
        <h3 className="text-light-text-primary dark:text-dark-text-primary font-medium">{title}</h3>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
          {jobType} &bull; {daysRemaining} days remaining &bull; Posted {postedDate}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center my-2 md:my-0">
        {isActive && <FaCheckCircle className="text-green-500 mr-1" />}
        {isExpired && <FaTimesCircle className="text-red-500 mr-1" />}
        <span className={`text-sm font-medium ${isActive ? 'text-green-600 dark:text-green-400' : isExpired ? 'text-red-600 dark:text-red-400' : 'text-light-text-primary dark:text-dark-text-secondary'}`}>
          {status}
        </span>
      </div>

      {/* Applications count */}
      <div className="flex items-center my-2 md:my-0">
        <FaUsers className="text-light-text-secondary dark:text-dark-text-secondary mr-1" />
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">{applications} Applications</span>
      </div>

      {/* View Applications Button */}
      <div className="my-2 md:my-0">
        <button 
          onClick={() => navigate(`/employer/my-jobs/${id}/applications`)}
          className="px-4 py-2 text-sm font-medium rounded-md bg-light-primary-400 hover:bg-light-primary-500 text-light-background dark:bg-dark-primary-300 dark:hover:bg-dark-primary-400 dark:text-dark-text-primary transition-colors"
        >
          View Applications
        </button>
      </div>

      {/* Actions Button */}
      <div className="relative flex justify-end" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-light-primary-100 dark:hover:bg-dark-primary-200 text-light-text-secondary dark:text-dark-text-secondary"
        >
          <FaEllipsisV />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-light-background dark:bg-dark-primary-50 rounded-md shadow-lg z-10 border border-light-primary-100 dark:border-dark-primary-200">
            <ul className="py-1">
              <li>
                <button 
                  onClick={() => navigate(`/employer/edit-job/${id}`)}
                  className="block w-full text-left px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary-50 dark:hover:bg-dark-primary-100"
                >
                  Edit Job
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate(`/employer/job-details/${id}`)}
                  className="block w-full text-left px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary-50 dark:hover:bg-dark-primary-100"
                >
                  View Details
                </button>
              </li>
              <li>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-light-primary-50 dark:hover:bg-dark-primary-100"
                >
                  Delete Job
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRow;
