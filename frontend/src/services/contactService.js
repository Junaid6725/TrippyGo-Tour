import api from "../api/axios";

/**
 * Send contact form data to the backend
 * @param {Object} data - { fullName, email, message }
 * @returns {Promise<Object>} - { success, message }
 */
export const sendContactMessage = async (data) => {
  try {
    const response = await api.post("/contact", data);
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};
