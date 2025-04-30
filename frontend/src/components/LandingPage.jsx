"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Section from "./Section";
import DishCard from "./DishCard";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const dishesPerPage = 15;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/food/all');
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const filteredDishes = foodItems.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedDishes = filteredDishes.slice((page - 1) * dishesPerPage, page * dishesPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="flex flex-col justify-center items-center h-screen bg-amber-700 text-white fixed inset-0 z-50"
          >
            <motion.div variants={itemVariants} className="text-5xl font-bold">
              Foodie Fusion
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 flex space-x-3">
              <motion.span
                className="inline-block text-4xl"
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🍕
              </motion.span>
              <motion.span
                className="inline-block text-4xl"
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              >
                🍜
              </motion.span>
              <motion.span
                className="inline-block text-4xl"
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
              >
                🍰
              </motion.span>
            </motion.div>
            <motion.div 
              variants={itemVariants} 
              className="mt-8 text-lg text-amber-100"
            >
              Discover delicious meals
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={loading ? "hidden" : ""}>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Section title="Featured Dishes">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedDishes.map((dish) => (
              <DishCard key={dish._id} dish={dish} featured={dish.featured} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default LandingPage;
