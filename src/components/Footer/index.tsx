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
import { api, apiWithoutToken } from "../../services/api";
import { ModalContainerText, ModalContainerVendedor, ModalFlex } from "../../pages/Dashboard/NewProd/styles";
import { AiOutlineClose } from "react-icons/ai";

export default function Footer() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsOpen1(false);
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
    apiWithoutToken.get('informacoes').then(
      (res) => {
        let data = res.data.record[0]
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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <>
      <FooterContent className="footer">
        <div className="container">
          <GridFooter>
            <div>
              <img src={logo} alt="Constal" />
              <br />

              {/* <p>
                {sobre}
              </p> */}
              {sobre.trim() != '' ?(
                <h4
                style={{ cursor: "pointer", margin: '0 auto' }} onClick={() => setIsOpen1(true)}
                >
                  <br />
                  Sobre a Constal
                </h4>
              ):false}
            </div>

            <div>
              {
              seguranca?(
              <>
                <h4>Ajuda</h4>
                <p style={{ cursor: "pointer" }} onClick={() => setIsOpen(true)}>
                <br />
                  Segurança e Privacidade
                </p>
              </>
              ):false
              }
              <p>
                <br />
                {
                telefone?(`Contato: ${telefone}`): false
                }
                <br />
              </p>
            </div>
            <div>
                {logradouro && numero ? (
                  <>
                    <h4>Endereço</h4>
                    <p>
                    <br />
                        {logradouro}, nº {numero} - {complemento}, {bairro}. {cidade}/{estado}
                    </p>
                  </>
                  ):false
                  }
              <p>
                {CNPJ?(`CNPJ: ${CNPJ}`):false} <br />
                { CEP?(`CEP: ${CEP}`  ):false} <br />
              </p>
            </div>
          </GridFooter>
          {direitos?(
            <h5>
                <br />              
                <br />
              Todos os direitos reservados a {direitos}</h5>
          ):false}
        </div>
      </FooterContent>

      <ModalContainerVendedor>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => {
              setIsOpen(false)
            }}
          >
            <div>
              <ModalFlex>
                <AiOutlineClose onClick={() => closeModal()} />
              </ModalFlex>

            {/* <ModalContainer> */}
              <ModalContainerText>
                
                <h2>Segurança e Privacidade</h2>
                <br />
                <p>
                  {`${seguranca}`}
                </p>
                            {/* </ModalContainer> */}
              </ModalContainerText>
      </div>
      </Modal>
      </ModalContainerVendedor>

      <ModalContainerVendedor>
          <Modal
            isOpen={modalIsOpen1}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => {
              setIsOpen1(false)
            }}
          >
            <div>
              <ModalFlex>
                <AiOutlineClose onClick={() => closeModal()} />
              </ModalFlex>

            {/* <ModalContainer> */}
              <ModalContainerText>
              <h2>Sobre a Constal</h2>
              <br />
              <p>
                {`${sobre}`}
              </p>
                            {/* </ModalContainer> */}
              </ModalContainerText>
      </div>
      </Modal>
      </ModalContainerVendedor>
      
    </>
  );
}
