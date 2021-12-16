import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";

export function Menu() {
  let role = localStorage.getItem("roles")?.replace(/"/g, "");
   function Empresa() {
     return (
      <Container>
      <FlexLink>
          <div className="dropdown">
            <button className="dropbtn">
              <FiMenu />
              <span>Links úteis</span>
            </button>
            <div className="dropdown-content">
              <div className="drop-grid">
                <Link to="/meus-produtos">Novo Produtos</Link>
                <Link to="/promocoes">Promoções</Link>
                <Link to="/vendas">Vendas</Link> 
                <Link to="/perguntas">Perguntas</Link> 
                <Link to="/assinaturas">Planos</Link> 
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
     )
  }
  //Adm
  function Adm() {
    return (
      <Container>
      <FlexLink>
        <div className="dropdown">
          <button className="dropbtn">
            <FiMenu />
            <span>Links úteis</span>
          </button>
          <div className="dropdown-content">
            <div className="drop-grid">
              <Link to="/vendas">Vendas por Empresa</Link>
              <Link to="/perguntas">Histórico Vendas</Link> 
              <Link to="/assinaturas">Planos</Link>
              <Link to="/assinaturas">assinaturas</Link>
              <Link to="/consultar-produtos">Aprovar Produtos</Link>
              <Link to="/assinaturas">Pagamentos</Link> 
              <Link to="/aprovar-usuarios">Aprovar empresas</Link> 
              <Link to="/empresas">Empresas</Link> 
            </div>
          </div>
        </div>
      </FlexLink>
    </Container>
    )
  }
  
   function Cliente() {
      return (
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
      )
    }

  let param = role;
  
  function renderSwitch(param:any) {
    switch(param) {
      case "admin":
        return <Adm />
      case 'empresa':
        return <Empresa />;
      default:
        return <Cliente />
    }
  }

    return (
      <div>
        <div>
          {renderSwitch(param)}
        </div>
      </div>
    );
}