import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import jobsData from '../../data/recentJobsData.json';
import userData from '../../data/userData.json';
import CandidateModal from '../../components/CandidateModal';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const numericJobId = parseInt(jobId, 10);
  const currentJob = jobsData.find((job) => job.id === numericJobId);

  // If the job does not exist, show an error
  if (!currentJob) {
    return <div className="p-4">Job not found.</div>;
  }

  // State for sorting (newest/oldest), and for searching by name
  const [sortValue, setSortValue] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Sort logic (by applied date)
  const sortedCandidates = [...currentJob.candidates].sort((a, b) => {
    const dateA = new Date(a.appliedDate);
    const dateB = new Date(b.appliedDate);
    return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Filter by search term (applicant name)
  const finalCandidates = sortedCandidates.filter((candidate) =>
    candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Shortlisted candidates
  const shortlistedCandidates = currentJob.candidates.filter(
    (c) => c.shortlisted
  );
  // Sort + Search for shortlisted as well
  const finalShortlisted = [...shortlistedCandidates]
    .sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
    })
    .filter((candidate) =>
      candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCandidateClick = (candidateId) => {
    const candidateData = userData.find((user) => user.id === candidateId);
    setSelectedCandidate(candidateData);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen p-6 text-light-text-primary dark:text-dark-text-primary">
      <CandidateModal candidate={selectedCandidate} onClose={closeModal} />

      {/* Breadcrumb / Header */}
      <div className="mb-4">
        <h2 className="text-sm opacity-80">
          Job / {currentJob.title} / Applications
        </h2>
        <h1 className="text-2xl font-semibold mt-1">
          Job Applications
        </h1>
      </div>

      {/* Job details */}
      <div className="mb-6 text-sm opacity-80">
        Status: {currentJob.status} &middot; Posted {currentJob.postedDate}
      </div>

      {/* Controls row: Search + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Search by applicant name */}
        <div className="flex items-center">
          <label htmlFor="search" className="mr-2 font-medium">
            Search by name:
          </label>
          <div className="relative">
            {/* Search Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                className="w-4 h-4 text-light-primary-500 dark:text-dark-primary-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z"
                />
              </svg>
            </span>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applicants..."
              className="pl-8 pr-3 py-1 border 
                         border-light-primary-200 dark:border-dark-primary-700  
                         rounded text-sm
                         bg-light-background dark:bg-dark-primary-900
                         text-light-text-primary dark:text-dark-text-primary
                         focus:outline-none 
                         focus:ring-2 focus:ring-[#8684F9] dark:focus:ring-[#8B84F9]"
            />
          </div>
        </div>

        {/* Sort by date */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="border 
                       border-[#CBCBFE]  
                       rounded px-2 py-1
                       bg-[#FFFFFF] dark:bg-[#1E1B4B]
                       text-[#1A1A1A] dark:text-[#E2E2E3]
                       focus:outline-none 
                       focus:ring-2 focus:ring-[#8684F9] dark:focus:ring-[#8B84F9]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Main content: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: All Applications */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            All Applications ({finalCandidates.length})
          </h2>
          <div className="space-y-3">
            {finalCandidates.length > 0 ? (
              finalCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border 
                             border-[#CBCBFE]  
                             p-4 rounded 
                             bg-[#FFFFFF] dark:bg-[#1E1B4B] 
                             shadow-sm"
                  onClick={() => handleCandidateClick(candidate.id)}
                >
                  <h3 className="font-semibold text-lg">
                    {candidate.candidateName}
                  </h3>
                  <p className="text-sm mt-1 opacity-90">
                    {candidate.experience}
                  </p>
                  {candidate.education && (
                    <p className="text-sm opacity-80">
                      Education: {candidate.education}
                    </p>
                  )}
                  <p className="text-sm mt-1 opacity-60">
                    Applied: {candidate.appliedDate}
                  </p>
                  <button
                    className="mt-3 px-4 py-2 rounded 
                               bg-[#6362F7] dark:bg-[#6562F7]
                               text-white
                               hover:bg-[#8684F9] dark:hover:bg-[#8B84F9]
                               focus:outline-none focus:ring-2 
                               focus:ring-[#8684F9] dark:focus:ring-[#8B84F9]"
                  >
                    Download CV
                  </button>
                </div>
              ))
            ) : (
              <p className="opacity-80">No applications found.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Shortlisted */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Shortlisted ({finalShortlisted.length})
          </h2>
          <div className="space-y-3">
            {finalShortlisted.length > 0 ? (
              finalShortlisted.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border 
                             border-[#CBCBFE] 
                             p-4 rounded 
                             bg-[#FFFFFF] dark:bg-[#1E1B4B] 
                             shadow-sm"
                >
                  <h3 className="font-semibold text-lg">
                    {candidate.candidateName}
                  </h3>
                  <p className="text-sm mt-1 opacity-90">
                    {candidate.experience}
                  </p>
                  {candidate.education && (
                    <p className="text-sm opacity-80">
                      Education: {candidate.education}
                    </p>
                  )}
                  <p className="text-sm mt-1 opacity-60">
                    Applied: {candidate.appliedDate}
                  </p>
                  <button
                    className="mt-3 px-4 py-2 rounded 
                               bg-[#6362F7] dark:bg-[#6562F7]
                               text-white
                               hover:bg-[#8684F9] dark:hover:bg-[#8B84F9]
                               focus:outline-none focus:ring-2 
                               focus:ring-[#8684F9] dark:focus:ring-[#8B84F9]"
                  >
                    Download CV
                  </button>
                </div>
              ))
            ) : (
              <p className="opacity-80">No shortlisted candidates.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsPage;
