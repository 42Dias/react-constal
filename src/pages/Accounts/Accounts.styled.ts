import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 14px;
  }

  input {
    width: 400px;
    height: 48px;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 10px 0;
    padding: 0 7px;
    border: 0;
    background: #fff;
    color: #ccc;

    :focus {
      border: 1px solid #000;
    } 
  }

  span {
    padding: 5px;
    font-size: 17px;
  }

  p {
    padding: 5px;
  }

  a {
    padding: 10px;
    background: #000;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: 1s;

    :hover {
      opacity: 85%;
    }
  }

  h3 {
    margin-top: 20px;
  }

`