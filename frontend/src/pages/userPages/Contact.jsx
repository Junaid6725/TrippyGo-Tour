import React from "react";
import GoogleMap from "./../../components/user/contactPageComponent/GoogleMap";
import ContactForm from "./../../components/user/contactPageComponent/ContactForm";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

const Contact = () => {
  return (
    <>
      <CommonHeroSection title="Contact Us" />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex flex-col md:flex-row gap-8">
          <GoogleMap />
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Contact;
