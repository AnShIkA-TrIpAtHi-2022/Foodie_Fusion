"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const DishCard = ({ dish, featured = false }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuItemId: dish.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart. Please try again.");
      }

      alert("Item added to cart successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-4 rounded-lg shadow-md transition-all ${
        featured
          ? "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200"
          : "bg-white"
      }`}
    >
      <div className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden">
        <img
          src={dish.images[0]}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{dish.name}</h3>
      <p className="text-sm text-gray-600">{dish.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-medium text-amber-700">${dish.price}</span>
        {featured && (
          <div className="flex items-center text-amber-500">
            <FaStar className="mr-1" />
            <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
          </div>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-3 w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors font-medium text-sm"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </motion.div>
  );
};

export default DishCard;
