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

  const query = new URLSearchParams(location.search);
  const filters = {
    location: query.get("location") || "",
    minPrice: query.get("minPrice") || "",
    maxPrice: query.get("maxPrice") || "",
    groupSize: query.get("groupSize") || "",
  };

  // fetch tours
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
      setError(err.response?.data?.message || "Error fetching tours");
    } finally {
      setLoading(false);
    }
  };

  // on mount or when filters change
  useEffect(() => {
    setPage(1);
    fetchTours(1);
  }, [location.search]);

  // handle load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTours(nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        Search Results
      </h2>

      {loading && page === 1 && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tours.length === 0 && !error && (
        <p className="text-gray-500 text-center py-8">
          No tours found. Try different filters.
        </p>
      )}

      {tours.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
