// import React from "react";
// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api, ip, role } from "../../../services/api";
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

export default function PersonalData() {
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

  const [nome, setNome]=useState('');  
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

  const [newNome, setNewNome]=useState('');  
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

    useEffect(
      () => {
        if(role != 'admin' && role != "empresa"){
          // Simulate an HTTP redirect:
          window.location.replace(`http://${ip}:3000/constal#/erro`);
        }
    
        async function loadData(){          
          const responseRes = await api.get('empresa-perfil')
          const response = responseRes.data
          console.log(responseRes)

          setNome(response.nome)
          setMarca(response.marca)
          setRazaoSocial(response.razaoSocial)
          setCnpj(response.cnpj)
          setTelefone(response.telefone)
          setRamal(response.ramal)
          setEmail(response.email)
          setWebsite(response.website)
          setCep(response.cep)
          setLogradouro(response.logradouro)
          setNumero(response.numero)
          setComplemento(response.complemento)
          setPontoReferencia(response.pontoReferencia)
          setCidade(response.cidade)
          setEstado(response.estado)
          setBairro(response.bairro)
          setPix(response.pix)
      
        }
        loadData()
      }
      , []
    )

  async function criarOuAtualizarEmpresa() {
    const data = {
      data: {
        nome : newNome, 
        marca : newMarca,
        razaoSocial : newRazaoSocial,
        cnpj : newCnpj,
        telefone : newTelefone,
        ramal : newRamal,
        email : newEmail,
        website : newWebsite,
        cep : newCep,
        logradouro : newLogradouro,
        numero : newNumero,
        complemento : newComplemento,
        pontoReferencia : newPontoReferencia,
        cidade : newCidade,
        estado : newEstado,
        bairro : newBairro,
        pix : pix,
        status : "pendente",
      }
    }
    const response = await api.post('empresa-perfil', data)
    console.log(response)
    toast.info('Eba, estamos cada dia mais perto da morte! :)')
    closeModal()
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
              <span>Login:</span>
              <p>{email}</p>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Senha:</span>
              <p>******</p>
            </ContentDetails>
            <Btn
            >Alterar</Btn>
          </CardDatailsContent>
        </CardDatails>

        <CardDatails>
          <h2>{nome}</h2>
          <CardDatailsContent>
            <ContentDetails>
              <span>Marca: {marca}</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Razão Social: {razaoSocial}</span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>CNPJ: {cnpj} </span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Telefone: {telefone} </span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>E-mail: {email} </span>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <span>Website: {website} </span>
            </ContentDetails>
          </CardDatailsContent>
        </CardDatails>

      <Btn  onClick={
          () => {setShowModal1(true)}
          }>Alterar Dados</Btn>

        <CardDatails>
          <h2>Endereço</h2>
          <CardDatailsContent className="adress">
            <ContentDetails>
              <small>
                Logradouro: {logradouro} <br />
                Referência: {pontoReferencia} <br />
                CEP: {cep} <br />
                Cidade: {cidade}
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Btn //estava como link
              onClick={
                () => setShowModal2(true)}
              >Alterar</Btn>
              <Btn//estava como link
              onClick={
                () => setShowModal2(false)}
              >Cancelar</Btn>
            </div>
          </CardDatailsContent>
          <Btn
          onClick={
            () => setShowModal2(true)
          }>Novo endereço</Btn>
        </CardDatails>
      </div>




      {/* 
      ======================MODAIS======================
       */}
      <ModalContainerVendedor>
        {/* MODAL DE ALTERAR TUDO */}
          <Modal
            isOpen={showModal1}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setShowModal1(false)}
            >
              <div>
                <ModalFlex>
                  <AiOutlineClose onClick={
                    () => setShowModal1(false)} />
                </ModalFlex>
                <ModalContent>
                  <img  alt="" />
                  <h3>Alterar seus dados</h3>
                    <ContentFormNew>
                    <label htmlFor="">Novo Nome da Empresa</label>
                    <input type="text" placeholder="Novo Empresa"
                    onChange={(text) => setNewNome(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Nome da Marca</label>
                    <input type="text" placeholder="Razão Social"
                    onChange={(text) => setNewMarca(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Nome da Razão Social</label>
                    <input type="text" placeholder="Nova Razão Social"
                    onChange={(text) => setNewRazaoSocial(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Telefone</label>
                    <input type="text" placeholder="Novo Telefone"
                    onChange={(text) => setNewTelefone(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo CNPJ</label>
                    <input type="text" placeholder="Novo CNPJ"
                    onChange={(text) => setNewCnpj(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Ramal</label>
                    <input type="text" placeholder="Novo Ramal"
                    onChange={(text) => setNewRamal(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Email</label>
                    <input type="text" placeholder="Novo Email"
                    onChange={(text) => setNewEmail(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Website</label>
                    <input type="text" placeholder="Website"
                    onChange={(text) => setNewWebsite(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Cep</label>
                    <input type="text" placeholder="Cep"
                    onChange={(text) => setNewCep(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Logradouro</label>
                    <input type="text" placeholder="Logradouro"
                    onChange={(text) => setNewLogradouro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Numero</label>
                    <input type="text" placeholder="Numero"
                    onChange={(text) => setNewNumero(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Complemento</label>
                    <input type="text" placeholder="Complemento"
                    onChange={(text) => setNewComplemento(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo PontoReferencia</label>
                    <input type="text" placeholder="PontoReferencia"
                    onChange={(text) => setNewPontoReferencia(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Cidade</label>
                    <input type="text" placeholder="Cidade"
                    onChange={(text) => setNewCidade(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Estado</label>
                    <input type="text" placeholder="Estado"
                    onChange={(text) => setNewEstado(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Bairro</label>
                    <input type="text" placeholder="Bairro"
                    onChange={(text) => setNewBairro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Pix</label>
                    <input type="text" placeholder="Pix"
                    onChange={(text) => setNewPix(text.target.value)}
                    />
                    </ContentFormNew>
                    <NewBtn>
                      <button type="button" onClick={() => setShowModal1(false)}>Cancelar</button>
                      <button type="button" onClick={() => criarOuAtualizarEmpresa()}>Adicionar</button>
                    </NewBtn>
                </ModalContent>
              </div>
          </Modal>
        </ModalContainerVendedor>      

        <ModalContainerVendedor>
        <Modal
          isOpen={showModal2}
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
                <label htmlFor="">CEP</label>
                <input type="number" placeholder="CEP" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Rua</label>
                <input type="text" placeholder="Rua" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Número</label>
                <input type="number" placeholder="Número" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Complemento</label>
                <input type="text" placeholder="Complemento" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Referência</label>
                <input type="text" placeholder="Referência" />
              </ContentFormNew> 

              <ContentFormNew>
                <label htmlFor="">Estado</label>
                <input type="text" placeholder="Estado" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">UF</label>
                <input type="text" placeholder="Cidade" />
              </ContentFormNew>

              <NewBtn>
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={messageApprove}>Adicionar</button>
              </NewBtn>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>

    </>
  );
}
