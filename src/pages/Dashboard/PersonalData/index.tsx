// import React from "react";
// import Modal from "react-modal";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import MenuAdm from "../../../components/MenuAdm";
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
      <MenuAdm />
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
      </div>
    </>
  );
}
