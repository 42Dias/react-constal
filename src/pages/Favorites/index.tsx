import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  Title,
} from "./styles";
import prodfav from "../../assets/images/prodfav.png";

export default function Favorites() {
  return (
    <>
      <Header />
      <div className="container">
        <CardDatails>
          <Title>Favoritos</Title>

          <CardDatailsContent>
            <ContentDetails>
              <img src={prodfav} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <Link to="">Comprar</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={prodfav} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <Link to="">Comprar</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={prodfav} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <Link to="">Comprar</Link>
          </CardDatailsContent>
        </CardDatails>  

      </div>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
