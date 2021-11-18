// import React from "react";
// import Modal from "react-modal";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import MenuEmpresa from "../../../components/MenuEmpresa";
import {
  // CardProfile,
  // CardDatas,
  // Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
} from "./styles";

export default function PersonalData() {
  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
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

        <CardDatails>
          <h2>Empresa</h2>
          <CardDatailsContent>
            <ContentDetails>
              <span>Marca:</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Razão Social:</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>CNPJ:</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Telefone:</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>E-mail:</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Websidte:</span>
            </ContentDetails>
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
    </>
  );
}
