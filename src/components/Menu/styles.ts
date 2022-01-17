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
  justify-content: space-between;
  width: 100%;


  .category-fix {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    
    @media (max-width: 768px) {
      display: none;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
    font-size: 15px;
    margin-right: 22px;
  }

  .dropbtn {
    color: black;
    padding: 16px;
    font-size: 16px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    margin-left: 15px;
    span {
      margin-left: 10px;
      font-weight: 500;
    }
  }

  .dropdown {
    position: relative;
    display: inline-block;
    transition: .5s;
    margin-right: 20px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 999;
    transition: .5s;
    width: 100%;
    width: 700px;
    border-radius: 8px;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: .5s;
  }

  .drop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transition: .5s;
  }

  .dropdown-content a:hover {
    transition: .5s;
  }

  .dropdown:hover .dropdown-content {
    display: block;
    transition: .5s;
  }

  .dropdown:hover .dropbtn {
    transition: .5s;
    background: #E1E1E1;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    /* display: none; */
    .dropdown-content {
      width: 100vw;
    }
    .drop-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      transition: .5s;
    }
  }
`;