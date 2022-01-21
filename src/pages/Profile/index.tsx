import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import upload from "../../assets/images/upload.png";
import axios from "axios";
import { Field, Form, Formik } from "formik";

// @ts-ignore
import InputMask from "react-input-mask";


export default function Profile() {
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModalEnd, setShowModalEnd] = React.useState(false);
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [id, setId] = useState("");
  // const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCPF] = useState("");
  const [maskedCPF, setMaskedCPF] = useState("");
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
    }).then((response) => {
      loadPerfil()
      return response.data;
    });
    //console.log(response);
    //console.log(response.tenants[0].roles[0]);
    // let setRole = response.tenants[0].roles
    // const roleHelper = JSON.parse(setRole)
    // console.log(roleHelper[0])
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
      setMaskedCPF(formatarCpf(response.cpf));
      setPhone(response.telefone);
      setLogradouro(response.logradouro);
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
      setMaskedCPF(formatarCpf(response.cpf));
      setPhone(response.telefone);
      setLogradouro(response.logradouro);
      setNewNumero(response.numero)
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
      setMaskedCPF(formatarCpf(response.cpf));

      setPhone(response.telefone);
      setLogradouro(response.logradouro + ", ");
      setNewNumero(response.numero)
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
    /*toast.error(
      "Ah, que pena. Não conseguimos adicionar o seu endereço na plataforma :("
    );*/
    setShowModal1(false);
    setShowModal2(false);
    setShowModalEnd(false)
  }

  function messageApprove() {
    toast.info("Eba, recebemos o seu endereço. :)");
    setShowModal1(false);
    setShowModal2(false);
    setShowModalEnd(false)
    setLoading(false)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
    setShowModalEnd(false)
  }
  function closeModalResetSenha() {
    setShowModalResetSenha(false);
  }

  useEffect(() => {
    const hash = window.location.hash.replace('${ip}/#/errodias.com.br/Clientes/constal/#/', '');
    console.log(hash)
    if (hash) {

      var token = hash.replace('#/meu-perfil/', '');
      console.log(token)
      if (token) {
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
    setLoading(true)
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
      const updatePersonalData = await api.put('pessoa-fisica/' + idPessoa, data).then(
        (data) => {
          console.log(data)
          if(data.status == 200){
            toast.info("Dados Alterados com sucesso!")
          }
          else{
            toast.info("Erro, algo deu errado :(")
          }
        }
      )
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
  function onSubmitInput (values: any, actions: any) {
    // console.log(data)
    // Cadastro(data)
    console.log('SUBMIT', values)
  }

  function onBlurCep (ev: any, setFieldValue: any) {
    const { value } = ev.target

    const cep = value?.replace(/[^0-9]/g, '')

    if (cep?.length !== 8) {
      return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setLogradouro(data.logradouro)
        setBairro(data.bairro)
        setCidade(data.localidade)
        setEstado(data.uf)
      })
  }

  function formatarNumero(v: any){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }
  function formatarCpf(v: any){
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
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
            <span>{formatarCpf(cpf)}</span>
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
                    <label htmlFor="">Nome</label>
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
                <button 
                  type="button"
                 onClick={messageApprove}>
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
          <button onClick={() => setShowModalResetSenha(true)}>Alterar Senha</button>
        </CardDatailsContent>


        <CardDatails>
          <h2>Endereço</h2>
          <CardDatailsContent className="adress">
            <ContentDetails>
              <small>
                Endereço: {logradouro + ", " + newNumero} <br />
                Bairro: {bairro} <br />
                CEP: {cep} <br />
                Cidade: {cidade + " - " + estado}
              </small>
            </ContentDetails>

            <button onClick={() => {
              setShowModalEnd(true);
            }}>{logradouro ? 'Alterar' : 'Adicionar'}</button>
            {/*<button>Excluir</button>*/}

          </CardDatailsContent>
          {/*<button
            onClick={() => {
              setShowModal1(true);
            }}
          >
            Novo endereço
          </button>*/}
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
              <h3>Alterar Dados</h3>
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
                {/* <input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(text) => setCPF(text.target.value)}
                /> */}
                 <InputMask mask="999.999.999-99" 
                      value={maskedCPF} 

                      // 01.161.734/0001-15
                      onChange={
                        (e: any) => {
                          let cpf = e.target.value
                          console.log(
                            cpf.replace(/\D/g, '')
                            )
                          setCPF(
                            cpf.replace(/\D/g, '')
                          )
                          setMaskedCPF(e.target.value)
                          console.log(maskedCPF)
                        }
                      }/>
              </ContentFormNew>


              {loading ? <img width="40px" style={{ margin: 'auto' }} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
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
          isOpen={showModalEnd}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Alterar Endereço</h3>
              <Formik
                onSubmit={onSubmitInput}
                validateOnMount
                initialValues={{
                  cep: '',
                  logradouro: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  uf: '',
                }}
                render={({ isValid, setFieldValue }) => (
                  <Form>
                    
                    <ContentFormNew className='form-control-group'>
                      <label>Cep*</label>
                      <Field
                        required
                        value={cep}
                        name='cep' type='text'
                        onBlur={(ev: any) => onBlurCep(ev, setFieldValue)}
                        onChange={(text: any) => setCEP(text.target.value)}
                        />
                        
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Logradouro*</label>
                      <Field 
                      required
                      value={logradouro}
                      name='logradouro'
                      type='text'
                      onChange={(text: any) => setLogradouro(text.target.value)} />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Número*</label>
                      <Field 
                      required
                      value={newNumero}
                      name='numero' 
                      type='text'
                      onChange={(text: any) => setNewNumero(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Complemento</label>
                      <Field 
                      value={newComplemento}
                      name='complemento' 
                      type='text'
                      onChange={(text: any) => setNewComplemento(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Bairro*</label>
                      <Field 
                      required
                      value={bairro}
                      name='bairro' 
                      type='text'
                      onChange={(text: any) => setBairro(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Cidade*</label>
                      <Field 
                      required
                      value={cidade}
                      name='cidade' 
                      type='text'
                      onChange={(text: any) => setCidade(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Estado*</label>
                      <Field 
                      required
                      value={estado}
                      component='select' 
                      name='uf'
                      onChange={(text: any) => setEstado(text.target.value)}
                      >
                        <option value=''>Selecione o Estado</option>
                        <option value='AC'>Acre</option>
                        <option value='AL'>Alagoas</option>
                        <option value='AP'>Amapá</option>
                        <option value='AM'>Amazonas</option>
                        <option value='BA'>Bahia</option>
                        <option value='CE'>Ceará</option>
                        <option value='DF'>Distrito Federal</option>
                        <option value='ES'>Espírito Santo</option>
                        <option value='GO'>Goiás</option>
                        <option value='MA'>Maranhão</option>
                        <option value='MT'>Mato Grosso</option>
                        <option value='MS'>Mato Grosso do Sul</option>
                        <option value='MG'>Minas Gerais</option>
                        <option value='PA'>Pará</option>
                        <option value='PB'>Paraíba</option>
                        <option value='PR'>Paraná</option>
                        <option value='PE'>Pernambuco</option>
                        <option value='PI'>Piauí</option>
                        <option value='RJ'>Rio de Janeiro</option>
                        <option value='RN'>Rio Grande do Norte</option>
                        <option value='RS'>Rio Grande do Sul</option>
                        <option value='RO'>Rondônia</option>
                        <option value='RR'>Roraima</option>
                        <option value='SC'>Santa Catarina</option>
                        <option value='SP'>São Paulo</option>
                        <option value='SE'>Sergipe</option>
                        <option value='TO'>Tocantins</option>
                      </Field>
                    </ContentFormNew>
                  </Form>
                )}
              />
             
              {loading ? <img width="40px" style={{ margin: 'auto' }} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
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
