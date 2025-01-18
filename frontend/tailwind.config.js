/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        darkGreen: "#223030",
        darkBrown: "#523D35",
        brown: "#3d251e",
        sage: "#959D90",
        tan: "#BBA58F",
        beige: "#E8D9CD",
        offWhite: "#EFEFE9",
      },
      fontSize: {
        heading: "2.5rem", 
        subheading: "2rem", 
        body: "1rem", 
        small: "0.875rem", 
      },
      fontWeight: {
        heading: "700",
        subheading: "600", 
        body: "400",
      },
    },
  },
  plugins: [],
}