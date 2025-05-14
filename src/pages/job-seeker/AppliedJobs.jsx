import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import jobsData from '../../data/jobsData.json';

const AppliedJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Transform jobsData into applications with application-specific fields
  const applications = jobsData.map(job => ({
    id: job.id,
    position: job.title,
    company: job.company.includes(', ') ? job.company.split(', ')[0] : job.company,
    location: job.location,
    appliedDate: generateRandomAppliedDate(),
    status: getRandomStatus(),
    logo: job.logo,
    salary: job.salary,
    jobType: job.type
  }));

  // Reset to page 1 when search query or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Function to generate random applied dates
  function generateRandomAppliedDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023;
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    
    return `${randomMonth} ${randomDay}, ${randomYear} ${randomHour}:${randomMinute.toString().padStart(2, '0')}`;
  }

  // Function to get random status
  function getRandomStatus() {
    const statuses = ['Active', 'Under Review', 'Interviewed', 'Rejected', 'Accepted'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  const statusColors = {
    'Active': 'bg-light-success-light text-light-success-dark dark:bg-dark-success-dark/30 dark:text-dark-success-light',
    'Under Review': 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-900/30 dark:text-dark-primary-300',
    'Interviewed': 'bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-800/30 dark:text-dark-primary-400',
    'Rejected': 'bg-light-error-light text-light-error-dark dark:bg-dark-error-dark/30 dark:text-dark-error-light',
    'Accepted': 'bg-light-success-light text-light-success-dark dark:bg-dark-success-dark/30 dark:text-dark-success-light',
  };

  const jobTypeColors = {
    'Full-time': 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-900/30 dark:text-dark-primary-300',
    'Part-time': 'bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-800/30 dark:text-dark-primary-400',
    'Remote': 'bg-light-success-light text-light-success-dark dark:bg-dark-success-dark/30 dark:text-dark-success-light',
    'Contract': 'bg-light-primary-200 text-light-primary-900 dark:bg-dark-primary-700/30 dark:text-dark-primary-500',
    'Temporary': 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-900/30 dark:text-dark-primary-300',
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Page reset is handled by useEffect
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    // Page reset is handled by useEffect
  };

  const getCompanyLogo = (logo, company) => {
    // Default to a placeholder if logo is not available
    return logo ? `/company-logos/${logo}.png` : `https://ui-avatars.com/api/?name=${company}&background=random&color=fff`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Applied Jobs <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-normal">({filteredApplications.length})</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background-primary dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors"
            />
          </div>
          <div className="relative">
            <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="pl-10 pr-4 py-2 rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background-primary dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow overflow-hidden border border-light-neutral-200 dark:border-dark-neutral-700">
        <table className="min-w-full divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
          <thead className="bg-light-background-secondary dark:bg-dark-background-tertiary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Jobs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Date Applied
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-light-background-primary dark:bg-dark-background-secondary divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
            {currentItems.map((app) => (
              <tr key={app.id} className="hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={getCompanyLogo(app.logo, app.company)} 
                        alt={app.company}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${app.company}&background=random&color=fff`;
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{app.position}</div>
                      <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <FaBuilding className="mr-1 h-3 w-3" />
                        {app.company}
                      </div>
                      <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <FaMapMarkerAlt className="mr-1 h-3 w-3" />
                        {app.location}
                      </div>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-light-neutral-100 text-light-neutral-700 dark:bg-dark-neutral-700 dark:text-dark-neutral-300'}`}>
                          {app.jobType}
                        </span>
                        <span className="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {app.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <FaCalendarAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                    {app.appliedDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentItems.map((app) => (
          <div key={app.id} className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow p-4 border border-light-neutral-200 dark:border-dark-neutral-700">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12">
                <img 
                  className="h-12 w-12 rounded-full object-cover" 
                  src={getCompanyLogo(app.logo, app.company)} 
                  alt={app.company}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${app.company}&background=random&color=fff`;
                  }}
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{app.position}</div>
                <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <FaBuilding className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                  {app.company}
                </div>
              </div>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <FaMapMarkerAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                {app.location}
              </div>
              <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <FaCalendarAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                {app.appliedDate}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-light-neutral-100 text-light-neutral-700 dark:bg-dark-neutral-700 dark:text-dark-neutral-300'}`}>
                {app.jobType}
              </span>
              <span className="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {app.salary}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredApplications.length === 0 && (
        <div className="text-center py-8 bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow border border-light-neutral-200 dark:border-dark-neutral-700">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No applications found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? 'text-light-neutral-300 dark:text-dark-neutral-600 cursor-not-allowed'
                  : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
              aria-label="Previous page"
            >
              <HiOutlineChevronLeft className="h-5 w-5" />
            </button>
            <div className="px-4 text-sm text-light-text-primary dark:text-dark-text-primary">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-light-neutral-300 dark:text-dark-neutral-600 cursor-not-allowed'
                  : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
              aria-label="Next page"
            >
              <HiOutlineChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
