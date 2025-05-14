import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaEllipsisV, FaTimesCircle } from 'react-icons/fa';
import { deleteJob } from '../../api/employerApi';
import { toast } from 'react-hot-toast';

const JobRow = ({ job, onDelete }) => {
  const {
    id,
    title,
    status,
    applicationsCount,
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

  const handleDeleteJob = async () => {
    try {
      const result = await deleteJob(id);
      if (result.success) {
        toast.success('Job deleted successfully');
        if (typeof onDelete === 'function') {
          onDelete(id); // Notify parent to remove the job from list
        }
      } else {
        toast.error(result.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Add this function to handle navigation
  const handleViewApplications = () => {
    navigate(`/employer/my-jobs/${id}/applications`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 p-4 border-b border-light-neutral-200 dark:border-dark-neutral-700 items-center hover:bg-light-primary-50 dark:hover:bg-dark-primary-100/20 transition-colors">
      {/* Job Info */}
      <div className="md:col-span-2">
        <h3 className="text-light-text-primary dark:text-dark-text-primary font-medium">{title}</h3>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
          {jobType} &bull; {daysRemaining > 0 ? <span className="font-medium">{daysRemaining} days remaining</span> : <span className="text-light-error-DEFAULT dark:text-dark-error-DEFAULT">Expired</span>} &bull; Posted {postedDate}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center my-2 md:my-0">
        {isActive && <FaCheckCircle className="text-light-success-DEFAULT dark:text-dark-success-DEFAULT mr-1" />}
        {isExpired && <FaTimesCircle className="text-light-error-DEFAULT dark:text-dark-error-DEFAULT mr-1" />}
        <span className={`text-sm font-medium ${
          isActive 
            ? 'text-light-success-DEFAULT dark:text-dark-success-DEFAULT' 
            : isExpired 
              ? 'text-light-error-DEFAULT dark:text-dark-error-DEFAULT' 
              : 'text-light-text-primary dark:text-dark-text-secondary'
        }`}>
          {status}
        </span>
      </div>

      {/* Applications count */}
      <div className="flex items-center my-2 md:my-0">
        <FaUsers className="text-light-primary-500 dark:text-dark-primary-400 mr-1" />
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
          <span className="font-medium">{applicationsCount}</span> {applicationsCount === 1 ? 'Application' : 'Applications'}
        </span>
      </div>

      {/* View Applications Button */}
      <div className="my-2 md:my-0">
        <button 
          onClick={handleViewApplications}
          className="px-4 py-2 text-sm font-medium rounded-md bg-light-primary-600 hover:bg-light-primary-700 text-light-text-inverse dark:bg-dark-primary-600 dark:hover:bg-dark-primary-700 dark:text-dark-text-inverse transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
        >
          View Applications
        </button>
      </div>

      {/* Actions Button */}
      <div className="relative flex justify-end" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary transition-colors"
          aria-label="Job actions menu"
        >
          <FaEllipsisV />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-light-background-primary dark:bg-dark-background-secondary rounded-md shadow-lg z-10 border border-light-neutral-200 dark:border-dark-neutral-700">
            <ul className="py-1">
              <li>
                <button 
                  onClick={() => navigate(`/employer/edit-job/${id}`)}
                  className="block w-full text-left px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors"
                >
                  Edit Job
                </button>
              </li> 
              <li>
                <button 
                  onClick={handleDeleteJob}
                  className="block w-full text-left px-4 py-2 text-sm text-light-error-DEFAULT dark:text-dark-error-DEFAULT hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors"
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
