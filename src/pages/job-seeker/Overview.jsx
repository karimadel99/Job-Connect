import React, { useEffect, useState } from 'react';
import { HiOutlineBriefcase, HiOutlineHeart, HiOutlineBell } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getAppliedJobs, getSavedJobs } from '../../api/jobSeekerApi';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';

const Overview = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [appliedJobsResponse, savedJobsResponse] = await Promise.all([
        getAppliedJobs(),
        getSavedJobs()
      ]);

      if (appliedJobsResponse.error) {
        toast.error(appliedJobsResponse.error);
      } else {
        const appliedJobsWithExpired = (appliedJobsResponse.data || []).map(job => ({
          ...job,
          isExpired: job.daysRemaining === 0
        }));
        setAppliedJobs(appliedJobsWithExpired);
      }

      if (savedJobsResponse.error) {
        toast.error(savedJobsResponse.error);
      } else {
        const savedJobsWithExpired = (savedJobsResponse.data || []).map(job => ({
          ...job,
          isExpired: job.daysRemaining === 0
        }));
        setSavedJobs(savedJobsWithExpired);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background dark:bg-dark-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-light-text-primary dark:text-dark-text-primary">Dashboard Overview</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">Track your job applications and saved positions</p>
        </div>
        <button 
          onClick={fetchDashboardData} 
          className="px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-400 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center">
            <HiOutlineBriefcase className="text-4xl opacity-90 mr-4" />
            <div>
              <div className="text-3xl font-bold">{appliedJobs.length || 0}</div>
              <div className="text-blue-100">Applied jobs</div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center">
            <HiOutlineHeart className="text-4xl opacity-90 mr-4" />
            <div>
              <div className="text-3xl font-bold">{savedJobs.length || 0}</div>
              <div className="text-purple-100">Saved jobs</div>
            </div>
          </div>
        </div>
      </div>

      {!profileComplete && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center mb-8 gap-4 sm:gap-0 shadow-lg">
          <div className="flex-1 text-center sm:text-left">
            <div className="font-semibold text-xl mb-1">Complete Your Profile</div>
            <div className="text-white/90">Enhance your job search by completing your profile and building a custom resume</div>
          </div>
          <Link 
            to="/jobseeker/dashboard/settings" 
            className="px-6 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md"
          >
            Edit Profile
          </Link>
        </div>
      )}

      <div className="bg-white dark:bg-dark-neutral-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-light-neutral-200 dark:border-dark-neutral-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Recent Applications</h2>
          <Link 
            to="/jobseeker/dashboard/applied-jobs" 
            className="text-light-primary-600 dark:text-dark-primary-400 hover:underline font-medium"
          >
            View all applications
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : appliedJobs.length === 0 ? (
          <div className="p-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
            You haven't applied to any jobs yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
              <thead className="bg-light-neutral-50 dark:bg-dark-neutral-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Job Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-neutral-800 divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
                {appliedJobs.slice(0, 5).map((job) => (
                  <tr key={job.id} className="hover:bg-light-neutral-50 dark:hover:bg-dark-neutral-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                          {job.employer?.companyName?.[0]?.toUpperCase() || 'C'}
                        </div>
                        <div>
                          <div className="font-medium text-light-text-primary dark:text-dark-text-primary">{job.title}</div>
                          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {job.employer?.companyName || 'Company'} • {job.location}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                              {job.jobType}
                            </span>
                            {job.shortListed && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                                Shortlisted
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-light-text-secondary dark:text-dark-text-secondary">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/jobseeker/job-details/${job.id}`}
                        className="inline-flex items-center px-4 py-2 bg-light-primary-600 dark:bg-dark-primary-400 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;