import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { getAppliedJobs } from '../../api/jobSeekerApi';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getAppliedJobs();
      if (response.error) {
        toast.error(response.error);
      } else {
        const appliedJobsWithStatus = (response.data || []).map(job => {
          // Get the current user's application status from the applicants array
          const userApplication = job.applicants && job.applicants.length > 0 ? job.applicants[0] : null;
          const applicationStatus = userApplication ? userApplication.status : 'Pending';
          
          // Format application date
          let formattedApplicationDate = 'N/A';
          if (userApplication && userApplication.applicationDate) {
            const date = new Date(userApplication.applicationDate);
            formattedApplicationDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          }
          
          return {
            ...job,
            applicationStatus: applicationStatus,
            applicationDate: userApplication ? userApplication.applicationDate : null,
            formattedApplicationDate: formattedApplicationDate,
            isExpired: job.daysRemaining === 0
          };
        });
        setApplications(appliedJobsWithStatus);
      }
    } catch (error) {
      toast.error('Failed to fetch applied jobs');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to page 1 when search query or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'accepted': 'bg-light-success-light text-light-success-dark dark:bg-dark-success-dark/30 dark:text-dark-success-light',
    'rejected': 'bg-light-error-light text-light-error-dark dark:bg-dark-error-dark/30 dark:text-dark-error-light',
  };

  const jobTypeColors = {
    'fullTime': 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-900/30 dark:text-dark-primary-300',
    'partTime': 'bg-light-primary-100 text-light-primary-800 dark:bg-dark-primary-800/30 dark:text-dark-primary-400',
    'remote': 'bg-light-success-light text-light-success-dark dark:bg-dark-success-dark/30 dark:text-dark-success-light',
    'contract': 'bg-light-primary-200 text-light-primary-900 dark:bg-dark-primary-700/30 dark:text-dark-primary-500',
    'temporary': 'bg-light-primary-50 text-light-primary-700 dark:bg-dark-primary-900/30 dark:text-dark-primary-300',
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (app.employer?.companyName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.applicationStatus?.toLowerCase() === statusFilter.toLowerCase();
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background-primary dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors"
            />
          </div>
          <div className="relative">
            <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background-primary dark:bg-dark-background-tertiary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500 transition-colors"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow overflow-hidden border border-light-neutral-200 dark:border-dark-neutral-700">
            <table className="min-w-full divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
              <thead className="bg-light-background-secondary dark:bg-dark-background-tertiary">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    Jobs
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    Applied
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
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                            {app.employer?.companyName?.[0]?.toUpperCase() || 'C'}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{app.title}</div>
                          <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <FaBuilding className="mr-1 h-3 w-3" />
                            {app.employer?.companyName || 'Company'}
                          </div>
                          <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
                            {app.location}
                          </div>
                          <div className="mt-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-light-neutral-100 text-light-neutral-700 dark:bg-dark-neutral-700 dark:text-dark-neutral-300'}`}>
                              {app.jobType}
                            </span>
                            {app.minSalary && app.maxSalary && (
                              <span className="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                ${app.minSalary.toLocaleString()} - ${app.maxSalary.toLocaleString()} /{app.salaryType}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <FaCalendarAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                        {app.formattedApplicationDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.applicationStatus?.toLowerCase()] || 'bg-light-neutral-100 text-light-neutral-700'}`}>
                        {app.applicationStatus || 'Pending'}
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
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                      {app.employer?.companyName?.[0]?.toUpperCase() || 'C'}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{app.title}</div>
                    <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <FaBuilding className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                      {app.employer?.companyName || 'Company'}
                    </div>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.applicationStatus?.toLowerCase()] || 'bg-light-neutral-100 text-light-neutral-700'}`}>
                    {app.applicationStatus || 'Pending'}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <FaMapMarkerAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                    {app.location}
                  </div>
                  <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <FaCalendarAlt className="mr-1 h-3 w-3 text-light-primary-500 dark:text-dark-primary-400" />
                    {app.formattedApplicationDate}
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobTypeColors[app.jobType] || 'bg-light-neutral-100 text-light-neutral-700 dark:bg-dark-neutral-700 dark:text-dark-neutral-300'}`}>
                    {app.jobType}
                  </span>
                  {app.minSalary && app.maxSalary && (
                    <span className="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      ${app.minSalary.toLocaleString()} - ${app.maxSalary.toLocaleString()} /{app.salaryType}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredApplications.length === 0 && !isLoading && (
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
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
