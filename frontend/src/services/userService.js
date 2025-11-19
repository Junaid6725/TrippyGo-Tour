import api from "../api/axios";

export const getAllUsers = async (token, page = 1, limit = 10, search = "") => {
  try {
    const response = await api.get("/get-users", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (id, token) => {
  try {
    const response = await api.delete(`/delete-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
