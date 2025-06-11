import React from 'react';
import { toast } from 'react-hot-toast';
import { postJob } from '../../api/employerApi';
import JobFormWizard from '../../components/employer/JobFormComponents/JobFormWizard';

function PostJobPage() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
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
      
      console.log('Final payload before sending:', payload); // Additional debug log
      
      const result = await postJob(payload);
      
      if (result.success) {
        toast.success('Job posted successfully!');
        resetForm();
      } else {
        toast.error(result.error || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-light-text-primary dark:text-dark-text-primary font-bold mb-8 text-center">Post a Job</h2>
      <JobFormWizard onSubmit={handleSubmit} submitButtonText="Post Job" />
    </div>
  );
}

export default PostJobPage;