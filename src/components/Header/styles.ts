import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 20px;
}

.logo-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav li {
  margin-left: 30px;
  font-size: 12px;
  line-height: 18px;
  color: #303030;
}

nav li a {
  color: #303030;
}

header ul {
  display: flex;
  align-items: center;
}

.option button {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white !important;
  border: 0;

  background: #2E54FF;
  border-radius: 20px;
}

.option button:hover {
  transition: .7s;
  background: #0125C7;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 50px;
  height: 50px;
}

.nav-options {
  display: flex;
}

.mobile-option {
  display: none;
}

.option :hover {
  color: #0A0A0A;
}

.mobile-menu {
  display: none;
}

@media (max-width: 648px) {

  header {
    padding: 0px 10px;
    overflow: hidden;
  }

  .logo {
    width: 45px;
    height: 45px;
  }

  .option a {
    color: white;
  }

  .nav-options {
    display: flex;
    width: 80%;
    height: 110%;
    position: absolute;
    overflow: hidden;
    top: 80px;
    left: -100%;
    opacity: 0;
    transition: all 0.5s ease;
    flex-direction: column;
    list-style-type: none;
    grid-gap: 0px;
    opacity: 1;
    transform: translate3d(0, -100px, 0);
    color: white;
  }

  .nav-options.active {
    background: #f2f2f2;
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    align-content: center;
    position: fixed;
    height: 110vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;
  } 

  .menu-icon {
    width: 45px;
    height: 45px;
    display: block;
    z-index: 999;
    color: white;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vw;
    padding: 30px 0px;
    color: white;
  }

  .mobile-menu {
    display: block;
    z-index: 999;
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 14px !important;
    svg {
      color: black;
      font-size: 14px !important;
      width: 30px;
    }
  }

} 

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto 10px auto;
  max-width: 1020px;
  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    max-width: 180px;
  }

`;

export const InputCenter = styled.div`
  nav.header {
    display: grid;
    grid-template-columns: 1fr 1.55fr;

    .input
    {
      display: flex;
      align-items: center;
    }
  }

  input[type=text] {
    width: 280px;
    height: 46px;

    background: white;
    border-radius: 5px 0 0 5px;
    border: 0;
    padding: 0 8px;
  }

  button {
    width: 64px;
    height: 46px;
    left: 926px;
    top: 34px;

    background: #58A4B0;
    border-radius: 0px 5px 5px 0px;

    border: 0;

    svg {
      color: white;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    input[type=text] {
      width: 180px;
      height: 46px;
    }

  }
`

export const IconsContainerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    .icons-flex-align {
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      margin-top: 20px;

      div.flex-item {
        display: flex;
        align-items: center;
        margin-top: 30px;
      }

      span {
        color: #0D0F21;
      }

      strong {
        color: #0D0F21;
      }

      a {
        text-decoration: none;
      }

      svg {
        color: black;
      }

      svg {
        margin-left: 20px;
      }
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  svg {
    margin: 0 20px;
    cursor: pointer;
    color: black;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 30px;

  @media (max-width: 768px) {
    svg {
      color: white;
    }
  }

  div {
    text-align: right;

    strong {
      display: block;
      color: black;
    }

    span {
      font-size: 12px;
      color: black;
    }
  }

  @media (max-width: 768px) {
    div {
      text-align: left;

      strong {
        display: block;
        color: white;
      }

      span {
        font-size: 12px;
        color: white;
      }
    }
  }
`;

export const FlexLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-size: 15px;
  margin-right: 35px;
  }
`;

export const Modal = styled.div`
  z-index: 999 !important;
`;

export const ModalContainer = styled.div`
  z-index: 999 !important;
  padding: 80px 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  border: 0;
  outline: 0;
  border-radius: 5px;

  strong {
    margin-top: 20px;

    a {
      margin-left: 5px;
    }
  }
`;

export const Form = styled.form`   
  display: flex;
  flex-direction: column;
  z-index: 999 !important;
  label {
    margin-top: 20px;
  }

  input[type=text] {
    margin-top: 8px;
    width: 300px;
    height: 50px;
    padding: 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 5px;
  }

  input[type=password] {
    margin-top: 8px;
    width: 300px;
    height: 50px;
    padding: 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 5px;
  }

  .btn-enter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 182px;
    height: 45px;
    color: white;

    background: #101010;
    border-radius: 5px;
    margin: 15px auto 0 auto;

    text-decoration: none;
  }

  .btn-register {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 182px;
    height: 45px;
    color: #101010;
    border: 1px solid #101010;
    background: transparent;
    border-radius: 5px;
    margin: 15px auto 0 auto;
    text-decoration: none;
  }

  .contentBorder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      padding: 0 10px;
      color: black;
      margin-bottom: 16px;
    }
  }

  .border {
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.13);
  }

  p {
    margin-top: 20px;
  }
`;

export const ModalEnter = styled.div`
  z-index: 999 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin-right: 30px;
  }

  svg {
    margin-left: 30px;
  }
`;