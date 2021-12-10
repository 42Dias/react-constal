import Header from "../../../components/Header";
import MenuAdm from "../../../components/MenuAdm";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import MenuCliente from "../../../components/MenuCliente";

interface empresa {
  avatars: string;
  fullName: string;
  email: string;
  roles: any;
  id: number;
  nome: string;
}
export default function ApproveUsers() {
  const [empresas = [], setEmpresas] = useState<empresa[]>([]); 
  useEffect(() => {
    async function loadUser() {
      const response = await api.get('user?filter%5Brole%5D=empresa')
      .then(response => {
          return response.data;            
      })
      setEmpresas(response.data) 
      console.log(response.rowa);
  }
    loadUser();

  }, []);
  return (
    <>
      <Header />
      <MenuCliente />
      <div className="container">
        <CardDatails>
          <h2>Aprovar usuários</h2>
          <CardDatailsContent>
          {
          empresas.map((empresa) => (
         <CardDatailsContent key={empresa.nome}>
              <ContentDetails>
              <small>
                <b>${empresa.email}</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
         </CardDatailsContent>
  
            ))
          }
            
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Nome do user</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Nome do user</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>
        </CardDatails>
      </div>
    </>
  );
}
