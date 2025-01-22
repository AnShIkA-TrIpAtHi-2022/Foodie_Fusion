import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import salad from "../assets/salad_plate.png";
import rest from "../assets/rest_plate.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const LoginSignupPage = ({mode}) => {
  const [isLogin, setIsLogin] = useState(mode == 'login');
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", contact: "", password: "", confirmPassword: "", userType: "customer" });
  const navigate = useNavigate()

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    navigate('/home')
    console.log("Login submitted:", loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const { name, email, contact, password, confirmPassword, userType } = signupData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, contact, password, userType })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });

    console.log("Signup submitted:", signupData);
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8"
      animate={{ 
        background: isLogin 
          ? "linear-gradient(180deg, rgba(187,165,143,1) 0%, rgba(232,217,205,1) 25%, rgba(255,255,255,1) 49%, rgba(232,217,205,1) 73%, rgba(187,165,143,1) 100%)"
          : "linear-gradient(180deg, rgba(34,48,48,1) 0%, rgba(149,157,144,1) 50%, rgba(34,48,48,1) 100%)"
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Plate Image with Rotation */}
      <motion.img
        src={isLogin ? salad : rest}
        alt="plate"
        className={`absolute -top-64 md:-left-64 md:top-20 h-3/4 ${isLogin ? "drop-shadow-[0_0_10px_black]" : "drop-shadow-[0_0_10px_white]"}`}
        animate={{ rotate: isLogin ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Form Container */}
      <div className={`bg-white ${isLogin?"shadow-[0px_0px_20px_gray]":"shadow-[0_0_10px_white]" } rounded-xl overflow-hidden w-full max-w-md relative`}>
        {/* Toggle Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-brown hover:text-darkGreen transition-colors"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>

        {/* Animated Form Section */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-center tracking-widest text-brown mb-6">Login</h2>
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
                <Button text="Login" className="w-full hover:bg-[rgba(247,235,225,1)] hover:shadow-[5px_5px_0_brown]" />
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-center tracking-widest text-brown mb-6">Sign Up</h2>
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
                
                {/* User Type Selection */}
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="customer"
                      checked={signupData.userType === "customer"}
                      onChange={handleSignupChange}
                      className="mr-2"
                    />
                    Customer
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="restaurant"
                      checked={signupData.userType === "restaurant"}
                      onChange={handleSignupChange}
                      className="mr-2"
                    />
                    Restaurant
                  </label>
                </div>
                
                <Button text="Sign Up" className="w-full bg-brown text-white !shadow-[4px_4px_0_rgba(187,165,143,1)] hover:bg-darkBrown hover:shadow-[5px_5px_0_brown] hover:text-white transition-all duration-300" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.img
        src={isLogin ? salad : rest}
        alt="plate"
        className={`absolute -bottom-64 md:-right-64 md:top-20 h-3/4 ${isLogin ? "drop-shadow-[0_0_10px_black]" : "drop-shadow-[0_0_10px_white]"}`}
        animate={{ rotate: isLogin ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default LoginSignupPage;
