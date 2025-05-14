import React, { useEffect, useState, useCallback } from 'react';
import { getEmployers, getJobSeekers, getJobs, deleteUser } from '../../api/adminApi';
import AdminJobSearchByTag from '../../components/admin/AdminJobSearchByTag';
import AdminDeleteUser from '../../components/admin/AdminDeleteUser';
import toast from 'react-hot-toast';
import { 
  FiUsers, 
  FiBriefcase, 
  FiUserCheck, 
  FiAlertCircle, 
  FiExternalLink,
  FiTrash2,
  FiBarChart2
} from 'react-icons/fi';
import StatCard from '../../components/admin/StatCard';
import DetailModal from '../../components/admin/DetailModal';
import UserAvatar from '../../components/admin/UserAvatar';

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [employersRes, jobSeekersRes, jobsRes] = await Promise.all([
        getEmployers(),
        getJobSeekers(),
        getJobs()
      ]);
      
      // Transform employer data
      const formattedEmployers = (employersRes.data.data || []).map(emp => ({
        id: emp.id || 'N/A',
        companyName: emp.companyName || 'N/A',
        email: emp.email || 'N/A',
        industry: emp.industry || 'N/A',
        companySize: emp.companySize || 'N/A',
        website: emp.website || 'N/A',
        address: emp.address || 'N/A',
        companyDescription: emp.companyDescription || 'N/A',
        logoUrl: emp.logoUrl || 'N/A',
        foundingDate: emp.foundingDate || 'N/A',
        phoneNumber: emp.phoneNumber || 'N/A',
        jobsCount: emp.jobsCount || 0
      }));

      // Transform job seeker data
      const formattedJobSeekers = (jobSeekersRes.data.data || []).map(js => ({
        id: js.id || 'N/A',
        firstName: js.firstName || 'N/A',
        lastName: js.lastName || 'N/A',
        email: js.email || 'N/A',
        address: js.address || 'N/A',
        yearsOfExperience: js.yearsOfExperience || 'N/A',
        dateOfBirth: js.dateOfBirth || 'N/A',
        nationality: js.nationality || 'N/A',
        maritalStatus: js.maritalStatus || 'N/A',
        gender: js.gender || 'N/A',
        education: js.education || 'N/A'
      }));

      setEmployers(formattedEmployers);
      setJobSeekers(formattedJobSeekers);
      setJobs(jobsRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-primary-400"></div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-lg p-6 text-light-text-primary dark:text-dark-text-primary shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="mt-2 opacity-90">
              Manage your platform's users, jobs, and settings from here.
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Jobs"
            value={jobs.length}
            icon={FiBriefcase}
            color="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
            change={'+5%'}
            changeType="positive"
          />
          <StatCard
            title="Total Employers"
            value={employers.length}
            icon={FiUserCheck}
            color="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700"
            change={'+2%'}
            changeType="positive"
          />
          <StatCard
            title="Total Job Seekers"
            value={jobSeekers.length}
            icon={FiUsers}
            color="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700"
            change={'+8%'}
            changeType="positive"
          />
          <StatCard
            title="Total Users"
            value={employers.length + jobSeekers.length}
            icon={FiBarChart2}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700"
            change={'+5%'}
            changeType="positive"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employers Section */}
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-light-neutral-100 dark:border-dark-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <FiUserCheck className="text-green-500" /> Recent Employers
              </h3>
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-neutral-100 dark:bg-dark-neutral-700 px-3 py-1 rounded-full">
                {employers.length} total
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <ul className="space-y-2">
                {employers.slice(0, 5).map(emp => (
                  <li
                    key={emp.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors cursor-pointer group border border-transparent hover:border-light-neutral-200 dark:hover:border-dark-neutral-600"
                    onClick={() => setSelectedEmployer(emp)}
                  >
                    <UserAvatar user={emp} type="employer" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                        {emp.companyName}
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate">
                        {emp.industry} • {emp.companySize}
                      </p>
                    </div>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                      {emp.jobsCount} {emp.jobsCount === 1 ? 'job' : 'jobs'}
                    </span>
                    <button
                      className="p-2 rounded-full hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors text-light-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100"
                      onClick={e => { e.stopPropagation(); setSelectedEmployer(emp); }}
                      title="View Details"
                    >
                      <FiExternalLink />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
                      onClick={e => { e.stopPropagation(); handleDeleteUser(emp.id); }}
                      title="Delete Employer"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
              {employers.length > 5 && (
                <div className="flex justify-center mt-4">
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    View all employers
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Job Seekers Section */}
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-light-neutral-100 dark:border-dark-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <FiUsers className="text-purple-500" /> Recent Job Seekers
              </h3>
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-neutral-100 dark:bg-dark-neutral-700 px-3 py-1 rounded-full">
                {jobSeekers.length} total
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <ul className="space-y-2">
                {jobSeekers.slice(0, 5).map(js => (
                  <li
                    key={js.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors cursor-pointer group border border-transparent hover:border-light-neutral-200 dark:hover:border-dark-neutral-600"
                    onClick={() => setSelectedJobSeeker(js)}
                  >
                    <UserAvatar user={js} type="jobseeker" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                        {js.firstName} {js.lastName}
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate">
                        {js.yearsOfExperience} years exp • {js.nationality}
                      </p>
                    </div>
                    <button
                      className="p-2 rounded-full hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors text-light-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100"
                      onClick={e => { e.stopPropagation(); setSelectedJobSeeker(js); }}
                      title="View Details"
                    >
                      <FiExternalLink />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
                      onClick={e => { e.stopPropagation(); handleDeleteUser(js.id); }}
                      title="Delete Job Seeker"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
              {jobSeekers.length > 5 && (
                <div className="flex justify-center mt-4">
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    View all job seekers
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Jobs Section */}
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-light-neutral-100 dark:border-dark-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <FiBriefcase className="text-blue-500" /> Recent Jobs
              </h3>
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-neutral-100 dark:bg-dark-neutral-700 px-3 py-1 rounded-full">
                {jobs.length} total
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <ul className="space-y-3">
                {jobs.slice(0, 5).map(job => (
                  <li 
                    key={job.id} 
                    className="p-4 rounded-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors cursor-pointer group border border-transparent hover:border-light-neutral-200 dark:hover:border-dark-neutral-600"
                  >
                    <p className="font-medium text-light-text-primary dark:text-dark-text-primary line-clamp-2">
                      {job.title}
                    </p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1 truncate">
                      {job.companyName || 'Company Name'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.type && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                          {job.type}
                        </span>
                      )}
                      {job.location && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
                          {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium">
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {jobs.length > 5 && (
                <div className="flex justify-center mt-4">
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    View all jobs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modals */}
      <DetailModal item={selectedEmployer} type="employer" onClose={() => setSelectedEmployer(null)} />
      <DetailModal item={selectedJobSeeker} type="jobseeker" onClose={() => setSelectedJobSeeker(null)} />
    </div>
  );
};

export default AdminDashboard;