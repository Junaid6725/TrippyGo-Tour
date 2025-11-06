import api from "../api/axios";

export const registerUser = (data) => api.post("/register", data);
export const loginUser = (data) => api.post("/login", data);
