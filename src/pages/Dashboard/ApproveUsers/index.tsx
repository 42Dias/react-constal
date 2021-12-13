import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { Empresa } from "../../../types";

export default function ApproveUsers() {
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
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
                  <Link to="">Recusar</Link>
                  <Link to="">Aprovar</Link>
                </div>
              </CardDatailsContent>
            ))

          }
        </CardDatails>
      </div>
    </>
  );
}
