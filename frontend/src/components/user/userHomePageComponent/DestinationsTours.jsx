import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TourCard from "./TourCard";

const DestinationTours = () => {
  const { destinationId } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/tours/destination/${destinationId}`
        );
        setTours(res.data.tours);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [destinationId]);

  if (loading) return <p className="text-center py-10">Loading tours...</p>;

  if (!tours.length)
    return (
      <p className="text-center py-10">No tours found for this destination.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-sky-600 mb-6">Tours</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default DestinationTours;
