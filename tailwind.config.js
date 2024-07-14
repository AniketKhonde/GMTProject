/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {screens: {
      'se': {'raw': '(min-height: 401px) and (max-height: 740px)'}, // small mobiles
      's8': {'raw': '(min-height: 741px) and (max-height: 844px)'}, //medium
    },},
  },
  plugins: [],
}

