import FaqsComponent from "./../../components/user/faqsPageComponent/FaqsComponent";
import CommonHeroSection from "./../../components/user/shared/CommonHeroSection";

const Faqs = () => {
  return (
    <>
      <CommonHeroSection title="FAQs" />
      <section className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Frequently Asked Questions
        </h2>
        <FaqsComponent />
      </section>
    </>
  );
};

export default Faqs;
