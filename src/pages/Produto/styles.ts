import styled from "styled-components";

export const DetailsProdFirts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

export const IconsContentStar = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: #F1E532;
    margin: 6px 0;
  }
`

export const BoxProd = styled.div`
  background: white;
  border-radius: 5px;
  margin: 0 0 20px 0;
  width: 600px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .descprod {
    display: flex;
    flex-direction: column;
  }

  span {
    color: rgba(16, 16, 16, 0.69);
    font-size: 13px;
  }

  strong {
    font-size: 17px;
    padding: 3px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const BoxProdFirts = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  .vendedor {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const ContainerProd = styled.div`
  display: flex;  
  justify-content: space-between;
  margin: 40px 0;
  img { 
    width: 320px;
    height: 481px;
    object-fit: cover;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;  
    flex-direction: column;
    margin: 40px 0;

    img { 
      width: 100%;
    }
  }
`

export const BoxColors = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`

export const ColorWhite = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 5px;
`;

export const ColorBlack = styled.div`
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 5px;
  margin-right: 5px;
`;

export const ColorRed = styled.div`
  width: 20px;
  height: 20px; 
  background: #DE4545;
  border-radius: 5px;
  margin-right: 5px;
`;

export const AddCartRight = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;

  button.fav {
    width: 120px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 0;
    background: black;
    color: white;
    
    svg {
      color: white;
      margin-left: 10px;
    }
  }

  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 45px;
    background: black;
    border-radius: 5px;

    @media (max-width: 768px) {
      width: 120px;
    }
  }
`

export const FlexBtnsProd = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  h3 {
    padding: 0 10px;
  }
`;

export const IconPlusMinus = styled.button`
  background: black;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 0;
  svg {
    color: white;
  }
`;

export const ProdCaracteristicas = styled.div`
  width: 100%;
  height: 400px;
  background: white;
  border-radius: 5px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    margin: 5px;
    b {
      font-weight: 500;
    }
  }
`;

export const ProdSecond = styled.div`
  width: 100%;
  height: 168px;
  background: white;
  border-radius: 5px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  h2 {
    margin: -5px 0 20px 0;  
  }

  a {
    width: 165px;
    height: 40px;
    background: #101010;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
`;

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
  text-align: center;

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
    cursor: pointer;
  }

  .buttonsNew button {
    cursor: pointer;

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
    cursor: pointer;

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

export const SelectAdress = styled.div`
  width: 420px;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: #FAFAFA;
  border-radius: 5px;
  padding: 0 5px;

  small {
    color: #58A4B0;
    font-size: 14px;
  }
`;

export const ProdSecondComents = styled.div`
  width: 100%;
  height: 400px;
  background: white;
  border-radius: 5px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  select {
    width: 100%;
    border: 0;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 5px 0;
  }

  textarea {
    resize: none;
    width: 100%;
    height: 120px;
    border: 0;
    font-family: "Roboto";
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
  }

  input[type=text], input[type=email] {
    width: 100%;
    border: 0;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc; 
    margin: 5px 0;
    padding: 10px;
  }

  input[type=submit] {
    border-radius: 5px;
    width: 100%;
    border: 0;
    background: black;
    color: white;
    height: 40px;
  }

  h2 {
    margin: -5px 0 20px 0;  
  }

`;

export const FormComents = styled.form`

`;