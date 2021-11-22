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
import upload from "../../../assets/images/upload.svg";
import Header from "../../../components/Header";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import MenuEmpresa from "../../../components/MenuEmpresa";
import { toast } from 'react-toastify';

export default function NewProd() {
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

  function messageCancel() {
    toast.error('Ah, que pena. o seu produto não foi cadastrado na plataforma :(')
    setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu pedido. Ele será revisado e logo estará na plataforma :)')
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
        <ContentNew>
          <h2>Meus produtos</h2>
          <p onClick={openModal}>Adicionar</p>
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
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
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle className="prodAwait">
            <img src={prodfour} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
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
              <img src={upload} alt="" />
              <h3>Novo produto</h3>

              <ContentFormNew>
                <label htmlFor="">Nome do produto</label>
                <input type="text" placeholder="Nome do produto" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Código da empresa</label>
                <input type="text" placeholder="Código da empresa" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Descrição</label>
                <input type="text" placeholder="Descrição" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Especificações técnicas</label>
                <input type="text" placeholder="Especificações técnicas" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Preço</label>
                <input type="text" placeholder="Preço" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Categoria</label>
                <select>
                  <option value="">Prato</option>
                  <option value="">Janelas</option>
                  <option value="">Madeiras</option>
                </select>
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Cores disponíveis</label>
                <select>
                  <option value="">Verde</option>
                  <option value="">Preto</option>
                  <option value="">Amarelo</option>
                </select>
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Unidades de medida</label>
                <input type="text" placeholder="Unidades de medida" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Prazo de entrega</label>
                <input type="text" placeholder="Prazo de entrega" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Quantidade por embalagem</label>
                <input type="text" placeholder="Quantidade por embalagem" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Peso líquido</label>
                <input type="text" placeholder="Peso líquido" />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Peso bruto</label>
                <input type="text" placeholder="Peso bruto" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Tipo de frete</label>
                <select>
                  <option value="">Sedex</option>
                  <option value="">A combinar</option>
                  <option value="">Retirar</option>
                </select>
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
