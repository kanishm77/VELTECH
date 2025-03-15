/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ Ensures Tailwind scans all Next.js app files
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./source/**/*.{js,ts,jsx,tsx}", // ✅ Include this since your components are in `source/`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
