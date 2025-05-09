import React from 'react';
import { toast } from 'react-hot-toast';
import { postJob } from '../../api/employerApi';
import JobForm from '../../components/employer/JobFormComponents/JobForm';

function PostJobPage() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        ...values,
        expirationDate: values.expirationDate ? new Date(values.expirationDate).toISOString() : null,
      };
      
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
      <h2 className="text-3xl font-bold mb-8 text-center">Post a Job</h2>
      <JobForm onSubmit={handleSubmit} submitButtonText="Post Job" />
    </div>
  );
}

export default PostJobPage;