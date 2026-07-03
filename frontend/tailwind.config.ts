import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0f1419",
          900: "#1a2332",
          800: "#243044",
          700: "#3d4f6f",
          500: "#6b7f9e",
          300: "#a8b8d0",
          100: "#e8edf5",
        },
        sage: {
          600: "#3d6b5a",
          500: "#4a8570",
          400: "#5fa088",
          100: "#e4f0eb",
        },
        amber: {
          500: "#d4923a",
          400: "#e8a84e",
          100: "#fdf3e3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
