import React from 'react';
import { createPortal } from 'react-dom';
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSave,
  FaUserCheck,
  FaFileAlt,
  FaDownload,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
  FaExclamationTriangle,
  FaUser,
  FaTimes,
  FaUserTimes,
} from 'react-icons/fa';
import { format, parseISO, isValid } from 'date-fns';
import { hireCandidate, rejectCandidate } from '../api/employerApi';
import { toast } from 'react-hot-toast';

const CandidateModal = ({ candidate, onClose, jobId, onCandidateAction }) => {
  const [actionLoading, setActionLoading] = React.useState({ hire: false, reject: false });

  if (!candidate) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMM d, yyyy');
      }
      return dateString;
    } catch (error) {
      return dateString;
    }
  };

  const handleDownloadResume = (resumePath, resumeName) => {
    window.open(resumePath, '_blank');
  };

  const handleDownloadAllResumes = () => {
    if (candidate.resumes && candidate.resumes.length > 0) {
      candidate.resumes.forEach((resume, index) => {
        setTimeout(() => {
          window.open(resume.resumePath, '_blank');
        }, index * 500);
      });
    } else if (candidate.resumeBase64) {
      window.open(candidate.resumeBase64, '_blank');
    }
  };

  const handleHireCandidate = async () => {
    if (!jobId || !candidate.id) {
      toast.error('Missing required information to hire candidate');
      return;
    }

    setActionLoading(prev => ({ ...prev, hire: true }));
    
    try {
      const result = await hireCandidate(jobId, candidate.id);
      
      if (result.success) {
        toast.success(`${candidate.name} has been hired successfully!`);
        if (onCandidateAction) {
          onCandidateAction('hired', candidate.id);
        }
        onClose();
      } else {
        toast.error(result.error || 'Failed to hire candidate');
      }
    } catch (error) {
      console.error('Error hiring candidate:', error);
      toast.error('An unexpected error occurred while hiring the candidate');
    } finally {
      setActionLoading(prev => ({ ...prev, hire: false }));
    }
  };

  const handleRejectCandidate = async () => {
    if (!jobId || !candidate.id) {
      toast.error('Missing required information to reject candidate');
      return;
    }

    setActionLoading(prev => ({ ...prev, reject: true }));
    
    try {
      const result = await rejectCandidate(jobId, candidate.id);
      
      if (result.success) {
        toast.success(`${candidate.name} has been rejected`);
        if (onCandidateAction) {
          onCandidateAction('rejected', candidate.id);
        }
        onClose();
      } else {
        toast.error(result.error || 'Failed to reject candidate');
      }
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      toast.error('An unexpected error occurred while rejecting the candidate');
    } finally {
      setActionLoading(prev => ({ ...prev, reject: false }));
    }
  };

  const modalContent = (
    <>
      <style>
        {`
          .candidate-modal-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 999999 !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 1rem !important;
          }
        `}
      </style>
      <div
        className="candidate-modal-overlay"
        onClick={handleBackgroundClick}
      >
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <FaUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {candidate.name}
                </h2>
                <div className="flex items-center gap-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    {candidate.currentOrDesiredJob || 'Job Seeker'}
                  </p>
                  {candidate.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      candidate.status.toLowerCase() === 'accepted' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : candidate.status.toLowerCase() === 'rejected'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {candidate.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Only show hire/reject buttons if candidate is not already accepted or rejected */}
              {(!candidate.status || (candidate.status.toLowerCase() !== 'accepted' && candidate.status.toLowerCase() !== 'rejected')) ? (
                <>
                  <button 
                    onClick={handleHireCandidate}
                    disabled={actionLoading.hire || actionLoading.reject}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    {actionLoading.hire ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaUserCheck className="w-4 h-4" />
                    )}
                    {actionLoading.hire ? 'Hiring...' : 'Hire'}
                  </button>
                  
                  <button 
                    onClick={handleRejectCandidate}
                    disabled={actionLoading.hire || actionLoading.reject}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    {actionLoading.reject ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaUserTimes className="w-4 h-4" />
                    )}
                    {actionLoading.reject ? 'Rejecting...' : 'Reject'}
                  </button>
                </>
              ) : (
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  candidate.status.toLowerCase() === 'accepted'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  Candidate {candidate.status}
                </div>
              )}
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {candidate.loadingDetails && (
            <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <FaSpinner className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading detailed candidate information...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {candidate.fetchError && (
            <div className="px-6 py-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
                <FaExclamationTriangle className="w-4 h-4" />
                <span className="text-sm">Some detailed information couldn't be loaded, showing basic details.</span>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Basic Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaEnvelope className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{candidate.email}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaBriefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Experience</span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {candidate.yearsOfExperience ? `${candidate.yearsOfExperience} years` : 'Not specified'}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Applied</span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDate(candidate.applicationDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Cover Letter */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaFileAlt className="w-5 h-5 text-blue-600" />
                    Cover Letter
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    {candidate.coverLetter ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {candidate.coverLetter}
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No cover letter provided
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Details from API */}
                {candidate.detailedInfo && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Additional Information
                    </h3>
                    <div className="space-y-3">
                      {candidate.detailedInfo.address && (
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="w-4 h-4 text-gray-500 mt-1" />
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</span>
                            <p className="text-gray-900 dark:text-white">{candidate.detailedInfo.address}</p>
                          </div>
                        </div>
                      )}
                      {candidate.detailedInfo.phoneNumber && (
                        <div className="flex items-start gap-3">
                          <FaEnvelope className="w-4 h-4 text-gray-500 mt-1" />
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</span>
                            <p className="text-gray-900 dark:text-white">{candidate.detailedInfo.phoneNumber}</p>
                          </div>
                        </div>
                      )}
                      {candidate.detailedInfo.degree && (
                        <div className="flex items-start gap-3">
                          <FaGraduationCap className="w-4 h-4 text-gray-500 mt-1" />
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Education</span>
                            <p className="text-gray-900 dark:text-white">{candidate.detailedInfo.degree}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Resume Downloads */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaDownload className="w-5 h-5 text-green-600" />
                    Resume
                  </h3>
                  
                  {(candidate.resume || candidate.resumeBase64) ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaFileAlt className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {candidate.resumeName || 'Resume'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PDF Document
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(candidate.resume || candidate.resumeBase64, '_blank')}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title="Download Resume"
                      >
                        <FaDownload className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
                      No resume available
                    </p>
                  )}
                </div>

                {/* Application Timeline */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaClock className="w-5 h-5 text-purple-600" />
                    Application Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Application Submitted</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(candidate.applicationDate)}
                        </p>
                      </div>
                    </div>
                    
                    {candidate.isShortlisted && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">Shortlisted</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Candidate has been shortlisted for review
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render the modal using a portal to the document body
  return createPortal(modalContent, document.body);
};

export default CandidateModal;
