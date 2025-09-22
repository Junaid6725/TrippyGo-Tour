import React from "react";
import TermsConditionsComponent from "./../../components/user/termsConditionPageComponent/TermsConditionsComponent";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

export default function TermsConditions() {
  return (
    <>
      <CommonHeroSection title="Terms & Conditions" />

      <TermsConditionsComponent />
    </>
  );
}
