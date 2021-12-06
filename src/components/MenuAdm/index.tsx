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
                <Link to="/aprovar-usuarios">Usuários</Link>
                <Link to="/promocoes">Empresas</Link>
                <Link to="/vendas">Produtos</Link> 
                <Link to="/perguntas">Histórico</Link> 
                <Link to="/minhas-assinaturas">Planos</Link>
                <Link to="/vendas">Vendas</Link>
                <Link to="/consultar-produtos">Consultas</Link>
                <Link to="/pagamentos">Pagamentos</Link> 
                <Link to="/todos-usuarios">Todos usuários</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
