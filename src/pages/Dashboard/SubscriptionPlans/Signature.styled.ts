import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px 50px;
`;

export const Title = styled.h2`
  font-size: 30px;
  padding: 30px 0;
`

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Card = styled.div`
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 5px;
  color: #000;
  margin: 0 20px 60px 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px 25px;
  position: relative;

  .trash {
    top: 20px;
    right: 30px;
    position: absolute;
  }

  small {
    padding: 10px 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin-left: 10px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
    padding: 10px 0;
  }

  strong {
    font-size: 24px;
  }

  button {
    width: 246px;
    height: 41px;
    border-radius: 5px;
    border: none;
    position: absolute;
    bottom: 15px;
    left: 25px;
    background: black;
    color: white;

    transition: 0.4s;
    :hover {
      opacity: 80%;
    }
  }
`


export const ModalContainerVendedor = styled.div`
  display: flex;
`;

export const ModalFlex = styled.div`
  display: flex;
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;

  h3 {
    padding: 20px 0;
    font-size: 24px;
  }

  p {
    color: #4A4A4A;
    max-width: 420px;
    padding: 20px 0;
  }

  .buttonsNew {
    display: flex;
  }

  .buttonsNew button {
    width: 165px;
    height: 40px;

    border-radius: 5px;
    color: black;
    border: 1px solid rgba(16, 16, 16, 1);
    text-decoration: none;
  
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;

    @media (max-width: 768px) {
      width: 50%;
    }
  }

  .buttonsNew button:nth-child(2) {
    width: 165px;
    height: 40px;

    background: #101010;
    border-radius: 5px;
    color: white;
    text-decoration: none;
  
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    border: 0;
  }

  img {
    @media (max-width: 768px) {
      width: 100%;
      margin-top: 30px;
    }
  }
`;

export const ContentFormNew = styled.div`
  display: flex;
  flex-direction: column;

  input {
    height: 48px;
    width: 466px;
    border-radius: 4px;
    border: 0;
    background: #F2F2F2 !important;
    padding: 0 5px;
    margin: 10px 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  select {
    height: 48px;
    width: 466px;
    border-radius: 4px;
    border: 0;
    background: #F2F2F2 !important;
    padding: 0 5px;
    margin: 10px 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  label {
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 20px;
  }
` 

export const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 246px;
    height: 41px;

    background: #101010;
    border-radius: 5px;
    color: white;
    border: 0;
  }
`;