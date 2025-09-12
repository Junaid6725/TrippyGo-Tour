import React from "react";

const StepThree = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-md w-full">
      {/* Included */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Included</label>
        <textarea
          placeholder="Items included (comma separated)"
          rows={3}
          {...register("included", { required: "Included items are required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        />
        {errors.included && (
          <p className="text-red-500 text-sm mt-1">{errors.included.message}</p>
        )}
      </div>

      {/* Excluded */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Excluded</label>
        <textarea
          placeholder="Items excluded (comma separated)"
          rows={3}
          {...register("excluded", { required: "Excluded items are required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        />
        {errors.excluded && (
          <p className="text-red-500 text-sm mt-1">{errors.excluded.message}</p>
        )}
      </div>

      {/* Max Group Size */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Max Group Size
        </label>
        <input
          type="number"
          placeholder="Enter maximum group size"
          {...register("groupSize", {
            required: "Group size is required",
            min: { value: 1, message: "Group size must be at least 1" },
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.groupSize && (
          <p className="text-red-500 text-sm mt-1">
            {errors.groupSize.message}
          </p>
        )}
      </div>

      {/* Hotel Details */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Hotel Details
        </label>
        <input
          type="text"
          placeholder="Enter hotel details"
          {...register("hotelDetail", {
            required: "Hotel details are required",
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.hotelDetail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.hotelDetail.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepThree;
