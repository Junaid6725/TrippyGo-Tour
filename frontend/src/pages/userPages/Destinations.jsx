import React, { useState, useEffect } from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import DestinationCard from "../../components/user/userHomePageComponent/DestinationsCard";
import { Link } from "react-router-dom";
import { getDestinations } from "../../services/destinationService";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await getDestinations(page, limit);

      if (res.data && Array.isArray(res.data.destinations)) {
        setDestinations(res.data.destinations);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setDestinations([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="relative h-64 bg-gray-300"></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <CommonHeroSection title="Destinations" />

      <div className="min-h-screen  py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Amazing Destinations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your next adventure with our carefully curated selection
              of breathtaking destinations around the world.
            </p>
          </div>

          {loading && <LoadingSkeleton />}

          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((item, index) => (
                  <Link to={`/tours/destination/${item._id}`} key={item._id}>
                    <DestinationCard key={item._id} item={item} index={index} />
                  </Link>
                ))}
              </div>

              {destinations.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">
                    No destinations available.
                  </div>
                </div>
              )}

              {destinations.length > 0 && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      page === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Previous
                  </button>

                  <span className="text-gray-700">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      page === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Destinations;
