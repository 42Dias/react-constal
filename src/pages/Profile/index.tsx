import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import { api } from "../../services/api";
import { Menu } from "../../components/Menu";
import upload from "../../assets/images/upload.svg";


export default function Profile() {
  function messageCancel() {
    toast.error('Ah, que pena. Não conseguimos adicionar o seu endereço na plataforma :(')
    setShowModal1(false);
    setShowModal2(false);  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu endereço. :)')
    setShowModal1(false);
    setShowModal2(false);
  }
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  function criarOuAtualizarEmpresa() {
    toast.info('Eba, estamos cada dia mais perto da morte! :)')
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
      }
    }

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
  }

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
  const [imagemUser, setimagemUser]=useState('');

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
  const [pix, setNewPix] = useState('')







  let role = localStorage.getItem("roles")?.replace(/"/g, "");
  
  useEffect(() => {
    async function loadUser() {
      //Perfil pessoa
      if(role === "pessoa"){
      const response = await api.get('pessoa-fisica-perfil')
      .then(response => {
          return response.data;            
      })

      setEmail(response.user.email);
      setFullName(response.nome);
      setCPF(response.cpf);
      setPhone(response.telefone);
      setLogradouro(response.logradouro+", "+response.numero);
      setBairro(response.bairro);
      setCEP(response.cep)
      setCidade(response.cidade);
      setEstado(response.estado);
      if(response.fotos !== undefined){
        setimagemUser(response.avatars);
      }else{
        setimagemUser("https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png");
      }
      console.log("avatars");
      console.log(imagemUser);
      console.log(response);
    }
    //Perfil empresa
    else if(role === "empresa"){
      const response = await api.get('empresa-perfil')
      .then(response => {
          return response.data;            
      })

      setEmail(response.email);
      setFullName(response.nome);
      setCPF(response.cpf);
      setPhone(response.telefone);
      setLogradouro(response.logradouro+", "+response.numero);
      setBairro(response.bairro);
      setCEP(response.cep)
      setCidade(response.cidade);
      setEstado(response.estado);
      if(response.avatars !== undefined){
        setimagemUser(response.avatars);
      }else{
        setimagemUser("https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png");
      }
      console.log("avatars");
      console.log(imagemUser);
      console.log("response");
      console.log(response.rows);
    }
    //Perfil Admin
    else{
      let id = localStorage.getItem("id")?.replace(/"/g, "");
      const response = await api.get('user/'+id)
      .then(response => {
          return response.data;            
      })

      setEmail(response.email);
      setFullName(response.fullName);
      setCPF(response.cpf);
      setPhone(response.telefone);
      setLogradouro(response.logradouro+", "+response.numero);
      setBairro(response.bairro);
      setCEP(response.cep)
      setCidade(response.cidade);
      setEstado(response.estado);
      console.log("response.avatars[0]");
      console.log(response.avatars[0]);
      if(response.avatars !== undefined && response.avatars[0] !== undefined){
        setimagemUser(response.avatars);
      }else{
        setimagemUser("https://www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png");
      }
      console.log("avatars");
      console.log(imagemUser);
      console.log("response");
      console.log(response.rows);
    }
      
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
      <Menu />
      <div className="container">
        <Title>Meus dados</Title>
        
        <CardProfile>
          <img src={imagemUser} alt="profile" width={300}/>

          <CardDatas>
            <h3>{fullName}</h3>
            <span>{cpf}</span>
            <p>{phone}</p>
            <p>{email}</p>
          </CardDatas>
          
        </CardProfile>

        <CardDatails>
          <h2>Dados da conta</h2>
          <button onClick={
            () => {setShowModal2(true)}
            }>Alterar Dados</button>
            <ModalContainerVendedor>
      <Modal
        isOpen={showModal2}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setShowModal2(false)}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={
                () => setShowModal2(false)} />
            </ModalFlex>

            <ModalContent>
              <img src={upload} alt="" />
              <h3>Alterar dados</h3>
              {
                role == 'empresa'? (
                  <>
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
                  </>
                ):(
                  <ContentFormNew>
                  <label htmlFor="">Novo Nome</label>
                  <input type="text" placeholder="Seu novo nome"
                  onChange={(text) => setNewNome(text.target.value)}
                  />
                </ContentFormNew>
                )
              }
              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={criarOuAtualizarEmpresa}>Adicionar</button>
              </div>
            </ModalContent>
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
          <CardDatailsContent className="adress">
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
          <button onClick={
            () => {setShowModal1(true)}
            }>Novo endereço</button>
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


