import { FaMapMarkerAlt, FaSearch, FaUsers } from "react-icons/fa";
import { CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";

export default function TourSearchBar() {
  return (
    <div className="mt-6 mb-6 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-end">
        <div className="flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-full mt-1">
            <FaMapMarkerAlt className="text-purple-700 text-xl" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-purple-900 mb-1 block">
              Where
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-full mt-1">
            <CiBookmarkMinus className="text-purple-700 text-xl" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-purple-900 mb-1 block">
              Min Price
            </label>
            <input
              type="number"
              placeholder="e.g. 1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-full mt-1">
            <CiBookmarkPlus className="text-purple-700 text-xl" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-purple-900 mb-1 block">
              Max Price
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-full mt-1">
            <FaUsers className="text-purple-700 text-xl" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-purple-900 mb-1 block">
              Max People
            </label>
            <input
              type="number"
              placeholder="e.g. 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button className="bg-purple-700 hover:bg-purple-800 hover:opacity-90 transition-all duration-300 cursor-pointer text-white px-6 py-3 rounded-full shadow-md text-base flex items-center gap-2">
            <FaSearch />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
