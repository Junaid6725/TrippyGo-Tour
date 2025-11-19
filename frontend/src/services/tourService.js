import api from "../api/axios";

export const createTour = async (formData) => {
  try {
    const response = await api.post("/create-tour", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating tour:", error);
    throw error;
  }
};

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

export const deleteTour = async (id) => {
  try {
    const response = await api.delete(`/delete-tour/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};

export const getAllTours = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/get-tours?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    throw error;
  }
};

export const getTourByIdService = async (id) => {
  try {
    const response = await api.get(`/get-tour/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour:", error);
    throw error;
  }
};

export const getToursByDestination = async (destinationId) => {
  try {
    const response = await api.get(`/tours/destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tours by destination:", error);
    throw error;
  }
};

export const searchTour = async (filters) => {
  try {
    const response = await api.get("/search-tour", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error searching tours:", error);
    throw error;
  }
};
