import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export default function MenuCliente() {
  return (
    <>
      <Container>
        <FlexLink>
          <div className="dropdown">
            <button className="dropbtn">
              <FiMenu />
              <span>Categorias</span>
            </button>
            <div className="dropdown-content">
              <div className="drop-grid">
                <Link to="/produtos">Moda infantil</Link>

                <Link to="/produtos">Moda feminina</Link>

                <Link to="/produtos">Moda Masculina</Link>

                <Link to="/produtos">Ar condicionado</Link>

                <Link to="/cursos">Cursos</Link>
              </div>
            </div>
          </div>

          <div className="category-fix">
            <Link to="/produtos">Moveis</Link>
            <Link to="/produtos">Eletrodoméstico</Link>
            <Link to="/produtos">Materiais de Decoração</Link>
            <Link to="/produtos">Cama, Mesa e Banho</Link>
            <Link to="/cursos">Cursos</Link>
          </div>
        </FlexLink>
      </Container>
    </>
  );
}
