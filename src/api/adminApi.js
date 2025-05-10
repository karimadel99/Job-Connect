import api from './axios';

const handleResponse = (response) => {
  if (!response.data) {
    throw new Error('No data received from server');
  }
  return response;
};

// Get all employers
export const getEmployers = () => 
  api.get('/api/Admin/employers')
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching employers:', error);
      throw error;
    });

// Get all job seekers
export const getJobSeekers = () => 
  api.get('/api/Admin/jobseekers')
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching job seekers:', error);
      throw error;
    });

// Delete a user by userId
export const deleteUser = (userId) => 
  api.delete(`/api/Admin/user/${userId}`)
    .then(handleResponse)
    .catch(error => {
      console.error('Error deleting user:', error);
      throw error;
    });

// Get all jobs
export const getJobs = () => 
  api.get('/api/Admin/jobs')
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching jobs:', error);
      throw error;
    });

// Get jobs by tag
export const getJobsByTag = (tag) => 
  api.get(`/api/Admin/jobs-by-tag/${tag}`)
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching jobs by tag:', error);
      throw error;
    }); 