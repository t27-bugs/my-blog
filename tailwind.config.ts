import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        panel: "#ffffff",
        line: "#d2d2d7",
        muted: "#6e6e73",
        text: "#1d1d1f",
        accent: "#111111",
        green: "#248a3d"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Cascadia Code", "Consolas", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: [typography]
};

export default config;
