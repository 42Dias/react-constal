import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import {  FlexLink, Container } from "./styles";

export default function MenuAdm() {
  return (
    <>
      <Container>
        <FlexLink>
          <Link to="/meus-produtos">
            Produtos <FiChevronRight />
          </Link>
          <Link to="/promocoes">
            Promoções <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Vendas <FiChevronRight />
          </Link>
          <Link to="/perguntas">
            Perguntas <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Planos <FiChevronRight />
          </Link>
          <Link to="/dados-pessoais">
          Dados Pessoais <FiChevronRight />
          </Link>
        </FlexLink>
      </Container>
    </>
  );
}
