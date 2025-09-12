import React from "react";
import AllTours from "../../components/admin/adminTourComponent.jsx/AllTours";
import { Link, useNavigate } from "react-router-dom";

const AdminTour = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between px-4 py-4 bg-white shadow-sm rounded-md">
        <h1 className="text-xl font-bold text-gray-800">All Tours</h1>
        <Link
          to={`/admin-dashboard/add-tour`}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition font-semibold"
        >
          Add Tour
        </Link>
      </div>
      
      <AllTours />
    </>
  );
};

export default AdminTour;
