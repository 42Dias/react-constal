// import {  } from "./styles";
import React from "react";
import Modal from "react-modal";
import {
  GridProdsFour,
  ProdContainerSingle,
  ContentNew,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
  ContentFormNew,
} from "./styles";
import prodone from "../../../assets/images/prodone.png";
import prodtwo from "../../../assets/images/prodtwo.png";
import prodthree from "../../../assets/images/prodthree.png";
import prodfour from "../../../assets/images/prodfour.png";
import Header from "../../../components/Header";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { Menu } from "../../../components/Menu";

export default function Promotions() {
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
      <Header />
      <Menu />
      <div className="container">
        <ContentNew>
          <h2>Promoções</h2>
        </ContentNew>

        <GridProdsFour>
          <ProdContainerSingle>
            <img src={prodone} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodtwo} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodthree} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodfour} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodone} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodtwo} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodthree} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <img src={prodfour} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div onClick={openModal} className="btn-more">
                <FiCheck />
              </div>
            </div>
          </ProdContainerSingle>
        </GridProdsFour>
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
              <h3>Novo produto</h3>
              <ContentFormNew>
                <label htmlFor="">Preço atual</label>
                <input type="text" placeholder="R$ 63,33" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Novo preço</label>
                <input type="text" placeholder="R$" />
              </ContentFormNew>
              <div className="buttonsNew">
                <a href="">Cancelar</a>
                <a href="">Adicionar</a>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
