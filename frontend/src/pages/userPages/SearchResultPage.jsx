import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { searchTour } from "../../services/tourService";
import TourCard from "../../components/user/userHomePageComponent/TourCard";

export default function SearchResultsPage() {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Extract query params
  const query = new URLSearchParams(location.search);
  const filters = {
    location: query.get("location") || "",
    minPrice: query.get("minPrice") || "",
    maxPrice: query.get("maxPrice") || "",
    groupSize: query.get("groupSize") || "",
  };

  // Fetch tours function
  const fetchTours = async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);
      const res = await searchTour({ ...filters, page: pageNumber, limit: 6 });

      if (append) {
        setTours((prev) => [...prev, ...res.tours]);
      } else {
        setTours(res.tours);
      }
      setHasMore(res.hasMore);
    } catch (err) {
      setError(err.res?.data?.message || "Error fetching tours");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when filters change
  useEffect(() => {
    setPage(1);
    fetchTours(1);
  }, [location.search]);

  // Load more handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTours(nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center sm:text-left">
        Search Results
      </h2>

      {/* Active Filters Info */}
      {(filters.location ||
        filters.minPrice ||
        filters.maxPrice ||
        filters.groupSize) && (
        <div className="text-gray-600 text-sm mb-6 bg-blue-50 p-3 rounded-xl inline-block">
          <span>Filters:</span>
          {filters.location && (
            <span>
              {" "}
              <strong>Location:</strong> {filters.location}
            </span>
          )}
          {filters.minPrice && (
            <span>
              {" "}
              | <strong>Min Price:</strong> ${filters.minPrice}
            </span>
          )}
          {filters.maxPrice && (
            <span>
              {" "}
              | <strong>Max Price:</strong> ${filters.maxPrice}
            </span>
          )}
          {filters.groupSize && (
            <span>
              {" "}
              | <strong>Group Size:</strong> {filters.groupSize}+
            </span>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center font-medium mb-6">{error}</p>
      )}

      {/* Skeleton Loader (initial load only) */}
      {loading && page === 1 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-72 rounded-2xl shadow-md"
            ></div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && tours.length === 0 && !error && (
        <p className="text-gray-500 text-center py-10">
          No tours found. Try adjusting your filters.
        </p>
      )}

      {/* Tour Cards */}
      {tours.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {tours.map((tour) => (
            <motion.div
              key={tour._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition duration-300 font-medium disabled:opacity-70"
          >
            {loading && page > 1 ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading more...</span>
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* Subtle Spinner (only when fetching additional pages) */}
      {loading && page > 1 && !hasMore && (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
