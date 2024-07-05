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
      },
      width:{
        wmiddlebox: '1148px',
        99:'30rem',
        100: '40rem',
        percent95: '95%',
      },
      height:{
        hmiddlebox: '765px',
        99:'30rem',
        100: '40rem',
      },
      minHeight:{
        99:'30rem',
        100: '40rem',
      }
    },
  },
  plugins: [],
} satisfies Config;
