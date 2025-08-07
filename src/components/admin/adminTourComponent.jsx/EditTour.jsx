import React from "react";
import { useForm } from "react-hook-form";

const EditTour = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (data) => {
    console.log(data);
    navigate("/contact");
  };
  return (
    <>
      <div className="w-full px-4 py-10 flex justify-center bg-gray-100 min-h-screen">
        <form className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Add Tour Package
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Price"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Duration (Days)"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Max Group Size"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Hotel Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Hotel Location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTour;
