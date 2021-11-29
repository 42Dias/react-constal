import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import user from "../../assets/images/user-profile.png";
import mastercard from "../../assets/images/master-card.svg";
import visa from "../../assets/images/visa.svg";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

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
import MenuEmpresa from "../../components/MenuEmpresa";
import { api } from "../../services/api";
import axios from "axios";


export default function Profile() {
  function messageCancel() {
    toast.error('Ah, que pena. Não conseguimos adicionar o seu endereço na plataforma :(')
    setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu endereço. :)')
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  let token = localStorage.getItem("token")?.replace(/"/g, "");
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [fullName, setFullName]=useState('');
  const [cpf, setCPF]=useState('');
  const [phone, setPhone]=useState('');
  const [logradouro, setLogradouro]=useState('');
  const [bairro, setBairro]=useState('');
  const [cep, setCEP]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');

  useEffect(() => {
    async function loadUser() {
      const response = await api.get('/tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/pessoa-fisica-perfil')
      .then(response => {
          return response.data;            
      })
      //
      setEmail(response.user.email);
      setFullName(response.nome);
      setCPF(response.cpf);
      setPhone(response.telefone);
      setLogradouro(response.logradouro+", "+response.numero);
      setBairro(response.bairro);
      setCEP(response.cep)
      setCidade(response.cidade);
      setEstado(response.estado);
      console.log(response);
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
            <h3>{fullName}</h3>
            <span>{cpf}</span>
            <p>{phone}</p>
            <p>{email}</p>
          </CardDatas>
          
        </CardProfile>

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
              <img src={visa} alt="" width = {10}/>
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
                Endereço: {logradouro} <br />
                Bairro: {bairro} <br />
                CEP: {cep} <br />
                Cidade: {cidade+" - "+estado}
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Alterar</Link>
              <Link to="">Excluir</Link>
            </div>
          </CardDatailsContent>
          <span onClick={openModal}>Novo endereço</span>
        </CardDatails>
      </div>
      <Footer />

      <ModalContainerVendedor>
        <Modal
          isOpen={modalIsOpen}
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


