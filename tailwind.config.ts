import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        antik: {
          gold: "#C9A84C",
          dark: "#1C1410",
        },
      },
    },
  },
  plugins: [],
};

export default config;
