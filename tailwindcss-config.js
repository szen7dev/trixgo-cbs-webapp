/* eslint-disable */
let autoGeneratePx = {}
for (let i=1; i <= 1000; i++) {
  autoGeneratePx[`[${i}px]`] = `${i}px`;
}
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
        "primary-border": "#cccccc",
        "secondary-gray": "#798295",
        "accent-gray": "#1e293b",
        "lighter-gray": "#f1f5f9",
        "primary-light": "#ffffff",
        "secondary-light": "#F5F6F9",
        "accent-light": "#E9EAEF",
        "green-success": "#00C614"
      },
      fontSize: {
        "[13px]": "13px",
        "[14px]": "14px",
        "[15px]": "15px",
        "x-small": ["12px"],
        "small": ["13px", "15px"],
        "medium": ["14px", "16px"],
        "large": ["16px", "24px"],
        "x-large": ["18px", "21px"],
        "2x-large": ["20px", "23px"],
        "3x-large": ["24px", "27.6px"],
        "4x-large": ["30px", "34.5px"]
      },
      inset: {
        "[55%]": "55%",
      },
      width: {
        ...autoGeneratePx,
        fill: "-webkit-fill-available",
      },
      height: {
        ...autoGeneratePx,
        max: "max-content",
      },
      minWidth: {
        ...autoGeneratePx,
      },
      maxWidth: {
        ...autoGeneratePx,
        "[75%]": "75%",
      },
      minHeight: {
        ...autoGeneratePx,
      },
      maxHeight: {
        ...autoGeneratePx,
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

      },
      transformOrigin: {
        'top-left-1/2-0' : "50% 0"
      },
      paddingRight: {
        "[100px]": "100px"
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [],
};
