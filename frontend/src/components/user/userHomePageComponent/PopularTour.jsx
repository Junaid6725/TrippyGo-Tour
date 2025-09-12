import { FaLongArrowAltRight } from "react-icons/fa";
import TourCard from "./TourCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PopularTour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTours = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-tours`);
      setTours(response.data.tours || []);
      setLoading();
    } catch (error) {
      console.error("Failed to fetch tours", error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 ">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Find Popular Tours
        </h1>

        <Link
          to="/tours"
          className="group flex items-center gap-1 text-sm md:text-xl text-purple-600 hover:text-purple-800 font-medium cursor-pointer transition-all duration-300"
        >
          See All
          <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:rotate-360" />
        </Link>
      </div>
      <div className="mt-3 mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            🚫 No Tours Available
          </p>
        )}
      </div>
    </>
  );
}
