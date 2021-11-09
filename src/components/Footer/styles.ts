import styled from 'styled-components';

export const FooterContent = styled.header`
  background: black;

  strong {
    color: white;
    text-align: center !important;
    display: flex;
    align-items: center !important;
    justify-content: center;
    padding: 20px 0;
    font-weight: lighter;
  }

  .section-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;

    color: white;
    a {
      color: white;
      margin-right: 20px;
    }
  }
`;