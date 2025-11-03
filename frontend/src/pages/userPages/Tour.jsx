import React, { useEffect, useState } from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Tour = () => {
  const { id } = useParams();
  const [singleTour, setSingleTour] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTour = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-tour/${id}`
      );

      setSingleTour(response.data.singleTour);
    } catch (error) {
      console.error("Failed to fetch tour", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10 text-gray-600">Loading Tour...</p>;
  }

  if (!singleTour) {
    return <p className="text-center py-10 text-red-600">Tour not found 🚫</p>;
  }

  return (
    <>
      <CommonHeroSection title="Tour" />

      <section className="container mx-auto px-4 py-12 antialiased">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Image Section */}
          <div className="relative group w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl shadow-lg">
            <img
              className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
              src={singleTour.tourImg}
              alt={singleTour.title}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
            <h2 className="absolute bottom-6 left-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
              {singleTour.title}
            </h2>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {singleTour.title}
              </h1>
              <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
                {singleTour.description}
              </p>

              <div className="flex flex-wrap gap-4 md:gap-6 mt-6 text-gray-700 text-sm">
                <span>
                  <span className="font-semibold">⏳ Duration:</span>{" "}
                  {singleTour.duration}
                </span>
                <span>
                  <span className="font-semibold">💰 Price:</span> $
                  {singleTour.expenditure} / person
                </span>
                <span>
                  <span className="font-semibold">👥 Group Size:</span>{" "}
                  {singleTour.groupSize} people
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-bold text-green-700">✅ Included</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                    {singleTour.included?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-700">❌ Excluded</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                    {singleTour.excluded?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-10 gap-6">
              <div>
                <span className="font-bold text-gray-900">
                  {singleTour.distance} km
                </span>
                <span className="text-gray-600">
                  {" "}
                  from {singleTour.location}
                </span>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                    >
                      <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {singleTour.reviews?.length || 0} reviews
                  </span>
                </div>
              </div>

              <Link
                to={`/booking/${singleTour._id}`}
                className="py-3 px-8 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl shadow-md transform hover:scale-105 duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tour;
