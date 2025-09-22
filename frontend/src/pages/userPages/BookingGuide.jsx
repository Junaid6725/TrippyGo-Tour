import React from "react";

import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import BookingGuideInstructions from "../../components/user/bookingGuidePageComponent/BookingGuideInstructions";




export default function BookingGuide() {
  return (
    <>
      <CommonHeroSection title="Booking Guide" />
      <BookingGuideInstructions/>
      
    </>
  );
}
