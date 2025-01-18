import React from "react";

const Button = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-xl font-heading rounded-lg bg-beige text-darkGreen shadow-[4px_4px_0_brown] hover:text-darkGreen transition-all duration-300 active:scale-95 ${className}`}
    >
      {text}
    </button>
  );
}
export default Button;