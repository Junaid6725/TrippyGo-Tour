import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import StepOne from "./multiStepForm/StepOne";
import StepTwo from "./multiStepForm/StepTwo";
import StepThree from "./multiStepForm/StepThree";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditTour = () => {
  const [count, setCount] = useState(1);
  const [tour, setTour] = useState(null);
  const [destinations, setDestinations] = useState([]);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  const getAllDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-destinations");
      setDestinations(res.data.destinations || []);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  useEffect(() => {
    if (!destinations.length) getAllDestinations();
    if (id) getTourById();
  }, [id]);

  // ✅ Fetch tour by ID
  const getTourById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-tour/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.singleTour) {
        const tourData = response.data.singleTour;

        // Convert arrays into comma-separated strings for form inputs
        if (Array.isArray(tourData.included)) {
          tourData.included = tourData.included.join(", ");
        }
        if (Array.isArray(tourData.excluded)) {
          tourData.excluded = tourData.excluded.join(", ");
        }

        setTour(tourData);
        reset({
          ...tourData,
          destinationId:
            tourData.destinationId?._id || tourData.destinationId || "",
        });
      }
    } catch (error) {
      console.log("Error fetching tour:", error);
    }
  };

  // ✅ Submit updated tour
  const submitData = async (data) => {
    const formData = new FormData();
    try {
      console.log("DESTINATION ID:", data.destinationId);
      formData.append("title", data.title);
      formData.append("destinationId", data.destinationId);
      formData.append("description", data.description);
      formData.append("expenditure", data.expenditure);
      formData.append("duration", data.duration);
      formData.append("distance", data.distance);
      formData.append("location", data.location);
      formData.append("groupSize", data.groupSize);

      const include = Array.isArray(data.included)
        ? data.included
        : data.included.split(",").map((item) => item.trim());

      const exclude = Array.isArray(data.excluded)
        ? data.excluded
        : data.excluded.split(",").map((item) => item.trim());

      formData.append("included", JSON.stringify(include));
      formData.append("excluded", JSON.stringify(exclude));
      formData.append("hotelDetail", data.hotelDetail);

      if (data.tourImg && data.tourImg[0]) {
        formData.append("tourImg", data.tourImg[0]);
      }

      const response = await axios.put(
        `http://localhost:8000/api/update-tour/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Tour updated successfully!");
        navigate("/admin-dashboard/tour");
      }
    } catch (error) {
      toast.error("Failed to update tour");
      console.error(error);
    }
  };

  const handlecount = async () => {
    let valid = false;
    if (count === 1) {
      valid = await trigger([
        "title",
        "tourImg",
        "destinationId",
        "description",
      ]);
    } else if (count === 2) {
      valid = await trigger([
        "expenditure",
        "duration",
        "distance",
        "location",
      ]);
    } else {
      valid = true;
    }

    if (valid) {
      setCount(count + 1);
    }
  };

  return (
    <div className="w-full px-4 py-10 flex justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(submitData)}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Edit Tour Package
        </h2>

        {count === 1 && (
          <StepOne
            register={register}
            errors={errors}
            destinations={destinations}
          />
        )}
        {count === 2 && <StepTwo register={register} errors={errors} />}
        {count === 3 && <StepThree register={register} errors={errors} />}

        {count === 3 ? (
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition"
          >
            Submit
          </button>
        ) : (
          <div className="flex justify-between gap-4">
            {count > 1 && (
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md font-semibold transition"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handlecount}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition"
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditTour;
