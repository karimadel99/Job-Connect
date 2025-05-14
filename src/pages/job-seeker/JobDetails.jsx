import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { getJobById, getAllJobs } from '../../api/jobSeekerApi';
// Remove: import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resumes] = useState([
    { id: 1, name: 'Software_Engineer_Resume.pdf' },
    { id: 2, name: 'Frontend_Developer_Resume.pdf' },
    { id: 3, name: 'UX_Designer_Resume.pdf' },
  ]);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
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
          setRelatedJobs(allJobs.data.filter(j => String(j.id) !== String(id)).slice(0, 6));
        }
      } catch (error) {
        setRelatedJobs([]);
      }
    };
    fetchRelatedJobs();
  }, [id]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowModal(false);
      setSelectedResume('');
      setCoverLetter('');
      alert('Application submitted successfully!');
    }, 1000);
  };

  if (loading) return <Loader />;
  if (!job) return <NotFoundState />;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background-tertiary dark:bg-dark-background-primary">
      <div className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-6 mb-8 border border-light-neutral-200 dark:border-dark-neutral-700">
        <JobHeader job={job} setShowModal={setShowModal} />
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
        <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Related Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {relatedJobs.map(related => (
            <div key={related.id} className="bg-light-background-primary dark:bg-dark-background-secondary rounded-lg shadow-sm p-4 flex flex-col gap-2 border border-light-neutral-200 dark:border-dark-neutral-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-light-primary-50 dark:bg-dark-primary-50 flex items-center justify-center overflow-hidden">
                  {related.logo ? (
                    <img src={`/company-logos/${related.logo}.png`} alt={related.company} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-light-primary-600 dark:text-dark-primary-400 font-medium">
                      {related.company ? related.company.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{related.title}</span>
              </div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{related.company}</span>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                <svg className="w-3 h-3 mr-1 text-light-primary-500 dark:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {related.location}
              </span>
              <span className="text-xs font-medium text-light-primary-600 dark:text-dark-primary-400 mt-1">{related.salary}</span>
            </div>
          ))}
        </div>
      </section>
      {showModal && (
        <ApplicationModal
          job={job}
          showModal={showModal}
          setShowModal={setShowModal}
          resumes={resumes}
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