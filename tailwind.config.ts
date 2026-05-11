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
        space: {
          DEFAULT: "#03030a",
          light: "#0a0a14",
          mid: "#111122",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          dim: "rgba(0, 212, 255, 0.12)",
          glow: "rgba(0, 212, 255, 0.06)",
        },
        accent: {
          DEFAULT: "#ff3d8f",
          dim: "rgba(255, 61, 143, 0.12)",
          glow: "rgba(255, 61, 143, 0.06)",
        },
        amber: {
          DEFAULT: "#ffb020",
          light: "#ffc857",
          dim: "rgba(255, 176, 32, 0.12)",
        },
        violet: {
          DEFAULT: "#7c3aed",
          bright: "#a78bfa",
          dim: "rgba(124, 58, 237, 0.12)",
        },
        emerald: {
          DEFAULT: "#34d399",
          dim: "rgba(52, 211, 153, 0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
