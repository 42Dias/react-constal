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
      left: 40%;
      transform: translateX(-100%);

      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }

      h1 {
        color: white;
        font-size: 48px;
        max-width: 470px;
      }

      p {
        color: white;
        margin-top: 26px;
        max-width: 470px;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 22px;
          width: 100% !important;
        }
    
        p {
          margin-top: 26px;
          width: 100% !important;
        }
      }
    }
  }
`; 

export const BarHome = styled.div`
  /* position: relative;
  bottom: 40px; */
  margin: 50px 0;
  @media (max-width: 768px) {
    display: none;
  }
`

export const FlexBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #58A4B0;
  width: 100%;
  height: 204px;
  border-radius: 10px;
  color: white;
  
  h5 {
    font-size: 16px;
    font-weight: normal;  
    margin-top: 10px;
  }
`

export const SwiperStyles = styled.div`
.swiper-container {
  padding: 30px 0 !important;
  z-index: 0;
}

.swiper-slide {
  z-index: 1;
  width: 263px !important;
  min-height: 380px !important;
  background: #EDEDED;
  box-shadow: 0px 4px 33px -10px rgba(0, 0, 0, 0.15);
  margin-right: 30px;
  border-radius: 10px;
  position: relative;
  transition: all .5s ;
  position: relative;


  .favorites{
    border: 2px solid white;
    width:  36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.44);
    right: 10px;
    top: 10px;
    transition: border .3s;

    &:hover{
      border: 2px solid #58A4B0;

      svg{
        color: #58A4B0
      }
    }

    svg{
      color: white;
      font-size: 18px;
      transition: color .15s;
    }
  }

  

  strong {
    font-size: 18px;
    padding: 15px 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 71px;
  }

  

  

  p { 
    font-size: 24px;
    padding: 15px 15px;
  }

  button {
    background: #58A4B0;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    position: absolute;
    bottom: 40px;

    &:hover {
      background: ${darken(0.06, '#58A4B0')};
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
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  img {
    width: 263px;
    height: 146px;
    border-radius: 5px 5px 0px 0px;
    object-fit: cover;
    margin: 0;
  } 

  li {
    display: flex;
    flex-direction: column;
  }
}

.swiper-slide--promotion{
  &:hover{
  min-height: 420px !important;

  pre{
    height: 35px;
    transition: all .5s;
    padding: 15px 15px;
  }
  }
  pre{
  transition: all .5s;
  font: 14px 'Poppins',sans-serif;
  text-decoration: line-through;
  height: 0;
  padding: 0;
} 


}
`

export const BannerHomeImage = styled.div`
  .swiper-container {
    z-index: 0;
  }

  .swiper-slide {
    img {
      width: 100%;
      height: 417px !important;
      object-fit: cover;
      margin: 0;

      @media (max-width: 768px)
      {
        width: 100%;
        height: 190px !important;
        object-fit: cover;
      }
    } 
  }
`;