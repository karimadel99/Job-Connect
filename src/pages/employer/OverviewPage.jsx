import React, { useEffect, useState } from 'react';
import OverviewStats from '../../components/employer/OverviewStats';
import RecentJobs from '../../components/employer/RecentJobs';
import statsData from '../../data/overviewStats.json';
import { getRecentJobs, getJobStates } from '../../api/employerApi';
import Loader from '../../components/Loader';

const OverviewPage = () => {
  const [stats, setStats] = useState(statsData); // fallback default
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {/* Stats Section */}
      {stats && (
        <OverviewStats
          jobsCount={stats.jobsCount}
          candidatesCount={stats.candidatesCount}
        />
      )}

      {/* Recent Jobs Section */}
      {loading ? (
        <div className="text-center py-4"><Loader /></div>
      ) : error ? (
        <div className="text-red-500 py-4">{error}</div>
      ) : (
        <RecentJobs jobs={recentJobs} />
      )}
    </div>
  );
};

export default OverviewPage;
