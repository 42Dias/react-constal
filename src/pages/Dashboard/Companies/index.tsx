import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api, ip, role, status } from "../../../services/api";
import { Empresa } from "../../../types";
import { SelectInput } from "../Vendas/styles";

export default function Companies() {
  const [empresas = [], setEmpresas] = useState<any[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [filtro, setFiltro] = useState('Todas');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!role){
      window.location.reload()
    }
    else{
      if(role !== "admin" && role !== "empresa" || status === "pendente"){
        // Simulate an HTTP redirect:
        window.location.replace(`dev.42dias.com.br/Clientes/constal/#/erro`);
      }
    }

    loadEmpresa();
  }, []);
  async function loadEmpresa() {
    console.log("entrou");
    setLoading(true)
    const response = await api
      .get("empresaStatus?filter%5Bstatus%5D=" + filtro)
      .then((response) => {
        setLoading(false)
        return response.data;
      });
    setEmpresas(response.rows);
    console.log("Empresas");
    console.log(response.rows);
  }
  function message() {
    //toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  function aprovarEmpresa(empresa: Empresa) {
    empresa.status = "active";
    setLoading(true)
    let response = api.put('empresaStatusUpdate/' + empresa.tId, {
      id: empresa.id,
      data: empresa,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Empresa aprovado com sucesso! :)');
        //window.location.reload();
        setLoading(false)
        loadEmpresa();
      } else {
        toast.error('Ops, não foi possivel aprovar a empresa! :(');
      }
    }).catch((error) => {
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
      } else {
        toast.error('Ops, não foi possivel recusado a empresa! :(');
      }
    }).catch((error) => {
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
          <h2>Empresas {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}</h2>

          <SelectInput>
            <select
              value={filtro}
              onChange={(event) => setFiltro(event.target.value)}
              onClick={loadEmpresa}
            >
              <option value={"Todas"} onClick={loadEmpresa}>
                Todos
              </option>
              <option value={"active"} onClick={loadEmpresa}>
                Ativas
              </option>
              <option value={"inative"} onClick={loadEmpresa}>
                Inativas
              </option>
            </select>
          </SelectInput>
          
          {empresas.map((empresa) => (
            <CardDatailsContent>
              <CardDatailsContent key={empresa.razaoSocial}>
                <ContentDetails>
                  <small>
                    <b>{empresa.razaoSocial || empresa.fullName}</b>
                    <br />
                    CNPJ: {empresa.cnpj} <br />
                    Telefone: {empresa.telefone}
                    <br />
                    E-mail: {empresa.email}
                  </small>
                </ContentDetails>
              </CardDatailsContent>
              <div className="flex-btn">
                {empresa.status == 'active' ? <button onClick={() => recusarEmpresa(empresa)}>Recusar</button> : ''}
                {empresa.status == 'inative' ? <button onClick={() => aprovarEmpresa(empresa)}>Aprovar</button> : ''}
              </div>
            </CardDatailsContent>
          ))}
        </CardDatails>
      </div>
    </>
  );
}
