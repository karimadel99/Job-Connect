import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineBriefcase, HiOutlineLocationMarker } from 'react-icons/hi';

const FavoriteJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample favorite jobs data (replace with actual data from your backend)
  const favoriteJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      postedDate: '2024-03-15',
      logo: 'https://via.placeholder.com/40',
      description: 'We are looking for an experienced Frontend Developer to join our team...'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Innovation Labs',
      location: 'Remote',
      salary: '$100k - $130k',
      type: 'Full-time',
      postedDate: '2024-03-14',
      logo: 'https://via.placeholder.com/40',
      description: 'Join our dynamic team as a Full Stack Engineer...'
    },
    // Add more favorite jobs...
  ];

  const filteredJobs = favoriteJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Favorite Jobs
        </h1>
        <div className="relative w-full sm:w-64">
          <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-neutral-400 dark:text-dark-neutral-400" />
          <input
            type="text"
            placeholder="Search saved jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                      {job.title}
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      {job.company}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                        <HiOutlineLocationMarker className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                        <HiOutlineBriefcase className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-light-primary-600 dark:text-dark-primary-500 hover:text-light-primary-700 dark:hover:text-dark-primary-400">
                  <HiOutlineHeart className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                  {job.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {job.salary}
                  </span>
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Posted on {job.postedDate}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-light-primary-50 dark:bg-dark-primary-900 text-light-primary-600 dark:text-dark-primary-500 rounded-md hover:bg-light-primary-100 dark:hover:bg-dark-primary-800 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-600 text-white rounded-md hover:bg-light-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteJobs; 