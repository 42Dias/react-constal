// import React from "react";
// import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api } from "../../../services/api";
import {
  // CardProfile,
  // CardDatas,
  // Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
} from "./styles";

export default function PersonalData() {
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
