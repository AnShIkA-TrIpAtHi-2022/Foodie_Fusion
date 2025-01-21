import React, { useState } from "react";
import { motion } from "framer-motion";
import salad from "../assets/salad_plate.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      animate={{
        background:
          "linear-gradient(180deg, rgba(187,165,143,1) 0%, rgba(232,217,205,1) 25%, rgba(255,255,255,1) 49%, rgba(232,217,205,1) 73%, rgba(187,165,143,1) 100%)",
      }}
      transition={{ duration: 0.5 }}
    >
        
      {/* Rotating Image */}
      <motion.img
        src={salad}
        alt="Salad Plate"
        className="absolute -left-64 top-20 h-3/4 drop-shadow-[0_0_10px_black]"
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        className="bg-white shadow-[0px_0px_20px_gray] rounded-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        
        <h2 className="text-2xl font-bold text-center tracking-widest text-brown mb-6">
          Login
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            text="Login"
            className="w-full hover:bg-[rgba(247,235,225,1)] hover:shadow-[5px_5px_0_brown]"
          />
        </form>


        <button
          onClick={() => navigate("/register")}
          className="mt-4 text-brown hover:text-darkGreen transition-colors text-sm"
        >
          Create Account
        </button>


      </motion.div>

      <motion.img
        src={salad}
        alt="Salad Plate"
        className="absolute -right-64 top-20 h-3/4 drop-shadow-[0_0_10px_black]"
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
