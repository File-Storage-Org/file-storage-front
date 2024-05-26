import axios from "axios";
import config from "@/config";
import { Refresh } from "@/types/types";

const baseAxiosInstance = axios.create();

baseAxiosInstance.interceptors.request.use(
  function (config) {
    const authToken = localStorage.getItem("access_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
baseAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Extract the original request configuration from the error object
    const originalRequest = error.config;

    // Check if the error response status is 401 (Unauthorized) and if the request hasn't been retried before
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // Mark the original request as retried to avoid infinite loops
      originalRequest._retry = true;

      try {
        // Send a GET request to refresh the access token
        const response = await axiosAuthInstance.get<Refresh>("/api/v1/refresh");
        // If the refresh request is successful
        if (response.status === 200) {
          // Update the access token stored in the local storage
          localStorage.setItem("access_token", response.data.access_token);
          // Set the authorization header for subsequent requests with the new access token
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.access_token;
        } else if (response.status === 401) {
          localStorage.removeItem("access_token");
        }
      } catch (e) {
        console.error(e);
      }

      // Retry the original request
      return axiosAuthInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const axiosAuthInstance = axios.create({
  baseURL: config.AUTH_BACKEND_URL,
  withCredentials: true,
});

// Copy baseAxios interceptors
axiosAuthInstance.interceptors.request = baseAxiosInstance.interceptors.request;
axiosAuthInstance.interceptors.response = baseAxiosInstance.interceptors.response;

export const axiosInstance = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
});

// Copy baseAxios interceptors
axiosInstance.interceptors.request = baseAxiosInstance.interceptors.request;
axiosInstance.interceptors.response = baseAxiosInstance.interceptors.response;
