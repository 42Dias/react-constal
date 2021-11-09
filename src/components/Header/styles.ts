import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto 0 auto;
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
    border-radius: 5px;
    border: 0;
    padding: 0 8px;
  }

  button {
    width: 64px;
    height: 46px;
    left: 926px;
    top: 34px;

    background: black;
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
