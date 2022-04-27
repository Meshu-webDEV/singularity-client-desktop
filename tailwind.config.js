const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/**/*.js",
    "./public/index.html",
    "./src/Components/**/*.js",
    "./src/Components/layouts/*.js",
    "./src/Global/*.js",
    "./src/Images/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      dark: {
        backgroundDarker: "#0b0d13",
        backgroundDark: "#151920",
        background: "#1a1f27",
        "background-100": "#181C23",
        "background-50": "#191E25",
      },
      light: {
        backgroundLighter: "#FFFFFF",
        backgroundLight: "#ECECEC",
        background: "#E0E0E0",
      },
      secondary: {
        light: "#07b85c",
        dark: "#058542",
      },
      primary: {
        light: "#f10041",
        dark: "#df003c",
      },
      whites: {
        dark: "#c8c8c8",
        light: "#FFFFFF",
      },
      blacks: {
        dark: "#0b0b0e",
        light: "#171C24",
        lighter: "#1e242b",
      },
      grays: {
        dark: "#1E242B",
        light: "#21282f",
      },
      warning: "#fdfd43",
      info: "#339FDE",
      success: "#01EB47",
      firstPlace: "#04e004",
      secondPlace: "#fff700",
      thirdPlace: "#ff9900",
    },
    fontSize: {
      "4xs": ".695rem",
      "3xs": ".715rem",
      "2xs": ".735rem",
      xs: ".75rem",
      sm: ".85rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem",
      "11xl": "9rem",
      "12xl": "11rem",
      "13xl": "12rem",
      "14xl": "14rem",
      "15xl": "15rem",
      "16xl": "16rem",
      "17xl": "17rem",
      "18xl": "18rem",
      "19xl": "19rem",
      "34xl": "34rem",
      "45xl": "45rem",
      "50xl": "50rem",
      "55xl": "55rem",
      "60xl": "60rem",
      "65xl": "65rem",
    },
    extend: {
      zIndex: {
        "sub-zero": "-1",
        999: "999",
      },
      screens: {
        "3xl": "1600px",
        "3.5xl": "1800px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
      boxShadow: {
        "inner-custom": "inset 0px 0px 11px 8px #00000024",
        left: "-12px 1px 11px 1px",
        "shadow-left": "-4px 1px 11px 12px",
        "shadow-top": "0px -25px 35px 0px",
        btn: "0px 2px 4px 3px",
        card: "6px 2px 12px 1px #00000047",
        tinycard: "4px 2px 10px 1px #00000047",
      },
      fontSize: {
        xxs: "0.65rem",
        "3xs": "0.6rem",
        "4xs": "0.55rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in-.1": "fadeIn ease-in 0.10s;",
        "fade-in-.25": "fadeIn ease-in 0.25s;",
        "fade-in-.5": "fadeIn ease-in 0.500s;",
      },
      height: {
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "5/8": "62.5%",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        "1/1.1": "90%",
        95: "95%",
      },
      maxWidth: {
        "2xs": "275px",
      },
      width: {
        74: "19rem",
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "5/8": "62.5%",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        "1/1.1": "90%",
        95: "95%",
      },
      translate: {
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "5/8": "62.5%",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        "1/1.1": "90%",
      },
      scale: {
        35: "0.35",
        40: "0.40",
        45: "0.45",
        50: "0.50",
        55: "0.55",
        60: "0.60",
        65: "0.65",
        675: "0.675",
        70: "0.70",
        80: "0.80",
        85: "0.85",
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
        flip: "-1",
      },
      spacing: {
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        22: "5.5rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        114: "18rem",
        116: "20rem",
        118: "22rem",
        119: "23rem",
        120: "24rem",
        122: "26rem",
        124: "28rem",
        126: "30rem",
        128: "32rem",
        144: "36rem",
        148: "40rem",
        152: "44rem",
        156: "48rem",
        160: "52rem",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
      "6xl": "3rem",
      "7xl": "4rem",
      "8xl": "4.75rem",
      full: "9999px",
    },
  },
  variants: {
    extend: {
      ringWidth: ["dark", "focus"],
      ringColor: ["dark", "focus"],
      ringOpacity: ["dark", "focus"],
      ringOffsetWidth: ["dark", "focus"],
      borderColor: ["dark", "focus"],
      brightness: ["hover"],
      hueRotate: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
