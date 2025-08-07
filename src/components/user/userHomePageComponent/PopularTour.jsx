import { FaLongArrowAltRight } from "react-icons/fa";
import TourCard from "./TourCard";

export default function PopularTour() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 ">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Find Popular Tours
        </h1>

        <span className="group flex items-center gap-1 text-sm md:text-xl text-purple-600 hover:text-purple-800 font-medium cursor-pointer transition-all duration-300">
          See All
          <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:rotate-360" />
        </span>
      </div>
      <div className="mt-3 mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-8 ">
        <TourCard />
      </div>
    </>
  );
}
