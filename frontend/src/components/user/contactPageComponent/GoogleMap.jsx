import React from "react";

const GoogleMap = () => {
  return (
    <>
      <div className="w-full lg:w-2/3 bg-gray-300 rounded-lg overflow-hidden relative h-[300px] sm:h-[400px] md:h-auto md:w-2/4">
        <iframe
          title="map"
          className="absolute inset-0 w-full h-full"
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
        />
      </div>
    </>
  );
};

export default GoogleMap;
