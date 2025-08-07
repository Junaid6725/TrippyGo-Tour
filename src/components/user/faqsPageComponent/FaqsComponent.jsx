import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { faqData } from "../../../data";
import { useState } from "react";

const FaqsComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md overflow-hidden shadow-md bg-white"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-blue-50 transition-colors hover:cursor-pointer"
              onClick={() => toggle(index)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>

              <span className="w-5 h-5 transform transition-transform duration-300">
                {openIndex === index ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </button>

            <div
              className={`px-6 overflow-hidden transition-all duration-300 text-gray-700 ${
                openIndex === index ? "max-h-40 py-4" : "max-h-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqsComponent;
