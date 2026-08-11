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
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        nav: "var(--color-nav)",
        "nav-hover": "var(--color-nav-hover)",
        line: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-display-family)"],
        body: ["var(--font-body-family)"],
      },
      borderRadius: {
        theme: "var(--radius)",
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
};
export default config;
