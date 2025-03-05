/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#011422",
        c2: "#001f33",
        c3: "#299c95",
        c4: "#7c7f86",
        c5: "#021323",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
