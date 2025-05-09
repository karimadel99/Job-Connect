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
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-light-background dark:bg-dark-background">
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6 mb-8">
        <JobHeader job={job} setShowModal={setShowModal} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Job Description</h2>
            <JobDescription description={job.description} />
          </div>
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Responsibilities</h2>
            <Responsibilities responsibilities={job.responsibilities} />
          </div>
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6 flex flex-col gap-2">
            <ShareJob job={job} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6">
            <JobOverview job={job} />
          </div>
          <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6">
            <CompanyInfo job={job} />
          </div>
        </div>
      </div>
      // In your JSX:
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Related Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedJobs.map(related => (
            <div key={related.id} className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <img src={`/company-logos/${related.logo}.png`} alt={related.company} className="h-8 w-8 rounded-full" />
                <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{related.title}</span>
              </div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{related.company}</span>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{related.location}</span>
              <span className="text-xs text-light-primary-600 dark:text-dark-primary-400">{related.salary}</span>
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