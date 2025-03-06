/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a1b1e',
          800: '#2c2d31',
          700: '#3d3e42',
          400: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
};