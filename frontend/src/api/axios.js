// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  withCredentials: false, // set true only if you're using cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or "accessToken"
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

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response, // directly return response if success

  async (error) => {
    // If response is missing (like network error)
    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 🔒 Unauthorized (token expired or invalid)
    if (status === 401) {
      console.warn("Unauthorized: token expired or invalid");

      // Optionally: clear token & redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🚫 Forbidden (user doesn’t have permission)
    if (status === 403) {
      console.warn("Forbidden: you don't have permission for this action");
    }

    // 🔁 Retry logic or custom handling (optional)
    // if (status === 500) { ... }

    return Promise.reject(error);
  }
);

export default api;
