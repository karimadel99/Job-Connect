import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineLocationMarker, 
  HiOutlineMail, 
  HiOutlineGlobe, 
  HiUsers, 
  HiBriefcase,
  HiOutlineCalendar,
  HiOutlinePhone
} from 'react-icons/hi';
import Loader from '../../components/Loader';
import { getEmployerById } from '../../api/jobSeekerApi';

const EmployerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getEmployerById(id);
        
        if (response.error) {
          setError(response.error);
          return;
        }
        
        setEmployer(response.data);
      } catch (err) {
        setError('Failed to fetch employer details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id]);

  const formatSalary = (minSalary, maxSalary, salaryType) => {
    const formatNumber = (num) => new Intl.NumberFormat().format(num);
    const typeLabel = salaryType === 'yearly' ? '/year' : salaryType === 'monthly' ? '/month' : '/hour';
    
    if (minSalary && maxSalary) {
      return `$${formatNumber(minSalary)} - $${formatNumber(maxSalary)} ${typeLabel}`;
    } else if (minSalary) {
      return `$${formatNumber(minSalary)}+ ${typeLabel}`;
    } else if (maxSalary) {
      return `Up to $${formatNumber(maxSalary)} ${typeLabel}`;
    }
    return 'Salary not specified';
  };

  const getJobTypeLabel = (jobType) => {
    const types = {
      fullTime: 'Full Time',
      partTime: 'Part Time',
      contract: 'Contract',
      internship: 'Internship'
    };
    return types[jobType] || jobType;
  };

  const getWorkPlaceLabel = (workPlace) => {
    const places = {
      remote: 'Remote',
      onsite: 'On-site',
      hybrid: 'Hybrid'
    };
    return places[workPlace] || workPlace;
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/jobseeker/find-employers')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Employers
          </button>
        </div>
      </div>
    );
  }

  if (!employer) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Employer Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The employer you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/jobseeker/find-employers')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Employers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
      {/* Employer Header */}
      <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 mb-8 border border-light-neutral-200 dark:border-dark-neutral-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-3xl font-bold mr-6">
              {employer.logoUrl ? (
                <img src={employer.logoUrl} alt={employer.companyName} className="w-full h-full object-cover rounded-lg" />
              ) : (
                employer.companyName.charAt(0)
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                {employer.companyName}
              </h1>
              <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary mb-2">
                <HiOutlineOfficeBuilding className="mr-2" />
                <span>{employer.industry}</span>
              </div>
              <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                <HiOutlineLocationMarker className="mr-2" />
                <span>{employer.address}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/jobseeker/find-employers')}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Employers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Company Description */}
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">About Company</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              {employer.companyDescription || 'No company description available.'}
            </p>
          </div>

          {/* Posted Jobs */}
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Open Positions ({employer.jobs?.length || 0})
            </h2>
            {employer.jobs && employer.jobs.length > 0 ? (
              <div className="space-y-4">
                {employer.jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/jobseeker/job-details/${job.id}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary hover:text-blue-600 dark:hover:text-blue-400">
                        {job.title}
                      </h3>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {job.postedDate}
                      </span>
                    </div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-3 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <div className="flex items-center">
                        <HiOutlineLocationMarker className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <HiBriefcase className="mr-1" />
                        {getJobTypeLabel(job.jobType)}
                      </div>
                      <div className="flex items-center">
                        <HiUsers className="mr-1" />
                        {getWorkPlaceLabel(job.workPlace)}
                      </div>
                      <div className="flex items-center font-medium text-blue-600 dark:text-blue-400">
                        {formatSalary(job.minSalary, job.maxSalary, job.salaryType)}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No open positions available at the moment.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Company Overview */}
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Company Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <HiUsers className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Company Size</p>
                  <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                    {employer.companySize || 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <HiOutlineOfficeBuilding className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Industry</p>
                  <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{employer.industry}</p>
                </div>
              </div>

              {employer.foundingDate && (
                <div className="flex items-center">
                  <HiOutlineCalendar className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Founded</p>
                    <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                      {new Date(employer.foundingDate).getFullYear()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <HiBriefcase className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Open Positions</p>
                  <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                    {employer.jobs?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <HiOutlineMail className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Email</p>
                  <a 
                    href={`mailto:${employer.email}`}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {employer.email}
                  </a>
                </div>
              </div>

              {employer.phoneNumber && (
                <div className="flex items-center">
                  <HiOutlinePhone className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Phone</p>
                    <a 
                      href={`tel:${employer.phoneNumber}`}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {employer.phoneNumber}
                    </a>
                  </div>
                </div>
              )}

              {employer.website && (
                <div className="flex items-center">
                  <HiOutlineGlobe className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Website</p>
                    <a 
                      href={employer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {employer.website}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <HiOutlineLocationMarker className="text-light-text-secondary dark:text-dark-text-secondary mr-3" />
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Address</p>
                  <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{employer.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetails; 