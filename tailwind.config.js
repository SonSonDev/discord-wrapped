module.exports = {
  purge: [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html" ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
    },
    fontFamily: {
      "chihaya-jun": [ "chihaya-jun" ],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
