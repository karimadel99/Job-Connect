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
    const response = await apiClient.post('/api/employer/AddToShortlist', {
      jobId,
      jobSeekerId
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add to shortlist'
    };
  }
};

// Remove candidate from shortlist
export const removeFromShortlist = async (jobId, jobSeekerId) => {
  try {
    const response = await apiClient.post('/api/employer/RemoveFromShortlist', {
      jobId,
      jobSeekerId
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to remove from shortlist'
    };
  }
};