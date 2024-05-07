/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [],
};
