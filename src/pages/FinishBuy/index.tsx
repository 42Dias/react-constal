import Header from "../../components/Header";
import Footer from "../../components/Footer";
import check from "../../assets/images/check-icon.svg";
import { Link } from "react-router-dom";
import { FooterContainer, CenterFinish } from "./styles";


export default function FinishBuy() {
    return (
      <>
        <Header />
          <div className="container">
            <CenterFinish>
              <img src={check} alt="" />
              <h2>Compra realizada com sucesso!</h2>
              <Link to="/">Início</Link>
            </CenterFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
