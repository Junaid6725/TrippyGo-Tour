import api from "../api/axios";

export const addTourReview = async (tourId, reviewData, token) => {
  try {
    const response = await api.post(
      `/tour/${tourId}/create-review`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const getTourReviews = async (tourId) => {
  try {
    const response = await api.get(`/tours/${tourId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
