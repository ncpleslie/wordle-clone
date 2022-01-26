module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [{ pattern: /grid-cols-(3|4|5|6|7|8|9|10)/, }],
  theme: {
    extend: {},
  },
  plugins: [],
};