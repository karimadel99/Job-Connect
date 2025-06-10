import React, { useEffect, useState } from 'react';
import { FiRefreshCw, FiActivity } from 'react-icons/fi';
import OverviewStats from '../../components/employer/OverviewStats';
import RecentJobs from '../../components/employer/RecentJobs';
import statsData from '../../data/overviewStats.json';
import { getRecentJobs, getJobStates } from '../../api/employerApi';
import Loader from '../../components/Loader';
import { useAuth } from '../../contexts/AuthContext';

const OverviewPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(statsData); // fallback default
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, statsRes] = await Promise.all([
        getRecentJobs(),
        getJobStates()
      ]);

      if (jobsRes.success) {
        setRecentJobs(jobsRes.data);
      } else {
        setError(jobsRes.error || 'Failed to fetch recent jobs');
      }

      if (statsRes.success) {
        setStats(statsRes.data);
      } else {
        setError(statsRes.error || 'Failed to fetch job states');
      }

    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Stats Section */}
      {stats && (
        <OverviewStats
          jobsCount={stats.jobsCount}
          candidatesCount={stats.candidatesCount}
        />
      )}

      {/* Recent Jobs Section */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
          <Loader />
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your recent jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg border border-red-200 dark:border-red-800">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <RecentJobs jobs={recentJobs} />
      )}
    </div>
  );
};

export default OverviewPage;
