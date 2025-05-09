const setupRequestInterceptors = (apiClient) => {
  apiClient.interceptors.request.use(
    (config) => {
      // Attach token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupRequestInterceptors;