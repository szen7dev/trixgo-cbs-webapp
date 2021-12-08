/* eslint-disable */
module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or false
  theme: {
    fontFamily: {
      display: ["SanFranciscoDisplay, serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#0060E1",
        secondary: "#2a90fb",
        accent: "#C2DBFF",
        negative: "#f43f5e",
        warning: "#f59f0b",
        positive: "#10b981",
        dark: "#000000",
        "primary-gray": "#666666",
        "secondary-gray": "#798295",
        "accent-gray": "#1e293b",
        "lighter-gray": "#f1f5f9",
        "primary-light": "#ffffff",
        "secondary-light": "#F5F6F9",
        "accent-light": "#E9EAEF",
      },
      fontSize: {
        "[13px]": "13px",
        "[14px]": "14px",
        "[15px]": "15px",
      },
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
			lineHeight: {
				"[15px]": "14.95px",
				
			}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
