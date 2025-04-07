import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../../data/jobsData.json';
import SearchBar from '../../components/job-seeker/SearchBar';
import AdvancedFilters from '../../components/job-seeker/AdvancedFilters';
import JobCard from '../../components/job-seeker/JobCard';
import ResultsHeader from '../../components/job-seeker/ResultsHeader';
import Pagination from '../../components/job-seeker/Pagination';

const FindJobs = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    experience: '',
    salary: '',
    jobType: [],
    education: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  // Filter options
  const experienceOptions = [
    'Freshers',
    '1 - 2 Years',
    '2 - 4 Years',
    '4 - 6 Years',
    '6 - 8 Years',
    '8 - 10 Years',
    '10 - 15 Years',
    '15+ Years'
  ];

  const salaryRanges = [
    '$50 - $1000',
    '$1000 - $2000',
    '$3000 - $4000',
    '$4000 - $6000',
    '$6000 - $8000',
    '$8000 - $10000',
    '$10000 - $15000',
    '$15000+'
  ];

  const jobTypes = [
    'All',
    'Full Time',
    'Part Time',
    'Internship',
    'Remote',
    'Temporary',
    'Contract Base'
  ];

  const educationLevels = [
    'All',
    'High School',
    'Intermediate',
    'Graduation',
    'Master Degree',
    'Bachelor Degree'
  ];

  const jobsPerPage = 8;

  useEffect(() => {
    // Load jobs data
    let filteredJobs = [...jobsData];
    
    // Apply search filters
    if (searchQuery) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (locationQuery) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    // Apply selected filters
    if (selectedFilters.jobType && selectedFilters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        selectedFilters.jobType.includes(job.type)
      );
    }

    if (selectedFilters.experience) {
      filteredJobs = filteredJobs.filter(job => {
        const exp = job.yearsOfExperience;
        switch (selectedFilters.experience) {
          case 'Freshers':
            return exp < 1;
          case '1 - 2 Years':
            return exp >= 1 && exp <= 2;
          case '2 - 4 Years':
            return exp > 2 && exp <= 4;
          case '4 - 6 Years':
            return exp > 4 && exp <= 6;
          case '6 - 8 Years':
            return exp > 6 && exp <= 8;
          case '8 - 10 Years':
            return exp > 8 && exp <= 10;
          case '10 - 15 Years':
            return exp > 10 && exp <= 15;
          case '15+ Years':
            return exp > 15;
          default:
            return true;
        }
      });
    }

    if (selectedFilters.salary) {
      filteredJobs = filteredJobs.filter(job => {
        const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        const [min, max] = selectedFilters.salary.split(' - ').map(s => parseInt(s.replace(/[^0-9]/g, '')));
        return jobSalary >= min && (!max || jobSalary <= max);
      });
    }

    if (selectedFilters.education && selectedFilters.education.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        selectedFilters.education.some(edu => job.educationLevel.includes(edu))
      );
    }
    
    // Apply sorting
    if (sortBy === 'latest') {
      filteredJobs.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
    } else if (sortBy === 'newest') {
      filteredJobs.sort((a, b) => new Date(a.postingDate) - new Date(b.postingDate));
    }
    
    setJobs(filteredJobs);
    setCurrentPage(1);
  }, [searchQuery, locationQuery, selectedFilters, sortBy]);

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleAdvancedFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'jobType' || filterType === 'education') {
        if (value === 'All') {
          newFilters[filterType] = [];
        } else {
          const currentFilters = newFilters[filterType] || [];
          if (currentFilters.includes(value)) {
            newFilters[filterType] = currentFilters.filter(item => item !== value);
          } else {
            newFilters[filterType] = [...currentFilters, value];
          }
        }
      } else {
        newFilters[filterType] = value === newFilters[filterType] ? '' : value;
      }
      
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-primary dark:bg-dark-background-primary">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Find Job
        </h1>
        <div className="text-sm">
          <Link to="/" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary-600 dark:hover:text-dark-primary-600 transition-colors duration-200">
            Home
          </Link>
          <span className="mx-2 text-light-text-secondary dark:text-dark-text-secondary">/</span>
          <span className="text-light-text-primary dark:text-dark-text-primary">Find Job</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-sm p-6 mb-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          isAdvancedFilterOpen={isAdvancedFilterOpen}
          setIsAdvancedFilterOpen={setIsAdvancedFilterOpen}
          handleSearch={handleSearch}
        />
        <AdvancedFilters
          isOpen={isAdvancedFilterOpen}
          selectedFilters={selectedFilters}
          handleFilterChange={handleAdvancedFilterChange}
          experienceOptions={experienceOptions}
          salaryRanges={salaryRanges}
          jobTypes={jobTypes}
          educationLevels={educationLevels}
        />
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-sm">
        <ResultsHeader
          jobCount={jobs.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Job Cards */}
        <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
          {currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                viewMode={viewMode}
                isSaved={savedJobs.includes(job.id)}
                onToggleSave={toggleSaveJob}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {jobs.length > 0 && (
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

export default FindJobs;