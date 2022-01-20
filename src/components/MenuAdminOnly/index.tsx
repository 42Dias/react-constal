import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FlexLink, Container } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { api, ip } from "../../services/api";
import axios from "axios";

export function Menu() {

  const [number, setNumber] = useState(1)




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
      console.log("categoriasDoBack")
      console.log(categoriasDoBack)
      setCategoriasFixed(categoriasDoBack)
    
  }

  async function loadCategorias() {
      const categoriasResponse = await axios.get(''+ip+':8157/api/categoria-aprovados');
      const categoriasDoBack = categoriasResponse.data
      console.log("categoriasDoBack")
      console.log("categoriasDoBack")
      console.log(categoriasDoBack)
      setCategorias(categoriasDoBack)
  }

  useEffect(
    () => {
      loadCategorias()
      loadCategoriasFixed()
    }, [])

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
                <Link to="/enviar-banner">Banners</Link>
                <Link to="categorias-fixar" >Fixar categorias</Link>
                <Link to="/perguntas">Perguntas</Link>
                <Link to="/produtos">Produtos</Link>
              </div>
            </div>
          </div>
        </FlexLink>
      </Container>
    )
  }


  return (
    <div>
      <div>
        {<Adm />}
      </div>
    </div>
  );
}