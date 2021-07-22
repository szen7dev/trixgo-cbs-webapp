/* eslint-disable */
module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or false
  theme: {
    fontFamily: {
      display: ["SanFranciscoDisplay, serif"],
    },
    colors: {
      transparent: "transparent",
      primary: "#111e6c",
      secondary: "#2a90fb",
      accent: "#116c5e",
      negative: "#f43f5e",
      warning: "#f59f0b",
      positive: "#10b981",
      dark: "#0f172a",
      "primary-gray": "#475569",
      "secondary-gray": "#94a3b8",
      "accent-gray": "#1e293b",
      "lighter-gray": "#f1f5f9",
      "primary-light": "#fff",
      "secondary-light": "#e2e8f0",
      "accent-light": "#f4f4f5",
    },
    extend: {
      inset: {
        "[55%]": "55%",
      },
      width: {
        "[34px]": "34px",
        "[52px]": "52px",
        "[74px]": "74px",
        "[500px]": "500px",
        "[1000px]": "1000px",
        fill: "-webkit-fill-available",
      },
      height: {
        "[34px]": "34px",
        "[38px]": "38px",
        "[52px]": "52px",
        "[650px]": "650px",
        max: "max-content",
      },
      minWidth: {
        "[5px]": "5px",
        "[250px]": "250px",
      },
      maxWidth: {
        "[100px]": "100px",
        "[169px]": "169px",
        "[250px]": "250px",
        "[380px]": "380px",
        "[75%]": "75%",
      },
      minHeight: {
        "[54px]": "54px",
      },
      maxHeight: {
        "[98px]": "98px",
      },
      backgroundImage: {
        authentication: "url('../assets/images/background-authentication.png')",
        "authentication-img": "url('../assets/images/authentication-img.png')",
      },
      borderWidth: {
        6: "6px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
