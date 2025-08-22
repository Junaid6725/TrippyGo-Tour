import React from "react";
import { teamMembers } from "../../../data";

const TeamMembers = () => {
  return (
    <>
      <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
        {teamMembers.map((item, index) => {
          return (
            <div key={index}>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src={item.image}
                alt=""
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                {item.name}
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                {item.role}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeamMembers;
