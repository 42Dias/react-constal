import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export const CenterFinish = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 0;

  h2 { 
    padding: 40px 0;
  }

  a {
    text-decoration: none;
    width: 244px;
    height: 45px;

    background: #101010;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;