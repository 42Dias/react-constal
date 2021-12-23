import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";
import { useEffect, useState } from "react";
import { api, ip } from "../../services/api";
import axios from "axios";

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
                {/*<Link to="/assinaturas">Assinaturas</Link>*/}
                <Link to="/aprovar-usuarios">Aprovar Admin</Link>
                <Link to="/aprovar-empresas">Aprovar Empresas</Link>
                <Link to="/aprovar-categorias">Aprovar Categorias</Link>
                <Link to="/consultar-produtos">Aprovar Produtos</Link>
                <Link to="/empresas">Empresas</Link>
                <Link to="/assinaturas">Pagamentos</Link>
                <Link to="/vendas">Vendas por Empresa</Link>

              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    )
  }

  function Cliente() {
    const [categorias = [], setCategorias] = useState<any[]>([]);

    useEffect(
      () => {
        async function loadCategorias() {
          const categoriasResponse = await axios.get('http://'+ip+':8157/api/categoria-aprovados');
          const categoriasDoBack = categoriasResponse.data.record
          console.log("categoriasDoBack")
          console.log("categoriasDoBack")
          console.log(categoriasDoBack)
          setCategorias(categoriasDoBack)
          // setCategorias([])
          const controller = new AbortController();
          return () => { controller.abort(); }
        }
        loadCategorias()
      }, [])
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
                {/* categorias do back? */}
                {
                  categorias.map(
                    (categoria, index) => (
                      <Link
                        key={index}
                        to={`/produto-categoria/${categoria.id}`}>{categoria.nome}</Link>
                    )
                  )
                }
                <Link to="/produtos">Moveis</Link>
              </div>
            </div>
          </div>

          <div className="category-fix">
            {/* 
            Categorias fixas
            Categorias do cliente
            */}
            <Link to="/produtos">Moveis</Link>
            <Link to="/produtos">Eletrodoméstico</Link>
            <Link to="/produtos">Materiais de Decoração</Link>
            <Link to="/produtos">Cama, Mesa e Banho</Link>
            <Link to="/produto-categoria/:id">Cursos</Link>
          </div>
        </FlexLink>
      </Container>
    )
  }

  let param = role;

  function renderSwitch(param: any) {
    switch (param) {
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