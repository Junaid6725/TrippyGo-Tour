import React from "react";

const SubtleSpinner = () => {
  return (
    <>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    </>
  );
};

export default SubtleSpinner;
