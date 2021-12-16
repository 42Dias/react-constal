import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useState, useEffect } from "react";
import { api, ip, role } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import React from "react";

export default function ApproveUsers() {
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  useEffect(() => {
    if(role != 'admin' && role != "empresa"){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
    }

    async function loadUser() {
      const response = await api.get('empresa?filter%5Bstatus%5D=pendente')
        .then(response => {
          return response.data;
        })
      setEmpresas(response.rows)
      console.log("Empresas");
      console.log(response.rows);
    }
    loadUser();

  }, []);

  function messageCancel() {
    toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Aprovar empresas</h2>

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
                  <Link to="/aprovar-usuarios" onClick={messageCancel}>Recusar</Link>
                  <Link to="/aprovar-usuarios" onClick={messageCancel}>Aprovar</Link>
                </div>
              </CardDatailsContent>
            ))

          }
        </CardDatails>
      </div>
    </>
  );
}


