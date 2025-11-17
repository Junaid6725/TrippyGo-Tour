// src/api/axios.js
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://trippy-go-tour-mps3.vercel.app/api";

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      console.warn("Unauthorized: token expired or invalid");

      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 403) {
      console.warn("Forbidden: you don't have permission for this action");
    }

    // if (status === 500) { ... }

    return Promise.reject(error);
  }
);

export default api;
