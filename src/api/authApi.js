import apiClient from "./axios";

export const loginUser = async (email, password) => {
  try {
    console.log('Sending login request with credentials:', { email, password });
    const response = await apiClient.post('/api/Accounts/Login', { email, password });

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      // The response format matches the example: { name, email, token, role }
      return { success: true, user: response.data };
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
};

export const registerJobSeeker = async (formValues) => {
  try {
    console.log('Sending job seeker registration request with form values:', formValues);
    const response = await apiClient.post("/api/Accounts/Register/JobSeeker", formValues);
    console.log('Job seeker registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error in registerJobSeeker:", error);
    const errorMessage = error.response?.data?.message || "Job seeker registration failed";
    throw new Error(errorMessage);
  }
};

export const registerEmployer = async (formValues) => {
  try {
    const payload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      companyName: formValues.companyName,
      companySize: formValues.companySize,
      website: formValues.website,
      industry: formValues.industry,
      address: formValues.address,
      companyDescription: formValues.companyDescription || ""
    };

    const response = await apiClient.post('/api/Accounts/Register/Employer', payload);

    if (response.status === 200 && response.data) {
      return {
        success: true,
        data: response.data,
        token: response.data.token,
        user: {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: 'employer'
        }
      };
    }
    
    throw new Error('Invalid response format from server');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const refreshUserToken = async (refreshToken) => {
  try {
    const response = await apiClient.post('/api/Accounts/RefreshToken', { refreshToken });
    
    if (response.status === 200) {
      console.log('Token refresh successful:', response.data);
      return { success: true, data: response.data };
    }
    return { success: false, error: 'Failed to refresh token' };
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || 'Token refresh failed' };
  }
};

export const getAllTags = async () => {
  try {
    console.log('Fetching all tags/categories');
    const response = await apiClient.get('/api/Home/GetAllTags');
    
    if (response.status === 200) {
      console.log('Tags fetched successfully:', response.data);
      return { success: true, data: response.data };
    }
    return { success: false, error: 'Failed to fetch tags' };
  } catch (error) {
    console.error('Failed to fetch tags:', error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || 'Failed to fetch tags' };
  }
};

export const submitContactForm = async (contactData) => {
  try {
    console.log('Submitting contact form:', contactData);
    const response = await apiClient.post('/api/Home/ContactUs', contactData);
    
    if (response.status === 200) {
      console.log('Contact form submitted successfully:', response.data);
      return { success: true, data: response.data };
    }
    return { success: false, error: 'Failed to submit contact form' };
  } catch (error) {
    console.error('Failed to submit contact form:', error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || 'Failed to submit contact form' };
  }
};
