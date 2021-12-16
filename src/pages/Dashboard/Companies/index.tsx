import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api, ip, role } from "../../../services/api";
import { Empresa } from "../../../types";

export default function Companies() {

  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [filtro, setFiltro] = useState('');
  
  useEffect(() => {
    if(role != 'admin' && role != "empresa"){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
    }

    loadUser();
  }, []);
  async function loadUser() {
    console.log("entrou");
    const response = await api.get('empresa'+filtro)
      .then(response => {
        return response.data;
      })
    setEmpresas(response.rows)
    console.log("Empresas");
    console.log(response.rows);
  }
  function message() {
    toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Empresas</h2>

          <form>
            <select value={filtro} onChange={event => setFiltro(event.target.value)}>
              <option value={''} onClick={message}>Todos</option>
              <option value={'?fiter%5Bstatus%5D=ativo'} onClick={message}>Ativas</option>
              <option value={''} onClick={message}>Inativas</option>
            </select>
          </form>

          {
            empresas.map((empresa) => (
              <CardDatailsContent>
                <CardDatailsContent key={empresa.razaoSocial}>
                  <ContentDetails>
                    <small>
                      <b>{empresa.razaoSocial}</b><br />
                      CNPJ: {empresa.cnpj} <br />
                      Telefone: {empresa.telefone}<br />
                      E-mail: {empresa.email}
                    </small>
                  </ContentDetails>
                </CardDatailsContent>
                <div className="flex-btn">
                  {/*<Link to="/aprovar-usuarios" onClick={messageCancel}>Recusar</Link>
                  <Link to="/aprovar-usuarios" onClick={messageCancel}>Aprovar</Link>*/}
                </div>
              </CardDatailsContent>
            ))

          }
        </CardDatails>
      </div>
    </>
  );
}
