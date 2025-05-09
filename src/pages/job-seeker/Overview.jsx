import React, { useEffect, useState } from 'react';
import { HiOutlineBriefcase, HiOutlineHeart, HiOutlineBell } from 'react-icons/hi';
import jobsData from '../../data/jobsData.json';
import { Link } from 'react-router-dom';

const Overview = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [jobAlerts, setJobAlerts] = useState(0);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    setAppliedJobs(jobsData.slice(0, 4));
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setFavoriteJobs(jobsData.filter(job => savedJobIds.includes(job.id)));
    setJobAlerts(574);
    setProfileComplete(false);
  }, []);

  function generateRandomAppliedDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023;
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    return `${randomMonth} ${randomDay}, ${randomYear} ${randomHour}:${randomMinute.toString().padStart(2, '0')}`;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background dark:bg-dark-background">
      <h1 className="text-2xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">Hello, Esther Howard</h1>
      <p className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">Here is your daily activities and job alerts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-6 rounded-lg bg-light-neutral-50 dark:bg-dark-neutral-700 flex items-center">
          <HiOutlineBriefcase className="text-3xl text-light-primary-600 dark:text-dark-primary-400 mr-4" />
          <div>
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{appliedJobs.length}</div>
            <div className="text-light-text-secondary dark:text-dark-text-secondary">Applied jobs</div>
          </div>
        </div>
        <div className="p-6 rounded-lg bg-yellow-50 dark:bg-yellow-900 flex items-center">
          <HiOutlineHeart className="text-3xl text-yellow-500 mr-4" />
          <div>
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{favoriteJobs.length}</div>
            <div className="text-light-text-secondary dark:text-dark-text-secondary">Favorite jobs</div>
          </div>
        </div>
      </div>
      {!profileComplete && (
        <div className="bg-red-100 text-red-800 rounded-lg p-6 flex flex-col sm:flex-row items-center mb-6 gap-4 sm:gap-0">
          <img src="/assets/images/avatar-placeholder.png" alt="Profile" className="h-12 w-12 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0" />
          <div className="flex-1 text-center sm:text-left">
            <div className="font-semibold mb-1">Your profile editing is not completed.</div>
            <div className="text-sm">Complete your profile editing &amp; build your custom Resume</div>
          </div>
          <Link to="/jobseeker/dashboard/settings" className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Edit Profile</Link>
        </div>
      )}
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-light-neutral-200 dark:border-dark-neutral-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Recently Applied</h2>
          <Link to="/jobseeker/dashboard/applied-jobs" className="text-light-primary-600 dark:text-dark-primary-400 hover:underline text-sm">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-light-neutral-200 dark:divide-dark-neutral-700 text-sm">
            <thead className="bg-light-neutral-50 dark:bg-dark-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-neutral-800 divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
              {appliedJobs.map((job, idx) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 flex items-center">
                    <img src={`/company-logos/${job.logo}.png`} alt={job.title} className="h-8 w-8 rounded-full mr-3" onError={e => {e.target.onerror=null; e.target.src='https://ui-avatars.com/api/?name='+job.company+'&background=random&color=fff';}} />
                    <div>
                      <div className="font-medium text-light-text-primary dark:text-dark-text-primary">{job.title}</div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{job.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-light-text-primary dark:text-dark-text-primary">{generateRandomAppliedDate()}</td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">Active</td>
                  <td className="px-6 py-4">
                    <Link to={`/jobseeker/job-details/${job.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;