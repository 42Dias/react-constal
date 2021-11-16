import styled from "styled-components";

export const GridProdsFour = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr)
`;

export const ProdContainerSingle = styled.div`
  width: 222px;
  height: 204px;
  background: white;
  margin: 20px auto;
  border-radius: 5px;
  h5 {
    font-size: 14px;
    padding: 3px 7px;
  }

  p {
    color: #CBCBCB;
    font-size: 12px;
    padding: 6px 7px;
  }

  .btn-group-add {
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-more {
      width: 30px;
      height: 25px; 
      display: flex;
      align-items: center;
      justify-content: center;
      background: #58A4B0;
      border-radius: 5px;
      
      svg {
        color: white;
      }
    }

    span {
      b {
        color: #58A4B0;
      }
    }
  }
`;

export const ContentNew = styled.div`
  padding: 20px 0;
  h2 {
    font-size: 30px;
  }

  p {
    margin: 20px 0 !important;
    width: 182px;
    height: 33px;

    background: #58A4B0;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .buttonsNew a {
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

  .buttonsNew a:nth-child(2) {
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