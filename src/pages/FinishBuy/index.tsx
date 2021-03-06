import Header from "../../components/Header";
import Footer from "../../components/Footer";
import check from "../../assets/images/check-icon.png";
import { Link } from "react-router-dom";
import { FooterContainer, CenterFinish } from "./styles";
import { Menu } from "../../components/Menu";
import { useEffect } from "react";
import { role, ip } from "../../services/api";


export default function FinishBuy() {
  useEffect(
    () => {
      if(role != 'pessoa'){
        // Simulate an HTTP redirect:
        window.location.replace(`${ip}/#/erro`);
      }
    }, []
  )
    return (
      <>
        <Header />
        <Menu />
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
