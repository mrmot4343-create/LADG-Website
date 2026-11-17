import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral / surface
        ink: {
          950: "#05060a",
          900: "#0a0c14",
          800: "#11141f",
          700: "#1a1e2e",
          600: "#262b40",
          500: "#3a4060",
        },
        // Primary — electric cyan/blue (futuristic, non-purple)
        primary: {
          50: "#e6fbff",
          100: "#ccf6ff",
          200: "#99ecff",
          300: "#5fe0ff",
          400: "#22ccff",
          500: "#00b4e6",
          600: "#008fc4",
          700: "#006b94",
          800: "#004763",
          900: "#002a3d",
        },
        // Accent — emerald/teal
        accent: {
          400: "#34e3c4",
          500: "#10c9a3",
          600: "#0aa887",
        },
        // Warning / error / success
        warning: { 400: "#ffcf5c", 500: "#f5b13d" },
        error: { 400: "#ff6b6b", 500: "#e84a4a" },
        success: { 400: "#4ade80", 500: "#22c55e" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.28em",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(34,204,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,204,255,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(0,180,230,0.18), transparent 60%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSlow: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
