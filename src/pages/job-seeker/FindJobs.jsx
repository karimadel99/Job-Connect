import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs, saveJob, unsaveJob } from '../../api/jobSeekerApi';
//import jobsData from '../../data/jobsData.json';
import SearchBar from '../../components/job-seeker/SearchBar';
import AdvancedFilters from '../../components/job-seeker/AdvancedFilters';
import JobCard from '../../components/job-seeker/JobCard';
import ResultsHeader from '../../components/job-seeker/ResultsHeader';
import Pagination from '../../components/job-seeker/Pagination';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { useSavedJobs } from '../../contexts/SavedJobsContext';
import { HiX, HiFilter, HiOutlineRefresh } from 'react-icons/hi';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    experience: '',
    salary: '',
    jobType: [],
    workplace: [],
    education: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Get saved jobs context
  const { isJobSaved, toggleSaveJob, fetchSavedJobs } = useSavedJobs();

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
    '$500 - $1000',
    '$1000 - $2000',
    '$2000 - $3000',
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
    'Contract Base',
    'Internship',
    'Temporary'
  ];

  const workPlace = [
    'All',
    'On Site',
    'Hybrid',
    'Remote'
  ];

  const educationLevels = [
    'All',
    'High School',
    'Intermediate',
    'Graduation',
    'Master Degree',
    'Bachelor Degree'
  ];

  const jobsPerPage = 6;

  // Fetch jobs from API on mount
  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, searchQuery, locationQuery, sortBy]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllJobs();
      if (response.error) {
        toast.error(response.error);
        setJobs([]);
      } else {
        const jobsWithSaved = response.data.map(job => ({
          ...job,
          saved: Boolean(job.isSaved),
          isExpired: job.daysRemaining === 0
        }));
        setJobs(jobsWithSaved);
      }
    } catch (error) {
      toast.error('Failed to fetch jobs');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced filter, search, and sort functionality
  const getFilteredJobs = () => {
    let filteredJobs = [...jobs];

    // Search by title and company
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => 
        (job.title || '').toLowerCase().includes(query) ||
        (job.company || '').toLowerCase().includes(query) ||
        (job.employer?.companyName || '').toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (locationQuery.trim()) {
      const location = locationQuery.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => 
        (job.location || '').toLowerCase().includes(location)
      );
    }

    // Filter by job type
    if (selectedFilters.jobType && selectedFilters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        const jobType = job.jobType || job.type || '';
        return selectedFilters.jobType.some(filterType => {
          if (filterType === 'Full Time') return jobType.toLowerCase().includes('full') || jobType === 'fullTime';
          if (filterType === 'Part Time') return jobType.toLowerCase().includes('part') || jobType === 'partTime';
          if (filterType === 'Contract Base') return jobType.toLowerCase().includes('contract');
          if (filterType === 'Internship') return jobType.toLowerCase().includes('intern');
          if (filterType === 'Temporary') return jobType.toLowerCase().includes('temp');
          return jobType.toLowerCase().includes(filterType.toLowerCase());
        });
      });
    }

    // Filter by workplace
    if (selectedFilters.workplace && selectedFilters.workplace.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        const workplace = job.workplace || job.workLocation || job.location || '';
        return selectedFilters.workplace.some(filterPlace => {
          if (filterPlace === 'On Site') return workplace.toLowerCase().includes('onsite') || workplace.toLowerCase().includes('on-site') || workplace.toLowerCase().includes('office');
          if (filterPlace === 'Remote') return workplace.toLowerCase().includes('remote');
          if (filterPlace === 'Hybrid') return workplace.toLowerCase().includes('hybrid');
          return workplace.toLowerCase().includes(filterPlace.toLowerCase());
        });
      });
    }

    // Filter by experience
    if (selectedFilters.experience) {
      filteredJobs = filteredJobs.filter(job => {
        const exp = parseInt(job.yearsOfExperience) || 0;
        switch (selectedFilters.experience) {
          case 'Freshers':
            return exp === 0 || exp < 1;
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

    // Filter by salary range
    if (selectedFilters.salary) {
      filteredJobs = filteredJobs.filter(job => {
        const jobMinSalary = parseInt(job.minSalary) || 0;
        const jobMaxSalary = parseInt(job.maxSalary) || jobMinSalary;
        
        // Parse filter range
        if (selectedFilters.salary === '$15000+') {
          return jobMinSalary >= 15000 || jobMaxSalary >= 15000;
        }
        
        const rangeParts = selectedFilters.salary.replace(/\$/g, '').split(' - ');
        if (rangeParts.length === 2) {
          const minRange = parseInt(rangeParts[0]);
          const maxRange = parseInt(rangeParts[1]);
          
          // Check if job salary overlaps with filter range
          return (jobMinSalary <= maxRange && jobMaxSalary >= minRange) ||
                 (jobMinSalary >= minRange && jobMinSalary <= maxRange) ||
                 (jobMaxSalary >= minRange && jobMaxSalary <= maxRange);
        }
        
        return true;
      });
    }

    // Filter by education
    if (selectedFilters.education && selectedFilters.education.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        selectedFilters.education.some(edu => {
          const jobEducation = (job.educationLevel || job.education || '').toLowerCase();
          const filterEducation = edu.toLowerCase();
          
          if (filterEducation.includes('high school')) return jobEducation.includes('high') || jobEducation.includes('secondary');
          if (filterEducation.includes('bachelor')) return jobEducation.includes('bachelor') || jobEducation.includes('undergraduate');
          if (filterEducation.includes('master')) return jobEducation.includes('master') || jobEducation.includes('postgraduate');
          
          return jobEducation.includes(filterEducation);
        })
      );
    }

    // Enhanced sorting
    switch (sortBy) {
      case 'latest':
        filteredJobs.sort((a, b) => {
          const dateA = new Date(a.postingDate || a.postedDate || a.createdAt || 0);
          const dateB = new Date(b.postingDate || b.postedDate || b.createdAt || 0);
          return dateB - dateA;
        });
        break;
      case 'oldest':
        filteredJobs.sort((a, b) => {
          const dateA = new Date(a.postingDate || a.postedDate || a.createdAt || 0);
          const dateB = new Date(b.postingDate || b.postedDate || b.createdAt || 0);
          return dateA - dateB;
        });
        break;
      case 'salary_high':
        filteredJobs.sort((a, b) => {
          const salaryA = Math.max(parseInt(a.minSalary) || 0, parseInt(a.maxSalary) || 0);
          const salaryB = Math.max(parseInt(b.minSalary) || 0, parseInt(b.maxSalary) || 0);
          return salaryB - salaryA;
        });
        break;
      case 'salary_low':
        filteredJobs.sort((a, b) => {
          const salaryA = Math.min(parseInt(a.minSalary) || Infinity, parseInt(a.maxSalary) || Infinity);
          const salaryB = Math.min(parseInt(b.minSalary) || Infinity, parseInt(b.maxSalary) || Infinity);
          return salaryA - salaryB;
        });
        break;
      case 'title':
        filteredJobs.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        // Keep original order
        break;
    }

    return filteredJobs;
  };

  const filteredJobs = getFilteredJobs();
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAdvancedFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      // Handle array-based filters (jobType, workplace, education)
      if (['jobType', 'workplace', 'education'].includes(filterType)) {
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
      } 
      // Handle single-value filters (experience, salary)
      else {
        newFilters[filterType] = value === newFilters[filterType] ? '' : value;
      }
      
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect on state change
  };

  // Get active filter count for better UX
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.experience) count++;
    if (selectedFilters.salary) count++;
    if (selectedFilters.jobType?.length > 0) count++;
    if (selectedFilters.workplace?.length > 0) count++;
    if (selectedFilters.education?.length > 0) count++;
    if (searchQuery.trim()) count++;
    if (locationQuery.trim()) count++;
    return count;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedFilters({
      experience: '',
      salary: '',
      jobType: [],
      workplace: [],
      education: []
    });
    setSortBy('latest');
    setCurrentPage(1);
    toast.success('All filters cleared');
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Find Jobs
        </h1>
        <div className="text-sm">
          <Link to="/jobseeker/dashboard" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary-600 dark:hover:text-dark-primary-400 transition-colors duration-200">
            Home
          </Link>
          <span className="mx-2 text-light-text-secondary dark:text-dark-text-secondary">/</span>
          <span className="text-light-text-primary dark:text-dark-text-primary">Find Jobs</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 mb-6 border border-light-neutral-200 dark:border-dark-neutral-700">
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
          workPlace={workPlace}
          educationLevels={educationLevels}
        />
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-4 mb-6 border border-light-neutral-200 dark:border-dark-neutral-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-2">
                <HiFilter className="w-4 h-4" />
                Active Filters ({activeFilterCount}):
              </span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {locationQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Location: "{locationQuery}"
                  <button onClick={() => setLocationQuery('')} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedFilters.experience && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Experience: {selectedFilters.experience}
                  <button onClick={() => handleAdvancedFilterChange('experience', selectedFilters.experience)} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedFilters.salary && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Salary: {selectedFilters.salary}
                  <button onClick={() => handleAdvancedFilterChange('salary', selectedFilters.salary)} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedFilters.jobType?.map(type => (
                <span key={type} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Job: {type}
                  <button onClick={() => handleAdvancedFilterChange('jobType', type)} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              {selectedFilters.workplace?.map(place => (
                <span key={place} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Work: {place}
                  <button onClick={() => handleAdvancedFilterChange('workplace', place)} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              {selectedFilters.education?.map(edu => (
                <span key={edu} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-900/30 dark:text-dark-primary-300">
                  Education: {edu}
                  <button onClick={() => handleAdvancedFilterChange('education', edu)} className="hover:text-light-primary-600 dark:hover:text-dark-primary-400">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-light-error dark:text-dark-error hover:bg-light-error/10 dark:hover:bg-dark-error/10 rounded-lg transition-colors duration-200"
            >
              <HiOutlineRefresh className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm border border-light-neutral-200 dark:border-dark-neutral-700">
        <ResultsHeader
          jobCount={filteredJobs.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isLoading ? (
          <div className="p-6">
            <Loader />
          </div>
        ) : (
          <>
            {/* Job Cards */}
            <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
              {currentJobs.length > 0 ? (
                currentJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    viewMode={viewMode}
                    isSaved={isJobSaved(job.id)}
                    onToggleSave={toggleSaveJob}
                  />
                ))
              ) : (
                <div className="text-center py-12 px-4 col-span-2">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-light-neutral-100 dark:bg-dark-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiFilter className="w-10 h-10 text-light-neutral-400 dark:text-dark-neutral-400" />
                    </div>
                    <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                      No jobs found
                    </h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                      {activeFilterCount > 0 
                        ? "Try adjusting your filters or search criteria to find more opportunities."
                        : "No jobs are currently available. Please check back later."
                      }
                    </p>
                    {activeFilterCount > 0 && (
                      <button 
                        onClick={clearAllFilters}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-400 text-white rounded-lg hover:bg-light-primary-700 dark:hover:bg-dark-primary-500 font-medium transition-colors duration-200"
                      >
                        <HiOutlineRefresh className="w-4 h-4" />
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
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

export default FindJobs;
