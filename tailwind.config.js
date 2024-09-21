/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from "tailwindcss-primeui";
export default {
  content: ["./src/**/*.vue", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
};
