import React, { useState, useEffect, lazy, Suspense } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { updateJob, getJobById } from '../../api/employerApi'; 
const JobFormWizard = lazy(() => import('../../components/employer/JobFormComponents/JobFormWizard'));
const Loader = lazy(() => import('../../components/Loader'));

export default function EditJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const result = await getJobById(jobId); // <-- Fetch from backend
        if (result && result.success && result.data) {
          setJob(result.data);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError('Failed to fetch job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);
  console.log(job);
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        title: values.title,
        tags: values.tags || [],
        description: values.description,
        minSalary: parseInt(values.minSalary) || 0,
        maxSalary: parseInt(values.maxSalary) || 0,
        salaryType: values.salaryType || '',
        education: values.education || '',
        experience: values.experience ? String(values.experience) : '',
        vacancies: parseInt(values.vacancies) || 1,
        expirationDate: values.expirationDate ? new Date(values.expirationDate).toISOString() : null,
        jobType: values.jobType,
        workPlace: values.workPlace,
        responsibilities: values.responsibilities || [],
        location: values.location
      };
      
      console.log('Final update payload before sending:', payload); // Debug log
      
      const result = await updateJob(jobId, payload);
      if (result.success) {
        toast.success('Job updated successfully!');
        navigate('/employer/my-jobs');
      } else {
        toast.error(result.error || 'Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Loader />
        </Suspense>
      </div>
    );
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  return (
    <div>
      <h2 className="text-3xl text-light-text-primary dark:text-dark-text-primary font-bold mb-8 text-center">Edit Job</h2>
      <Suspense fallback={<div>Loading form...</div>}>
        <JobFormWizard job={job} onSubmit={handleSubmit} submitButtonText="Update Job" />
      </Suspense>
    </div>
  );
}
