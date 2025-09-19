import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import StepOne from "./multiStepForm/StepOne";
import StepTwo from "./multiStepForm/StepTwo";
import StepThree from "./multiStepForm/StepThree";
import { button } from "framer-motion/client";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTour = () => {
  const [count, setCount] = useState(1);
  const [tour, setTour] = useState(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const submitData = async (data) => {
    try {
      const formData = new FormData();
      const include = data.included.split(",").map((item) => item.trim());
      const exclude = data.excluded.split(",").map((item) => item.trim());

      formData.append("title", data.title);
      formData.append("imgAlt", data.imgAlt);
      formData.append("description", data.description);
      formData.append("expenditure", data.expenditure);
      formData.append("duration", data.duration);
      formData.append("distance", data.distance);
      formData.append("location", data.location);
      formData.append("groupSize", data.groupSize);
      formData.append("included", JSON.stringify(include));
      formData.append("excluded", JSON.stringify(exclude));
      formData.append("hotelDetail", data.hotelDetail);

      if (data.tourImage && data.tourImage[0]) {
        formData.append("tourImage", data.tourImage[0]);
      }

      const createTour = await axios.post(
        `http://localhost:8000/api/create-tour`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTour(createTour.data.newTour || null);
      toast.success("Tour created successfully!");
      navigate("/admin-dashboard/tour");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCount = async () => {
    let valid = false;
    if (count === 1) {
      valid = await trigger(["title", "imgUrl", "imgAlt", "description"]);
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
          Add Tour Package
        </h2>

        {count == 1 && <StepOne register={register} errors={errors} />}

        {count == 2 && <StepTwo register={register} errors={errors} />}

        {count == 3 && <StepThree register={register} errors={errors} />}
        {count === 3 ? (
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition hover:cursor-pointer"
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
              onClick={handleCount}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTour;
