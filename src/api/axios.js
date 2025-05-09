import axios from "axios";
import setupRequestInterceptors from "./requestInterceptors";
import setupResponseInterceptor from "./responseInterceptor";

const apiClient = axios.create({
  baseURL: "https://job-connect.runasp.net", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "text/plain"
  },
});

setupRequestInterceptors(apiClient);
setupResponseInterceptor(apiClient);

export default apiClient;
