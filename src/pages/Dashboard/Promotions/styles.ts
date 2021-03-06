import styled from "styled-components";

export const GridProdsFour = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
export const ProdContainerSingle = styled.div`
  width: 222px;
  height: 260px;
  background: white;
  margin: 20px auto;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 390px;
  }
  
  img {
    width: 222px;
    height: 140px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 100%;
      height: 250px;
    }
  }

  h5 {
    font-size: 14px;
    overflow-wrap: anywhere;
    padding: 3px 7px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
  
  .prodNome{
    overflow-wrap: anywhere;
  }


  p {
    color: #CBCBCB;
    font-size: 12px;
    padding: 6px 7px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    max-height: 42px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 100%;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  .btn-group-add {
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 768px) {
      span {
        font-size: 16px;
      }
    }
    .btn-more {
      width: 30px;
      height: 25px; 
      display: flex;
      align-items: center;
      justify-content: center;
      background: #58A4B0;
      border-radius: 5px;
      @media (max-width: 768px) {
        width: 40px;
        height: 35px; 
      }
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

  // p {
  //   margin: 20px 0 !important;
  //   width: 182px;
  //   height: 33px;

  //   background: #58A4B0;
  //   border-radius: 5px;
  //   color: white;
  //   font-size: 16px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
`


export const ModalContainerVendedor = styled.div`
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
    background: #f2f2f2;
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

  input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
    display: none;

  }

  input[type=file]::file-selector-button {
    display: none;
  }
` 

export const NewBtnFeatured = styled.button`
  margin: 20px 0 !important;
  width: 300px;
  height: 50px;

  background: #58A4B0;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`