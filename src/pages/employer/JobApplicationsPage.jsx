import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CandidateModal from '../../components/CandidateModal';
import { getJobById, addToShortlist, removeFromShortlist, getJobSeekerById, getApplicantsWithResume, getSeekerResumesById, hireCandidate, rejectCandidate } from '../../api/employerApi';
import Loader from '../../components/Loader';
import { HiOutlinePlus, HiCheck, HiOutlineDownload, HiDownload, HiTrash, HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi';
import { format, isValid, parseISO } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';
import { 
  FaRegClock, 
  FaUsers, 
  FaStar, 
  FaEye, 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaDollarSign, 
  FaCalendarAlt,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaFilter,
  FaSort,
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistLoading, setShortlistLoading] = useState({});
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'shortlisted'
  const [applicants, setApplicants] = useState([]);

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

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        // First try to get job data which now includes applicants
        const jobResult = await getJobById(jobId);

        if (jobResult.success) {
          setJob(jobResult.data);
          // Set applicants from job data if available, otherwise try the separate API
          if (jobResult.data.applicants && Array.isArray(jobResult.data.applicants)) {
            setApplicants(jobResult.data.applicants);
          } else {
            // Fallback to separate API call for backward compatibility
            try {
              const applicantsResult = await getApplicantsWithResume(jobId);
              if (applicantsResult.success) {
                setApplicants(applicantsResult.data);
              } else {
                setApplicants([]);
              }
            } catch {
              setApplicants([]);
            }
          }
        } else {
          setError(jobResult.error || 'Failed to fetch job data');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        toast.error('Failed to load job data');
      }
      setLoading(false);
    };
    fetchJobAndApplicants();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading job applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-200 dark:border-red-800">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Job</h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BsFillPeopleFill className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Job Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/employer/my-jobs')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to My Jobs
          </button>
        </div>
      </div>
    );
  }

  const sortedCandidates = [...(applicants || [])].sort((a, b) => {
    const dateA = new Date(a.applicationDate);
    const dateB = new Date(b.applicationDate);
    if (!isValid(dateA) && !isValid(dateB)) return 0;
    if (!isValid(dateA)) return 1;
    if (!isValid(dateB)) return -1;
    return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const finalCandidates = sortedCandidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ensure unique shortlisted candidates by using a Map or filter by ID
  const shortlistedCandidates = [...new Map((applicants || []).filter(c => c.isShortlisted).map(c => [c.id, c])).values()];
  const finalShortlisted = [...shortlistedCandidates]
    .sort((a, b) => {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      if (!isValid(dateA) && !isValid(dateB)) return 0;
      if (!isValid(dateA)) return 1;
      if (!isValid(dateB)) return -1;
      return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
    })
    .filter((candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCandidateClick = async (candidateId) => {
    const candidateData = applicants.find((user) => user.id === candidateId);
    
    if (!candidateData) return;
    
    // Show basic info first with loading indicator
    setSelectedCandidate({
      ...candidateData,
      loadingDetails: true
    });
    
    try {
      // Fetch both detailed info and resumes
      const [seekerResult, resumesResult] = await Promise.all([
        getJobSeekerById(candidateId),
        getSeekerResumesById(candidateId)
      ]);
      
      // Find the matching resume to get its name
      let resumeName = null;
      if (resumesResult.success && resumesResult.data && Array.isArray(resumesResult.data)) {
        const resumeUrl = candidateData.resume || candidateData.resumeBase64;
        console.log('🔍 Debug - Candidate resume URL:', resumeUrl);
        console.log('🔍 Debug - Available resumes:', resumesResult.data);
        
        // Try exact match first
        let matchingResume = resumesResult.data.find(r => r.resumePath === resumeUrl);
        
        // If no exact match, try to find by partial match (in case URLs are slightly different)
        if (!matchingResume && resumeUrl) {
          // Extract filename from URL for comparison
          const candidateFilename = resumeUrl.split('/').pop()?.split('?')[0];
          console.log('🔍 Debug - Candidate filename:', candidateFilename);
          
          matchingResume = resumesResult.data.find(r => {
            const resumeFilename = r.resumePath?.split('/').pop()?.split('?')[0];
            console.log('🔍 Debug - Comparing with resume filename:', resumeFilename);
            return resumeFilename === candidateFilename;
          });
        }
        
        // If still no match, use the first resume if there's only one
        if (!matchingResume && resumesResult.data.length === 1) {
          console.log('🔍 Debug - Using first resume as fallback');
          matchingResume = resumesResult.data[0];
        }
        
        // Final fallback: use the most recent resume
        if (!matchingResume && resumesResult.data.length > 0) {
          console.log('🔍 Debug - Using most recent resume as final fallback');
          matchingResume = resumesResult.data[0];
        }
        
        if (matchingResume) {
          resumeName = matchingResume.resumeName || matchingResume.name || 'Resume';
          console.log('✅ Debug - Found matching resume:', matchingResume);
          console.log('✅ Debug - Resume name:', resumeName);
        } else {
          console.log('❌ Debug - No matching resume found');
          // Fallback to a generic name based on the candidate's name
          resumeName = `${candidateData.name}_Resume`;
        }
      } else {
        console.log('❌ Debug - Resume API failed or returned invalid data:', resumesResult);
        // Fallback to a generic name
        resumeName = `${candidateData.name}_Resume`;
      }
      
      // Enhance candidate data with detailed information
      const enhancedCandidate = {
        ...candidateData,
        detailedInfo: seekerResult.success ? seekerResult.data : null,
        resumeName: resumeName,
        loadingDetails: false
      };
      
      setSelectedCandidate(enhancedCandidate);
      
      if (!seekerResult.success) {
        console.warn('Failed to fetch job seeker details:', seekerResult.error);
      }
      if (!resumesResult.success) {
        console.warn('Failed to fetch resume details:', resumesResult.error);
      }
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      setSelectedCandidate({
        ...candidateData,
        loadingDetails: false,
        fetchError: true
      });
    }
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  const handleCandidateAction = (action, candidateId) => {
    console.log(`Candidate ${candidateId} was ${action}`);
    
    // Update the applicants state to reflect the new status
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === candidateId 
          ? { 
              ...applicant, 
              status: action === 'hired' ? 'Accepted' : action === 'rejected' ? 'Rejected' : applicant.status 
            }
          : applicant
      )
    );
    
    // Close modal after action
    setSelectedCandidate(null);
  };

  const handleShortlistToggle = async (candidate, event) => {
    event.stopPropagation();
    setShortlistLoading((prev) => ({ ...prev, [candidate.id]: true }));
    
    try {
      const isCurrentlyShortlisted = candidate.isShortlisted;
      let result;
      
      if (isCurrentlyShortlisted) {
        result = await removeFromShortlist(job.id, candidate.id);
      } else {
        result = await addToShortlist(Number(job.id), candidate.id);
      }
      
      if (result.success) {
        // Update local state optimistically
        setApplicants((prevApplicants) =>
          prevApplicants.map((c) =>
            c.id === candidate.id ? { ...c, isShortlisted: !isCurrentlyShortlisted } : c
          )
        );
        
        // Also update job.applicants if it exists
        setJob((prevJob) => ({
          ...prevJob,
          applicants: prevJob.applicants ? prevJob.applicants.map((c) =>
            c.id === candidate.id ? { ...c, isShortlisted: !isCurrentlyShortlisted } : c
          ) : prevJob.applicants,
        }));
        
        toast.success(
          isCurrentlyShortlisted 
            ? `${candidate.name} removed from shortlist`
            : `${candidate.name} added to shortlist`
        );
      } else {
        // Handle API error gracefully
        toast.error(result.error || 'Shortlist feature is currently unavailable');
        console.warn('Shortlist operation failed:', result.error);
      }
    } catch (err) {
      console.error('Shortlist toggle error:', err);
      toast.error('Failed to update shortlist. Please try again.');
    } finally {
      setShortlistLoading((prev) => ({ ...prev, [candidate.id]: false }));
    }
  };

  const handleDownloadResume = (candidate, event) => {
    event.stopPropagation();
    
    const resumeUrl = candidate.resume || candidate.resumeBase64;
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
      toast.success('Downloading resume');
    } else {
      toast.error('No resume available for download');
    }
  };

  const CandidateCard = ({ candidate, isShortlisted = false }) => (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => handleCandidateClick(candidate.id)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {candidate.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {candidate.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <FaBriefcase className="w-3 h-3 mr-1" />
                {candidate.currentOrDesiredJob || 'Job Seeker'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {candidate.status && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                candidate.status.toLowerCase() === 'accepted' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : candidate.status.toLowerCase() === 'rejected'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
              }`}>
                {candidate.status.toLowerCase() === 'accepted' ? (
                  <FaUserCheck className="w-3 h-3 mr-1" />
                ) : candidate.status.toLowerCase() === 'rejected' ? (
                  <FaUserTimes className="w-3 h-3 mr-1" />
                ) : (
                  <FaRegClock className="w-3 h-3 mr-1" />
                )}
                {candidate.status}
              </div>
            )}
            {isShortlisted && (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <FaStar className="w-3 h-3 mr-1" />
                Shortlisted
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
            {candidate.email}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
            Applied {formatDate(candidate.applicationDate)}
          </div>
          {candidate.yearsOfExperience && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FaGraduationCap className="w-4 h-4 mr-2 text-gray-400" />
              {candidate.yearsOfExperience} years experience
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={(event) => handleShortlistToggle(candidate, event)}
              disabled={shortlistLoading[candidate.id]}
              className={`flex items-center px-3 py-2 text-sm ${
                isShortlisted
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border-red-200 dark:border-red-800'
                  : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border-green-200 dark:border-green-800'
              } rounded-lg transition-colors border disabled:opacity-50`}
              title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            >
              {shortlistLoading[candidate.id] ? (
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                isShortlisted ? <HiTrash className="w-4 h-4 mr-1" /> : <HiOutlinePlus className="w-4 h-4 mr-1" />
              )}
              {isShortlisted ? 'Remove' : 'Shortlist'}
            </button>
          </div>
          
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadResume(candidate, e);
            }}
          >
            <HiOutlineDownload className="w-4 h-4 mr-2" />
            Resume
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-right" />
      <CandidateModal 
        candidate={selectedCandidate} 
        onClose={closeModal} 
        jobId={jobId}
        onCandidateAction={handleCandidateAction}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/employer/my-jobs')}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to My Jobs
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1 text-indigo-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <FaBriefcase className="w-4 h-4 mr-1 text-indigo-500" />
                    {formatJobType(job.jobType)}
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="w-4 h-4 mr-1 text-indigo-500" />
                    {job.minSalary} - {job.maxSalary} {job.salaryType}
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-1 text-indigo-500" />
                    Posted {formatDate(job.postedDate)}
                  </div>
                </div>
              </div>
              
              <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {applicants?.length || job.applicants?.length || 0} Applications
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{finalCandidates.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <FaStar className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Shortlisted</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{finalShortlisted.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <BsFillPeopleFill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vacancies</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{job.vacancies}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <FaEye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{job.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidates by name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaSort className="w-4 h-4 text-gray-400" />
                <select
                  value={sortValue}
                  onChange={(e) => setSortValue(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'all'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                All Applications ({finalCandidates.length})
              </button>
              <button
                onClick={() => setActiveTab('shortlisted')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'shortlisted'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Shortlisted ({finalShortlisted.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="space-y-6">
          {activeTab === 'all' && (
            <div>
              {finalCandidates.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {finalCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {searchTerm ? 'No matching candidates' : 'No applications yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {searchTerm 
                      ? `No candidates match your search for "${searchTerm}".`
                      : 'When candidates apply for this job, they will appear here.'
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'shortlisted' && (
            <div>
              {finalShortlisted.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {finalShortlisted.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} isShortlisted />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaStar className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {searchTerm ? 'No matching shortlisted candidates' : 'No shortlisted candidates'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {searchTerm 
                      ? `No shortlisted candidates match your search for "${searchTerm}".`
                      : 'Candidates you shortlist will appear here for easy access.'
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsPage;

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    let date = parseISO(dateString);
    if (isValid(date)) {
      return format(date, "MMM d, yyyy");
    }
    if (!isNaN(Number(dateString))) {
      date = new Date(Number(dateString));
      if (isValid(date)) {
        return format(date, "MMM d, yyyy");
      }
    }
    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) {
      return format(fallbackDate, "MMM d, yyyy");
    }
    // Fallback: return the original string
    return dateString;
  } catch (error) {
    return dateString;
  }
}