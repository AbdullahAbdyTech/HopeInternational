import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8860B",
          bright: "#E5A820",
          soft: "#F8E7B3"
        },
        teal: {
          DEFAULT: "#0D7377",
          dark: "#095658",
          soft: "#E6F4F4"
        },
        ink: {
          DEFAULT: "#0A0A0A",
          muted: "#555555"
        },
        surface: {
          DEFAULT: "#F9F8F5",
          warm: "#FDF8EF"
        }
      },
      fontFamily: {
        body: ["DM Sans", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 8px 32px rgba(0, 0, 0, 0.08)",
        elevated: "0 18px 54px rgba(0, 0, 0, 0.14)",
        gold: "0 10px 34px rgba(184, 134, 11, 0.24)",
        teal: "0 10px 34px rgba(13, 115, 119, 0.2)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 4s ease infinite"
      }
    }
  },
  plugins: []
};

export default config;
