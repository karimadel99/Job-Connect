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

    console.log('Sending registration request with payload:', payload);
    const response = await apiClient.post('/api/Accounts/Register/Employer', payload);

    if (response.status === 200) {
      console.log('Registration successful:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
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
