import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mastercard from "../../assets/images/master-card.svg";
import visa from "../../assets/images/visa.svg";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CardProfile,
  CardDatas,
  Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
  ContentFormNew,
} from "./styles";
import { Link } from "react-router-dom";
import { api, idPessoa, ip, role, token } from "../../services/api";
import { Menu } from "../../components/Menu";
import upload from "../../assets/images/upload.svg";
import axios from "axios";

export default function Profile() {
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCPF] = useState("");
  const [phone, setPhone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [imagemUser, setimagemUser] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [newNome, setNewNome] = useState("");
  const [newTelefone, setNewTelefone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newCep, setNewCep] = useState("");
  const [newLogradouro, setNewLogradouro] = useState("");
  const [newNumero, setNewNumero] = useState("");
  const [newComplemento, setNewComplemento] = useState("");
  const [newPontoReferencia, setNewPontoReferencia] = useState("");
  const [newCidade, setNewCidade] = useState("");
  const [newEstado, setNewEstado] = useState("");
  const [newBairro, setNewBairro] = useState("");

  async function loadUser() {
    if (!token){
      //window.location.reload()
    }
    const response = await axios({
      method: "get",
      url: `http://${ip}:8157/api/auth/me`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      timeout: 50000,
    }).then((response) => {
      loadPerfil()
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
  }
  
    async function loadPerfil() {
      setId(localStorage.getItem("id")?.replace(/"/g, "") || "");
      //Perfil pessoa
      if (role === "pessoa") {
        const response = await api
          .get("pessoa-fisica-perfil")
          .then((response) => {
            console.log("response");
            console.log(response.data);
            return response.data;
          });
        console.log(response);
        localStorage.setItem("idPessoa", JSON.stringify(response.id));
        setEmail(response.user.email);
        setFullName(response.nome);
        setCPF(response.cpf);
        setPhone(response.telefone);
        setLogradouro(response.logradouro + ", " + response.numero);
        setNewNumero(response.numero);
        setBairro(response.bairro);
        setCEP(response.cep);
        setCidade(response.cidade);
        setEstado(response.estado);
        if (response.fotos !== undefined) {
          setimagemUser(response.avatars);
        } else {
          setimagemUser(
            "https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png"
          );
        }
        //console.log("avatars");
        //console.log(imagemUser);
        //console.log(response);
      }
      //Perfil empresa
      else if (role === "empresa") {
        const response = await api.get("empresa-perfil").then((response) => {
          return response.data;
        });

        setEmail(response.email);
        setFullName(response.nome);
        setCPF(response.cpf);
        setPhone(response.telefone);
        setLogradouro(response.logradouro + ", " + response.numero);
        setBairro(response.bairro);
        setCEP(response.cep);
        setCidade(response.cidade);
        setEstado(response.estado);
        if (response.avatars !== undefined) {
          setimagemUser(response.avatars);
        } else {
          setimagemUser(
            "https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png"
          );
        }
        //console.log("avatars");
        //console.log(imagemUser);
        //console.log("response");
        //console.log(response.rows);
      }
      //Perfil Admin
      else {
        let id = localStorage.getItem("id")?.replace(/"/g, "");
        const response = await api.get("user/" + id).then((response) => {
          return response.data;
        });

        setEmail(response.email);
        setFullName(response.fullName);
        setCPF(response.cpf);
        setPhone(response.telefone);
        setLogradouro(response.logradouro + ", " + response.numero);
        setBairro(response.bairro);
        setCEP(response.cep);
        setCidade(response.cidade);
        setEstado(response.estado);
        //console.log("response.avatars[0]");
        //console.log(response.avatars[0]);
        if (
          response.avatars !== undefined &&
          response.avatars[0] !== undefined
        ) {
          setimagemUser(response.avatars);
        } else {
          setimagemUser(
            "https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png"
          );
        }
        //console.log("avatars");
        //console.log(imagemUser);
        //console.log("response");
        //console.log(response.rows);
      }
    }

  function messageCancel() {
    toast.error(
      "Ah, que pena. Não conseguimos adicionar o seu endereço na plataforma :("
    );
    setShowModal1(false);
    setShowModal2(false);
  }

  function messageApprove() {
    toast.info("Eba, recebemos o seu endereço. :)");
    setShowModal1(false);
    setShowModal2(false);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
  }
  function closeModalResetSenha() {
    setShowModalResetSenha(false);
  }

  useEffect(() => {
    const hash = window.location.hash.replace('http://dev.42dias.com.br/Clientes/constal/#/', '');
    console.log(hash)
    if(hash){
      
      var token = hash.replace('#/meu-perfil/', '');
      console.log(token)
      if(token){
      localStorage.setItem("token", JSON.stringify(token));
      loadUser()
      }
    }
    
  }, []);

  function clientLocalStorage() {
    // getting stored value

    const savedData: string[] = JSON.parse(
      localStorage.getItem("clientDataFromLocalStorage") || "{}"
    );
    //console.log(savedData);

    return savedData;
  }

  async function setNewData() {
    const data = {
      data: {
        user: id,
        email: email,
        password: password,
        nome: fullName,
        cpf: cpf,
        phone: phone,
        logradouro: logradouro,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        imagemUser: imagemUser,
        numero: newNumero,
        complemento: newComplemento,
        pontoReferencia: newPontoReferencia,
      },
    };
    if (email) {
      //console.log("MAOI");
      const updatePersonalData = await api.put('pessoa-fisica/' +  idPessoa, data)
      // console.log(updatePersonalData)
    } else {
      //console.log("hehe");
      //console.log(data);
      data.data.email = localStorage.getItem("email") || "";
      data.data.password = localStorage.getItem("senha") || "";

      const createPersonalData = await api.post("pessoa-fisica/", data);
      //createPersonalData);
    }
    messageApprove();
  }

  const [savedData] = useState([]);

  //console.log(savedData);

  clientLocalStorage();

  async function resetSenha(){
    setLoading(true)
    const data = await api.get("user/" + id).then((response) => {
      update(response.data)
      return response.data;
    });
    console.log(data)
    
    async function update(data:any){
      if(data){
        data.password = senha
      const response = await axios.put(`http://${ip}:8157/api/auth/password-reset/`, {
        token: id,
        password: senha
      }).then((response) => {
        setLoading(false)
        return response.data;
      }).catch(error =>{
        toast.error("Link de redefinição de senha inválido ou expirado")
        setLoading(false)
      })
    }
  }
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <Title>Meus dados</Title>

        <CardProfile>
          <img src={imagemUser} alt="profile" width={300} />

          <CardDatas>
            <h3>{fullName}</h3>
            <span>{cpf}</span>
            <p>{phone}</p>
            <p>{email}</p>
          </CardDatas>
        </CardProfile>



        <Link to={"/historico-de-pedidos"}>
          Historico de compras
        </Link>

        <CardDatails>
          <h2>Dados da conta</h2>
          <button
            onClick={() => {
              setShowModal1(true);
            }}
          >
            Alterar Dados
          </button>
        </CardDatails>

        <ModalContainerVendedor>
          <Modal
            isOpen={showModal2}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setShowModal2(false)}
          >
            <div>
              <ModalFlex>
                <AiOutlineClose onClick={() => setShowModal2(false)} />
              </ModalFlex>

              <ModalContent>
                <img src={upload} alt="" />
                <h3>Alterar dados</h3>
                {
                  <ContentFormNew>
                    <label htmlFor="">Novo Nome</label>
                    <input
                      type="text"
                      placeholder="Seu novo nome"
                      onChange={(text) => setNewNome(text.target.value)}
                    />
                  </ContentFormNew>
                }
              </ModalContent>

              <div className="buttonsNew">
                <button
                  style={{ display: "none" }}
                  type="button"
                  onClick={messageCancel}
                >
                  Cancelar
                </button>
                <button type="button" onClick={messageApprove}>
                  Adicionar
                </button>
              </div>
            </div>
          </Modal>
        </ModalContainerVendedor>

        <CardDatailsContent>
          <ContentDetails>
            <span>Login:</span>
            <p>{email}</p>
          </ContentDetails>
        </CardDatailsContent>

        <CardDatailsContent>
          <ContentDetails>
            <span>Senha:</span>
            <p>******</p>
          </ContentDetails>
          <button onClick={() => setShowModalResetSenha(true)}>Alterar</button>
        </CardDatailsContent>

        <CardDatails>
          <h2>Cartões</h2>
          <CardDatailsContent>
            <ContentDetails>
              <img src={mastercard} alt="" />
              <p>
                Final em XXXX <br /> Banco <br /> Vencimento{" "}
              </p>
            </ContentDetails>
            <button>Excluir</button>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={visa} alt="" />
              <p>
                Final em XXXX <br /> Banco <br /> Vencimento{" "}
              </p>
            </ContentDetails>
            <button>Excluir</button>
          </CardDatailsContent>
        </CardDatails>

        <CardDatails>
          <h2>Endereço</h2>
          <CardDatailsContent className="adress">
            <ContentDetails>
              <small>
                Endereço: {logradouro} <br />
                Bairro: {bairro} <br />
                CEP: {cep} <br />
                Cidade: {cidade + " - " + estado}
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <button>Alterar</button>
              <button>Excluir</button>
            </div>
          </CardDatailsContent>
          <button
            onClick={() => {
              setShowModal1(true);
            }}
          >
            Novo endereço
          </button>
        </CardDatails>
      </div>
      <Footer />

      <ModalContainerVendedor>
        <Modal
          isOpen={showModal1}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Novo endereço</h3>
              <ContentFormNew>
                <label htmlFor="">Nome Completo</label>
                <input
                  type="nome"
                  placeholder="Email"
                  value={fullName}
                  onChange={(text) => setFullName(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">CPF</label>
                <input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(text) => setCPF(text.target.value)}
                />
              </ContentFormNew>

              {/*<ContentFormNew>
                <label htmlFor="">bairro</label>
                <input
                  type="text"
                  placeholder="bairro"
                  onChange={(text) => setBairro(text.target.value)}
                />
              </ContentFormNew>*/}

              <ContentFormNew>
                <label htmlFor="">Bairro</label>
                <input
                  type="text"
                  placeholder="bairro"
                  value={bairro}
                  onChange={(text) => setBairro(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">CEP</label>
                <input
                  type="cep"
                  placeholder="CEP"
                  value={cep}
                  onChange={(text) => setCEP(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Rua</label>
                <input
                  type="text"
                  placeholder="Rua"
                  value={logradouro}
                  onChange={(text) => setLogradouro(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Número</label>
                <input
                  type="number"
                  placeholder="Número"
                  value={newNumero}
                  onChange={(text) => setNewNumero(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Complemento</label>
                <input
                  type="text"
                  placeholder="Complemento"
                  onChange={(text) => setNewComplemento(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Referência</label>
                <input
                  type="text"
                  placeholder="Referência"
                  onChange={(text) => setNewPontoReferencia(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Estado</label>
                <input
                  type="text"
                  placeholder="Estado"
                  value={estado}
                  onChange={(text) => setEstado(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Cidade</label>
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(text) => setCidade(text.target.value)}
                />
              </ContentFormNew>

              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>
                  Cancelar
                </button>
                <button type="button" onClick={setNewData}>
                  Adicionar
                </button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>

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
            ) :false}
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
