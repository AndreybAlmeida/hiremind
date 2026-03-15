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
        primary: {
          DEFAULT: "#1B3A8A",
          50: "#EEF1FB",
          100: "#D4DBF5",
          200: "#A9B7EB",
          300: "#7D93E1",
          400: "#526FD7",
          500: "#1B3A8A",
          600: "#162F70",
          700: "#102356",
          800: "#0B173C",
          900: "#060C22",
        },
        accent: {
          DEFAULT: "#6D5EF3",
          50: "#F0EFFE",
          100: "#DDD9FC",
          200: "#BCB3F9",
          300: "#9A8DF6",
          400: "#7967F4",
          500: "#6D5EF3",
          600: "#4B3AEC",
          700: "#2C1DC5",
          800: "#1E1489",
          900: "#100A4D",
        },
        surface: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
