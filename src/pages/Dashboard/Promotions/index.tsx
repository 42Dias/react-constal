/*

**************************************************************
ADICIONAR PROMOÇÃO ENCERRAMENTO NO PRODUTO INDIVIDUAL !!!!!!!!
**************************************************************



*/
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
  NewBtnFeatured,
} from "./styles";
import prodone from "../../../assets/images/prodone.png";
import Header from "../../../components/Header";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheck, FiPlus } from "react-icons/fi";
import { Menu } from "../../../components/Menu";
import { Product } from "../../../types";
import { api, ip, role, status } from "../../../services/api";
import { formatPrice } from "../../../util/format";
import { Btn } from "../PersonalData/styles";
import { toast } from "react-toastify";
import uploadImage from "../../../services/imagem/upload";
import { FileContainer } from "../NewProd/styles";
import { MdFileUpload } from "react-icons/md";
import Loading from "../../../components/Loading";
var uuid = require("uuid");


export default function Promotions() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [imagemPromocional, setImagemPromocional] = useState<any>();
  // const [dataEncerramento, setDataEncerramento]   =  useState<any>();
  const [indexs, setIndexs]   =  useState<any>([]);



  async function handleUpload(file: any) {
    let allowedFiles = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "video/mp4"]
    if(!allowedFiles.includes(file.type)) return toast.error("Arquivo inválido!");

    let uploadedImage = await uploadImage(file)
    setImagemPromocional(uploadedImage)

  }

  

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
  const [ids = [], setIds] = useState<any[]>([]);

  function addNewId(newId: string, index: number){
    toast.info("produto adicionado a lista!")
    // console.log(newId)
    setIds((prevValues: any[]) => {
      return [...new Set([...prevValues, newId])]	
       })
    setIndexs((prevValues: any[]) => {
    return [...new Set([...prevValues, index])]	
      })

  }
  async function makeRequisitionToChange(data: any){
    toast.info("Carregando...")
    ids.map(
      async (id) => {        
        const response: any = api.put(`produto/${id}`, data)
        .then(
          (response) => {
            setLoading(false)
            if(  response.status == 200){
              toast.info('Eba, recebemos o sua promoção. :)')
              closeModal()
            }
            else if(  response.status != 200){
              toast.error('Algo deu errado, tente mais tarde :(')
            }
            else{
              toast.error('Algo deu errado com o servidor... tente mais tarde :(')
            }
            // console.log(response)
          }
          )
          // console.log(await response)
        }
        )
  }

  let productCounter: any[] = [];
  
  useEffect(() => {
    if(!role){
      window.location.reload()
    }
    else{
      if(role !== "admin" && role !== "empresa" || status === "pendente"){
        // Simulate an HTTP redirect:
        window.location.replace(`${ip}/#/erro`);
      }
    }

    async function loadProducts() {
      const response = await api.get("produto");
      // console.log(response.data);
      setProducts(response.data.rows);
    }
    loadProducts();
  }, []);

  async function addNewPromotion(e: any) {
    setLoading(true)
    e.preventDefault()
    // console.log(productCounter[0].empresaId)
    const data = {
      data: {
        "imagemPromocional": imagemPromocional,
        "promocaoCriacao": new Date(),
        // "promocaoEncerramento": dataEncerramento,
        "promocaoId": uuid.v4(),
        "empresaId": productCounter[0].empresaId
      }
    }
    // console.log(data)
    await makeRequisitionToChange(data)

  }

  // console.log(uuid.v4())

  // console.log(ids)

  
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <ContentNew>
          <h2>Imagens Promocionais</h2>
        </ContentNew>

        <ContentNew>
          <NewBtnFeatured   onClick={openModal}>
            Adicionar Imagem Promocional
          </NewBtnFeatured>
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
              <img src={product.imagemUrl} alt="" />
              <h5>{product.nome}</h5>
              <p>{product.descricao}</p>
              <div className="btn-group-add">
                <span>
                  Em oferta: {formatPrice(product.precoOferta)}
                </span>
                <div
                onClick={
                  () => addNewId(product.id, index)}
                className="btn-more">
                  <FiPlus />
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

            <ModalContent
            onSubmit={addNewPromotion}
            >
              <h3>Produtos promocionais</h3>

              {indexs.length? (
            
                indexs.map(
                  (index: number) => (
                    <p>
                      {productCounter[index].nome} <br />
                      {formatPrice(productCounter[index].precoOferta)}
                      <br />
                      <br />
                    </p>
                  )
                )
              


              ): 'selecione um produto'}
              


              <ContentFormNew>
                  <FileContainer>
                     <div className="container-file">
                       <label
                          htmlFor="upload-xls"
                          className="btn-info"
                        >
                          Selecione uma imagem
                          <MdFileUpload/>
                        </label>
                  
                        <input
                        // value={imagem}
                        required
                        placeholder="www.imagem/suaimagem.com"
                        id="upload-xls"
                        name="upload-xls"
                        type="file"
                        //@ts-ignore
                        onChange={(e) => handleUpload(e?.target?.files[0])}
                                         />
                     </div>
                    <p
                        style={{margin: 'auto'}}
                        >
                          Imagem deve estar em 1440 X 417 PX
                    </p>
                  </FileContainer>
                </ContentFormNew>
              
              {/* <ContentFormNew>
                <label htmlFor="">Data de encerramento</label>
                <input 
                required
                type="date"
                placeholder="12/12/2022" 
                onChange={event => setDataEncerramento(event.target.value)} 
                />
              </ContentFormNew> */}
                {loading ? (
                  <Loading loading={loading}/> 
                ) : (
                <div className="buttonsNew">
                  <button >Cancelar</button>
                  <button
                  type="submit" 
                  onSubmit={addNewPromotion}
                  >Adicionar</button>
                </div>
                )}
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
