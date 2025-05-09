// src/api/responseInterceptor.js
import { refreshUserToken } from './authApi';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const setupResponseInterceptor = (apiClient) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If the error is not 401 or the request already tried to refresh, reject
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }
      // Set flag to avoid infinite loop
      originalRequest._retry = true;
      // If already refreshing, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      isRefreshing = true;
      try {
        // Get refresh token from localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token available, redirect to login
          processQueue(new Error('No refresh token available'));
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }
        // Try to refresh the token
        const result = await refreshUserToken(refreshToken);
        if (result.success) {
          // Update token in localStorage
          const newToken = result.data.user.token;
          const newRefreshToken = result.data.refreshToken;
          localStorage.setItem('token', newToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          // Update user data if needed
          const userData = JSON.parse(localStorage.getItem('user'));
          if (userData) {
            userData.token = newToken;
            localStorage.setItem('user', JSON.stringify(userData));
          }
          // Update Authorization header for the original request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          // Process all queued requests with the new token
          processQueue(null, newToken);
          return apiClient(originalRequest);
        } else {
          // Refresh failed, redirect to login
          processQueue(new Error('Failed to refresh token'));
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};

export default setupResponseInterceptor;
