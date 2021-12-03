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
                <Link to="/vendas">Produtos</Link> 
                <Link to="/perguntas">Histórico</Link> 
                <Link to="/assinaturas">Planos</Link>
                <Link to="/assinaturas">Vendas</Link>
                <Link to="/assinaturas">Consultas</Link>
                <Link to="/assinaturas">Pagamentos</Link> 
                <Link to="/assinaturas">Todos usuários</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
