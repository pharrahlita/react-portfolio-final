import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  @font-face {
    font-family: 'TAN Headline';
    src: url('../assets/fonts/TANHEADLINE-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  *,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1,h2,h3,h4,h5,h6{
    display: inline-block;
  }

  body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #323733;
    font-family: 'VT323', monospace;
    color: #aaac9b;
}

`;

export default GlobalStyle;
