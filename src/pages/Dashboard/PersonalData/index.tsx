// import React from "react";
// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api } from "../../../services/api";
import { ModalContent } from "../../Produto/styles";
import { ModalContainerVendedor } from "../../Profile/styles";
import { ContentFormNew } from "../NewProd/styles";
import { ModalFlex } from "../Promotions/styles";
import Modal from "react-modal";
import {
  // CardProfile,
  // CardDatas,
  // Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
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
        async function loadData(){          
          const response = await api.get('empresa-perfil')
          .then(response => {
              console.log(response.data)
              return response.data;            
          })

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
            <Link to="">Alterar</Link>
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

        <button onClick={
            () => {setShowModal1(true)}
            }>Alterar Dados</button>

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
              <button //estava como link
              onClick={
                () => setShowModal2(true)}
              >Alterar</button>
              <button //estava como link
              onClick={
                () => setShowModal2(false)}
              >Cancelar</button>
            </div>
          </CardDatailsContent>
          <button
          onClick={
            () => setShowModal2(true)
          }>Novo endereço</button>
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
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewNome(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Nome da Marca</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewMarca(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Nome da Razão Social</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewRazaoSocial(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Novo Telefone</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewTelefone(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo CNPJ</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewCnpj(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Ramal</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewRamal(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo Ramal</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewRamal(text.target.value)}
                    />
                    </ContentFormNew>
                    
                    <ContentFormNew>
                    <label htmlFor="">Novo setNewEmail</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewEmail(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewWebsite</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewWebsite(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewCep</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewCep(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewLogradouro</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewLogradouro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewNumero</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewNumero(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewComplemento</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewComplemento(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewPontoReferencia</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewPontoReferencia(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewCidade</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewCidade(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewEstado</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewEstado(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewBairro</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewBairro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Novo setNewPix</label>
                    <input type="text" placeholder="Seu novo nome"
                    onChange={(text) => setNewPix(text.target.value)}
                    />
                    </ContentFormNew>
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

              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={messageApprove}>Adicionar</button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>

    </>
  );
}
