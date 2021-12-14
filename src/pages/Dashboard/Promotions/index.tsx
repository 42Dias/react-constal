// import {  } from "./styles";
import React, { useEffect, useState } from "react";
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
import { Product } from "../../../types";
import { api } from "../../../services/api";
import { formatPrice } from "../../../util/format";

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

  const [products = [], setProducts] = useState<Product[]>([]);
  
  let productCounter: any[] = [];
  
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("produtos");
      //console.log(response.data);
      const productsFormated = response.data.record
      setProducts(productsFormated);
    }
    loadProducts();
  }, []);

  // function updateProduc

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <ContentNew>
          <h2>Promoções</h2>
        </ContentNew>
        {products.forEach((p) => {
            if (p.isOferta === 1) {
              productCounter.push(p);
            }

            //console.log(productCounter);
            //console.log(products.length);
          })}
        <GridProdsFour>
          {productCounter.length === 0 ? (
            <p>Nenhum produto em promoção</p>
          ) :(
          productCounter.map(
            (product, index) => (
              <>
              <ProdContainerSingle>
              <img src={prodone} alt="" />
              <h5>{product.nome}</h5>
              <p>{product.descricao}</p>
              <div className="btn-group-add">
                <span>
                  {formatPrice(product.preco)}
                </span>
                <div className="btn-more">
                  <FiCheck />
                </div>
              </div>
            </ProdContainerSingle>            
            </>)
            ))
          }


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

              <ContentFormNew>
                <label htmlFor="">Texto Promocional</label>
                <input type="text" placeholder="Incrível Produto com 10% de desconto" />
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
