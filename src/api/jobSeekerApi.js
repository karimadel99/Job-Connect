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

export const updateSeekerProfileDirect = async (profileData) => {
  try {
    console.log('API: Direct profile update with data:', profileData);
    
    // Transform arrays to ensure proper format for API
    const transformedData = { ...profileData };
    
    // Handle array fields - ensure they're in the right format
    const arrayFields = ['skills', 'certifications', 'companyWorkedAt', 'workedAs'];
    arrayFields.forEach(field => {
      if (transformedData[field] && Array.isArray(transformedData[field])) {
        // Ensure arrays are properly formatted for the API
        transformedData[field] = transformedData[field].map(item => {
          if (typeof item === 'string') {
            // Convert string to proper object format
            if (field === 'skills') return { skillName: item };
            if (field === 'certifications') return { certificationName: item };
            if (field === 'companyWorkedAt') return { companyName: item };
            if (field === 'workedAs') return { jobTitle: item };
          }
          return item; // Already in object format
        });
      }
    });
    
    console.log('API: Transformed data for direct update:', transformedData);
    
    const response = await apiClient.put("/api/JobSeeker/UpdateSeekerProfile", transformedData, {
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
    console.log('API: Applying for job with params:', {
      jobId,
      resumeId,
      coverLetterLength: coverLetter?.length || 0
    });
    
    // Validate inputs
    if (!jobId || !resumeId) {
      throw new Error('Missing required parameters: jobId and resumeId are required');
    }
    
    // Ensure coverLetter is a string (handle null/undefined)
    const safeCoverLetter = coverLetter || '';
    
    const endpoint = `/api/JobSeeker/ApplyForJobByResumeId/${jobId}/${resumeId}?CoverLetter=${encodeURIComponent(safeCoverLetter)}`;
    console.log('API: Request endpoint:', endpoint);
    
    const response = await apiClient.post(
      endpoint,
      null,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    console.log('API: Application successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Application error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    
    // Check if this is a database constraint error
    const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to apply for job";
    const isDbConstraintError = errorMessage.includes('entity changes') || 
                               errorMessage.includes('constraint') || 
                               errorMessage.includes('duplicate') ||
                               (error.response?.status === 400 && errorMessage.includes('error occurred while saving'));
    
    return { 
      error: errorMessage,
      isDbConstraintError: isDbConstraintError,
      status: error.response?.status
    };
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

// Debug helper function to understand the response structure
const debugResponse = (response) => {
  console.log('=== RESPONSE DEBUG START ===');
  console.log('Full response object:', response);
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  console.log('Response data:', response.data);
  console.log('Response data type:', typeof response.data);
  
  if (response.data && typeof response.data === 'object') {
    console.log('Response data keys:', Object.keys(response.data));
    console.log('Response data entries:', Object.entries(response.data));
  }
  console.log('=== RESPONSE DEBUG END ===');
};

export const parseResume = async (formData) => {
  try {
    console.log('API: Sending resume for parsing...');
    
    // Create a new FormData with the same file
    const file = formData.get('resume');
    console.log('API: File extracted from original FormData:', file ? { name: file.name, type: file.type, size: file.size } : 'null');
    
    if (!file) {
      return { error: 'No file found in FormData' };
    }
    
    const mlFormData = new FormData();
    mlFormData.append('resume', file);
    
    // Debug: Log what we're sending
    console.log('API: FormData entries for ML model:', Array.from(mlFormData.entries()).map(([key, value]) => [key, value instanceof File ? { name: value.name, type: value.type, size: value.size } : value]));

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
    
    // Use debug helper to understand the response structure
    debugResponse(response);
    
    // Handle different response structures
    let parsedData = response.data;
    
    // If response.data is wrapped in another object, extract the actual parsed data
    if (parsedData && typeof parsedData === 'object') {
      // Check if it has the expected structure directly
      if (parsedData.SKILLS || parsedData.LOCATION || parsedData.NAME) {
        console.log('API: Direct structure detected');
        return parsedData;
      }
      
      // Check if it's wrapped in a 'data' property
      if (parsedData.data) {
        console.log('API: Nested data structure detected');
        return parsedData.data;
      }
      
      // Check if it's wrapped in a 'result' property
      if (parsedData.result) {
        console.log('API: Result wrapper structure detected');
        return parsedData.result;
      }
      
      // Check if it's wrapped in a 'parsed_data' property
      if (parsedData.parsed_data) {
        console.log('API: Parsed_data wrapper structure detected');
        return parsedData.parsed_data;
      }
    }
    
    console.log('API: Returning original response data');
    return parsedData;
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
    console.log('API: Raw parsed data structure:', parsedData);
    console.log('API: Parsed data type:', typeof parsedData);
    
    if (parsedData && typeof parsedData === 'object') {
      console.log('API: Parsed data keys:', Object.keys(parsedData));
    }
    
    // Validate that parsedData exists and is an object
    if (!parsedData || typeof parsedData !== 'object') {
      console.error('API: Invalid parsed data - not an object:', parsedData);
      console.error('API: Expected object with keys like SKILLS, LOCATION, etc.');
      return { error: 'Invalid parsed data received from resume parsing service. Expected object with extracted data.' };
    }
    
    // Check if the object has at least one of the expected properties
    const expectedKeys = ['SKILLS', 'LOCATION', 'NAME', 'DEGREE', 'CERTIFICATION', 'COMPANIES WORKED AT', 'WORKED AS'];
    const hasExpectedData = expectedKeys.some(key => parsedData.hasOwnProperty(key));
    
    if (!hasExpectedData) {
      console.error('API: Parsed data does not contain expected properties:', Object.keys(parsedData));
      console.error('API: Expected one of:', expectedKeys);
      return { error: 'Parsed data does not contain recognizable resume information' };
    }
    
    // Helper function to safely get array values
    const safeGetArray = (data, key) => {
      const value = data[key];
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') return [value];
      return [];
    };
    
    // Helper function to safely get first string value
    const safeGetFirst = (data, key) => {
      const array = safeGetArray(data, key);
      return array.length > 0 ? array[0] : null;
    };
    
    // Helper function to clean and filter text
    const cleanText = (text) => {
      if (!text) return '';
      return text.trim()
        .replace(/[•\-\n\r\t]/g, ' ') // Remove bullets, dashes, newlines
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
    };
    
    // Extract and clean arrays
    const skills = safeGetArray(parsedData, 'SKILLS')
      .concat(safeGetArray(parsedData, 'skills'))
      .concat(safeGetArray(parsedData, 'SKILL'))
      .concat(safeGetArray(parsedData, 'skill'))
      .map(skill => cleanText(skill))
      .filter(skill => skill && skill.length > 1) // Filter out single characters or empty
      .map(skill => ({ skillName: skill }));
    
    const certifications = safeGetArray(parsedData, 'CERTIFICATION')
      .concat(safeGetArray(parsedData, 'certification'))
      .concat(safeGetArray(parsedData, 'CERTIFICATIONS'))
      .concat(safeGetArray(parsedData, 'certifications'))
      .map(cert => cleanText(cert))
      .filter(cert => cert && cert.length > 3) // Filter out very short entries
      .map(cert => ({ certificationName: cert }));
    
    const companies = safeGetArray(parsedData, 'COMPANIES WORKED AT')
      .concat(safeGetArray(parsedData, 'companies worked at'))
      .concat(safeGetArray(parsedData, 'COMPANY'))
      .concat(safeGetArray(parsedData, 'company'))
      .concat(safeGetArray(parsedData, 'COMPANIES'))
      .concat(safeGetArray(parsedData, 'companies'))
      .map(company => cleanText(company))
      .filter(company => company && company.length > 2)
      .map(company => ({ companyName: company }));
    
    const positions = safeGetArray(parsedData, 'WORKED AS')
      .concat(safeGetArray(parsedData, 'worked as'))
      .concat(safeGetArray(parsedData, 'JOB TITLE'))
      .concat(safeGetArray(parsedData, 'job title'))
      .concat(safeGetArray(parsedData, 'POSITION'))
      .concat(safeGetArray(parsedData, 'position'))
      .map(position => cleanText(position))
      .filter(position => position && position.length > 3)
      .map(position => ({ jobTitle: position }));
    
    // Extract basic info
    const address = cleanText(safeGetFirst(parsedData, 'LOCATION') || 
                             safeGetFirst(parsedData, 'location') || 
                             safeGetFirst(parsedData, 'ADDRESS') || 
                             safeGetFirst(parsedData, 'address'));
    
    const degree = cleanText(safeGetFirst(parsedData, 'DEGREE') || 
                            safeGetFirst(parsedData, 'degree') || 
                            safeGetFirst(parsedData, 'EDUCATION') || 
                            safeGetFirst(parsedData, 'education'));
    
    // Infer current/desired job from positions
    const currentOrDesiredJob = positions.length > 0 ? 
      cleanText(positions[0].jobTitle) : null;
    
    // Generate a simple bio from extracted data
    const name = cleanText(safeGetFirst(parsedData, 'NAME') || 
                          safeGetFirst(parsedData, 'name'));
    
    let bio = '';
    if (name || degree || positions.length > 0 || skills.length > 0) {
      const bioparts = [];
      
      if (name) bioparts.push(`I am ${name}`);
      if (degree) bioparts.push(`with a ${degree}`);
      if (positions.length > 0) {
        const jobTitles = positions.slice(0, 2).map(p => p.jobTitle).join(' and ');
        bioparts.push(`experienced as ${jobTitles}`);
      }
      if (skills.length > 0) {
        const topSkills = skills.slice(0, 5).map(s => s.skillName).join(', ');
        bioparts.push(`skilled in ${topSkills}`);
      }
      
      bio = bioparts.join(', ') + '.';
      
      // Clean up bio formatting
      bio = bio.replace(/^I am ,/, 'I am')
               .replace(/,\s*,/g, ',')
               .replace(/,\s*\./g, '.')
               .replace(/^,\s*/, '')
               .trim();
    }
    
    // Transform the parsed data into profile format
    const profileData = {
      // Basic info
      address: address || null,
      
      // Education
      degree: degree || null,
      
      // Inferred fields
      currentOrDesiredJob: currentOrDesiredJob || null,
      bio: bio || null,
      
      // Arrays
      skills: skills,
      certifications: certifications,
      companyWorkedAt: companies,
      workedAs: positions
    };
    
    console.log('API: Transformed profile data:', profileData);
    console.log('API: Extracted data summary:', {
      address: !!address,
      degree: !!degree,
      currentOrDesiredJob: !!currentOrDesiredJob,
      bio: !!bio,
      skillsCount: skills.length,
      certificationsCount: certifications.length,
      companiesCount: companies.length,
      positionsCount: positions.length
    });
    
    // Only send fields that have actual data
    const filteredProfileData = {};
    
    // Add non-empty string fields
    if (profileData.address) filteredProfileData.address = profileData.address;
    if (profileData.degree) filteredProfileData.degree = profileData.degree;
    if (profileData.currentOrDesiredJob) filteredProfileData.currentOrDesiredJob = profileData.currentOrDesiredJob;
    if (profileData.bio) filteredProfileData.bio = profileData.bio;
    
    // Add arrays only if they have data
    if (profileData.skills && profileData.skills.length > 0) {
      filteredProfileData.skills = profileData.skills;
    }
    if (profileData.certifications && profileData.certifications.length > 0) {
      filteredProfileData.certifications = profileData.certifications;
    }
    if (profileData.companyWorkedAt && profileData.companyWorkedAt.length > 0) {
      filteredProfileData.companyWorkedAt = profileData.companyWorkedAt;
    }
    if (profileData.workedAs && profileData.workedAs.length > 0) {
      filteredProfileData.workedAs = profileData.workedAs;
    }
    
    console.log('API: Filtered profile data to send:', filteredProfileData);
    
    // If no useful data was extracted, return early
    if (Object.keys(filteredProfileData).length === 0) {
      console.log('API: No useful data extracted from resume');
      return { error: 'No extractable profile data found in the resume' };
    }

    const response = await apiClient.put("/api/JobSeeker/UpdateSeekerProfile", filteredProfileData, {
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