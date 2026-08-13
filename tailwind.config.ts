import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ===== Reference design system ===== */
        forest: {
          DEFAULT: "#23463F",
          50: "#EDF2F0",
          100: "#D2DFDB",
          200: "#A6BFB8",
          300: "#7A9F94",
          400: "#4E7268",
          500: "#23463F",
          600: "#1D3B35",
          700: "#172F2A",
          800: "#11231F",
          900: "#0B1715",
        },
        bronze: {
          DEFAULT: "#B8782E",
          50: "#F9F1E6",
          100: "#F0DEC2",
          200: "#E2BE85",
          300: "#D39E52",
          400: "#C58B3D",
          500: "#B8782E",
          600: "#966125",
          700: "#734A1C",
          800: "#513413",
          900: "#2F1E0B",
        },
        sage: { DEFAULT: "#A8B7A1", light: "#C5D0C0" },
        charcoal: "#222222",
        ivory: "#FAF7F2",
        stone: "#F1ECE5",
        mist: "#E7E4DD",
        /* ===== Legacy tokens (kept for About/Contact until redesigned) ===== */
        ink: {
          DEFAULT: "#0B0B0B",
          50: "#171717",
          100: "#1F1F1F",
          200: "#262626",
          300: "#2D2D2D",
          400: "#3F3F3F",
          500: "#525252",
        },
        copper: {
          DEFAULT: "#B87333",
          50: "#FBF1E8",
          100: "#F4DEC4",
          200: "#E8B985",
          300: "#DC9556",
          400: "#C9823F",
          500: "#B87333",
          600: "#965E29",
          700: "#744820",
          800: "#523317",
          900: "#311D0D",
        },
        muted: "#B8B8B8",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(34, 34, 34, 0.06), 0 8px 32px -8px rgba(34, 34, 34, 0.08)",
        "card-hover":
          "0 4px 16px -2px rgba(34, 34, 34, 0.08), 0 16px 48px -12px rgba(34, 34, 34, 0.14)",
        "glow-copper": "0 0 60px -10px rgba(184, 115, 51, 0.5)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
