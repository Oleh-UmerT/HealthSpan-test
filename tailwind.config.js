/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 4px 32px 0px rgba(0, 0, 0, 0.04)',
        'circles': '0px 0px 2px 0px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

