import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
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
`

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  svg {
    margin: 0 20px;
    cursor: pointer;
  }
`

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

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