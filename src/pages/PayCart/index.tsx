import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FooterContainer, CenterPay, Titleh2, BtnFinish } from "./styles";
import { Menu } from "../../components/Menu";


export default function PayCart() {
    return (
      <>
        <Header />
        <Menu />
          <div className="container">
            <Titleh2>Como prefere pagar?</Titleh2>
            <CenterPay>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Pix</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Cartão de crédito</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Boleto</h2>
                  <p>Aprovado em 1 ou 2 dias úteis após pagamento</p>
                </div>
              </div>
            </CenterPay>
            <BtnFinish>
              <Link to="/finalizar">Finalizar</Link>
            </BtnFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
