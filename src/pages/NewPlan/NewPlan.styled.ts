import styled from 'styled-components/macro'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    font-size: 30px;
    padding: 30px 0;
  }

  input {
    width: 400px;
    height: 48px;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 10px 0;
    padding: 0 7px;
    border: 0;
  }

  input:focus {
    border: 1px solid black;
    background: transparent;
    color: black;
  }

  label {
    font-size: 14px;
    color: black;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: black;
    color: white;
    width: 165px;
    height: 40px;
    text-decoration: none;
    border: 1px solid black;
    margin: 10px;
  }
`