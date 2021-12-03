import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export default function MenuEmpresa() {
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
                <Link to="/meus-produtos">Usuários</Link>
                <Link to="/promocoes">Empresas</Link>
                <Link to="/produtos">Produtos</Link> 
                <Link to="/historico">Histórico</Link> 
                <Link to="/assinaturas">Planos</Link>
                <Link to="/vendas">Vendas</Link>
                <Link to="/consultar-produtos">Consultas</Link>
                <Link to="/pagamentos">Pagamentos</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
