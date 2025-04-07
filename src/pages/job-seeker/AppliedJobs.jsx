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
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Interviewed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  const jobTypeColors = {
    'Full-time': 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    'Part-time': 'bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
    'Remote': 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200',
    'Contract': 'bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
    'Temporary': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
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
              className="pl-10 pr-4 py-2 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500"
            />
          </div>
          <div className="relative">
            <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="pl-10 pr-4 py-2 rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500"
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
      <div className="hidden md:block bg-white dark:bg-dark-neutral-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
          <thead className="bg-light-neutral-50 dark:bg-dark-neutral-700">
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
          <tbody className="bg-white dark:bg-dark-neutral-800 divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
            {currentItems.map((app) => (
              <tr key={app.id} className="hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700">
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-gray-100 text-gray-800'}`}>
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
                    <FaCalendarAlt className="mr-1 h-3 w-3" />
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
          <div key={app.id} className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-4">
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
                  <FaBuilding className="mr-1 h-3 w-3" />
                  {app.company}
                </div>
              </div>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <FaMapMarkerAlt className="mr-1 h-3 w-3" />
                {app.location}
              </div>
              <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <FaCalendarAlt className="mr-1 h-3 w-3" />
                {app.appliedDate}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-gray-100 text-gray-800'}`}>
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
        <div className="text-center py-8 bg-white dark:bg-dark-neutral-800 rounded-lg shadow">
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
            >
              <HiOutlineChevronLeft className="h-5 w-5" />
            </button>
            <div className="px-4 text-sm text-light-text-primary dark:text-dark-text-primary">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-light-neutral-300 dark:text-dark-neutral-600 cursor-not-allowed'
                  : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
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