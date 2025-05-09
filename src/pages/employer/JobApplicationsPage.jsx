import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CandidateModal from '../../components/CandidateModal';
import { getJobById, addToShortlist, removeFromShortlist } from '../../api/employerApi';
import Loader from '../../components/Loader';
import { HiOutlinePlus, HiCheck, HiOutlineDownload, HiDownload, HiTrash } from 'react-icons/hi';
import { format, isValid, parseISO } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';
import { FaRegClock } from 'react-icons/fa';
import { MdLocationOn, MdWork } from 'react-icons/md';
import { AiOutlineDollar } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistLoading, setShortlistLoading] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getJobById(jobId);
        if (result.success) {
          setJob(result.data);
        } else {
          setError(result.message || 'Failed to fetch job');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        toast.error('Failed to load job data');
      }
      setLoading(false);
    };
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-50 dark:bg-gray-900">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        Job not found.
      </div>
    );
  }

  const sortedCandidates = [...(job.applicants || [])].sort((a, b) => {
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
  const shortlistedCandidates = [...new Map((job.applicants || []).filter(c => c.isShortlisted).map(c => [c.id, c])).values()];
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

  const handleCandidateClick = (candidateId) => {
    const candidateData = (job.applicants || []).find((user) => user.id === candidateId);
    setSelectedCandidate(candidateData);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  const handleShortlistToggle = async (candidate, event) => {
    event.stopPropagation();
    setShortlistLoading((prev) => ({ ...prev, [candidate.id]: true }));
    try {
      const isCurrentlyShortlisted = candidate.isShortlisted;
      if (isCurrentlyShortlisted) {
        await removeFromShortlist(job.id, candidate.id);
        toast.success(`${candidate.name} removed from shortlist`);
      } else {
        await addToShortlist(job.id, candidate.id);
        toast.success(`${candidate.name} added to shortlist`);
      }
      // Refresh job data to ensure consistency
      const result = await getJobById(jobId);
      if (result.success) {
        setJob(result.data);
      } else {
        throw new Error(result.message || 'Failed to refresh job data');
      }
    } catch (err) {
      toast.error('Failed to update shortlist');
      // Revert the local state if the API call fails
      setJob((prevJob) => ({
        ...prevJob,
        applicants: prevJob.applicants.map((c) =>
          c.id === candidate.id ? { ...c, isShortlisted: !candidate.isShortlisted } : c
        ),
      }));
    } finally {
      setShortlistLoading((prev) => ({ ...prev, [candidate.id]: false }));
    }
  };

  const handleDownloadAllCVs = () => {
    finalShortlisted.forEach((candidate) => {
      window.open(candidate.resume, '_blank');
    });
    toast.success('Downloading all shortlisted CVs');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Toaster position="top-right" />
      <CandidateModal candidate={selectedCandidate} onClose={closeModal} />

      {/* Header */}
      <div className="mb-6">
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <span>Job</span> / <span>{job.title}</span> / <span>Applications</span>
        </nav>
        <h1 className="text-3xl font-bold mt-2">Job Applications</h1>
      </div>

      {/* Job Details */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><FaRegClock /></span>
            <span className="font-medium">Status:</span> {job.status}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><FaRegClock /></span>
            <span className="font-medium">Posted:</span> {formatDate(job.postedDate)}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><MdLocationOn /></span>
            <span className="font-medium">Location:</span> {job.location}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><MdWork /></span>
            <span className="font-medium">Type:</span> {job.jobType}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><AiOutlineDollar /></span>
            <span className="font-medium">Salary:</span> {job.minSalary} - {job.maxSalary} {job.salaryType}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-indigo-500"><BsFillPeopleFill /></span>
            <span className="font-medium">Vacancies:</span> {job.vacancies}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="search" className="mr-2 font-medium">Search:</label>
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
              </svg>
            </span>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-medium">Sort by:</label>
          <select
            id="sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* All Applications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Applications ({finalCandidates.length})</h2>
          </div>
          <div className="space-y-4">
            {finalCandidates.length > 0 ? (
              finalCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleCandidateClick(candidate.id)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{candidate.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{candidate.currentOrDesiredJob}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Applied: {formatDate(candidate.applicationDate)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Email: {candidate.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {!candidate.isShortlisted && (
                        <button
                          onClick={(event) => handleShortlistToggle(candidate, event)}
                          disabled={shortlistLoading[candidate.id]}
                          className={`p-2 rounded-full border bg-indigo-100 text-indigo-600 border-indigo-200 hover:bg-indigo-200 ${shortlistLoading[candidate.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title="Add to Shortlist"
                        >
                          {shortlistLoading[candidate.id] ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <HiOutlinePlus className="w-5 h-5" />
                          )}
                        </button>
                      )}
                      <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(candidate.resume, '_blank');
                        }}
                      >
                        <HiOutlineDownload className="mr-2" /> Download CV
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No applications found.</p>
            )}
          </div>
        </div>

        {/* Shortlisted */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shortlisted ({finalShortlisted.length})</h2>
          </div>
          <div className="space-y-4">
            {finalShortlisted.length > 0 ? (
              finalShortlisted.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleCandidateClick(candidate.id)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{candidate.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{candidate.currentOrDesiredJob}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Applied: {formatDate(candidate.applicationDate)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Email: {candidate.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={(event) => handleShortlistToggle(candidate, event)}
                        disabled={shortlistLoading[candidate.id]}
                        className={`flex items-center px-3 py-1 rounded-lg text-sm bg-red-100 text-red-600 hover:bg-red-200 ${shortlistLoading[candidate.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Remove from Shortlist"
                      >
                        {shortlistLoading[candidate.id] ? (
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        ) : (
                          <>
                            <HiTrash className="w-4 h-4 mr-1" /> Remove
                          </>
                        )}
                      </button>
                      <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(candidate.resume, '_blank');
                        }}
                      >
                        <HiOutlineDownload className="mr-2" /> Download CV
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No shortlisted candidates.</p>
            )}
          </div>
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
      return format(date, "MMM d, yyyy, h:mm a");
    }
    if (!isNaN(Number(dateString))) {
      date = new Date(Number(dateString));
      if (isValid(date)) {
        return format(date, "MMM d, yyyy, h:mm a");
      }
    }
    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) {
      return format(fallbackDate, "MMM d, yyyy, h:mm a");
    }
    // Fallback: return the original string
    return dateString;
  } catch (error) {
    return dateString;
  }
}