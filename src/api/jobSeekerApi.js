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
    console.log('API: Uploading resume to server...');
    const response = await apiClient.post("/api/JobSeeker/UploadResume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log('API: Upload response received:', response);
    console.log('API: Upload response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Upload error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    return { error: error.response?.data?.message || "Failed to upload resume" };
  }
};

export const getResumes = async () => {
  try {
    console.log('API: Fetching resumes from server...');
    const response = await apiClient.get("/api/JobSeeker/GetResumes");
    console.log('API: Resumes fetch response received:', response);
    console.log('API: Resumes data:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Resumes fetch error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
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
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await axios.post(
      'https://jobconnectrecommendationsystem.onrender.com/recommend',
      {
        seeker_id: seekerId,
        top_n: topN,
      },
      {
        timeout: 15000, // 15 second timeout
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.name === 'AbortError') {
      return { error: 'Request timeout. The recommendation service is taking too long to respond.' };
    }
    return { error: error?.response?.data?.message || error.message };
  }
}

export const parseResume = async (formData) => {
  try {
    console.log('API: Sending resume for parsing...');
    
    // Create a new FormData with the same file
    const file = formData.get('resume');
    const mlFormData = new FormData();
    mlFormData.append('file', file);

    // Send to the local ML model endpoint
    const response = await axios.post(
      'http://127.0.0.1:5000/parse_resume',
      mlFormData,
      {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      }
    );
    
    console.log('API: Parse response received:', response);
    return response.data;
  } catch (error) {
    console.error('API: Resume parsing error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    
    // Handle timeout specifically
    if (error.code === 'ECONNABORTED') {
      return { error: 'Resume parsing timed out. Please try again.' };
    }
    
    return { 
      error: error.response?.data?.message || 
             error.response?.data || 
             error.message || 
             "Failed to parse resume" 
    };
  }
};

export const updateProfileFromParsedResume = async (parsedData) => {
  try {
    console.log('API: Updating profile with parsed resume data...');
    
    // Transform the parsed data into profile format
    const profileData = {
      // Basic info
      address: parsedData.LOCATION?.[0] || null,
      
      // Education
      degree: parsedData.DEGREE?.[0] || null,
      
      // Skills
      skills: parsedData.SKILLS?.map(skill => ({
        skillName: skill.trim()
      })) || [],
      
      // Certifications
      certifications: parsedData.CERTIFICATION?.map(cert => ({
        certificationName: cert.trim()
      })) || [],
      
      // Work Experience
      companyWorkedAt: parsedData["COMPANIES WORKED AT"]?.map(company => ({
        companyName: company.trim()
      })) || [],
      
      workedAs: parsedData["WORKED AS"]?.map(position => ({
        jobTitle: position.trim()
      })) || []
    };

    const response = await apiClient.put("/api/JobSeeker/UpdateSeekerProfile", profileData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log('API: Profile update with parsed data response:', response);
    return response.data;
  } catch (error) {
    console.error('API: Profile update with parsed data error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    return { error: error.response?.data?.message || "Failed to update profile with parsed resume data" };
  }
};