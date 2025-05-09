import apiClient from "./axios";

export const getAllJobs = async () => {
  try {
    const response = await apiClient.get("/api/jobseeker/GetAllJobs");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch jobs" };
  }
};

export const getAllJobsPaginated = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(`/api/jobseeker/GetAllJobsPaginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch paginated jobs" };
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/api/jobseeker/GetJobById/${jobId}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch job details" };
  }
};

export const getAllEmployers = async () => {
  try {
    const response = await apiClient.get("/api/jobseeker/GetAllEmployers");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch employers" };
  }
};

export const getSavedJobs = async () => {
  try {
    const response = await apiClient.get("/api/jobseeker/GetSavedJobs");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch saved jobs" };
  }
};

export const saveJob = async (jobId) => {
  try {
    const response = await apiClient.post("/api/jobseeker/SaveJob", jobId, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to save job" };
  }
};

export const unsaveJob = async (jobId) => {
  try {
    const response = await apiClient.post("/api/jobseeker/UnsaveJob", jobId, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to unsave job" };
  }
};

export const applyForJob = async (formData) => {
  try {
    const response = await apiClient.post("/api/jobseeker/ApplyForJob", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to apply for job" };
  }
};

export const getAppliedJobs = async () => {
  try {
    const response = await apiClient.get("/api/jobseeker/GetAppliedJobs");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch applied jobs" };
  }
};