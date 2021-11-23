import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import user from "../../assets/images/user-profile.png";
import mastercard from "../../assets/images/master-card.svg";
import visa from "../../assets/images/visa.svg";

import {
  CardProfile,
  CardDatas,
  Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
} from "./styles";
import { Link } from "react-router-dom";
import MenuEmpresa from "../../components/MenuEmpresa";
import { api } from "../../services/api";


export default function Profile() {

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("http://localhost:8157/api/auth/me");
      console.log(response.data);
      
    }
    
    loadUser();
  }, []);

  function clientLocalStorage() {
      // getting stored value

      const savedData:string[] = JSON.parse(
        localStorage.getItem("clientDataFromLocalStorage") || "{}" );
        console.log(savedData)
      
      return savedData;
  }

  const [savedData] = useState([]);

  console.log(savedData)

  clientLocalStorage()  
  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
        <Title>Meus dados</Title>

        <CardProfile>
          <img src={user} alt="profile" />

          <CardDatas>
            <h3>Julia Souza</h3>
            <span>497.168.718-92</span>
            <p>(11) 97051-9704</p>
            <p>eujulia@gmail.com</p>
          </CardDatas>
        </CardProfile>

        <CardDatails>
          <h2>Dados da conta</h2>
          <CardDatailsContent>
            <ContentDetails>
              <span>Login:</span>
              <p>Julia Souza</p>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Senha:</span>
              <p>******</p>
            </ContentDetails>
            <Link to="">Alterar</Link>
          </CardDatailsContent>
        </CardDatails>

        <Link to="/historico-de-pedidos">Histórico de pedidos</Link><br />
        <Link to="/detalhes-da-venda">Detalhes da venda</Link><br />
        <Link to="/vendas">Vendas</Link><br />
        <Link to="/aprovar-usuarios">Aprovar usuários</Link>

        <CardDatails>
          <h2>Cartões</h2>
          <CardDatailsContent>
            <ContentDetails>
              <img src={mastercard} alt="" />
              <p>Final em XXXX <br /> Banco <br /> Vencimento </p>
            </ContentDetails>
            <Link to="">Excluir</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={visa} alt="" />
              <p>Final em XXXX <br /> Banco <br /> Vencimento </p>
            </ContentDetails>
            <Link to="">Excluir</Link>
          </CardDatailsContent>
        </CardDatails>

        <CardDatails>
          <h2>Endereço</h2>
          <CardDatailsContent>
            <ContentDetails>
              <small>
                Av. xxxxxxxx <br />
                Referência: XXXXXX <br />
                CEP: 07355-620 <br />
                Cidade: SP
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Alterar</Link>
              <Link to="">Excluir</Link>
            </div>
          </CardDatailsContent>
          <Link to="">Novo endereço</Link>
        </CardDatails>
      </div>
      <Footer />
    </>
  );
}


