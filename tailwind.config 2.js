/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [" ./money_management/frontend/templates/frontend/index.html", "./money_management/frontend/templates/frontend/dashboard.html" , "./money_management/frontend/**/*.{js,html}"], 
  theme: {
    screens: {
      sm: '480px',
      md: '768px', 
      lg: '976px', 
      xl: '1440px', 
    },
    extend: {
      colors: {
        brightRed: 'hsl(12,88%,59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      },
      fontFamily:{
        lato: ['Lato'], 
        roboto: ['Roboto'], 
        mulish: ['Mulish']
      },
      backgroundImage:{
        'signup-background': "url('/money_management/frontend/static/img/signup.jpg')"
      }
    },
  },
  plugins: [],
}
