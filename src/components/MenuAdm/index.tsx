import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import {  FlexLink, Container } from "./styles";

export default function MenuAdm() {
  return (
    <>
      <Container>
        <FlexLink>
          <Link to="/produtos">
            Madeira <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Tinta <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Portas e Janelas <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Telha <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Pisos <FiChevronRight />
          </Link>
          <Link to="/produtos">
            Ferramentas <FiChevronRight />
          </Link>
        </FlexLink>
      </Container>
    </>
  );
}
