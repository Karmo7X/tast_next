/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-color': '#E9E9E9',
        'text-color': '#242223',
        'darkred-color': '#EE232F',
        'lightred-color': '#F9EAEB',
        'button-color': '#262626',
        'custom-color':'#A2A1A81A',
      },
    },
  },
  plugins: [],
};
