import { Container } from './../../NewPlan/NewPlan.styled';
import styled from "styled-components";

export const DetailsProdFirts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

export const Recommended = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  h4 {
    color: #BFBFBF;
    font-weight: 400;
  }
`;

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
  height: 315px;
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
    object-fit: contain;

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
    overflow-wrap: anywhere;
    font-size: 12px;
    padding: 6px 7px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 43px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  .btn-group-add {
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .delete {
      background: #AA2323;
      border: 0;
      width: 30px;
      height: 25px; 
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 5px;

      svg {
        color: white;
      }

      @media (max-width: 768px) {
        width: 40px;
        height: 35px; 
      }
    }

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
      margin: 0 5px;
      border-radius: 5px;
      @media (max-width: 768px) {
        width: 40px;
        height: 35px; 
      }
      svg {
        color: white;
      }
    }

    .btn-group {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      margin-left: 15px;
    }
  }
`;

export const ContentNew = styled.div`
  padding: 20px 0;
  h2 {
    font-size: 30px;
  }

  button {
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
    background: #F2F2F2 ;
    padding: 0 5px;
    margin: 10px 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  
  textarea {
    resize: vertical;
    height: 125px;
    width: 466px;
    border-radius: 4px;
    border: 0;
    font: 14px 'Poppins',sans-serif;
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

export const Btn = styled.button`
  background: white;
  text-align: left;
  padding: 10px 0 40px 0;
  transition: .5s;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalContainerText = styled.div`
  padding-left: 25%;
  padding-right: 25%;

  padding-top: 2.5%;
  padding-bottom: 2.5%;
  

  text-align: justify;
  `

export const FileContainer = styled.div`
  background: white;
  width: 100%;
  
  min-height: 250px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  /*
  padding: 5%;
  */
  border-radius: 5px;


  .btn-info {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 210px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-right: .5rem;
    width: 100%;
  } 
  
  .container-file{
    display: flex;
    width: 466px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  input[type=submit] {
    padding: 10px 10px;
    width: 120px;
    background-color: black;
    color: #FFF;
    text-align: center;
    display: block;
    /*
    margin-top: 10px;
    */
    cursor: pointer;
    border: 0;
    border-radius: 5px;
  } 

  input[type=file]{

    background: transparent;
  }
  input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
    display: none;

  }

  input[type=file]::file-selector-button {
    display: none;
  }

`