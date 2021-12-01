import { Link } from "react-router-dom";
import { FiChevronRight, FiMenu } from "react-icons/fi";
import { FlexLink, Container, FlexLinkMobile } from "./styles";

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

        <FlexLinkMobile>
          <div className="dropdown">
            <button className="dropbtn">
              <FiMenu />
            <span>Links úteis</span>
            </button>
            <div className="dropdown-content">
              <div className="drop-grid">
                <Link to="/produtos">
                  Produtos 
                </Link>
                <Link to="/promocoes">
                  Promoções
                </Link>
                <Link to="/meus-produtos">
                  Novo produto
                </Link>
                <Link to="/vendas">
                  Vendas
                </Link>
                <Link to="/perguntas">
                  Perguntas
                </Link>
                <Link to="/produtos">
                  Planos
                </Link>
              </div>
            </div>
          </div>
        </FlexLinkMobile>
      </Container>
    </>
  );
}
