import api from "../api/axios"; // make sure this points to your axios instance

// ✅ Get all users
export const getAllUsers = async (token, page = 1, limit = 10, search = "") => {
  try {
    const response = await api.get("/get-users", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit, search }, // send query params
    });
    return response.data; // expected { success, users, totalPages, total, page }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ✅ Delete a user by ID
export const deleteUser = async (id, token) => {
  try {
    const response = await api.delete(`/delete-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // expected { success, message }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
