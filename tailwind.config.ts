import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    fontFamily: {
      "headline": ["Headline"],
      "body": ["Body"],
    },
    extend: {
      fontSize: {
        "2xs": "0.5625rem",
      },
      colors: {
        white: "#fafae5",
        orange: "#ff4700",
        grayLight: "#fafae580",
        gray: "#0f0f0f",
        blue: "#006CCB",
        pink: "#CC257B",
      },
      letterSpacing: {
        tighter: "-.04",
        wider: ".09em",
        widest: ".84px",
      },
    },
  },
} satisfies Config;
