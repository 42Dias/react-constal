import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import {  FlexLink, Container } from "./styles";

export default function MenuCliente() {
  return (
    <>
      <Container>
        <FlexLink>
          <Link to="/produtos">
            Moveis <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Eletrodoméstico <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Materiais de Decoração <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Cama, Mesa e Banho <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Moda infantil <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Moda Feminina <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Moda Masculina <FiChevronRight />
          </Link>
        </FlexLink>
      </Container>
    </>
  );
}
