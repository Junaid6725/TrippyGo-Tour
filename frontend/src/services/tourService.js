// src/services/tourService.js
import api from "../api/axios";

// 🟢 Create a new tour
export const createTour = async (formData) => {
  try {
    // formData should include tourImg (File)
    const response = await api.post("/create-tour", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating tour:", error);
    throw error;
  }
};

// 🟡 Update existing tour
export const updateTour = async (id, formData) => {
  try {
    const response = await api.put(`/update-tour/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

// 🔴 Delete a tour
export const deleteTour = async (id) => {
  try {
    const response = await api.delete(`/delete-tour/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};

// 🔵 Get all tours (optionally paginated)
export const getAllTours = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/get-tours?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    throw error;
  }
};

// 🟣 Get single tour by ID
export const getTourByIdService = async (id) => {
  try {
    const response = await api.get(`/get-tour/${id}`);
    return response.data; // { success, singleTour }
  } catch (error) {
    console.error("Error fetching tour:", error);
    throw error;
  }
};

// 🟠 Get tours by destination ID
export const getToursByDestination = async (destinationId) => {
  try {
    const response = await api.get(`/tours/destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tours by destination:", error);
    throw error;
  }
};

// 🟤 Search tours (example: ?keyword=mountain)
export const searchTour = async (filters) => {
  try {
    // filters = { location, minPrice, maxPrice, groupSize }
    const response = await api.get("/search-tour", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error searching tours:", error);
    throw error;
  }
};
