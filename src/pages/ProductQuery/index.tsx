import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './ProductQuery.styled'
import prodfav from "../../assets/images/prodfav.png"
import { Link } from "react-router-dom"
import MenuAdm from "../../components/MenuAdm"

function ProductQuery() {
  return (
    <>
      <Header />
      <MenuAdm />
      <div className="container">
        <S.CardDatails>
          <S.Title>Consulta de produtos</S.Title>

          <S.CardDatailsContent>
            <S.ContentDetails>
              <img src={prodfav} alt="" />
              <span>Nome do produto</span>
              <p>Quantidade</p>
              <p>R$ 999,99</p>
            </S.ContentDetails>
            <div className="flex-btn">
              <Link to="">Aprovar</Link>
              <Link to="">Recusar</Link>
            </div>
          </S.CardDatailsContent>

          <S.CardDatailsContent>
            <S.ContentDetails>
              <img src={prodfav} alt="" />
              <span>Nome do produto</span>
              <p>Quantidade</p>
              <p>R$ 999,99</p>
            </S.ContentDetails>
            <div className="flex-btn">
              <Link to="">Aprovar</Link>
              <Link to="">Recusar</Link>
            </div>
          </S.CardDatailsContent>

          <S.CardDatailsContent>
            <S.ContentDetails>
              <img src={prodfav} alt="" />
              <span>Nome do produto</span>
              <p>Quantidade</p>
              <p>R$ 999,99</p>
            </S.ContentDetails>
            <div className="flex-btn">
              <Link to="">Aprovar</Link>
              <Link to="">Recusar</Link>
            </div>
          </S.CardDatailsContent>
        </S.CardDatails>  

      </div>
      <S.FooterContainer>
        <Footer />
      </S.FooterContainer>
    </>
  )
}

export default ProductQuery