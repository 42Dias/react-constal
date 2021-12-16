import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import React from "react";

export default function ApproveUsers() {
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  useEffect(() => {
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
  function aprovarEmpresa(empresa: Empresa) {
    empresa.status = "aprovado";
    let response = api.put('empresa/' + empresa.id, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa aprovado com sucesso! :)');
        window.location.reload();
      }else{
        toast.error('Ops, não foi possivel aprovar a empresa! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar o produto! :(');
      console.log(error)
    })
  }
  function recusarEmpresa(empresa: Empresa) {
    empresa.status = "recusado";
    let response = api.put('empresa/' + empresa.id, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa recusado com sucesso! :)');
        window.location.reload();
      }else{
        toast.error('Ops, não foi possivel recusado a empresa! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel recusado a empresa! :(');
      console.log(error)
    })
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
                  <Link to="/aprovar-usuarios" onClick={() => recusarEmpresa(empresa)}>Recusar</Link>
                  <Link to="/aprovar-usuarios" onClick={() => aprovarEmpresa(empresa)}>Aprovar</Link>
                </div>
              </CardDatailsContent>
            ))

          }
        </CardDatails>
      </div>
    </>
  );
}


