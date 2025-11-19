import api from "../api/axios";

export const createBooking = async (tourId, bookingData, token) => {
  try {
    const response = await api.post(`/booking-tour/${tourId}`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getBookingsService = async (token, options = {}) => {
  const { page = 1, limit = 10, search = "", status = "" } = options;

  try {
    const response = await api.get("/get-bookings", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit, search, status },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const getUserBookings = async (token) => {
  try {
    const response = await api.get("/user-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const updateBookingStatusService = async (
  bookingId,
  statusData,
  token
) => {
  try {
    const response = await api.put(`/update-booking/${bookingId}`, statusData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
