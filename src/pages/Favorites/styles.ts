import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 30px;
  padding: 30px 0;
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

export const CardDatailsContent = styled.div`
  background: white;
  width: 100%;
  height: 200px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 5px;
  
  a {
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

  a:nth-child(1) {
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
  }

  .flex-btn {
    display: flex;
  }

  .flex-btn a {
    margin: 0 20px;
  }
`;

export const ContentDetails = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 18px;
    font-weight: bold;
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
`;