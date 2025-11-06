import api from "../api/axios"; // your axios instance

// Add a review to a specific tour
export const addTourReview = async (tourId, reviewData, token) => {
  try {
    const response = await api.post(
      `/tour/${tourId}/create-review`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data; // expected { success, review }
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Get all reviews for a specific tour
export const getTourReviews = async (tourId) => {
  try {
    const response = await api.get(`/tours/${tourId}/reviews`);
    return response.data; // expected { success, reviews }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
