// src/services/destinationService.js
import api from "../api/axios";

// ✅ Create Destination (Admin only)
export const createDestination = async (formData) => {
  // Note: formData should be a FormData object (not plain JSON)
  return api.post("/create-destination", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // since file upload
    },
  });
};

export const getDestinations = async (page = 1, limit = 10) => {
  return api.get(`/get-destinations?page=${page}&limit=${limit}`);
};

// ✅ Get Admin Destinations (for dashboard)
export const getAdminDestinations = async (
  search = "",
  page = 1,
  limit = 4
) => {
  const response = await api.get(
    `/admin-destinations?search=${search}&page=${page}&limit=${limit}`
  );
  return response.data;
};

// ✅ Delete Destination (Admin only)
export const deleteDestination = async (id, token) => {
  return api.delete(`/delete-destination/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDestinations = async () => {
  try {
    const response = await api.get("/get-all-destinations");
    return response.data; // return data (controller already gives {success, destinations})
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error; // throw so component can handle errors
  }
};