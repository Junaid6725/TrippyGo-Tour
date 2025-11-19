import api from "../api/axios";

export const createDestination = async (formData) => {
  return api.post("/create-destination", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDestinations = async (page = 1, limit = 10) => {
  return api.get(`/get-destinations?page=${page}&limit=${limit}`);
};

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
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};
