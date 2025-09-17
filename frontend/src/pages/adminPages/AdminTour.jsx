import React from "react";

import { Link, useNavigate } from "react-router-dom";

import AllTours from "./../../components/admin/adminTourComponent.jsx/AllTours";

const AdminTour = () => {
  const navigate = useNavigate();

  return (
    <>
      <AllTours />
    </>
  );
};

export default AdminTour;
