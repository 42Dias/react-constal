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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
  }
  function messageCancel() {
    toast.error('Ah, que pena. o seu produto não foi cadastrado na plataforma. Revise algumas informações :(')
    //setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu pedido. Ele será revisado e logo estará na plataforma :)')
    //setIsOpen(false);
  }

  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [ramal, setRamal] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [pontoReferencia, setPontoReferencia] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [bairro, setBairro] = useState('')
  const [pix, setPix] = useState('')
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [newNome, setNewNome] = useState('');
  const [newMarca, setNewMarca] = useState('')
  const [newRazaoSocial, setNewRazaoSocial] = useState('')
  const [newCnpj, setNewCnpj] = useState('')
  const [newTelefone, setNewTelefone] = useState('')
  const [newRamal, setNewRamal] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newWebsite, setNewWebsite] = useState('')
  const [newCep, setNewCep] = useState('')
  const [newLogradouro, setNewLogradouro] = useState('')
  const [newNumero, setNewNumero] = useState('')
  const [newComplemento, setNewComplemento] = useState('')
  const [newPontoReferencia, setNewPontoReferencia] = useState('')
  const [newCidade, setNewCidade] = useState('')
  const [newEstado, setNewEstado] = useState('')
  const [newBairro, setNewBairro] = useState('')
  const [newPix, setNewPix] = useState('')
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");

  useEffect(() => {
      console.log(role + " " + status)
     
      const hash = window.location.hash.replace('dev.42dias.com.br/Clientes/constal/#/', '');
      console.log(hash)
      if(hash){
        
        var token = hash.replace('#/resetar-senha/', '');
        console.log(token)
        if(token){
        localStorage.setItem("token", JSON.stringify(token));
        loadUser()
        }
      }
    }

    , []
  )
  async function loadUser() {
    if (!token){
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
    }).then((response) => {
      return response.data;
    });
    //console.log(response);
    //console.log(response.tenants[0].roles[0]);
    localStorage.setItem("roles", JSON.stringify(response.tenants[0].roles[0])); //saves client's data into localStorage:
    //response.tenants[0].tenant.id);
    localStorage.setItem(
      "tenantId",
      JSON.stringify(response.tenants[0].tenant.id)
    ); //saves client's data into localStorage:
    localStorage.setItem("id", JSON.stringify(response.id)); //saves client's data into localStorage:
    localStorage.setItem("status", JSON.stringify(response.tenants[0].status)); //saves client's data into localStorage:
    localStorage.setItem("email", JSON.stringify(response.email));
  }

  async function resetSenha() {
    setLoading(true)
    const data = await api.get("user/" + id).then((response) => {
      update(response.data)
      return response.data;
    });
    console.log(data)

    async function update(data: any) {
      if (data) {
        data.password = senha
        const response = await axios.put(`${ip}:8157/api/auth/password-reset/`, {
          token: id,
          password: senha
        }).then((response) => {
          setLoading(false)
          return response.data;
        }).catch(error => {
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
                  src={"https://contribua.org/mb-static/images/loading.gif"}
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
