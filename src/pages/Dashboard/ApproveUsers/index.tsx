import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useState, useEffect } from "react";
import { api, ip, role, status } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import React from "react";

export default function ApproveUsers() {
  const [empresas = [], setEmpresas] = useState<any[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


  async function loadEmpresa() {
    setLoading(true);
    const response = await api.get('empresaStatus?filter%5Brole%5D=admin&filter%5Bstatus%5D=pendente')
      .then(response => {
        setLoading(false);
        return response.data;
      })
    setEmpresas(response.rows)
    console.log("Empresas");
    console.log(response.rows);
  }

  useEffect(() => {
    if(!role){
      window.location.reload()
    }
    else{
      if(role !== "admin" && role !== "empresa" || status === "pendente"){
        // Simulate an HTTP redirect:
        window.location.replace(`${ip}/#/errodias.com.br/Clientes/constal/#/erro`);
      }
    }
    loadEmpresa();

  }, []);

  function messageCancel() {
    toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  function aprovarEmpresa(empresa: Empresa) {
    empresa.status = "active";
    setLoading2(true)
    let response = api.put('empresaStatusUpdate/' + empresa.tId, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa aprovado com sucesso! :)');
        //window.location.reload();
        setLoading2(false)
        loadEmpresa();
      }else{
        toast.error('Ops, não foi possivel aprovar a empresa! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar a empresa! :(');
      console.log(error)
    })
  }
  function recusarEmpresa(empresa: Empresa) {
    empresa.status = "inative";
    setLoading(true)
    let response = api.put('empresaStatusUpdate/' + empresa.tId, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa recusado com sucesso! :)');
        //window.location.reload();
        setLoading(false)
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
          <h2>Aprovar Admin {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}</h2>
          
          {
            empresas.length === 0 ? (
              <p>Todas os admin ja foram aprovadas</p>
            ) : (
            empresas.map((empresa) => (
              <CardDatailsContent>
                <CardDatailsContent key={empresa.razaoSocial}>
                  <ContentDetails>
                    <small>
                      <b>{empresa.razaoSocial || empresa.fullName}</b><br />
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
            )
          }
        </CardDatails>
      </div>
    </>
  );
}


