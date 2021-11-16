import styled from 'styled-components'

export const Title = styled.h2`
  font-size: 30px;
  padding: 30px 0;
  margin-left: 126px;
`

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  width: 300px;
  height: 300px;
  background: #000000;
  border-radius: 5px;
  color: #FAFAFA;
  margin: 0 20px 60px 10px;

  h3 {
    font-size: 24px;
    margin: 30px;
  }

  p {
    margin: 30px;
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
    margin: 30px;

    :hover {
      opacity: 80%;
    }
  }
`