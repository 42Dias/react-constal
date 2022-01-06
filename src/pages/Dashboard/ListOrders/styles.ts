import styled from "styled-components";

export const TitleVendas = styled.h2`
  padding: 30px 0;
`

export const MenuSell = styled.div`
  width: 100%;
  height: 75px;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    text-align: center;
  }

  a { 
    text-decoration: none;
  }

  span {
    color: rgba(16, 16, 16, 0.61);
    font-size: 16px;
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  b {
    color: black;
  }

`;

export const ContainerMenuSell = styled.div`
  width: 100%;
  height: 168px;
  background: white;
  margin: 15px 0 10px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: 280px;
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0 40px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  h3 {
    font-size: 16px;
    font-weight: 300;
    padding: 7px 0;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  a {
    text-decoration: none;
    color: black;

    width: 101px;
    height: 41px;

    background: #101010;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
` 

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

`;