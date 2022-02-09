import styled from 'styled-components';

export const GridProdsFour = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr)
`;

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
`;

export const CardDatails = styled.div`
  h2 {
    color: #000;
    font-size: 30px;
    padding: 40px 0 30px 0;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 174px;
    height: 41px;
    text-decoration: none;
    background: black;
    color: white;
    border-radius: 5px;
  }

`

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 41px;
  text-decoration: none;
  background: black;
  color: white;
  border-radius: 5px;
  border:0;
`

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

  &.adress { 
    @media (max-width: 768px) {
      height: 300px;
    }
  }

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
    border:0;
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

  .flex-btn button {
    margin: 0 20px;
  }
`;

export const ContentDetails = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: bold;
  }

  span {
    font-weight: lighter;
    font-size: 16px;
  }

  img {
    padding: 0 40px;
  }

  p {
    margin-left: 12px;
  }
  
  small {
    color: #757575;
    font-size: 16px;
  }
`
export const NewBtn = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

  button {
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

  button:nth-child(2) {
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
`
;

export const BtnNewTest = styled.div
`
  display: block;
  cursor: pointer;
  width: 182px;
  height: 33px;
  background: #58A4B0;
  background-color: rgb(88, 164, 176);
  background-image: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto !important;
`