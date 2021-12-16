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
  /*
  Não tem a ver com o produto cadastrado
  o adicionar
  
  */
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [products = [], setProducts] = useState<Product[]>([]);
  const [ids = [], setIds] = useState<Product[]>([]);

  function addNewId(newId: string){
    console.log(newId)
    setIds((prevValues: any[]) => {
      return [...new Set([...prevValues, newId])]	
       })
    console.log(ids)

  }

  let productCounter: any[] = [];
  
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("produto");
      console.log(response.data);
      setProducts(response.data.rows);
    }
    loadProducts();
  }, []);


  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <ContentNew>
          <h2>Promoções</h2>
        </ContentNew>
        {products.forEach((p) => {
          
            if (p.isOferta === true) {
              productCounter.push(p);
            }
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
                <div
                onClick={
                  () => addNewId(product.id)}
                className="btn-more">
                  <FiCheck />
                </div>
              </div>
            </ProdContainerSingle>            
            </>)
            ))
          }
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
                <label htmlFor="">Imagem Promocional</label>
                <input type="text" placeholder="www.suaImagem.com/imagem" />
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
