import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 30px;
  padding: 30px 0;
`;

export const CardProfile = styled.div`
  font-size: 40px;
  background: white;
  width: 100%;
  height: 422px;
  border-radius: 5px;
  display: flex;

  @media (max-width: 768px) {
    img {
      width: 100%;
    }
    height: 100%;
    flex-direction: column;
  }
`;

export const CardDatas = styled.div`
  h3 { 
    font-size: 30px;
    padding: 10px;
  }

  span { 
    font-size: 25px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: bold;
    padding: 10px;
  }

  p { 
    font-size: 22px;
    color: rgba(0, 0, 0, 0.65);
    padding: 10px;
  }
  
  margin-left: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    h3 {
      font-size: 22px;  
    }

    span { 
      font-size: 16px;
    }

    p { 
      font-size: 16px;
    }
  }
`;

export const CardDatails = styled.div`
  h2 {
    color: #000;
    font-size: 30px;
    padding: 40px 0 30px 0;
  }

  button {
    border: 0;
    width: 174px;
    height: 41px;
    background: #101010;
    border-radius: 5px;
    color: white;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 174px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: .4s;

    @media (max-width: 768px) {
      width: 80px;
    }

    &:hover {
      background: #171717;
    }
  }
`;

export const CardDatailsContent = styled.div`
  background: white;
  width: 100%;
  height: 100px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 5px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 101px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
    border: 0;
  }

  button:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 101px;
    height: 41px;
    text-decoration: none;
    background: transparent;
    color: black;
    border-radius: 5px;
    border: 1px solid black;
    margin: 0 20px;
  }

  .flex-btn {
    display: flex;
  }

  .flex-btn a {
    margin: 0 20px;
  }

  &.adress {
    height: 150px;
    @media (max-width: 768px) {
      height: 300px;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;

      .flex-btn a {
        margin: 0;
      }

      .flex-btn a:last-child {
        margin-left: 20px;
      }

      .flex-btn {
        margin-top: 20px;
      }
    }
  }
`;

export const ContentDetails = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 18px;
    font-weight: bold;
    @media (max-width: 768px) {
      font-weight: 300;
      font-size: 14px;
    }
  }

  img {
    padding: 0 40px;

    @media (max-width: 768px) {
      width: 120px;
    }
  }

  p {
    margin-left: 12px;
  }
  
  small {
    color: #757575;
    font-size: 16px;
  }
`;


export const ModalContainerVendedor = styled.form`
  display: flex;
`;

export const ModalFlex = styled.div`
  display: flex;
`;

export const ModalContent = styled.form`
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
  }

  select {
    height: 48px;
    width: 466px;
    border-radius: 4px;
    border: 0;
    background: #F2F2F2 !important;
    padding: 0 5px;
    margin: 10px 0;
  }

  label {
    margin: 5px 0;
  }
` 