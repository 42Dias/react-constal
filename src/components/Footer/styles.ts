import styled from 'styled-components';

export const FooterContent = styled.footer`
  background: black;
  border-radius: 10px 10px 0px 0px;

  img {
    width: 217px;
    height: 66px;
  }

  h5 {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    margin-top: 15px;
    color: #DFDFDF;

  }
`;

export const GridFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 520px) {
    flex-direction: column;
  }
  
  color: #DFDFDF;

  div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    p {
      max-width: 270px;
      color: #656565;
    }

    a {
      color: #656565;
      text-decoration: none;
    }
  }
`

export const ModalContainer = styled.div`
  overflow: auto;
  z-index: 999 !important;
  padding: 80px 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  border: 0;
  outline: 0;
  border-radius: 5px;

  strong {
    margin-top: 20px;

    a {
      margin-left: 5px;
    }
  }
`;

export const ModalEnter = styled.div`
  z-index: 999 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin-right: 30px;
  }

  svg {
    margin-left: 30px;
  }
`;