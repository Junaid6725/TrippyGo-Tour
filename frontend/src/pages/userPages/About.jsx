import React from "react";
import OurStorySection from "./../../components/user/aboutPageComponent/OurStorySection";
import TeamMembers from "./../../components/user/aboutPageComponent/TeamMembers";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

const About = () => {
  return (
    <>
      <CommonHeroSection title="About Us" />
      <OurStorySection />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our Investors &amp; Board of Directors
            </h2>
          </div>
          <TeamMembers />
        </div>
      </section>
    </>
  );
};

export default About;
