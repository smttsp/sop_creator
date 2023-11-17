/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {

        gray: {
          850: '#232C34',
        },
  
        blue: {
          70: '#021639',
          80: '#0A3880',
        },
      },
      height: {
        '100': '400px',
        '150': '650px', // Define your custom size 200px
        
      },
      width:{
        '100': '400px',
        '120': '600'
        
      },
      fontFamily:{
        "roboto":['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
}
