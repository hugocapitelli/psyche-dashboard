import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "#111111",
        elevated: "#1A1A1A",
        border: "#2A2A2A",
        primary: "#E8E0D5",
        accent: "#C4A882",
        "accent-alt": "#7C9E8F",
        muted: "#666666",
        disc: "#C4A882",
        mbti: "#7C9E8F",
        bigfive: "#8B9CC4",
        enneagram: "#C48BB4",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
