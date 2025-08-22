import React from "react";
import AllTours from "../../components/admin/adminTourComponent.jsx/AllTours";

const AdminTour = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm rounded-md">
        <h1 className="text-xl font-bold text-gray-800">All Tours</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition font-semibold">
          Add Tour
        </button>
      </div>
      <AllTours />
    </>
  );
};

export default AdminTour;
