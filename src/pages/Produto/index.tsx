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
import React, { useState ,useEffect } from "react";
import axios from "axios";
let token = localStorage.getItem("token")?.replace(/"/g, "");


// interface Product {
//   fotos: any;
//   codigo: string;
//   marca: string;
//   modelo: string;
//   id: number;
//   nome: string;
//   descricao: string;
//   preco: number;
//   publicUrl:string;
//   isOferta: number;
//   precoOferta: any;
// }

export default function Produto() {

    
  // interface ProductFormatted extends Product {
  //   priceFormatted: string;
  // }

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

  function getHash() {
    const hash = window.location.hash.replace(/#\/produto\//g, '');    
    return hash
  }
  
  function buildUrl(){
    const productId = getHash()
    const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";
//  `/tenant/:tenantId/produto/:id`
    const requisition = `/tenant/${tenantId}/produto/${productId}`
    return requisition
  }
  
  const selectedProduct = buildUrl()
  console.log(selectedProduct)

  const instance = axios.create({
    baseURL: 'http://localhost:8157/api/',
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+ token}
  });
  
  const [id, setId]=useState('');
  const [nome, setNome]=useState('');
  const [preco, setPreco]=useState('');
  const [publicUrl, setPublicUrl]=useState(''); 
  const [codigo, setCodigo]=useState('');
  const [marca, setMarca]=useState('');
  const [fotos, setFotos]=useState('');
  const [modelo, setModelo]=useState('');
  const [descricao, setDescricao]=useState('');

  useEffect(() => {
  async function loadUser(){
    const response = await instance.get(selectedProduct)
    .then(response => {
        console.log(response.data)

        return response.data
    })
    setId(response.id)
    setNome(response.nome)
    setPreco(response.preco)
    setPublicUrl(response.publicUrl)
    setCodigo(response.codigo)
    setMarca(response.marca)
    setFotos(response.fotos[0].downloadUrl)
    setModelo(response.modelo);
    setDescricao(response.descricao)

}
    
loadUser();

}, []);

  return (
  <>

     <div className="container">
        <ContainerProd>
          <img src={fotos} alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                NOME DA MARCA
                <span>
                    {marca}
                </span>
                <strong>
                  {nome}
                </strong>
                <span>
                      {codigo}
                </span><IconsContentStar>
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <small>(1)</small>
                </IconsContentStar>
                <br />
                <strong>R$ {codigo}</strong>
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
                  {descricao}
                </span>

                <strong>Descrição técnica</strong>

                <span>
                  Marca: {marca} <br />
                  Modelo: {modelo}<br />
                  Material: <br />
                  Características: <br />
                  Observações: <br />
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
              DADOS DO CLIENTE!!!!!! 
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


