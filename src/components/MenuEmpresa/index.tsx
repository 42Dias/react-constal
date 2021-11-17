import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export default function MenuEmpresa() {
  return (
    <>
      <Container>
        <FlexLink>
          <Link to="/produtos">
            Produtos <FiChevronRight />
          </Link>
          <Link to="/promocoes">
            Promoções <FiChevronRight />
          </Link>
          <Link to="/meus-produtos">
            Novo produto <FiChevronRight />
          </Link>
          <Link to="/vendas">
            Vendas <FiChevronRight />
          </Link>
          <Link to="/perguntas">
            Perguntas <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Planos <FiChevronRight />
          </Link>
        </FlexLink>
      </Container>
    </>
  );
}
