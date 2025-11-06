import api from "../api/axios"; // your axios instance

// ✅ Get user profile
export const getProfileService = async (token) => {
  try {
    const response = await api.get("/get-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // expected { success, profile }
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// ✅ Create user profile
export const createProfileService = async (formData, token) => {
  try {
    const response = await api.post("/create-profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // expected { success, profile }
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

// ✅ Update user profile
export const updateProfileService = async (formData, token) => {
  try {
    const response = await api.put("/update-profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // expected { success, profile }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// ✅ Change user password
export const changePasswordService = async (passwordData, token) => {
  try {
    const response = await api.put("/change-password", passwordData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // expected { success, message }
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
