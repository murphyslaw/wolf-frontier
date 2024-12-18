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
      colors: {
        white: "#fafae5",
        orange: "#ff4700",
      },
      letterSpacing: {
        tighter: "-.04",
        widest: ".84px",
      },
    },
  },
} satisfies Config;
