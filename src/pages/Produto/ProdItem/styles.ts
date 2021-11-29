import styled from "styled-components";

export const DetailsProdFirts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
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
  .oi {
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
    width: 449px;
    height: 481px;
    object-fit: cover;
    border-radius: 5px;
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

export const IconPlusMinus = styled.div`
  background: black;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  svg {
    color: white;
  }
`;

export const ProdSecond = styled.div`
  width: 960px;
  height: 168px;
  background: white;
  border-radius: 5px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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