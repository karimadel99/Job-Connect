import React, { useState } from 'react';
import { getJobsByTag } from '../../api/adminApi';

const AdminJobSearchByTag = () => {
  const [tag, setTag] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getJobsByTag(tag);
      setJobs(res.data.data || []);
    } catch (err) {
      setJobs([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder="Enter tag..."
          className="flex-1 w-3/4 px-3 py-2 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-l-lg bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500"
        />
        <button type="submit" className="px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-r-lg font-semibold hover:bg-light-primary-600 dark:hover:bg-dark-primary-600" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className="max-h-48 overflow-y-auto">
        <ul>
          {jobs.map(job => (
            <li key={job.id} className="py-1 border-b last:border-b-0 border-light-neutral-200 dark:border-dark-neutral-700">
              {job.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminJobSearchByTag; 