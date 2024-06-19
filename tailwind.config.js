/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'active': '0 0 0 3px #e2750990',
      },
      colors: {
        primary: {
          DEFAULT: '#e27509'
        }
      },
    },
  },
  plugins: [],
}

