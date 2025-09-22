import React from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import ResponsibilitiesList from "../../components/user/responsibilitiesPageComponent/ResponsibilitiesList";

export default function Responsibilities() {
  return (
    <>
      <CommonHeroSection title="Responsible Tourism" />
      <ResponsibilitiesList />
    </>
  );
}
