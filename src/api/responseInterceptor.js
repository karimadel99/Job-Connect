// src/api/responseInterceptor.js
const setupResponseInterceptor = (apiClient) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Optionally handle errors globally, e.g., redirect on unauthorized access.
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - please login again.");
        // For example, you could redirect to the login page:
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default setupResponseInterceptor;
