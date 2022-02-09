import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";
import { useEffect, useState } from "react";
import { api, ip } from "../../services/api";
import axios from "axios";

export function Menu() {
  let role = localStorage.getItem("roles")?.replace(/"/g, "");
  const [categorias = [], setCategorias] = useState<any[]>([]);
  const [categoriasFixed = [], setCategoriasFixed] = useState<any[]>([]);
  const [moveis, setMoveis ] = useState<any>();
  const [eletrodoméstico, setTeletrodoméstico ] = useState<any>();
  const [materiais, setMateriais ] = useState<any>();
  const [cama, setCama ] = useState<any>();
  const [cursos, setCursos] = useState<any>();
  const [modaInfantil, setModaInfantil] = useState<any>();

  async function loadCategoriasFixed() {
    const categoriasResponseFixed = await axios.get(''+ip+':8157/api/categoria-aprovados-is-fixed');

    const categoriasDoBack = categoriasResponseFixed.data
      setCategoriasFixed(categoriasDoBack)
    
  }

  async function loadCategorias() {
      const categoriasResponse = await axios.get(''+ip+':8157/api/categoria-aprovados');
      const categoriasDoBack = categoriasResponse.data
      setCategorias(categoriasDoBack)

    // setCategorias([])


    // const moveisResponse           = await axios.get(''+ip+':8157/api/categoria-name/moveis'); 
    // const eletrodomésticoResponse  = await axios.get(''+ip+':8157/api//categoria-name/eletrodoméstico'); 
    // const materiaisResponse        = await axios.get(''+ip+':8157/api/categoria-name/materiais'); 
    // const camaResponse             = await axios.get(''+ip+':8157/api/categoria-name/cama'); 
    // const cursosResponse           = await axios.get(''+ip+':8157/api/categoria-name/cursos');
    // const modaInfantilResponse     = await axios.get(''+ip+':8157/api/categoria-name/moda'); 

    // setMoveis(moveisResponse.data[0].id)
    // setTeletrodoméstico(eletrodomésticoResponse.data[0].id)
    // setMateriais(materiaisResponse.data[0].id)
    // setCama(camaResponse.data[0].id)
    // setCursos(cursosResponse.data[0].id)
    // setModaInfantil(modaInfantilResponse.data[0].id)


    const controller = new AbortController();
    return () => { controller.abort(); }
  }



  useEffect(
    () => {
      loadCategorias()
      loadCategoriasFixed()
    }, [])
 

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
                <Link to="/meus-produtos">Meus Produtos</Link>
                <Link to="/promocoes">Promoções</Link>
                <Link to="/vendas">Vendas</Link>
                <Link to="/perguntas">Perguntas</Link>
                <Link to="/contas">Contas a Receber</Link>
                {/* <Link to="/assinaturas">Planos</Link> */}
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
                {/* <Link to="/assinaturas">Pagamentos</Link> */}
                <Link to="/vendas">Vendas por Empresa</Link>
                <Link to="/enviar-banner">Banners</Link>
                <Link to="categorias-fixar" >Fixar categorias</Link>
                <Link to="/perguntas">Perguntas</Link>
                <Link to="/contas">Contas a Receber</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/enviar-termos">Termos</Link>
                <Link to="/enviar-dados">Dados do rodapé</Link>
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
              </div>
            </div>
          </div>

          <div className="category-fix">
            {/* 
            Categorias fixas
            Categorias do cliente
            */}
            {/* <Link to="/produtos">Todos os produtos</Link> */}
            {            
            categoriasFixed.map(
            (categoria, index) => (
                <Link
                  key={index}
                  to={`/produto-categoria/${categoria.id}`}>{categoria.nome}</Link>
                )
            )}
            {/* <Link to={`/produto-categoria/${moveis}`}>Moveis</Link>
            <Link to={`/produto-categoria/${eletrodoméstico}`}>Eletrodoméstico</Link>
            <Link to={`/produto-categoria/${materiais}`}>Materiais de Decoração</Link>
            <Link to={`/produto-categoria/${cama}`}>Cama, Mesa e Banho</Link>
            <Link to={`/produto-categoria/${cursos}`}>Cursos</Link>
            <Link to={`/produto-categoria/${modaInfantil}`}>Moda infantil</Link> */}
          </div>
        </FlexLink>
      </Container>
    )
  }

  let param = role;

  function renderSwitch(param: any) {
    switch (param) {
      case "admin":
        return <>
         <Cliente/>
         <Adm />
         </>
      case 'empresa': 
        return <>
         <Cliente/>
         <Empresa />
         </>
         
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