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
  padding: 0 20px;
  
  a { 
    text-decoration: none;
  }

  span {
    color: rgba(16, 16, 16, 0.61);
    font-size: 16px;
    font-weight: bold;
  }

  a:nth-child(2) {
    margin-left: 40px;
  }

  b {
    color: black;
  }
`;

export const ContainerMenuSell = styled.div`
  width: 100%;
  height: 168px;

  @media (max-width: 768px) {
    height: 240px;
  }

  background: white;
  margin: 15px 0 10px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  span {
    font-size: 18px;
    font-weight: bold;
  }

  h3 {
    font-size: 16px;
    font-weight: 300;
    padding: 7px 0;
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