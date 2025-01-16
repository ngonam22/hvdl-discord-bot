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
        'purple' : '#8D77AB',
        'mexican-red': {
            '50': '#fef2f2',
            '100': '#fee2e2',
            '200': '#fecaca',
            '300': '#fca5a5',
            '400': '#f87171',
            '500': '#ef4444',
            '600': '#dc2626',
            '700': '#b91c1c',
            '800': '#a31d1d',
            '900': '#7f1d1d',
            '950': '#450a0a',
        },

        'beige': {
            '50': '#fbf8f1',
            '100': '#f5eedf',
            '200': '#e5d0ac',
            '300': '#ddc094',
            '400': '#cfa068',
            '500': '#c4894b',
            '600': '#b67340',
            '700': '#985c36',
            '800': '#7a4b32',
            '900': '#633e2b',
            '950': '#351f15',
        },
        
    
      }
    },
  },
  plugins: [],
  important: "#root"
}

