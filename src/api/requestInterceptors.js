// src/api/requestInterceptors.js
const setupRequestInterceptors = (apiClient) => {
  apiClient.interceptors.request.use(
    (config) => {
      // If you store a token in localStorage, attach it to the request headers.
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupRequestInterceptors;
