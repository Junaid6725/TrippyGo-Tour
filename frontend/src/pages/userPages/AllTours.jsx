import React, { useEffect, useState } from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import axios from "axios";
import { Link } from "react-router-dom";
import TourCard from "../../components/user/userHomePageComponent/TourCard";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-tours`);
      setTours(response.data.tours || []);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  return (
    <>
      <CommonHeroSection title="Tour" />
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">All Tours</h2>

        <div className="mt-3 mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tours.length > 0 ? (
            tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              🚫 No Tours Available
            </p>
          )}
        </div>

        {/* <div className="flex justify-end mt-8">
          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AllTours;
