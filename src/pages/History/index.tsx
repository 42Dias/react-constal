import Header from "../../components/Header";
import Footer from "../../components/Footer";
import item from "../../assets/images/prodfav.png";
import { AiOutlineClose } from "react-icons/ai";
import {
  FooterContainer,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  Title,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
} from "./styles";
import Modal from "react-modal";
import React from "react";

export default function Histoty() {
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
      <div className="container">
        <CardDatails>
          <Title>Histórico</Title>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <strong onClick={openModal} >Ver detalhes</strong>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <strong onClick={openModal}>Ver detalhes</strong>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <strong onClick={openModal}>Ver detalhes</strong>
          </CardDatailsContent>
        </CardDatails>
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
              <h3>Entrega a combinar com o vendedor</h3>
              <p>Localizado em XXXXX, São Paulo</p>

              <h3>Como combino a entrega do produto?</h3>
              <p>
                Ao finalizar, você verá os dados de contato do vendedor nos
                detalhes da sua compra. Você pode entrar em contato detalhes da
                sua compra ou em Minhas compras para combinar o local de entrega
                e os custos de envio. Lembre-se que costumam responder entre 8h
                e 20h e pode levar até 48 horas.
              </p>

              <p>
                * Sempre troque mensagens com o vendedor pela plataforma ou
                pelas perguntas do anúncio para que sua conversa esteja
                protegida.
              </p>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
