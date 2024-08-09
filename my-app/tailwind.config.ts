import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-bg": "url('/images/background.jpg')", // ここに背景画像を追加
      },
      padding: {
        '15': '3.75rem', // 15 * 0.25rem = 3.75rem
        '16': '4rem', 
        '17': '4.25rem', // 17 * 0.25rem = 4.25rem
        '18': '4.5rem',  // 18 * 0.25rem = 4.5rem
      },
    },
  },
  plugins: [],
};

export default config;