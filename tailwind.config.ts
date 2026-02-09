import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-100": "#f6f7fb",
        "surface-200": "#eef0f8",
        "surface-300": "#dfe3f0",
        "surface-400": "#c2c8dc",
        "ink-900": "#111827",
        "ink-700": "#1f2937",
        "ink-500": "#374151",
        "accent-500": "#5B5FFF",
        "accent-400": "#7C7FFF",
        "accent-300": "#A0A3FF",
        "accent-200": "#D1D3FF",
        "success-500": "#22c55e",
        "warning-500": "#f59e0b",
        "danger-500": "#ef4444",
      },
      boxShadow: {
        soft: "12px 12px 24px rgba(15, 23, 42, 0.08)",
        "inner-strong": "inset 8px 8px 18px rgba(15, 23, 42, 0.1)",
        "inner-soft": "inset -8px -8px 18px rgba(255, 255, 255, 0.7)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "glow-accent":
          "radial-gradient(120% 120% at 50% 0%, rgba(91, 95, 255, 0.18) 0%, rgba(91, 95, 255, 0) 70%)",
        "glow-sunrise":
          "radial-gradient(120% 120% at 50% 0%, rgba(251, 170, 79, 0.18) 0%, rgba(251, 170, 79, 0) 70%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
