import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable bridge — components use these instead of hardcoded hex
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--c-surface-hover) / <alpha-value>)",
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--c-primary-hover) / <alpha-value>)",
        text: "rgb(var(--c-text) / <alpha-value>)",
        "text-muted": "rgb(var(--c-text-muted) / <alpha-value>)",
        "text-dim": "rgb(var(--c-text-dim) / <alpha-value>)",
        success: "rgb(var(--c-success) / <alpha-value>)",
        "success-bg": "rgb(var(--c-success-bg) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
        "danger-bg": "rgb(var(--c-danger-bg) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
