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
        "primary-border": "#cccccc",
        "secondary-gray": "#798295",
        "accent-gray": "#1e293b",
        "lighter-gray": "#f1f5f9",
        "primary-light": "#ffffff",
        "secondary-light": "#F5F6F9",
        "accent-light": "#E9EAEF",
        "green-success": "#00C614",

				"cbs-primary": "#0060E1",
				"cbs-secondary": "#4781CF",
				"cbs-gray": "#F0F0F0",
				"cbs-active-comment": "#E7F3FF",
				"cbs-green": "#00C614",
				"cbs-subtext": "#666666",
				"cbs-summary": "#FFF2CC",
				"cbs-schedule-yestoday": "#03C9D7",
				"cbs-schedule-today": "#00C292",
				"cbs-schedule-oneweek": "#FEC90F",
				"cbs-schedule-twoweek": "#FB9678",
				"cbs-schedule-threeweek": "#E46A76",
				"cbs-schedule-expired": "#F55F5F",
				"cbs-schedule-nextweek": "#FF9900",
				"cbs-schedule-after-7days": "#00CA99",
				"cbs-left-menu": "#F5F6F9",
				"cbs-table-header": "#F7F8F9",
				"cbs-completed": "#36AB80",
				"cbs-failed": "#CA5E59",
				"cbs-border": "#CCCCCC",
				"cbs-up": "#EDF7ED",
				"cbs-up-text": "#4CAF50",
				"cbs-down": "#FEECEB",
				"cbs-down-text": "#F44336",
				"cbs-nav-text": "#00B9F2",
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
        "[34px]": "34px",
        "[52px]": "52px",
        "[74px]": "74px",
        "[500px]": "500px",
        "[1000px]": "1000px",
        "[14px]" : "14px",
        "[24px]" : "24px",
        fill: "-webkit-fill-available",
      },
      height: {
        "[34px]": "34px",
        "[32px]": "32px",
        "[30px]": "30px",
        "[38px]": "38px",
        "[52px]": "52px",
        "[650px]": "650px",
        "[14px]" : "14px",
        "[24px]" : "24px",
        "[16px]" : "16px",
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

      },
      transformOrigin: {
        'top-left-1/2-0' : "50% 0"
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
