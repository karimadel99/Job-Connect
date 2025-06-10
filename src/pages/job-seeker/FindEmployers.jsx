import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiUsers, HiOutlineMail, HiBriefcase } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { getAllEmployers } from '../../api/jobSeekerApi';

const FindEmployers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchEmployers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllEmployers();
      
      if (response.error) {
        setError(response.error);
        return;
      }

      // Filter employers based on search criteria
      let filteredEmployers = response.data;
      
      if (searchQuery) {
        filteredEmployers = filteredEmployers.filter(emp => 
          emp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.industry.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (industry) {
        filteredEmployers = filteredEmployers.filter(emp => 
          emp.industry.toLowerCase() === industry.toLowerCase()
        );
      }
      
      if (location) {
        filteredEmployers = filteredEmployers.filter(emp => 
          emp.address.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Manual pagination
      const ITEMS_PER_PAGE = 9;
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      setEmployers(filteredEmployers.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredEmployers.length / ITEMS_PER_PAGE));
    } catch (err) {
      setError('Failed to fetch employers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEmployers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, industry, location, page]);

  const industries = [
    'Tech',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Construction',
    'Entertainment',
    'Transportation'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Find Employers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {employers.length > 0 ? `Showing ${employers.length} results` : 'No results found'}
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative group">
            <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500" />
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div className="relative group">
            <HiOutlineLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500" />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        /* Employers Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employers.map((employer) => (
            <div
              key={employer.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-bold mr-4">
                    {employer.companyName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {employer.companyName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center">
                      <HiOutlineOfficeBuilding className="mr-1" />
                      {employer.industry}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <HiUsers className="mr-2" />
                    <span>{employer.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <HiOutlineMail className="mr-2" />
                    <span>{employer.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <HiOutlineLocationMarker className="mr-2" />
                    <span>{employer.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <HiBriefcase className="mr-2" />
                    <span>{employer.jobsPostedCount} jobs posted</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/jobseeker/employer-details/${employer.id}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors duration-200 font-medium"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          <div className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FindEmployers; 