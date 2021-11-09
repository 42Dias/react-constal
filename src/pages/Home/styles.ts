import styled from 'styled-components';
import { darken } from 'polished';
import banner from '../../assets/images/bgHome.png';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      width: 263px;
      height: 146px;
      border-radius: 5px 5px 0px 0px;
      object-fit: cover;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

export const BannerHome = styled.div`
  .banner-home {
    width: 100%;
    display: flex;
    // background-image: url(${banner});
    min-height: 441px;
    padding: 30px 0;
    background-size: cover;
    background-position: center;
    object-fit: contain;
    
    .bg-content-home {
      padding: 110px 0;
      position: relative; 
      left: 20%;
      transform: translateX(-100%);

      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }

      h1 {
        color: var(--white);
        font-size: 48px;
        max-width: 470px;
      }

      p {
        color: var(--white);
        margin-top: 26px;
        max-width: 470px;
      }

      @media (max-width: 768px) {
        h1 {
          color: var(--white);
          font-size: 22px;
          width: 100% !important;
        }
    
        p {
          color: var(--white);
          margin-top: 26px;
          width: 100% !important;
        }
      }
    }
  }
`; 
