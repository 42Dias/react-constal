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
          <Link to="/produtos">
            Promoções <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Vendas <FiChevronRight />
          </Link>
          <Link to="/produtos">
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
