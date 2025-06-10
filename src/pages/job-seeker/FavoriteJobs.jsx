import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSavedJobs } from '../../api/jobSeekerApi';
import JobCard from '../../components/job-seeker/JobCard';
import ResultsHeader from '../../components/job-seeker/ResultsHeader';
import Pagination from '../../components/job-seeker/Pagination';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { useSavedJobs } from '../../contexts/SavedJobsContext';

const FavoriteJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const jobsPerPage = 4;

  // Get saved jobs context
  const { toggleSaveJob, fetchSavedJobs } = useSavedJobs();

  useEffect(() => {
    fetchSavedJobs();
    loadSavedJobs();
  }, [fetchSavedJobs]);

  const loadSavedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getSavedJobs();
      console.log(response);
      if (response.error) {
        toast.error(response.error);
      } else {
        const jobsWithExpired = (response.data || []).map(job => ({
          ...job,
          isExpired: job.daysRemaining === 0
        }));
        setSavedJobs(jobsWithExpired);
      }
    } catch (error) {
      toast.error('Failed to fetch saved jobs');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle unsave job
  const handleUnsaveJob = async (jobId) => {
    const success = await toggleSaveJob(jobId);
    if (success) {
      // Remove the job from the local state
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  // Filter jobs based on search query
  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.employer?.companyName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortBy === 'newest') {
      return new Date(a.postedDate) - new Date(b.postedDate);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-primary dark:bg-dark-background-primary">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Saved Jobs <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-normal">({sortedJobs.length})</span>
        </h1>
        <div className="text-sm">
          <Link to="/jobseeker/dashboard" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary-600 dark:hover:text-dark-primary-600 transition-colors duration-200">
            Home
          </Link>
          <span className="mx-2 text-light-text-secondary dark:text-dark-text-secondary">/</span>
          <span className="text-light-text-primary dark:text-dark-text-primary">Saved Jobs</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-sm">
        <ResultsHeader
          jobCount={sortedJobs.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Job Cards */}
            <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
              {currentJobs.length > 0 ? (
                currentJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={{
                      ...job,

                      type: job.jobType,
                      postedDate: job.postedDate
                    }}
                    viewMode={viewMode}
                    isSaved={true}
                    onToggleSave={handleUnsaveJob}
                  />
                ))
              ) : (
                <div className="text-center py-8 col-span-2">
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    No saved jobs found. Start saving jobs you're interested in!
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {sortedJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteJobs;