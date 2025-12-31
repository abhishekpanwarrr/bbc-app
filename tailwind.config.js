/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        coffee: {
          brown: "#3A2A1D",
          cream: "#FAF7F2",
          dark: "#12100E",
          caramel: "#C49A6C",
          success: "#4CAF50",
        },
      },
      borderRadius: {
        xl: "18px",
      },
    },
  },
  plugins: [],
};
