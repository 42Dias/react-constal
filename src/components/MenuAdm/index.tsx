import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export default function MenuAdm() {
  return (
    <>
      <Container>
        <FlexLink>
          <Link to="/aprovar-usuarios">
            Usuários <FiChevronRight />
          </Link>
          <Link to="/empresas">
            Empresas <FiChevronRight />
          </Link>
          <Link to="/meus-produtos">
            Produtos <FiChevronRight />
          </Link>
          <Link to="/historico">
            Histórico <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Planos <FiChevronRight />
          </Link>
          <Link to="/vendas">
            Vendas <FiChevronRight />
          </Link>
          
          <Link to="/dados-pessoais">
            Consultas <FiChevronRight />
          </Link>

          <Link to="/pagamentos">
            Pagamentos <FiChevronRight />
          </Link>
  
        </FlexLink>
      </Container>
    </>
  );
}
