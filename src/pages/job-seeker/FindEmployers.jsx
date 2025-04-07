import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';

const FindEmployers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');

  // Sample employers data (replace with actual data from your backend)
  const employers = [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      industry: 'Technology',
      location: 'San Francisco, CA',
      description: 'Leading technology solutions provider',
      employeeCount: '1000-5000',
      logo: 'https://via.placeholder.com/100'
    },
    // Add more sample employers...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
        Find Employers
      </h1>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary"
            />
          </div>
          <div className="relative">
            <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="pl-10 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary"
            >
              <option value="">All Industries</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              {/* Add more industries */}
            </select>
          </div>
          <div className="relative">
            <HiOutlineLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Employers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employers.map((employer) => (
          <div
            key={employer.id}
            className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={employer.logo}
                  alt={employer.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                    {employer.name}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    {employer.industry}
                  </p>
                </div>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {employer.description}
              </p>
              <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                <HiOutlineLocationMarker className="mr-2" />
                <span>{employer.location}</span>
              </div>
              <div className="mt-4">
                <button className="w-full bg-light-primary-50 dark:bg-dark-primary-900 text-light-primary-600 dark:text-dark-primary-500 py-2 rounded-md hover:bg-light-primary-100 dark:hover:bg-dark-primary-800 transition-colors duration-200">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindEmployers; 