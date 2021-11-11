import styled from "styled-components";

export const DetailsProdFirts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`

export const IconsContentStar = styled.div`
  display: flex;
  align-items: center;
`

export const BoxProd = styled.div`
  background: white;
  border-radius: 5px;
  margin: 0 0 20px 0;
  width: 50vw;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 20px;
  svg {
    color: yellow;
  }

  svg:nth-child(8){
    color: #A7A7A7;
  }

  span {
    color: rgba(16, 16, 16, 0.69);
    font-size: 13px;
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
`

export const ColorWhite = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 5px;
`;

export const ColorBlack = styled.div`
  width: 30px;
  height: 30px;
  background: black;
  border-radius: 5px;
  margin-right: 5px;
`;

export const ColorRed = styled.div`
  width: 30px;
  height: 30px;
  background: #DE4545;
  border-radius: 5px;
  margin-right: 5px;
`;