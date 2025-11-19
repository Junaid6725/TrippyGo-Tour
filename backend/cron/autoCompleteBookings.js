import Booking from "../models/bookingModel.js";
import cron from "node-cron";

export const autoCompleteBookings = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();
      const bookingsToUpdate = await Booking.updateMany(
        {
          endDate: { $lt: now },
          bookingStatus: "confirmed",
        },
        {
          bookingStatus: "completed",
          completionDate: now,
          autoCompleted: true,
        }
      );
      if (bookingsToUpdate.modifiedCount > 0) {
        console.log(
          ` Auto-completed ${bookingsToUpdate.modifiedCount} bookings.`
        );
      }
    } catch (error) {
      console.error(" Auto-complete cron error:", error);
    }
  });
};
