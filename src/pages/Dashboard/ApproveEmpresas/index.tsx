import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useState, useEffect } from "react";
import { api, ip, role, status, token } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

export default function ApproveEmpresas() {
  const [empresas = [], setEmpresas] = useState<any[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


  async function loadEmpresa() {
    setLoading(true);
    const response = await api.get('empresaStatus?filter%5Bstatus%5D=pendente')
      .then(response => {
        setLoading(false);
        return response.data;
      })
    setEmpresas(response.rows)
    // console.log("Empresas");
    // console.log(response.rows);
  }

  useEffect(() => {
    if (!token){
      //window.location.reload()
    }
    else{
      if(role !== "admin" && role !== "empresa" || status === "pendente"){
        // Simulate an HTTP redirect:
        window.location.replace(`${ip}/#/erro`);
      }
    }
    
    loadEmpresa();

  }, []);

  function messageCancel() {
    toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  function aprovarEmpresa(empresa: Empresa) {
    toast.info("Carregando...")
    empresa.status = "active";
    setLoading2(true)
    let response = api.put('empresaStatusUpdate/' + empresa.tId, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      // console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa aprovado com sucesso! :)');
        //window.location.reload();
        setLoading2(false)
        console.log("empresa.email")
        console.log(empresa.email)
        axios.post(''+ip+':8157/api/cliente/enviarEmailEmpresaAprovada', {
          email: empresa.email,
        }).then((response) => {
          if(response.status == 200){
            // console.log(response)
            toast.info('Email enviado com sucesso! :)')
            loadEmpresa();
          }
          else{
            // console.log(response)
            toast.info('Email não foi enviado com sucesso! :(')
          }
        })
      }else{
        toast.error('Ops, não foi possivel aprovar a empresa! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar a empresa! :(');
      // console.log(error)
    })
  }
  function recusarEmpresa(empresa: Empresa) {
    toast.info("Carregando...")
    empresa.status = "inative";
    setLoading(true)
    let response = api.put('empresaStatusUpdate/' + empresa.tId, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      // console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa recusado com sucesso! :)');
        loadEmpresa();
        //window.location.reload();
        setLoading(false)
      }else{
        toast.error('Ops, não foi possivel recusado a empresa! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel recusado a empresa! :(');
      // console.log(error)
    })
  }
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Aprovar Empresas {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'} alt="Loading" /> : false}</h2>
          
          {
            empresas.length === 0 ? (
              <p>Todas os admin ja foram aprovadas</p>
            ) : (
            empresas.map((empresa) => (
              <CardDatailsContent>
                <CardDatailsContent key={empresa.razaoSocial}>
                  <ContentDetails>
                    <span>{empresa.razaoSocial || empresa.fullName}</span>
                    <span>CNPJ: {empresa.cnpj}</span>
                    <span>Telefone: {empresa.telefone}</span>
                    <span>E-mail: {empresa.email}</span>
                  </ContentDetails>
                </CardDatailsContent>
                
                <div className="flex-btn">
                  <Link to="/aprovar-empresas" onClick={() => recusarEmpresa(empresa)}>Recusar</Link>
                  <Link to="/aprovar-empresas" onClick={() => aprovarEmpresa(empresa)}>Aprovar</Link>
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


