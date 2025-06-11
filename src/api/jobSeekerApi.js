import apiClient from "./axios";
import axios from "axios";

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
    const response = await apiClient.get("/api/JobSeeker/GetAllEmployers");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch employers" };
  }
};

export const getEmployerById = async (employerId) => {
  try {
    const response = await apiClient.get(`/api/JobSeeker/GetEmployerById/${employerId}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch employer details" };
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
    const response = await apiClient.post("/api/jobseeker/SaveJob", { jobId }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to save job" };
  }
};

export const unsaveJob = async (jobId) => {
  try {
    const response = await apiClient.post("/api/jobseeker/UnsaveJob", { jobId }, {
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

export const getSeekerProfile = async () => {
  try {
    const response = await apiClient.get("/api/JobSeeker/GetSeekerProfile");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch seeker profile" };
  }
};

export const updateSeekerProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/api/JobSeeker/UpdateSeekerProfile", profileData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error('API Error Response:', error.response?.data);
    console.error('API Error Status:', error.response?.status);
    console.error('Full error:', error);
    return { error: error.response?.data?.message || error.response?.data || "Failed to update seeker profile" };
  }
};

export const deleteSeekerProfile = async () => {
  try {
    const response = await apiClient.delete("/api/JobSeeker/DeleteSeekerProfile");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to delete seeker profile" };
  }
};

export const uploadResume = async (formData) => {
  try {
    const response = await apiClient.post("/api/JobSeeker/UploadResume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to upload resume" };
  }
};

export const getResumes = async () => {
  try {
    const response = await apiClient.get("/api/JobSeeker/GetResumes");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch resumes" };
  }
};

export const deleteResume = async (resumeId) => {
  try {
    const response = await apiClient.delete(`/api/JobSeeker/DeleteResume/${resumeId}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to delete resume" };
  }
};

export const applyForJobByResumeId = async (jobId, resumeId, coverLetter) => {
  try {
    const response = await apiClient.post(
      `/api/JobSeeker/ApplyForJobByResumeId/${jobId}/${resumeId}?coverLetter=${encodeURIComponent(coverLetter)}`,
      null,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to apply for job" };
  }
};

/**
 * Fetch recommended jobs for a job seeker using the ML model endpoint.
 * @param {string} seekerId - The job seeker's unique ID.
 * @param {number} topN - The number of top recommendations to fetch.
 * @returns {Promise<Object>} The response from the recommendation system.
 */
export async function getRecommendedJobs(seekerId, topN = 10) {
  try {
    const response = await axios.post(
      'https://jobconnectrecommendationsystem.onrender.com/recommend',
      {
        seeker_id: seekerId,
        top_n: topN,
      }
    );
    return response;
  } catch (error) {
    return { error: error?.response?.data?.message || error.message };
  }
}