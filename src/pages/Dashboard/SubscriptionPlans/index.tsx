import React from 'react';
import Header from "../../../components/Header"
import MenuAdm from "../../../components/MenuAdm"
import { FiTrash2, FiCheck } from "react-icons/fi";
import * as S from './Signature.styled'
import { toast } from 'react-toastify';
import Modal from "react-modal";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";



export default function SubscriptionPlans() {
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
    toast.error('Ah, que pena. o seu produto não foi cadastrado na plataforma. Revise algumas informações :(')
    setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu pedido. Ele será revisado e logo estará na plataforma :)')
    setIsOpen(false);
  }

  function improvements() {
    toast.info('Melhore a qualidade das fotos')
    setIsOpen(false);
  }
  return (
    <>
      <Header />
      <MenuAdm />
      <S.Container>
        <S.ContentTitle>
          <S.Title>Planos de cobrança da plataforma</S.Title>
          <button type="button" onClick={openModal}>Novo plano</button>
        </S.ContentTitle>
        <S.Cards>
          <S.Card>
            <h3>Profissional</h3>
            <p>Perfeito para sua empresa alcançar mais clientes</p>
            <strong>R$ 99,99</strong>
            <span>/mês</span>
            <small>*4% do lucro de cada produto retorna para a plataforma</small>
            <div>
              <FiCheck />
              <p>Comissionamento</p>
            </div>
            <div>
              <FiCheck />
              <p>Beneficio</p>
            </div>
            <button type="button">Adquirir</button>

            <FiTrash2  className="trash" />
          </S.Card>
          <S.Card>
            <h3>Premium</h3>
            <p>Perfeito para sua empresa alavancar ainda mais produtos</p>
            <strong>R$ 179,99</strong>
            <span>/mês</span>
            <small>*3% do lucro de cada produto retorna para a plataforma</small>

            <div>
              <FiCheck />
              <p>Comissionamento</p>
            </div>
            <div>
              <FiCheck />
              <p>Beneficio</p>
            </div>
            <div>
              <FiCheck />
              <p>Beneficio</p>
            </div>

            <button type="button">Adquirir</button>

            <FiTrash2 className="trash" />
          </S.Card>
          <S.Card>
            <h3>Free</h3>
            <p>Para você que só está dando uma olhadinha em nossa plataforma</p>
            <strong>R$ 00,00</strong>
            <span>/mês</span>
            <button type="button">Adquirir</button>

            <FiTrash2 className="trash" />
          </S.Card>
        </S.Cards>
      </S.Container>

      <S.ModalContainerVendedor>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <S.ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </S.ModalFlex>

            <S.ModalContent>
              <h3>Novo produto</h3>

              <S.ContentFormNew>
                <label htmlFor="">Nome do plano*</label>
                <input type="text" placeholder="Nome do plano*" />
              </S.ContentFormNew>

              <S.ContentFormNew>
                <label htmlFor="">Descrição*</label>
                <input type="text" placeholder="Descrição*" />
              </S.ContentFormNew>

              <S.ContentFormNew>
                <label htmlFor="">Validações*</label>
                <input type="text" placeholder="Validações*" />
              </S.ContentFormNew>

              <S.ContentFormNew>
                <label htmlFor="">Valor*</label>
                <input type="text" placeholder="Valor*" />
              </S.ContentFormNew>

              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={messageApprove}>Adicionar</button>
              </div>
            </S.ModalContent>
          </div>
        </Modal>
      </S.ModalContainerVendedor>
    </>
  )
}