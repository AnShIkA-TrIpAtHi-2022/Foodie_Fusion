"use client";
import React from "react";

const Section = ({ title, children, className = "" }) => (
  <section className={`mt-12 px-6 md:px-12 ${className}`}>
    <h2 className="text-2xl font-bold mb-6 flex items-center">
      <span className="mr-2 w-1 h-8 bg-amber-500 inline-block"></span>
      {title}
    </h2>
    {children}
  </section>
);

export default Section;
