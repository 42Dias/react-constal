import styled from 'styled-components/macro'

export const ContainerError = styled.div`
  height: 100%;
  padding: 40px 15px;
  h2 {
    font-size: 24px;
    padding: 15px 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
`

export const ErrorPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;

  a {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 165px;
    height: 40px;
    background: #101010;
    border-radius: 5px;
    color: #FAFAFA;
    font-size: 14px;
    text-decoration: none;
  }

  img {
    width: 300px;
    height: 300px;
    margin-top: -0px;
  }
`