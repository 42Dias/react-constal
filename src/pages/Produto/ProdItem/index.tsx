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
} from "./styles";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import React from "react";

interface RepositoryItemProps {
  repository: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
  };
}

export function RepositoryItem(props: RepositoryItemProps) {
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

  return (
    <>
      <div className="container">
        <ContainerProd>
          <img src={props.repository.image} alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                <span>Nome da marca</span>
                <strong>{props.repository.title}</strong>
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
                <strong>R$ {props.repository.price}</strong>
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
                  <IconPlusMinus>
                    <FiPlus />
                  </IconPlusMinus>
                  <h3>4</h3>
                  <IconPlusMinus>
                    <FiMinus />
                  </IconPlusMinus>
                </FlexBtnsProd>
                <Link to="#">Adicionar</Link>
              </AddCartRight>
            </BoxProd>

            <BoxProd>
              <div className="oi">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>

                <strong>Descrição técnica</strong>

                <span>
                  Marca: <br />
                  Modelo: <br />
                  Material: <br />
                  Características: <br />
                  Observações: <br />
                  Acabamento: <br />
                </span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>

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
