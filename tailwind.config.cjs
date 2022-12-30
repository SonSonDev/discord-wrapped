module.exports = {
  content: [
    "./stats-app/src/**/*.{js,jsx,ts,tsx}",
    "./stats-app/index.html",
    "./wrapped/src/**/*.{js,jsx,ts,tsx}",
    "./wrapped/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
    },
    fontFamily: {
      "chihaya-jun": ["chihaya-jun"],
      "rodin": ["Rodin"],
    },
    extend: {
      colors: {
        "dark": "#514E3F",
        "yellow-1": "#B4AF9B",
        "yellow-2": "#CBC6B0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
