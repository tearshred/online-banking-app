import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'danger': '#DC2626'
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
