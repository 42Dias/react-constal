import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './ProductQuery.styled'
import prodfav from "../../assets/images/prodfav.png"
import { Link } from "react-router-dom"
import { Menu } from "../../components/Menu"

function ProductQuery() {
  return (
    <>
      <Header />
      <Menu />
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
            <Link to="">Aprovar</Link>
            <Link to="" style={{ background: 'none', color: 'black', border: '1px solid black' }}>Recusar</Link>
          </S.CardDatailsContent>

          <S.CardDatailsContent>
            <S.ContentDetails>
              <img src={prodfav} alt="" />
              <span>Nome do produto</span>
              <p>Quantidade</p>
              <p>R$ 999,99</p>
            </S.ContentDetails>
            <Link to="">Aprovar</Link>
            <Link to="" style={{ background: 'none', color: 'black', border: '1px solid black' }}>Recusar</Link>
          </S.CardDatailsContent>

          <S.CardDatailsContent>
            <S.ContentDetails>
              <img src={prodfav} alt="" />
              <span>Nome do produto</span>
              <p>Quantidade</p>
              <p>R$ 999,99</p>
            </S.ContentDetails>
            <Link to="">Aprovar</Link>
            <Link to="" style={{ background: 'none', color: 'black', border: '1px solid black' }}>Recusar</Link>
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