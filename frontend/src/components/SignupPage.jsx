import React, { useState } from "react";
import { motion } from "framer-motion";
import rest from "../assets/rest_plate.png";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then(() => {
        console.log("Signup Successful:", signupData);
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      animate={{
        background:
          "linear-gradient(180deg, rgba(34,48,48,1) 0%, rgba(149,157,144,1) 50%, rgba(34,48,48,1) 100%)",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Rotating Image */}
      <motion.img
        src={rest}
        alt="Rest Plate"
        className="absolute -left-64 top-20 h-3/4 drop-shadow-[0_0_10px_white]"
        animate={{ rotate: 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        className="bg-white shadow-[0px_0px_20px_gray] rounded-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center tracking-widest text-brown mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="contact"
            value={signupData.contact}
            onChange={handleSignupChange}
            placeholder="Contact Number"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleSignupChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            text="Sign Up"
            className="w-full bg-brown text-white !shadow-[4px_4px_0_rgba(187,165,143,1)] hover:bg-darkBrown hover:shadow-[5px_5px_0_brown] hover:text-white"
          />
        </form>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-white hover:text-darkGreen transition-colors text-sm"
        >
          Already have an account? Login
        </button>
      </motion.div>

      <motion.img
        src={rest}
        alt="Rest Plate"
        className="absolute -right-64 top-20 h-3/4 drop-shadow-[0_0_10px_white]"
        animate={{ rotate: 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>

  );
}
