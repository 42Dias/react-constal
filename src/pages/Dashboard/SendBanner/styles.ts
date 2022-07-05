import styled from "styled-components";

export const SelectInput = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  select {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: 0;
    margin: 10px 0;
  }

`

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
`;

export const CardDatails = styled.div`
  h2 {
    color: #000;
    font-size: 30px;
    padding: 0 0 30px 0;
  }

  .emailSender{
    width: 100%;
    padding: 7px 10px;
    font: 14px 'Poppins',sans-serif;
    resize: none;
    -webkit-border-bottom-right-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
    -moz-border-radius-bottomright: 5px;
    -moz-border-radius-bottomleft: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  /* a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 174px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
  } */

  .specifications{
    padding: 1rem 0.9rem;
    margin-bottom: 0;
  }

  p{
  }


  .btn-info {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-right: .5rem;
  } 

  .flex-container{
    display: flex;
  }

  .upload-input{
    align-self: center;
  }




  .file {
    background: white;
    width: 100%;
    
    min-height: 250px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    padding: 5%;
    border-radius: 5px;

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



    input[type=file]::-webkit-file-upload-button {
      visibility: hidden;
      display: none;
    }

    input[type=file]::file-selector-button {
      display: none;
    }

    

  }
`

export const CardDatailsContent = styled.div`
  background: white;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 5px;

  a {
    text-decoration: none;
    color: black;
  }
  
  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 101px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 41px;
    text-decoration: none;
    background: #EA1C24;
    color: white;
    border-radius: 5px;
  }

  button:last-child {
    background: black;
    width: 120px;
    margin-left: 20px;
  }

  .flex-btn {
    display: flex;
  }

  .flex-btn a {
    margin: 0 20px;
  }

  .trash-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 41px;
    text-decoration: none;
    background: #EA1C24;
    color: white;
    border-radius: 5px;
  }

  .reset{
    background-color: transparent !important;
    margin: 0 auto !important;
  }
`

export const ContentDetails = styled.div`
  display: flex;
  align-items: center;
  width: 125%;
  justify-content: space-between;

  span {
    font-size: 18px;
    font-weight: bold;
  }

  img {
    padding: 0 40px;
  }

  .reset-btn{
    margin:0; 
  }
  
  small {
    color: #757575;
    font-size: 16px;
  }
`