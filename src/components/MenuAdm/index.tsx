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
                <Link to="/historico">Histórico</Link> 
                <Link to="/detalhes-da-venda">Detalhes das vendas</Link> 
                <Link to="/empresas">Empresas</Link>
                <Link to="/produtos">Produtos</Link> 
                <Link to="/assinaturas-adm">Planos</Link> 
                <Link to="/vendas">Vendas</Link> 
                <Link to="/consultar-produtos">Consultas</Link> 
                <Link to="/pagamentos">Pagamentos</Link>
                 {/*  */}
                <Link to="/pagamentos">Todos Usuários</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
