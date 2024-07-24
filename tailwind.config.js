/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // or any other font you prefer
        mono: ["Fira Code", "monospace"], // Custom font for code blocks
      },
    },
  },
  plugins: [],
};
