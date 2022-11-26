const colors = require('tailwindcss/colors')

// this seems odd, but solid uses colors like border-solid-lightborder
const colorScheme = colors.neutral

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        solid: {
          dark: colorScheme["900"],
          darkbg: colorScheme["800"],
          darkitem: colorScheme["700"],
          darkaction: colorScheme["500"],
          light: "#FFFFFF",
          lightbg: colorScheme["100"],
          lightitem: colorScheme["200"],
          lightaction: colorScheme["400"],
          accent: "#2c4f7c",
          accentlight: "#85C4FF",
        }
      }
    }
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [

    require('@tailwindcss/typography'),
  ],

}
