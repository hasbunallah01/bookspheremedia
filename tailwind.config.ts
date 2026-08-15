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
        /* ===== BookSphere brand system: editorial burgundy + antique gold ===== */
        forest: {
          DEFAULT: "#5A1F2B",
          50: "#F7ECEE",
          100: "#EDD3D7",
          200: "#DBA7AF",
          300: "#C67A87",
          400: "#8C3F4C",
          500: "#5A1F2B",
          600: "#451822",
          700: "#331219",
          800: "#220C11",
          900: "#120609",
        },
        bronze: {
          DEFAULT: "#B58A45",
          50: "#FBF4E7",
          100: "#F3E3C4",
          200: "#E7C98F",
          300: "#DBAF5E",
          400: "#C99C52",
          500: "#B58A45",
          600: "#92702F",
          700: "#705623",
          800: "#4E3C18",
          900: "#2C220D",
        },
        sage: { DEFAULT: "#A8B7A1", light: "#C5D0C0" },
        charcoal: "#242424",
        ivory: "#F8F4ED",
        stone: "#EDE5D8",
        mist: "#DFD3BE",
        surface: "#FDFBF7",
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
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(36, 36, 36, 0.06), 0 8px 32px -8px rgba(36, 36, 36, 0.08)",
        "card-hover":
          "0 4px 16px -2px rgba(36, 36, 36, 0.08), 0 16px 48px -12px rgba(36, 36, 36, 0.14)",
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
