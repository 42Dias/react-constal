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
import upload from "../../../assets/images/upload.svg";
import Header from "../../../components/Header";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Menu } from "../../../components/Menu";
import { formatPrice } from "../../../util/format";
import axios from "axios";
import { Product } from "../../../types";
import { api } from "../../../services/api";

export default function NewProd() {
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const [produtoToRequisiton, setProdutoToRequisiton] = useState('')
  const [nome, setNome] = useState('')
  const [codigoDaEmpresa, setCodigoDaEmpresa] = useState('')
  const [descricao, setDescricao] = useState('')
  const [caracteristicasTecnicas, setCaracteristicasTecnicas] = useState('')
  const [preco, setPreco] = useState('')
  const [prazo, setPrazo] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [frete, setFrete] = useState('')
  const [imagem, setImagem] = useState('')
  const [categoria, setCategoria] = useState('')




  function openModal() {
    //setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    //setIsOpen(false);
    //setIsOpenEdit(false)
  }

  function messageCancel() {
    toast.error('Ah, que pena. o seu produto não foi cadastrado na plataforma. Revise algumas informações :(')
    //setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu pedido. Ele será revisado e logo estará na plataforma :)')
    //setIsOpen(false);
  }

  function improvements() {
    toast.info('Melhore a qualidade das fotos')
    //setIsOpen(false);
  }

  async function addProduct(){
    const data = {
      data:{
        "nome": nome, 
        "codigo": codigoDaEmpresa, 
        "descricao": descricao, 
        "caracteristicasTecnicas": caracteristicasTecnicas, 
        "preco": preco, 
        "prazo": prazo, 
        "quantidade": quantidade, 
        "frete": frete, 
        "categoria": categoria,
        "imagemUrl": imagem, 
        "status": "pendente"
      }

    }
    const response: any = api.post('produto', data)
    console.log(await response)
    if(response.status == 200){
      messageApprove()
    }
    else if(response.statusText != "OK"){
      toast.info('Algo deu errado, tente mais tarde :(')
    }
  }
 /*
   app.post(
    `/tenant/:tenantId/produto`,
    require('./produtoCreate').default,
  );*/

  /*
  PASSAR A REQUISIÇÃO COMO DATA
  BODY: DATA
  */

  // app.get(
  //   `/tenant/:tenantId/categoria`,
  //   require('./categoriaList').default,
  // );

  const [products = [], setProducts] = useState<Product[]>([]);
  const [categorias = [], setCategorias] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategorias() {
      const categoriasResponse = await api.get("categoria");
      const categoriasDoBack = categoriasResponse.data.rows
      console.log(categoriasDoBack)
      setCategorias(categoriasDoBack)
    }
    loadCategorias();
  }, []);

  useEffect(() => {
    async function loadProducts() {

      const response = await api.get("produto");
      console.log(response.data);
      setProducts(response.data.rows);

    }
    loadProducts();
  }, []);
  
  function openModalEditProduct(index: number): any  {
    // setIsOpenEdit(true)
    // setIndex(index)
    console.log("DEVERIA ABRIR")
  }

  return (
    <>
      <Header />
      <Menu />
  
      <div className="container">
        <ContentNew>
          <h2>Meus produtos</h2>
          <p onClick={
            () => {
              setShowModal2(true)
            }
            }>Adicionar</p>
        </ContentNew>)
        <GridProdsFour>
        {/* Como pegar os dados dos inputs? => login */}
        {
        products.map(
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
              <div className="btn-more"
              onClick={
                () => {
                  setProdutoToRequisiton
                  setShowModal1(true)
                }
              }
              >

                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

            </>
          )
        )
        }
{/* 
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
          </ProdContainerSingle> */}
        </GridProdsFour>
      </div>
      
      
    <ModalContainerVendedor>
      <Modal
        isOpen={showModal1}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Alterar produto</h3>
              <ContentFormNew>
                <label htmlFor="">Preço atual</label>
                <input type="text" placeholder="" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Novo preço</label>
                <input type="text" placeholder="R$" />
              </ContentFormNew>
              <div className="buttonsNew">
                <a href="">Cancelar</a>
                <a 
                // href=""
                onClick={
                  () => {
                    console.log("he")
                  }
                } >Adicionar</a>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>            
       

      <ModalContainerVendedor>
        <Modal
          isOpen={showModal2}
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
                <input type="text" placeholder="Nome do produto"
                onChange={(text) => setNome(text.target.value)}
                />
                
              </ContentFormNew>
              
              <ContentFormNew>
                <label htmlFor="">Código da empresa</label>
                <input type="text" placeholder="Código da empresa"
                onChange={(text) => setCodigoDaEmpresa(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Descrição</label>
                <input type="text" placeholder="Descrição"
                onChange={(text) => setDescricao(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Características técnicas</label>
                <input type="text" placeholder="Especificações técnicas"
                onChange={(text) => setCaracteristicasTecnicas(text.target.value)}
                />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Preço</label>
                <input type="number" placeholder="Preço"
                onChange={(text) => setPreco(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">URL da imagem</label>
                <input type="text" placeholder="www.imagem/suaimagem.com"
                onChange={(text) => setImagem(text.target.value)}
                />
              </ContentFormNew>

              {/* 
              <ContentFormNew>
                <label htmlFor="">Especificações técnicas</label>
                <input type="text" placeholder="Especificações técnicas" />
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
              */}

              <ContentFormNew>
                <label htmlFor="">Prazo de entrega</label>
                <input type="text" placeholder="Prazo de entrega"
                onChange={(text) => setPrazo(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Quantidade</label>
                <input type="number" placeholder="Quantidade"
                onChange={(text) => setQuantidade(text.target.value)} />
              </ContentFormNew>

              {/* 

              <ContentFormNew>
                <label htmlFor="">Peso líquido</label>
                <input type="text" placeholder="Peso líquido" />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Peso bruto</label>
                <input type="text" placeholder="Peso bruto" />
              </ContentFormNew> 
              */}

              <ContentFormNew>
                <label htmlFor="">Tipo de frete</label>
                <select
                onChange={(text) => setFrete(text.target.value)}
                >
                  <option value="por_categoria">Por Cep</option>
                  <option value="a_combinar">A combinar</option>
                  <option value="retirar">Retirar</option>
                  <option value="gratis">Grátis</option>
                </select>
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Tipo de categoria</label>
                <select
                onChange={(text) => setCategoria(text.target.value)}
                >
                  {categorias.map(
                    (categoria) => (
                      <option value={categoria.id}>{categoria.nome}</option>
                    )
                  )}
                </select>
              </ContentFormNew>

              

              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={addProduct}>Adicionar</button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}


