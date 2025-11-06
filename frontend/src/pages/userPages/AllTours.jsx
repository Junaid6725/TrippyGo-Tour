import React, { useEffect, useState } from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TourCard from "../../components/user/userHomePageComponent/TourCard";
import TourSearchBar from "./TourSearchBar";
import { getAllTours } from "../../services/tourService";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 8; // har page pe kitne tours dikhane hain
  const [totalPages, setTotalPages] = useState(1);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await getAllTours(page, limit);

      setTours(res?.tours || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [page]);

  return (
    <>
      <CommonHeroSection title="Tour" />
      <TourSearchBar />
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">All Tours</h2>

        {loading ? (
          <p className="text-center text-gray-500">⏳ Loading...</p>
        ) : (
          <div className="mt-3 mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tours.length > 0 ? (
              tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                🚫 No Tours Available
              </p>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 flex items-center"
              >
                <MdKeyboardArrowLeft /> Prev
              </button>
              <span className="px-3">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 flex items-center"
              >
                Next <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTours;
