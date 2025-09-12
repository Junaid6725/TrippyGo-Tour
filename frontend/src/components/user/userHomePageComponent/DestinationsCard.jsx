import React from "react";

const DestinationsCard = () => {
  return (
    <>
      <li className="flex flex-col items-center">
        <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            alt="Alice Johnson"
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">
          Alice Johnson
        </h3>
        <p className="text-sm text-gray-600 text-center">Product Manager</p>
      </li>
    </>
  );
};

export default DestinationsCard;
