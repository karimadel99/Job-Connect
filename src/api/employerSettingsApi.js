import apiClient from "./axios";

// Get company info
export const getCompanyInfo = async () => {
  try {
    const response = await apiClient.get("/api/employer/GetCompanyInfo");
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Failed to fetch company info" };
  }
};

// Update company info (multipart/form-data)
export const updateCompanyInfo = async (companyName, companyDescription, logoFile) => {
  try {
    const formData = new FormData();
    formData.append("CompanyName", companyName);
    formData.append("CompanyDescription", companyDescription);
    if (logoFile) {
      formData.append("Logo", logoFile);
    }
    const response = await apiClient.put("/api/employer/UpdateCompanyInfo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Failed to update company info" };
  }
};

// Get founding info
export const getFoundingInfo = async () => {
  try {
    const response = await apiClient.get("/api/employer/GetFoundingInfo");
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Failed to fetch founding info" };
  }
};

// Update founding info (application/json)
export const updateFoundingInfo = async (foundingInfo) => {
  try {
    const response = await apiClient.put("/api/employer/UpdateFoundingInfo", foundingInfo);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Failed to update founding info" };
  }
};

// Change employer password
export const changeEmployerPassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    const response = await apiClient.post("/api/employer/ChangePassword", {
      currentPassword,
      newPassword,
      confirmPassword
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Failed to change password" };
  }
};
