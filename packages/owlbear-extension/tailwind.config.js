/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'danger': '#A31D1D',
        'maroon': '#6D2323',
        'beige': '#E5D0AC',
        'vanilla': '#FEF9E1',
        'teal': '#578E7E',
        'purple' : '#8D77AB'
      }
    },
  },
  plugins: [],
  important: "#root"
}

