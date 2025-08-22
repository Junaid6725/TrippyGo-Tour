import React from "react";
import { terms } from "../../../data";

const TermsConditionsComponent = () => {
  return (
    <>
      <div className="space-y-8">
        {terms.map((term, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
              <span>
                {index + 1}
                {term.title}
              </span>
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {term.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsConditionsComponent;
