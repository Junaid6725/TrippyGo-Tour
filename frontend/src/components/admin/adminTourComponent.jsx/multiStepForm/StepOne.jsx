import React from "react";

const StepOne = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-md w-full">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Tour Title
        </label>
        <input
          type="text"
          placeholder="Enter tour title"
          {...register("title", { required: "Title is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Image URL
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder="Enter image URL"
          {...register("tourImage", { required: "Image URL is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.tourImage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.tourImage.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Image Alt Text
        </label>
        <input
          type="text"
          placeholder="Enter image alt text"
          {...register("imgAlt", { required: "Image Alt Text is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.imgAlt && (
          <p className="text-red-500 text-sm mt-1">{errors.imgAlt.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <textarea
          placeholder="Write a short description"
          rows={4}
          {...register("description", { required: "Description is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepOne;
