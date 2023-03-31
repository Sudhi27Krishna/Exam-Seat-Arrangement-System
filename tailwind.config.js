/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-login': '#92DBB6',
        'green-medium': '#003944',
        'green-light': '#295D68',
        'green-dark': '#111F35',
        'green-save': '#23CA85',
        'grey-all': '#BECCCF',
        'red-download': '#DD7A96',
        'background': '#F2F4E7',
      },
      letterSpacing: {
        needed: '.09em',
      },

      fontFamily: { //custom font style
        'OT': "Outfit-Thin",
        'OEL': "Outfit-ExtraLight",
        'OL': "Outfit-Light",
        'OR': "Outfit-Regular",
        'OM': "Outfit-Medium",
        'OS': "Outfit-SemiBold",
        'OB': "Outfit-Bold",
        'OEB': "Outfit-ExtraBold",
        'OBK': "Outfit-Black",
      }
    },
  },
  plugins: [],
};
