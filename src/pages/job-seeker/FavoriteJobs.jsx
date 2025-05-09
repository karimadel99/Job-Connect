import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../../data/jobsData.json';
import JobCard from '../../components/job-seeker/JobCard';
import ResultsHeader from '../../components/job-seeker/ResultsHeader';
import Pagination from '../../components/job-seeker/Pagination';

const FavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const jobsPerPage = 4;

  useEffect(() => {
    // Load saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobs = jobsData.filter(job => savedJobIds.includes(job.id));
    setFavoriteJobs(savedJobs);
  }, []);

  const handleRemoveFromFavorites = (jobId) => {
    const updatedFavorites = favoriteJobs.filter(job => job.id !== jobId);
    setFavoriteJobs(updatedFavorites);
    
    // Update localStorage
    const savedJobIds = updatedFavorites.map(job => job.id);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
  };

  // Filter jobs based on search query
  const filteredJobs = favoriteJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.postingDate) - new Date(a.postingDate);
    } else if (sortBy === 'newest') {
      return new Date(a.postingDate) - new Date(b.postingDate);
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
          Favorite Jobs
        </h1>
        <div className="text-sm">
          <Link to="/jobseeker/dashboard" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary-600 dark:hover:text-dark-primary-600 transition-colors duration-200">
            Home
          </Link>
          <span className="mx-2 text-light-text-secondary dark:text-dark-text-secondary">/</span>
          <span className="text-light-text-primary dark:text-dark-text-primary">Favorite Jobs</span>
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

        {/* Job Cards */}
        <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
          {currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                viewMode={viewMode}
                isSaved={true}
                onToggleSave={handleRemoveFromFavorites}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No favorite jobs found. Start saving jobs you're interested in!
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
      </div>
    </div>
  );
};

export default FavoriteJobs;