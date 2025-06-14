import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobHeader from '../../components/job-seeker/job-details/JobHeader';
import JobDescription from '../../components/job-seeker/job-details/JobDescription';
import Responsibilities from '../../components/job-seeker/job-details/Responsibilities';
import ShareJob from '../../components/job-seeker/job-details/ShareJob';
import JobOverview from '../../components/job-seeker/job-details/JobOverview';
import CompanyInfo from '../../components/job-seeker/job-details/CompanyInfo';
import ApplicationModal from '../../components/job-seeker/job-details/ApplicationModal';
import NotFoundState from '../../components/job-seeker/job-details/NotFoundState';
//import jobsData from '../../data/jobsData.json';
import Loader from '../../components/Loader';
import { getJobById, getAllJobs, getResumes, applyForJobByResumeId, getRecommendedJobs, getAppliedJobs, getSavedJobs, getSeekerProfile } from '../../api/jobSeekerApi';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [recommendedError, setRecommendedError] = useState('');
  const [showRecommendationMsg, setShowRecommendationMsg] = useState(false);
  const [seekerId, setSeekerId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);

  // Debug function to check application data
  const debugApplicationData = () => {
    console.log('=== DEBUG APPLICATION DATA ===');
    console.log('Job ID:', job?.id);
    console.log('Selected Resume:', selectedResume);
    console.log('Available Resumes:', resumes);
    console.log('Cover Letter Length:', coverLetter?.length || 0);
    console.log('Resumes Loading:', resumesLoading);
    console.log('Form Submitting:', submitting);
    console.log('Already Applied:', hasAlreadyApplied);
    console.log('Applied Jobs:', appliedJobs);
    console.log('================================');
  };

  useEffect(() => {
    setLoading(true);
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        const jobWithExpired = {
          ...response.data,
          isExpired: response.data.daysRemaining === 0
        };
        setJob(jobWithExpired);
      } catch (error) {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const allJobs = await getAllJobs();
        if (allJobs.data) {
          const relatedJobsWithExpired = allJobs.data
            .filter(j => String(j.id) !== String(id))
            .slice(0, 6)
            .map(job => ({
              ...job,
              isExpired: job.daysRemaining === 0
            }));
          setRelatedJobs(relatedJobsWithExpired);
        }
      } catch (error) {
        setRelatedJobs([]);
      }
    };
    fetchRelatedJobs();
  }, [id]);

  useEffect(() => {
    const fetchResumes = async () => {
      setResumesLoading(true);
      try {
        const response = await getResumes();
        if (response.data) {
          setResumes(response.data);
        } else if (response.error) {
          console.error('Failed to fetch resumes:', response.error);
          setResumes([]);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
        setResumes([]);
      } finally {
        setResumesLoading(false);
      }
    };
    fetchResumes();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setRecommendedLoading(true);
      setRecommendedError('');
      try {
        const seekerProfile = await getSeekerProfile();
        if (seekerProfile && seekerProfile.data && seekerProfile.data.id) {
          setSeekerId(seekerProfile.data.id);
          const [applied, saved] = await Promise.all([
            getAppliedJobs(),
            getSavedJobs()
          ]);
          const appliedCount = Array.isArray(applied.data) ? applied.data.length : 0;
          const savedCount = Array.isArray(saved.data) ? saved.data.length : 0;
          if (appliedCount === 0 && savedCount === 0) {
            setShowRecommendationMsg(true);
            setRecommendedJobs([]);
          } else {
            setShowRecommendationMsg(false);
            const recRes = await getRecommendedJobs(seekerProfile.data.id, 10);
            if (recRes && recRes.data && Array.isArray(recRes.data.recommendations) && recRes.data.recommendations.length > 0) {
              setRecommendedJobs(recRes.data.recommendations);
            } else if (recRes.error) {
              setRecommendedError(`Unable to load recommendations: ${recRes.error}`);
              setRecommendedJobs([]);
            } else {
              setRecommendedError('No recommendations found.');
              setRecommendedJobs([]);
            }
          }
        } else {
          setRecommendedError('Could not determine seeker profile.');
        }
      } catch (err) {
        setRecommendedError('Failed to fetch recommendations.');
        setRecommendedJobs([]);
      } finally {
        setRecommendedLoading(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  // Check if user has already applied for this job
  useEffect(() => {
    const checkIfAlreadyApplied = async () => {
      try {
        const response = await getAppliedJobs();
        if (response.data && Array.isArray(response.data)) {
          setAppliedJobs(response.data);
          const hasApplied = response.data.some(appliedJob => String(appliedJob.id) === String(id));
          setHasAlreadyApplied(hasApplied);
          console.log('Already applied check:', {
            jobId: id,
            appliedJobIds: response.data.map(j => j.id),
            hasApplied
          });
        }
      } catch (error) {
        console.error('Error checking applied jobs:', error);
      }
    };
    
    if (id) {
      checkIfAlreadyApplied();
    }
  }, [id]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Check if already applied
    if (hasAlreadyApplied) {
      alert('You have already applied for this job.');
      setSubmitting(false);
      return;
    }
    
    // Validation
    if (!selectedResume) {
      alert('Please select a resume to continue with your application.');
      setSubmitting(false);
      return;
    }
    
    if (!coverLetter.trim()) {
      alert('Please write a cover letter to continue with your application.');
      setSubmitting(false);
      return;
    }
    
    try {
      console.log('Applying for job:', {
        jobId: job.id,
        resumeId: selectedResume,
        coverLetterLength: coverLetter.length
      });
      
      const response = await applyForJobByResumeId(job.id, selectedResume, coverLetter);
      
      console.log('Application response:', response);
      
      if (response.error) {
        console.error('Application failed:', response.error);
        
        // Handle specific database constraint error
        if (response.isDbConstraintError || response.error.includes('entity changes') || response.error.includes('constraint')) {
          // The application might have been saved despite the error, so refresh the applied jobs
          try {
            const appliedJobsResponse = await getAppliedJobs();
                         if (appliedJobsResponse.data && Array.isArray(appliedJobsResponse.data)) {
               const hasApplied = appliedJobsResponse.data.some(appliedJob => String(appliedJob.id) === String(job.id));
               if (hasApplied) {
                 toast.success('Application submitted successfully!');
                 setHasAlreadyApplied(true);
                 setShowModal(false);
                 setSelectedResume('');
                 setCoverLetter('');
                 return;
               }
             }
          } catch (checkError) {
            console.error('Error checking if application was saved:', checkError);
          }
          
          alert(`Database error occurred: ${response.error}. Please try again or contact support if the issue persists.`);
        } else {
          alert(`Failed to apply: ${response.error}`);
        }
              } else {
        toast.success('Application submitted successfully!');
        setHasAlreadyApplied(true);
        setShowModal(false);
        setSelectedResume('');
        setCoverLetter('');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!job) return <NotFoundState />;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
      <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 mb-8 border border-light-neutral-200 dark:border-dark-neutral-700">
        <JobHeader job={job} setShowModal={setShowModal} hasAlreadyApplied={hasAlreadyApplied} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Job Description</h2>
            <JobDescription description={job.description} />
          </div>
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Responsibilities</h2>
            <Responsibilities responsibilities={job.responsibilities} />
          </div>
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 flex flex-col gap-2 border border-light-neutral-200 dark:border-dark-neutral-700">
            <ShareJob job={job} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <JobOverview job={job} />
          </div>
          <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 border border-light-neutral-200 dark:border-dark-neutral-700">
            <CompanyInfo job={job} />
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Recommended Jobs</h2>
        {recommendedLoading ? (
          <Loader />
        ) : showRecommendationMsg ? (
          <div className="p-4 bg-yellow-50 dark:bg-dark-neutral-800 rounded-lg border border-yellow-200 dark:border-dark-neutral-700 text-yellow-800 dark:text-yellow-200">
            To get personalized recommendations, please save or apply for at least one job.
          </div>
        ) : recommendedError ? (
          <div className="p-4 bg-red-50 dark:bg-dark-neutral-800 rounded-lg border border-red-200 dark:border-dark-neutral-700 text-red-800 dark:text-red-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">Recommendations Unavailable</p>
                <p className="text-sm mt-1">{recommendedError}</p>
                {recommendedError.includes('timeout') && (
                  <p className="text-sm mt-1">The recommendation service might be sleeping. Please try refreshing the page in a moment.</p>
                )}
              </div>
            </div>
          </div>
        ) : recommendedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {recommendedJobs.map(rec => (
              <div 
                key={rec.Id || rec.id} 
                className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-4 flex flex-col gap-2 border border-light-neutral-200 dark:border-dark-neutral-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/jobseeker/job-details/${rec.Id}`)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-light-primary-50 dark:bg-dark-primary-50 flex items-center justify-center overflow-hidden">
                    <span className="text-light-primary-600 dark:text-dark-primary-400 font-medium">
                      {rec.company ? rec.company.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{rec.Title}</span>
                  </div>
                </div>
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{rec.company}</span>
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">{rec.Location}</span>
                <span className="text-xs font-medium text-light-primary-600 dark:text-dark-primary-400 mt-1">
                  ${rec.MinSalary.toLocaleString()} - ${rec.MaxSalary.toLocaleString()} /{rec.SalaryType}
                </span>
                {rec.skills && rec.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rec.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs bg-light-primary-50 dark:bg-dark-primary-900/30 text-light-primary-600 dark:text-dark-primary-400 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {rec.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-light-neutral-100 dark:bg-dark-neutral-800 text-light-text-secondary dark:text-dark-text-secondary rounded-full">
                        +{rec.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-light-text-secondary dark:text-dark-text-secondary">No recommendations available.</div>
        )}
      </section>
      {showModal && (
        <ApplicationModal
          job={job}
          showModal={showModal}
          setShowModal={setShowModal}
          resumes={resumes}
          resumesLoading={resumesLoading}
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          submitting={submitting}
          handleApplySubmit={handleApplySubmit}
        />
      )}
    </div>
  );
};

export default JobDetails;