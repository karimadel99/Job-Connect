import axios from "axios";
import setupRequestInterceptors from "./requestInterceptors";
import setupResponseInterceptor from "./responseInterceptor";

// Use a local development URL or a proxy configuration instead
const apiClient = axios.create({
  baseURL: "", // Empty baseURL for development - will rely on proxy in vite.config.js
  headers: {
    "Content-Type": "application/json",
    "Accept": "text/plain"
  },
});

setupRequestInterceptors(apiClient);
setupResponseInterceptor(apiClient);

export default apiClient;
