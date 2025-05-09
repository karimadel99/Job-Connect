import React, { useState } from 'react';
import { HiOutlineBell, HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

const JobAlert = () => {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    keywords: '',
    location: '',
    frequency: 'daily'
  });

  // Sample alerts data (replace with actual data from your backend)
  const alerts = [
    {
      id: 1,
      title: 'Frontend Developer Jobs',
      keywords: 'React, Vue, Angular',
      location: 'San Francisco, CA',
      frequency: 'Daily',
      matchCount: 12,
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      title: 'Remote Full Stack Positions',
      keywords: 'Node.js, Python, Full Stack',
      location: 'Remote',
      frequency: 'Weekly',
      matchCount: 8,
      lastUpdated: '2024-03-14'
    },
    // Add more alerts...
  ];

  const handleCreateAlert = (e) => {
    e.preventDefault();
    // Handle alert creation here
    setShowCreateAlert(false);
    setNewAlert({ title: '', keywords: '', location: '', frequency: 'daily' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Job Alerts
        </h1>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="flex items-center px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-600 text-white rounded-md hover:bg-light-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
        >
          <HiOutlinePlus className="h-5 w-5 mr-2" />
          Create Alert
        </button>
      </div>

      {showCreateAlert && (
        <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">
            Create New Alert
          </h2>
          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                Alert Title
              </label>
              <input
                type="text"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                className="w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary p-2"
                placeholder="e.g., Frontend Developer Jobs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                Keywords
              </label>
              <input
                type="text"
                value={newAlert.keywords}
                onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                className="w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary p-2"
                placeholder="e.g., React, JavaScript, Frontend"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                Location
              </label>
              <input
                type="text"
                value={newAlert.location}
                onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                className="w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary p-2"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                Frequency
              </label>
              <select
                value={newAlert.frequency}
                onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value })}
                className="w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary p-2"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowCreateAlert(false)}
                className="px-4 py-2 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-600 text-white rounded-md hover:bg-light-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
              >
                Create Alert
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <HiOutlineBell className="h-5 w-5 text-light-primary-600 dark:text-dark-primary-500 mr-2" />
                    <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                      {alert.title}
                    </h3>
                  </div>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium">Keywords:</span> {alert.keywords}
                    </p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium">Location:</span> {alert.location}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary-600 dark:hover:text-dark-primary-500 rounded-full hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700">
                    <HiOutlinePencil className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700">
                    <HiOutlineTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    {alert.frequency} updates
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    Last updated: {alert.lastUpdated}
                  </span>
                </div>
                <span className="px-3 py-1 bg-light-primary-50 dark:bg-dark-primary-900 text-light-primary-600 dark:text-dark-primary-500 rounded-full">
                  {alert.matchCount} matches
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobAlert; 