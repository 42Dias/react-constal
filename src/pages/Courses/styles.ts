import styled from "styled-components";

export const DetailsProdFirts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

export const Recommended = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  h4 {
    color: #BFBFBF;
    font-weight: 400;
  }
`;

export const GridProdsFour = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export const ProdContainerSingle = styled.div`
  width: 222px;
  height: 260px;
  background: white;
  margin: 20px auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 390px;
  }
  
  img {
    width: 222px;
    height: 140px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 100%;
      height: 250px;
    }
  }

  h5 {
    font-size: 14px;
    padding: 3px 7px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    color: #CBCBCB;
    font-size: 12px;
    padding: 6px 7px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  .btn-group-add {
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      span {
        font-size: 16px;
      }
    }
    .btn-more {
      width: 30px;
      height: 25px; 
      display: flex;
      align-items: center;
      justify-content: center;
      background: #58A4B0;
      border-radius: 5px;
      @media (max-width: 768px) {
        width: 40px;
        height: 35px; 
      }
      svg {
        color: white;
      }
    }

    span {
      b {
        color: #58A4B0;
      }
    }
  }
`;