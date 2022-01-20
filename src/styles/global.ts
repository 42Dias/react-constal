import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import background from '../assets/images/bgHome.png';
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #F2F2F2;
    position: relative;
  }

  .banner-home {
    background: #191920 url(${background}) no-repeat center top;
  }

  body, input, button {
    font: 14px 'Poppins', sans-serif;
  }

  button {
    cursor: pointer !important;
    border: 0;
  }

  .container {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;
