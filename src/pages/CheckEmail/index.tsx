import Header from "../../components/Header";
import Footer from "../../components/Footer";
import check from "../../assets/images/check-icon.svg";
import { Link } from "react-router-dom";
import { FooterContainer, CenterFinish } from "./styles";
import { Menu } from "../../components/Menu";


export default function CheckEmail() {
    return (
      <>
        <Header />
        <Menu />
          <div className="container">
            <CenterFinish>
              <img src={check} alt="" />
              <h2>Email verificado com sucesso</h2>
              <Link to="/">Início</Link>
            </CenterFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
