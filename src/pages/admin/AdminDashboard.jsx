import React, { useEffect, useState, useCallback } from 'react';
import { getEmployers, getJobSeekers, getJobs, deleteUser, getMessages } from '../../api/adminApi';

import MessageCard from '../../components/admin/MessageCard';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import toast from 'react-hot-toast';
import '../../styles/admin.css';
import { 
  FiUsers, 
  FiBriefcase, 
  FiUserCheck, 
  FiExternalLink,
  FiTrash2,
  FiBarChart2,
  FiMail,
  FiActivity,
  FiSearch,
  FiRefreshCw
} from 'react-icons/fi';
import StatCard from '../../components/admin/StatCard';
import DetailModal from '../../components/admin/DetailModal';
import UserAvatar from '../../components/admin/UserAvatar';

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [employersRes, jobSeekersRes, jobsRes, messagesRes] = await Promise.all([
        getEmployers().catch(() => ({ data: { data: [] } })),
        getJobSeekers().catch(() => ({ data: { data: [] } })),
        getJobs().catch(() => ({ data: { data: [] } })),
        getMessages().catch((error) => {
          console.warn('Messages endpoint not available:', error.message);
          return { data: { data: [] } };
        })
      ]);
      
      // Transform employer data
      const formattedEmployers = (employersRes.data.data || []).map((emp, index) => ({
        id: emp.id || `emp-${Date.now()}-${index}`,
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
      const formattedJobSeekers = (jobSeekersRes.data.data || []).map((js, index) => ({
        id: js.id || `js-${Date.now()}-${index}`,
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

      // Transform messages data - API returns array directly, not nested in data.data
      const messagesData = Array.isArray(messagesRes.data) ? messagesRes.data : (messagesRes.data.data || []);
      const formattedMessages = messagesData.map((msg, index) => ({
        id: msg.id || `temp-${Date.now()}-${index}`,
        firstName: msg.firstName || 'N/A',
        lastName: msg.lastName || 'N/A',
        email: msg.email || 'N/A',
        phone: msg.phone || msg.phoneNumber || '',
        message: msg.message || 'N/A',
        createdAt: msg.createdAt || msg.createdDate || new Date().toISOString()
      }));

      setEmployers(formattedEmployers);
      setJobSeekers(formattedJobSeekers);
      setJobs(jobsRes.data.data || []);
      setMessages(formattedMessages);
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



  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchTerm === '' || 
      msg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only search filtering since read/unread status is not supported
    return matchesSearch;
  });

  const totalMessagesCount = messages.length;

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard data..." />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-blue-100 text-lg">
              Manage your platform's users, jobs, and messages from here.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1">
                <FiActivity className="w-4 h-4" />
                <span className="text-sm">Live Data</span>
              </div>
              <button 
                onClick={fetchData}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1 transition-colors"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span className="text-sm">Refresh</span>
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{employers.length + jobSeekers.length}</div>
            <div className="text-blue-200 text-sm">Total Users</div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <div className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: FiBarChart2 },
            { id: 'messages', label: 'Messages', icon: FiMail, badge: totalMessagesCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Enhanced Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Active Jobs"
              value={jobs.length}
              icon={FiBriefcase}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              change={jobs.length > 0 ? 'Active' : 'None'}
              changeType={jobs.length > 0 ? 'positive' : 'neutral'}
            />
            <StatCard
              title="Total Employers"
              value={employers.length}
              icon={FiUserCheck}
              color="bg-gradient-to-br from-green-500 to-green-600"
              change={employers.length > 0 ? 'Registered' : 'None'}
              changeType={employers.length > 0 ? 'positive' : 'neutral'}
            />
            <StatCard
              title="Total Job Seekers"
              value={jobSeekers.length}
              icon={FiUsers}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              change={jobSeekers.length > 0 ? 'Registered' : 'None'}
              changeType={jobSeekers.length > 0 ? 'positive' : 'neutral'}
            />
            <StatCard
              title="Total Messages"
              value={totalMessagesCount}
              icon={FiMail}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
              change={totalMessagesCount > 0 ? 'Available' : 'None'}
              changeType={totalMessagesCount > 0 ? 'positive' : 'neutral'}
            />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employers Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                    <FiUserCheck className="text-green-600 dark:text-green-400 w-5 h-5" />
                  </div>
                  Recent Employers
                </h3>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                  {employers.length} total
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <ul className="space-y-3">
                  {employers.slice(0, 5).map(emp => (
                    <li
                      key={emp.id}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md"
                      onClick={() => setSelectedEmployer(emp)}
                    >
                      <UserAvatar user={emp} type="employer" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {emp.companyName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {emp.industry} • {emp.companySize}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full font-semibold">
                        {emp.jobsCount} {emp.jobsCount === 1 ? 'job' : 'jobs'}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-400"
                          onClick={e => { e.stopPropagation(); setSelectedEmployer(emp); }}
                          title="View Details"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-700"
                          onClick={e => { e.stopPropagation(); handleDeleteUser(emp.id); }}
                          title="Delete Employer"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {employers.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      View all employers
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Job Seekers Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                    <FiUsers className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                  </div>
                  Recent Job Seekers
                </h3>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                  {jobSeekers.length} total
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <ul className="space-y-3">
                  {jobSeekers.slice(0, 5).map(js => (
                    <li
                      key={js.id}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md"
                      onClick={() => setSelectedJobSeeker(js)}
                    >
                      <UserAvatar user={js} type="jobseeker" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {js.firstName} {js.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {js.yearsOfExperience} years exp • {js.nationality}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-400"
                          onClick={e => { e.stopPropagation(); setSelectedJobSeeker(js); }}
                          title="View Details"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-700"
                          onClick={e => { e.stopPropagation(); handleDeleteUser(js.id); }}
                          title="Delete Job Seeker"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {jobSeekers.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      View all job seekers
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Jobs Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <FiBriefcase className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                  </div>
                  Recent Jobs
                </h3>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                  {jobs.length} total
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <ul className="space-y-3">
                  {jobs.slice(0, 5).map(job => (
                    <li 
                      key={job.id} 
                      className="p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 truncate">
                        {job.companyName || 'Company Name'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.type && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
                            {job.type}
                          </span>
                        )}
                        {job.location && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold">
                            {job.location}
                          </span>
                        )}
                        {job.salary && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold">
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {jobs.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      View all jobs
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Messages Header with Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                    <FiMail className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                  </div>
                  Messages & Contact Forms
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage contact form submissions and user messages
                </p>
              </div>
                              <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                    {messages.length} total
                  </span>
                </div>
            </div>

            {/* Search Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages by name, email, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
              
            </div>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FiMail className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No messages found
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? 'Try adjusting your search criteria.' 
                    : 'No contact form submissions found.'}
                </p>
                {messages.length === 0 && !searchTerm && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Messages are fetched from <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/api/Home/GetAllMessages</code>. This is a read-only view of contact form submissions.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              filteredMessages.map(message => (
                <MessageCard
                  key={message.id}
                  message={message}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Detail Modals */}
      <DetailModal item={selectedEmployer} type="employer" onClose={() => setSelectedEmployer(null)} />
      <DetailModal item={selectedJobSeeker} type="jobseeker" onClose={() => setSelectedJobSeeker(null)} />
    </div>
  );
};

export default AdminDashboard;