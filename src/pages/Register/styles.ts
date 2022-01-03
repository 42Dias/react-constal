import styled from "styled-components";

export const BoxRegister = styled.form`
  width: 100%;
  height: auto;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  h2 {
    padding: 40px 0;
  }

  @media (max-width: 768px) {
    height: 700px;
    padding: 40px 25px;
  }
`;

export const GridRegister = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    input {
      width: 320px;
      height: 46px;
      border-radius: 5px;
      border: 0;
      background: #F2F2F2;
      padding: 0 12px;
      margin: 10px 0;
    }

    select {
      width: 320px;
      height: 46px;
      border-radius: 5px;
      border: 0;
      background: #F2F2F2;
      padding: 0 12px;
      margin: 10px 0;
    }

    option {
      display: block;
      width: 320px;
      height: 46px;
      border-radius: 5px;
      border: 0;
      background: #F2F2F2;
      padding: 0 12px;
      margin: 10px 0;
    }
  }
`;

export const Terms = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-left: 10px;
    a {
      color: black;
    }
  }
`;

export const LinkContent = styled.div`
  button {
    width: 215px;
    height: 45px;

    background: #101010;
    color: white;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    border: 0;
  }
`;