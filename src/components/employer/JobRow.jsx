import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiUsers, FiMoreVertical, FiXCircle, FiEdit3, FiTrash2, FiEye, FiClock, FiCalendar, FiBriefcase } from 'react-icons/fi';
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
    postedDate,
    expirationDate
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

  // Determine if job is expired based on daysRemaining or expirationDate
  const isExpired = daysRemaining <= 0 || 
                   (expirationDate && new Date(expirationDate) < new Date());
  const isActive = !isExpired;

  // Determine display status
  const displayStatus = isExpired ? 'Expired' : 'Active';

  // Helper function to format job type
  const formatJobType = (type) => {
    const typeMap = {
      'fullTime': 'Full Time',
      'partTime': 'Part Time',
      'contract': 'Contract',
      'internship': 'Internship',
      'temporary': 'Temporary'
    };
    return typeMap[type] || type;
  };

  const handleDeleteJob = async () => {
    try {
      const result = await deleteJob(id);
      if (result.success) {
        toast.success('Job deleted successfully');
        if (typeof onDelete === 'function') {
          onDelete(id);
        }
      } else {
        toast.error(result.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('An unexpected error occurred');
    }
    setIsMenuOpen(false);
  };

  const handleViewApplications = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/employer/my-jobs/${id}/applications`);
  };

  const handleEditJob = () => {
    navigate(`/employer/edit-job/${id}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-600">
      <div className="flex flex-col gap-4">
        {/* Job Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FiBriefcase className="w-4 h-4" />
              {formatJobType(jobType)}
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              Posted {postedDate}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              {daysRemaining > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {daysRemaining} days remaining
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Expired
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Status and Metrics - Responsive Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Status and Applications Count */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Status */}
            <div className="flex items-center gap-2">
              {isActive && <FiCheckCircle className="w-4 h-4 text-green-500" />}
              {isExpired && <FiXCircle className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
              }`}>
                {displayStatus}
              </span>
            </div>

            {/* Applications count */}
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
              <FiUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {applicationsCount} {applicationsCount === 1 ? 'Application' : 'Applications'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <button 
              onClick={handleViewApplications}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <FiEye className="w-4 h-4" />
              <span className="hidden xs:inline">View Applications</span>
              <span className="xs:hidden">View</span>
            </button>

            {/* More Actions Menu */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Job actions menu"
              >
                <FiMoreVertical className="w-4 h-4" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 py-1">
                  <button 
                    onClick={handleEditJob}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    Edit Job
                  </button>
                  <button 
                    onClick={handleDeleteJob}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete Job
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRow;
