"use client";
import React from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-700">
          Foodie Fusion
        </h1>
        <div className="relative md:w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-5 items-center">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaUser className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
