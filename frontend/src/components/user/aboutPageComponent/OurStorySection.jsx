import React from "react";

const OurStorySection = () => {
  return (
    <>
      <section className=" py-16 px-8  overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center md:space-x-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 ">Our Story</h2>
            <p className="mb-4 text-gray-900 leading-relaxed">
              We are committed to delivering innovative solutions with a focus
              on quality and customer satisfaction. Our team of experts works
              tirelessly to bring your ideas to life and help your business
              grow.
            </p>
            <p className="mb-4 text-gray-900 leading-relaxed">
              Join us on our journey to make a difference in the industry
              through creativity, dedication, and excellence.
            </p>
          </div>
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80"
              alt="Our Team"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStorySection;
