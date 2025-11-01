import React from "react";

const StepTwo = ({ register, errors }) => {
  return (
    <>
      <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-md w-full">
        {/* 💰 Expenditure */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Expenditure
          </label>
          <input
            type="number"
            placeholder="Expenditure"
            {...register("expenditure", {
              required: "Expenditure is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.expenditure && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expenditure.message}
            </p>
          )}
        </div>

        {/* ⏱️ Duration */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Duration
          </label>
          <input
            type="number"
            placeholder="e.g. 5 Days"
            {...register("duration", { required: "Duration is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* 📏 Distance */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Distance
          </label>
          <input
            type="text"
            placeholder="e.g. 300km"
            {...register("distance", { required: "Distance is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.distance && (
            <p className="text-red-500 text-sm mt-1">
              {errors.distance.message}
            </p>
          )}
        </div>

        {/* 📍 Location */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepTwo;
