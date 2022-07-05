import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import { FiTrash } from "react-icons/fi";

import {
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  SelectInput,
} from "./styles";
import { useEffect, useState } from "react";
import { api, ip, token } from "../../../services/api";
import axios from "axios";
import React from "react";

import { toast } from "react-toastify";
import { MdFileUpload } from "react-icons/md";
import uploadImage from "../../../services/imagem/upload";

export default function SendBanner() {

  const [imagens = [], setImagens] = useState<any[]>([]);

  const [imagensDisplayed = [], setImagensDisplayed] = useState<any[]>([]);

  const [imagensInativa = [], setImagensInativa] = useState<any[]>([]);
  const [imagensAtiva = [], setImagensAtiva] = useState<any[]>([]);

  const [promocoes = [], setPromocoes] = useState<any[]>([]);
  
  const [displyedStatus = [], setDisplyedStatus] = useState<any[]>([]);
  
  const [imagemNova, setImagemNova] = useState<any>();
  const [name, setName] = useState<any>("");
  const [image, setImage] = useState('');
  
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });
  
  const [emailContent, setEmailContent] = useState('');

  async function makeRequisition(e: any){
    e.preventDefault()
    e.target.reset();

    toast.info("Carregando...")
    let body = {
      data: {
        imagemUrl: imagemNova,
        status: 'ativo',
        nome: name
      }
    }

    console.log(body)
      
    await api.post("banner", body).then(
    (response) => {
      // console.log(response)
      if(response.status == 200){
        console.log(response.data)
        toast.info("Novo banner adicionado com sucesso!")

        setImagens((prevValues: any[]) => {
          //// console.log(prevValues)
          return [...new Set([...prevValues, response.data])]
        })
        loadImagens()

      }
      else if(response.status == 500){
        toast.error("Problemas com o servidor :(")
      }
      else{
        toast.error("Erro :(")
      }
    setImage('')
    }
    )
   }


   

  async function handleUpload(file: any) {
    let allowedFiles = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "video/mp4"]
    if(!allowedFiles.includes(file.type)) return toast.error("Arquivo inválido!");

    let uploadedImage = await uploadImage(file)
    setImage(uploadedImage)

  }


  function updateImagemStatus(imagemStatus: any, imagem: any){
    toast.info("Carregando...")
    // console.log(imagemStatus)
    // console.log(imagem)
    if(imagemStatus == 'inativo'){
      imagemStatus = 'ativo'
    }
    else if(imagemStatus == 'ativo'){
      imagemStatus = 'inativo'
    }
    else{
      throw 'deve ser ativo ou inativo!'
    }

    const body ={
      data: {
        imagemUrl: imagem.imagemUrl,
        nome: imagem.nome, 
        status: imagemStatus,
      }
    }

    api.put(`banner/${imagem.id}`, body).then(
      (response) => {
        // console.log(response)
        if(response.status == 200){
          toast.info("Atualização do banner feita com sucesso!")
          loadImagens()

  
        }
        else if(response.status == 500){
          toast.error("Problemas com o servidor :(")
        }

        else{
          toast.error("Erro :(")
        }
      }
    )

  }

  function deleteBanner(id: string){
    toast.info("Carregando...")
    api.delete(`bannerDeleteOne/${id}`)
    .then(
      (response) => {
        // console.log(response)
        if(response.status == 200){
          toast.info("Banner apagado com sucesso!")
          loadImagens()
          
        }
        else if(response.status == 500){
          toast.error("Problemas com o servidor :(")
        }

        else{
          toast.error("Erro :(")
        }
      }
    )
  }
  function loadPromocoes(){
    axios.get(`${ip}:8157/api/produto-imagens-promocionais/`).then(
      (response) => {
        // console.log(response.data)
        setPromocoes(response.data)
      }
    )
  }

  function deleteProduct(produto: any, emailContent: any){
    toast.info("Carregando...")
    

      //// req.product.createdById, req.body.product, req.body.emailContent

    // console.log("produto.promocaoId")
    // console.log(produto.promocaoId)
    // console.log("emailContent")
    // console.log(emailContent)

    const data = {
      empresaId : produto.empresaId,
      product : produto,
      emailContent : emailContent
    }
    // console.log(data)

    api.post(`/produto/enviarEmailRecusadoImagemProduto`, data).then(
      (response) => {
        if(response.status == 200){
          toast.info("Enviado o email com sucesso!")
          api.delete(`delete-produto-imagens-promocionais/${produto.promocaoId}`).then(
            (response) => {
              if(response.status == 200){
                toast.info("Produto removido com sucesso!")
                loadPromocoes()
              }
              else{
                toast.error("Erro ao remover o produto")
              }
            }
          )
        }

        else{
          toast.error("Erro ao mandar o email")
        }
      } 
    )
  }

  async function loadImagens(){
    const imagensResponse = await api.get("banner")
    // console.log(imagensResponse.data.rows)
    setImagens(imagensResponse.data.rows)
    setImagensDisplayed(imagensResponse.data.rows)
    filterImagens(imagensResponse.data.rows)
  }

  useEffect(
    () => {
      loadImagens()
    }, []
  )

  useEffect(
    () => {
      setImagensInativa([])
    }, []
  )
  useEffect(
    () => {
      loadPromocoes()
    }, [])

  function updateDisplayedStatus(text: any){
    if(text == 'inativo'){
      setImagensDisplayed(imagensInativa)
    }
    else if(text == 'ativo'){
      setImagensDisplayed(imagensAtiva) 
    }
    else{
      setImagensDisplayed(imagens) 
    }
  }

  // console.log(imagensAtiva)
  // console.log(imagensInativa)

  function filterImagens(imagens: any){
    imagens.filter(
      (imagem: any)  => {
        
        // console.log("imagem")
        // console.log(imagem)

        if (imagem.status == "inativo") {
          setImagensInativa((prevValues: any[]) => {
            //// console.log(prevValues)
            return [...new Set([...prevValues, imagem])]
          })
        }
      }
    )
    setImagensAtiva([])
    imagens.filter(
      (imagem:any)  => {
        
        // console.log("imagem")
        // console.log(imagem)

        if (imagem.status == "ativo") {

          setImagensAtiva((prevValues: any[]) => {
            //// console.log(prevValues)
            return [...new Set([...prevValues, imagem])]
          })
        }
      }
    )
  }

  
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>

          <form className="file"
            encType='multipart/form-data'

            onSubmit={makeRequisition}
          >



            <h2>
              Crie um novo Banner
            </h2>


            <div className="flex-container">
              <label
                htmlFor="upload-xls"
                className="btn-info"
              >
                Selecione uma imagem
                <MdFileUpload />
              </label>
              <input
                type="file"
                id="upload-xls"
                required
                className="upload-input"
                name="image"
                onChange={e => {
                  //@ts-ignore
                  setName(e?.target?.files[0].name)
                  //@ts-ignore
                  setImage(e?.target?.files[0])
                  //@ts-ignore
                  if (e?.target?.files[0].type.includes('image')) {
                    //@ts-ignore
                    handleUpload(e?.target?.files[0], setImagemNova)
                  }
                  else {
                    toast.error("Arquivo não suportado")
                  }
                }
                }
              />
            </div>

            <p
            className="specifications"
            >
              Imagem deve estar em 1440 X 417 PX
            </p>

            <br /><br />



            <input type="submit" value="Enviar"
            />


            {/* <div className="flex-container">
              <label
                htmlFor="upload-xls"
                className="btn-info"
              >
                Arquivo Excel
                <MdFileUpload/>
              </label>

              <input
                className="upload-xls"
                type="file"
                id="upload-xls"
                name="upload-xls"
                accept=".xls,.xlsx,.ods,.csv"
              />
            </div> */}
          </form>


          <h2>Banners</h2>

          <SelectInput>
            <select
            onChange={
              (text) => {
                  
              // console.log(text.target.value)
              if(!text){
              }
              updateDisplayedStatus(text.target.value)
            }
          }

            >

              <option 
               value='todos'>Todos
               </option>
              
              <option 
               value='ativo'>Ativas
               </option>
              
              <option 
               value='inativo'>Inativas
               </option>

            </select>
          </SelectInput>

          {
          imagensDisplayed.map(
            (imagem) => (
            <CardDatailsContent>
            <div>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href={imagem.imagemUrl}
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
                  <p className="reset-btn">
                    {imagem.nome}
                  </p>
              </ContentDetails>
            </div>
            <div className="flex-btn">
              <button
              onClick={
                () => {
                  deleteBanner(imagem.id)
                }
              }
              >
                <FiTrash />
              </button>

              
              <button
              onClick={
                () => {
                  updateImagemStatus(imagem.status, imagem)
                }
              }
              > 
              {
                // console.log(imagem.status)
              }
                <span>
                  Deixar
                  {
                    imagem.status == 'ativo' ? ' inativa': ' ativa'
                  }
                  </span>
              </button>
            </div>
          </CardDatailsContent>
            )
          )
      }

      <h2>Promoções</h2>
      {
        promocoes.length == 0 ? <h4>"Nenhuma Imagem Procional..." </h4>: false
      }

      { promocoes.map(
            (imagem) => (
              <form
              onSubmit={(e) => {
                // console.log(e.preventDefault())
                e.preventDefault()
                deleteProduct(imagem, emailContent)
              }}>
            <CardDatailsContent>
            <div>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href={imagem.imagemPromocional}
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
                <p>
                  {/* <Link
                        // href={`/produtos-promocao/${promocao.promocaoId}`}
                        to={`/produtos-promocao/${imagem.promocaoId}`}>
                          Ver Promoção
                    </Link> */}
                    {imagem.imagemPromocional}
                </p>

                  {/* <p>
                    {imagem.nome}
                  </p> */}
              </ContentDetails>
            </div>
            <div 
              className="trash-btn"
            >
              <button
              className="reset"
              type="submit"
              // onClick={
              //   () => {
              //     deleteProduct(imagem, emailContent)
              //   }
              // }
              >
                <FiTrash />
              </button>
            </div>
          </CardDatailsContent>
            <textarea
            className="emailSender"
            required
            placeholder="Digite a mensagem caso reprovar"
            onChange={(e) => setEmailContent(e.target.value)}
            />
          </form>
            )
          ) }

          {/* <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/moveis.e2d4307e.png"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/materiais.1b6d9340.png "
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              
              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/modamasculina.76bf6829.png"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              
              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent> */}
        </CardDatails>
      </div>
    </>
  );
}
