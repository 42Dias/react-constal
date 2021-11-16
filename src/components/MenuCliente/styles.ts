import styled from 'styled-components';

export const Container = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px auto 10px auto;
max-width: 1020px;
a {
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
}

img {
  max-width: 180px;
}
`;

export const FlexLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-size: 15px;
  margin-right: 35px;
  }
`;