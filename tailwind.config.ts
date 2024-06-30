import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        // Configure your color palette here
        platinum: '#D9D8D8',
        plaster_white: '#FEFFFE',
        shamock_green: '#169C55',
        rose_toupe: '#8A575D',
      }
    },
  },
  plugins: [],
} satisfies Config;
