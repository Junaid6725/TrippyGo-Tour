import React from "react";
import HeroSection from "../../components/user/userHomePageComponent/HeroSection";
import PopularTour from "../../components/user/userHomePageComponent/PopularTour";
import WhyChooseUs from "../../components/user/userHomePageComponent/WhyChooseUs";
import DestinationSection from "../../components/user/userHomePageComponent/DestinationSection";
import BookNowSection from "../../components/user/userHomePageComponent/BookNowSection";
import AboutSection from "../../components/user/userHomePageComponent/AboutSection";
import TourSearchBar from "./TourSearchBar";

const Home = () => {
  return (
    <>
      <HeroSection />
      <TourSearchBar />
      <PopularTour />
      <AboutSection />
      <WhyChooseUs />
      <DestinationSection />
      <BookNowSection />
    </>
  );
};

export default Home;
