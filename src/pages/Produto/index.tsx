import { useState } from "react";
import {
  DetailsProdFirts,
  ContainerProd,
  BoxProd,
  IconsContentStar,
  BoxColors,
  ColorWhite,
  ColorBlack,
  ColorRed,
  AddCartRight,
  BoxProdFirts,
  FlexBtnsProd,
  IconPlusMinus,
  ProdSecond,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
  SelectAdress,
  ProdCaracteristicas,
} from "./styles";
import prod from "../../assets/images/prodfav.png";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import React from "react";
import MenuCliente from "../../components/MenuCliente";
import Header from "../../components/Header";
import { toast } from "react-toastify";

interface RepositoryItemProps {
  repository: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
  };
}

export default function Produto(props: RepositoryItemProps) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [counter, setCounter] = useState(0);

  function error() {
    toast("Não é possível adicionar menos que 0 ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function increment() {
    setCounter(counter + 1);
  }

  function withdraw() {
    if (counter < 1) {
      setCounter(0);
      error();
    } else {
      setCounter(counter - 1);
    }
  }
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <MenuCliente />
      <div className="container">
        <ContainerProd>
          <img src={prod} alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                <span>Nome da marca</span>
                <strong>Fone</strong>
                <span>Código do produto</span>
                <IconsContentStar>
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <small>(1)</small>
                </IconsContentStar>
                <br />
                <strong>R$ 89,99</strong>
                <span>Variantes (ex: Cor)</span>
                <BoxColors>
                  <ColorWhite />
                  <ColorBlack />
                  <ColorRed />
                </BoxColors>
                <a className="vendedor" onClick={openModal}>
                  Opções de frete
                </a>
              </BoxProdFirts>

              <AddCartRight>
                <FlexBtnsProd>
                  <IconPlusMinus onClick={increment}>
                    <FiPlus />
                  </IconPlusMinus>
                  <h3>{counter}</h3>
                  <IconPlusMinus onClick={withdraw}>
                    <FiMinus />
                  </IconPlusMinus>
                </FlexBtnsProd>
                <Link to="#">Adicionar</Link>
              </AddCartRight>
            </BoxProd>

            <BoxProd>
              <div className="oi">
                <strong>Descrição do produto</strong>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>

        <ProdCaracteristicas>
          <div>
            <h2>Características Técnicas</h2>
            <span>
              <b>Peso do Produto:</b> 12 Kg
            </span>
            <span>
              <b>Quantidade de Lugares:</b> 6 lugares
            </span>
            <span>
              <b>Formato:</b> Retangular
            </span>
            <span>
              <b>Material do Tampo da Mesa:</b> Plástico
            </span>
            <span>
              <b>Tipo de Material do Tampo da Mesa:</b> Polipropileno
            </span>

            <span>
              <b>Material da Estrutura da Mesa:</b> Plástico
            </span>
            <span>
              <b>Tipo de Material da Estrutura da Mesa:</b> Polipropileno
            </span>
            <span>
              <b>Mesa Dobrável:</b> Sim
            </span>
            <span>
              <b>Furo para Ombrelone:</b> Não
            </span>
            <span>
              <b>Dimensão da Mesa (AxLxC):</b> 74x75x180cm
            </span>
          </div>
        </ProdCaracteristicas>

        <ProdSecond>
          <div>
            <h2>Nome do cliente</h2>
            <span>Posso pedir para embrulhar para presente?</span>
          </div>

          <Link to="#">Responder</Link>
        </ProdSecond>
      </div>

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
              <h3>Opções de frete e retirada</h3>
              <p>Calculamos os custos e prazos para este endereço:</p>

              <SelectAdress>
                <div>
                  <strong>Rua XXXXXX XXXX XX XXXX, 55</strong>
                  <br />
                  <span>CEP: XXXX - SP</span>
                </div>
                <div>
                  <small>Selecione outro endereço</small>
                </div>
              </SelectAdress>

              <h3>Receber compra</h3>
              <p>Chegará Quarta em seu endereço</p>

              <h3>Retirar compra</h3>

              <p>Retire a partir de Quarta em uma agência dos correios</p>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
