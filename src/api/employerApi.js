import apiClient from './axios';

// Get recent jobs for employer dashboard
export const getRecentJobs = async () => {
  try {
    const response = await apiClient.get('/api/employer/GetRecentJobs');
    return {
      success: true,
      data: response.data.data // Access the data array inside the response
    };
  }  catch (error) {
    if (error.response && error.response.status === 404) {
      // No jobs found, treat as empty list
      return { success: true, data: [] };
    }
    return { success: false, error: error.message };
  }
};
// Get all jobs for employer 
export const getAllJobs = async () => {
  try {
    const response = await apiClient.get('/api/employer/GetAllJobs');
    return {
      success: true,
      data: response.data.data // Access the data array inside the response
    };
  }  catch (error) {
    if (error.response && error.response.status === 404) {
      // No jobs found, treat as empty list
      return { success: true, data: [] };
    }
    return { success: false, error: error.message };
  }
};


export const getJobStates = async () => {
  try {
    const response = await apiClient.get('/api/employer/GetJobStats');
    return {
      success: true,
      data: response.data.data // Access the data array inside the response
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch job states'
    };
  }
};

// Post a new job
export const postJob = async (jobData) => {
  try {
    const response = await apiClient.post('/api/employer/PostJob', jobData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to post job'
    };
  }
};

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/api/employer/DeleteJob?id=${id}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete job'
    };
  }
};

// Update a job
export const updateJob = async (id, jobData) => {
  try {
    const response = await apiClient.put(`/api/employer/UpdateJob?id=${id}`, jobData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update job'
    };
  }
};

// Get a job by ID
export const getJobById = async (id) => {
  try {
    const response = await apiClient.get(`/api/employer/GetJobById?id=${id}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch job details'
    };
  }
};

// Add candidate to shortlist
export const addToShortlist = async (jobId, jobSeekerId) => {
  try {
    const response = await apiClient.post('/api/Employer/AddToShortlist', {
      jobId,
      jobSeekerId
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('AddToShortlist API error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add candidate to shortlist. This feature may not be available yet.'
    };
  }
};

// Remove candidate from shortlist
export const removeFromShortlist = async (jobId, jobSeekerId) => {
  try {
    const response = await apiClient.post('/api/Employer/RemoveFromShortlist', {
      jobId,
      jobSeekerId
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('RemoveFromShortlist API error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to remove candidate from shortlist. This feature may not be available yet.'
    };
  }
};

// Get job seeker details by ID
export const getJobSeekerById = async (jobSeekerId) => {
  try {
    const response = await apiClient.get(`/api/Employer/GetJobSeekerById/${jobSeekerId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch job seeker details'
    };
  }
};

// Get job seeker resumes by ID
export const getSeekerResumesById = async (jobSeekerId) => {
  try {
    const response = await apiClient.get(`/api/Employer/GetSeekerResumesWithId/${jobSeekerId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch job seeker resumes'
    };
  }
};

// Get applicants with resume for a job
export const getApplicantsWithResume = async (jobId) => {
  try {
    const response = await apiClient.get(`/api/Employer/GetApplicantsWithResume/${jobId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch applicants with resumes'
    };
  }
};

// Hire a candidate
export const hireCandidate = async (jobId, jobSeekerId) => {
  try {
    const response = await apiClient.post('/api/Employer/Hire', {
      jobId: Number(jobId),
      jobSeekerId: jobSeekerId
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Hire candidate API error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to hire candidate'
    };
  }
};

// Reject a candidate
export const rejectCandidate = async (jobId, jobSeekerId) => {
  try {
    const response = await apiClient.post('/api/Employer/Reject', {
      jobId: Number(jobId),
      jobSeekerId: jobSeekerId
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Reject candidate API error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to reject candidate'
    };
  }
};