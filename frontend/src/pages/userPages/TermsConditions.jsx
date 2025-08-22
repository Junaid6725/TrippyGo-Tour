import React from "react";
import TermsConditionsComponent from "./../../components/user/termsConditionPageComponent/TermsConditionsComponent";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

export default function TermsConditions() {
  return (
    <>
      <CommonHeroSection title="Terms & Conditions" />
      <section className="bg-white dark:bg-[#0A2025] px-6 py-12 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-10">
            Terms & Conditions
          </h2>

          <TermsConditionsComponent />
        </div>
      </section>
    </>
  );
}
