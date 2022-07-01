// import React from "react";
// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api, Email, id, ip, role, status, token } from "../../../services/api";
import { ModalContent } from "../../Produto/styles";
import { ModalContainerVendedor } from "../../Profile/styles";
import { ContentFormNew } from "../NewProd/styles";
import { ModalFlex } from "../Promotions/styles";
import Modal from "react-modal";
import {
  Btn,
  // CardProfile,
  // CardDatas,
  // Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  NewBtn,
} from "./styles";
import { toast } from "react-toastify";
import axios from "axios";

export default function ResetarSenha() {
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [email              , setEmail              ] = useState('')
  const [userId             , setuserId             ] = useState('')
  const [senha              , setSenha              ] = useState("");
  const [showModalResetSenha, setShowModalResetSenha] = useState(false);
  const [loading            , setLoading            ] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }


  useEffect(() => {

    console.log("window.location.hash")
    console.log(window.location.hash)

    const hash = window.location.hash.replace(`#/resetar-senha/`, ``);

    if (hash) {
      
      localStorage.setItem("token", JSON.stringify(hash));
      loadUser(hash)

    }
  }

    , []
  )
  async function loadUser(token: string) {
    if (!token) {
      //window.location.reload()
    }
    const response = await axios({
      method: "get",
      url: `${ip}:8157/api/auth/me`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      timeout: 50000,
    })
    .then((response) => {
      return response.data;
    });
    //// console.log(response);
    //// console.log(response.tenants[0].roles[0]);
    let setRole = response.tenants[0].roles
    const roleHelper = JSON.parse(setRole)
    // console.log(roleHelper[0])
    localStorage.setItem("roles", JSON.stringify(roleHelper[0])); //saves client's data into localStorage:

    //response.tenants[0].tenant.id);
    localStorage.setItem(
      "tenantId",
      JSON.stringify(response.tenants[0].tenant.id)
    ); //saves client's data into localStorage:
    localStorage.setItem("id", JSON.stringify(response.id)); //saves client's data into localStorage:
    localStorage.setItem("status", JSON.stringify(response.tenants[0].status)); //saves client's data into localStorage:
    localStorage.setItem("email", JSON.stringify(response.email));

    setuserId(response.id)
  }

  async function resetSenha() {
    setLoading(true)
  
    await api.get("user/" + id).then((response) => {
      update(response.data)
      return response.data;
    });
    // console.log(data)

    async function update(data: any) {
      if (data) {
        data.password = senha
        
        await axios.put(`${ip}:8157/api/auth/password-reset/`, {
          token: userId,
          password: senha
        })
        .then((response) => {
          setLoading(false)
          toast.info("Senha Alterada com sucesso!")
          closeModalResetSenha()
          return response.data;
        })
        .catch(error => {
          toast.error("Link de redefinição de senha inválido ou expirado")
          setLoading(false)
        })
      }
    }
  }
  function closeModalResetSenha() {
    setShowModalResetSenha(false);
  }
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Dados da conta</h2>
          <CardDatailsContent>
            <ContentDetails>
              <h3>Login: <span>{email || Email}</span></h3>

            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>Senha: <span>******</span></h3>

            </ContentDetails>
            <Btn onClick={() => setShowModalResetSenha(true)}
            >Alterar</Btn>
          </CardDatailsContent>
        </CardDatails>
      </div>

      {/* 
      ======================MODAIS======================
       */}

      <ModalContainerVendedor>
        <Modal
          isOpen={showModalResetSenha}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalResetSenha}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModalResetSenha} />
            </ModalFlex>

            <ModalContent>
              <h3>Nova Senha</h3>
              <ContentFormNew>
                <label htmlFor="">Senha: </label>
                <input
                  type="password"
                  onChange={(text) => setSenha(text.target.value)}
                />
              </ContentFormNew>
              {loading ? (
                <img
                  width="40px"
                  style={{ margin: "auto" }}
                  height=""
                  src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                  alt="Loading"
                />
              ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={closeModalResetSenha}>
                  Cancelar
                </button>
                <button type="button" onClick={resetSenha}>
                  Adicionar
                </button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
