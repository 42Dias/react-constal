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
  grid-template-columns: repeat(4, 1fr)
`;

export const ProdContainerSingle = styled.div`
  width: 222px;
  height: 204px;
  background: white;
  margin: 20px auto;
  border-radius: 5px;

  img {
    max-width: 222px;
    max-height: 106px;
  }

  h5 {
    font-size: 14px;
    padding: 3px 7px;
  }

  p {
    color: #CBCBCB;
    font-size: 12px;
    padding: 6px 7px;
  }

  .btn-group-add {
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-more {
      width: 30px;
      height: 25px; 
      display: flex;
      align-items: center;
      justify-content: center;
      background: #58A4B0;
      border-radius: 5px;
      
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