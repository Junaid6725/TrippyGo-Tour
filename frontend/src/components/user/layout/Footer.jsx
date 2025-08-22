import React from "react";
import { FaHeart, FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillThreadsFill } from "react-icons/bs";
import { quickLinks, support } from "../../../data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-white text-gray-800 relative overflow-hidden mt-3">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mb-12 gap-4">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-md">
                  <img
                    src="/logo1.jpg"
                    alt=""
                    className="w-8 h-8 object-cover rounded"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TrippyGo
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                Building exceptional digital experiences with modern design
                principles and cutting-edge technology. Your vision, our
                expertise.
              </p>
              <div className="flex space-x-4">
                {[
                  BsFillThreadsFill,
                  FaSquareXTwitter,
                  FaLinkedin,
                  FaFacebook,
                  FaPinterest,
                ].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-200 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md group"
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Support
              </h3>
              <ul className="space-y-3">
                {support.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Your Company Name. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>Made with</span>
              <div className="flex items-center space-x-1">
                <FaHeart className="text-red-500" />
                <span>by Our Team</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
