import React, { useEffect, useState } from 'react';
import OverviewStats from '../../components/employer/OverviewStats';
import RecentJobs from '../../components/employer/RecentJobs';
import statsData from '../../data/overviewStats.json';
import jobsData from '../../data/recentJobsData.json';

const OverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    // Set stats and only the first 5 jobs
    setStats(statsData);
    setRecentJobs(jobsData.slice(0, 5));
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
      <RecentJobs jobs={recentJobs} />
    </div>
  );
};

export default OverviewPage;
