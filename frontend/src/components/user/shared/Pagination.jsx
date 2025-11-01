import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useResponsivePages from "../../../hooks/useResponsivePages";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  currentItems,
}) => {
  const visiblePages = useResponsivePages(); // 👈 dynamic based on screen size

  // Generate limited page range around the current page
  const getVisiblePageNumbers = () => {
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages && start > 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getVisiblePageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 dark:border-blue-900/50">
      {/* Results Count */}
      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-4 sm:mb-0">
        Showing <span className="font-bold">{currentItems.length}</span> of{" "}
        <span className="font-bold">{totalItems}</span> users
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-0">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                currentPage === number
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
