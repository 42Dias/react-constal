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

import React, { useState, useEffect } from "react";
import { api, ip, role } from "../../services/api";


import { formatPrice } from "../../util/format";
import { Menu } from "../../components/Menu";

interface Product {
  precoTotal: number | bigint;
  imagemUrl: string | undefined;
  status: string;
  valorTotal: number;
  nomeProduto: string;
  product: any;
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  publicUrl: string;
  isOferta: number;
  precoOferta: any;
}

export default function Histoty() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [products = [], setProducts] = useState<Product[]>([]); 

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  // const [preco, setpreco]=useState('');
  // const [nome, setnome]=useState('');
  // const [img, setimg]=useState('');
  // const [localizacao, setlocalizacao]=useState('');
  // const [estado, setestado]=useState('');

  useEffect(() => {
    if(role != 'pessoa'){
      // Simulate an HTTP redirect:
      window.location.replace(`${ip}/#/erro`);
    }
    async function loadHistory() {
      // console.log("requisição do pedido feita")
      const res = await api.get('pedidoWithProduct')
      // console.log(res.data)
      setProducts(res.data) 
    }
    loadHistory()
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <Title>Histórico</Title>
    {
          products.map((product) => (
         <CardDatailsContent key={product.nome}>
              <ContentDetails>
                <img src={product.imagemUrl} alt="" />
                <span>{product.nome}</span>
                <p>{formatPrice( product.precoTotal)}</p>
              </ContentDetails>
              <strong onClick={openModal} >Ver detalhes</strong>
         </CardDatailsContent>
  
            ))
    }
    </CardDatails>
    </div>
        {
          products.map((product) => (
            
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
            <p>status: {product.status} </p>
            {/*<p>Localizado em XXXXX, São Paulo</p>*/}
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
          ))
  }



      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
