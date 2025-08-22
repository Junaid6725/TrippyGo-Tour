import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
// import DestinationsCard from "./DestinationsCard";

const DestinationSection = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 mt-3">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Trending Destinations
        </h1>

        <span className="group flex items-center gap-1 text-sm md:text-xl text-purple-600 hover:text-purple-800 font-medium cursor-pointer transition-all duration-300">
          See All
          <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:rotate-360" />
        </span>
      </div>

      {/* <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-4 gap-x-8 gap-y-10"
          >
            
          </ul>
        </div>
      </div> */}

      <>
        <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
          <div className="mx-auto max-w-[1160px]">
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {[
                {
                  title: "Keni Golf",
                  desc: "Everything you need for any course",
                  img: "https://iili.io/33etOiX.png",
                },
                {
                  title: "Keni Golf",
                  desc: "Everything you need for any course",
                  img: "https://iili.io/33etOiX.png",
                },
                {
                  title: "Keni Basketball",
                  desc: "Styles made for your games.",
                  img: "https://iili.io/33etkfn.png",
                },
                {
                  title: "Keni Trail Running",
                  desc: "Everything you need for adventure.",
                  img: "https://iili.io/33etvls.png",
                },
              ].map((item, index) => (
                <div key={index} className="hover:scale-105 cursor-pointer">
                  <img
                    className="mb-7 rounded-xl"
                    src={item.img}
                    alt={item.title}
                  />
                  <h3 className="text-[#0A2025] dark:text-white text-2xl font-bold font-['Roboto']">
                    {item.title}
                  </h3>
                  <p className="mt-5 mb-8 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">
                    {item.desc}
                  </p>
                </div>
              ))}
            </main>
          </div>
        </section>
      </>
    </>
  );
};

export default DestinationSection;
