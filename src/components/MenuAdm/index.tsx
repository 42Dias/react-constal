import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export default function MenuAdm() {
  return (
    <>
      <Container>
      <FlexLink>
          <div className="dropdown">
            <button className="dropbtn">
              <FiMenu />
              <span>Links úteis</span>
            </button>
            <div className="dropdown-content">
              <div className="drop-grid">
                <Link to="/meus-produtos">Novo Produtos</Link>
                <Link to="/promocoes">Promoções</Link>
                <Link to="/vendas">Vendas</Link> 
                <Link to="/perguntas">Perguntas</Link> 
                <Link to="/assinaturas">Planos</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
