/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-font": "#18181B",
        "gray-font": "#64748B",
      },
      fontFamily: {
        "source-sans": ["Source Sans Pro", "sans-serif"],
      },
      fontSize: {
        "xs-custom": "12px",
        "sm-custom": "14px",
        "md-custom": "16px",
      },
      fontWeight: {
        "normal-weight": 400,
        "semi-bold": 600,
      },
      lineHeight: {
        "line-20": "20px",
        "line-24": "24px",
      },
      textDecorationSkipInk: {
        none: "none",
      },
    },
  },
  plugins: [],
};
