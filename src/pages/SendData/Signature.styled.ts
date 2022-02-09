import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px 50px;
`;

export const Title = styled.h2`
  font-size: 30px;
  padding: 30px 0;
`

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background: #181a18;
  border-radius: 5px;
  color: #FAFAFA;
  margin: 0 20px 60px 10px;
  position: relative;
  text-align: center;
  
  
  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    font-size: 24px;
    margin: 30px;
  }

  p {
    margin: 20px;
    margin-top: -10px;
    font-size: 14px;
  }

  strong {
    font-size: 24px;
    margin: 30px;
  }

  button {
    width: 246px;
    height: 41px;
    border-radius: 5px;
    border: none;
    position: absolute;
    bottom: 25px;
    left: 25px;

    transition: 0.4s;
    :hover {
      opacity: 80%;
    }
  }
`

export const BtnNew = styled.button
`
  margin: 0 auto !important;
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
`