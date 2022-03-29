import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export const CenterPay = styled.div`
  width: 100%;
  min-height: 331px;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 5px;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 40px 120px;

  @media (max-width: 768px) {
    height: 431px;
    padding: 40px 20px;
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

  .input {
    display: flex;
    align-items: center;
    padding: 20px 0;
    div {
      padding: 0 40px;
    }
  }
`;

export const Titleh2 = styled.h2`
  padding: 30px 0;
`;

export const BtnFinish = styled.div`
  padding: 30px 0;

  a {
    width: 244px;
    height: 45px;
    text-decoration: none;
    color: white;
    background: #101010;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;