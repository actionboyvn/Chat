/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'text-color': '#040604',
      'background-color': '#E9E9E9',
      'primary': {
        50: '#ffe5e5',
        100: '#ffcccc',
        200: '#ff9999',
        300: '#ff6666',
        400: '#ff3333',
        500: '#ff0000',
        600: '#cc0000',
        700: '#990000',
        800: '#660000',
        900: '#330000',
        950: '#1a0000',
      },
      'secondary': {
        50: '#ebf6fa',
        100: '#d6eef5',
        200: '#aedcea',
        300: '#85cbe0',
        400: '#5db9d5',
        500: '#34a8cb',
        600: '#2a86a2',
        700: '#1f657a',
        800: '#154351',
        900: '#0a2229',
        950: '#051114',
      },
      'accent': {
        50: '#f7efed',
        100: '#f0dfdb',
        200: '#e1bfb7',
        300: '#d29f93',
        400: '#c37f6f',
        500: '#b45e4b',
        600: '#904c3c',
        700: '#6c392d',
        800: '#48261e',
        900: '#24130f',
        950: '#120908',
      },
      'white': '#ffffff',
    },
    extend: {},
  },
  plugins: [],
}
