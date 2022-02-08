import {
  FooterContent,
  GridFooter,
  ModalContainer,
  ModalEnter,
} from "./styles";
import logo from "../../assets/images/logo.png";
import Modal from "react-modal";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { api } from "../../services/api";

export default function Footer() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [telefone, setTelefone] = useState<any>("");
  const [seguranca, setSeguranca] = useState<any>("");
  const [logradouro, setLogradouro] = useState<any>("");
  const [bairro, setBairro] = useState<any>("");
  const [CNPJ, setCNPJ] = useState<any>("");
  const [CEP, setCEP] = useState<any>("");
  const [sobre, setSobre] = useState<any>("");
  const [direitos, setDireitos] = useState<any>("");
  const [numero, setNumero] = useState<any>('')
  const [cidade, setCidade] = useState<any>('')
  const [estado, setEstado] = useState<any>('')
  const [complemento, setComplemento] = useState<any>('')

  function loadInformations(){
    api.get('informacoes').then(
      (res) => {
        let data = res.data.record[0]
        console.log(data)
        setTelefone(data.telefone)
        setSeguranca(data.seguranca)
        setLogradouro(data.logradouro)
        setBairro(data.bairro)
        setCNPJ(data.cnpj)
        setCEP(data.cep)
        setSobre(data.sobre)
        setDireitos(data.direitos)
        setNumero(data.numero)
        setCidade(data.cidade)
        setEstado(data.estado)
        setComplemento(data.complemento)
      }
    )
  }

  useEffect(
    () => {
      loadInformations()
    }, []
  )


  return (
    <>
      <FooterContent className="footer">
        <div className="container">
          <GridFooter>
            <div>
              <img src={logo} alt="Constal" />
              <p>
                {sobre}
              </p>
            </div>

            <div>
              <h4>Ajuda</h4>
              <p style={{ cursor: "pointer" }} onClick={openModal}>
                Segurança e Privacidade
              </p>
              <p>Contato: {telefone}</p>
            </div>
            <div>
              <h4>Endereço</h4>
              <p>{logradouro}, nº {numero} - {complemento}, {bairro}. {cidade}/{estado}</p>
              <p>
                CNPJ: {CNPJ} <br />
                CEP: {CEP}
              </p>
            </div>
          </GridFooter>

          <h5>Todos os direitos reservados a {direitos}</h5>
        </div>
      </FooterContent>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {/* <ModalContainer> */}
          <ModalEnter>
            <h2>Segurança e Privacidade</h2>
            <FiX size={20} onClick={closeModal} />
          </ModalEnter>

          <p>
            {seguranca}
          </p>
        {/* </ModalContainer> */}
      </Modal>
    </>
  );
}
