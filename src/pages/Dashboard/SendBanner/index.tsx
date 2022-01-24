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
      
    await api.post("banner", body).then(
    (response) => {
      console.log(response)
      if(response.status == 200){
        toast.info("Novo banner adicionado com sucesso!")

        setImagens((prevValues: any[]) => {
          //console.log(prevValues)
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

   const uploadImage = async (imagemNova: string | Blob) => {
    
    const formData = new FormData();

    formData.append('image', imagemNova);
    
    console.log(...formData)

    const headers = {
      'headers': {
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'
        
      }
    }

    await axios.post(`${ip}:8080/upload-image`, formData, headers)
    .then((response) => {
      console.log(response)
      if(response.status == 200){
        const pathHelper = response.data.mensagem
        console.log(ip+pathHelper)
        setImagemNova(ip+pathHelper)
        toast.info("Imagem Válida!")
      }
      else{
        toast.info("Imagem inválida, ou problemas com o servidor :(")
      }

    }).catch((err) => {
      if(err.response){
        console.log(err)
        toast.error("Erro: Tente mais tarde :(")

      }
      else{
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde :("
        });
      }
      toast.error("Erro: Tente mais tarde :(")
    });
  }

  function updateImagemStatus(imagemStatus: any, imagem: any){
    toast.info("Carregando...")
    console.log(imagemStatus)
    console.log(imagem)
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
        console.log(response)
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
        console.log(response)
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
        console.log(response.data)
        setPromocoes(response.data)
      }
    )
  }

  function deleteProduct(promocaoId: any){
    toast.info("Carregando...")


    console.log(promocaoId)

    api.delete(`delete-produto-imagens-promocionais/${promocaoId}`).then(
      (response) => {
        console.log(response)
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

  async function loadImagens(){
    const imagensResponse = await api.get("banner")
    console.log(imagensResponse.data.rows)
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

  console.log(imagensAtiva)
  console.log(imagensInativa)

  function filterImagens(imagens: any){
    imagens.filter(
      (imagem: any)  => {
        
        console.log("imagem")
        console.log(imagem)

        if (imagem.status == "inativo") {
          setImagensInativa((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, imagem])]
          })
        }
      }
    )
    setImagensAtiva([])
    imagens.filter(
      (imagem:any)  => {
        
        console.log("imagem")
        console.log(imagem)

        if (imagem.status == "ativo") {

          setImagensAtiva((prevValues: any[]) => {
            //console.log(prevValues)
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
            <h2>Faça upload</h2>
            <h4
                // style={{margin: 'auto'}}
                >
                  Imagem deve estar em 1440 X 417 PX
            </h4>

          <input 
          type="file"
          required
          name="image"
          onChange={e => {
          console.log(e)

          //@ts-ignore
          console.log(e.target.files[0].name)
          //@ts-ignore
          setName(e.target.files[0].name)
          //@ts-ignore
          setImage(e.target.files[0])

          //@ts-ignore
          if(e.target.files[0].type.includes('image')){
            //@ts-ignore
            uploadImage(e.target.files[0])
          }
          else{
            toast.error("Arquivo não suportado")
          }
          
            

        }
        } 
          /><br /><br />

            

            <input type="submit" value="Enviar"
             />
          </form>


          <h2>Banners</h2>

          <SelectInput>
            <select
            onChange={
              (text) => {
                  
              console.log(text.target.value)
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
            <CardDatailsContent>
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
                  <p>
                    {imagem.nome}
                  </p>
              </ContentDetails>
            </CardDatailsContent>
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
                console.log(imagem.status)
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
            <CardDatailsContent>
            <CardDatailsContent>
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
                  {/* <p>
                    {imagem.nome}
                  </p> */}
              </ContentDetails>
            </CardDatailsContent>
            <div 
              className="trash-btn"
            >
              <button
              className="reset"
              onClick={
                () => {
                  deleteProduct(imagem.promocaoId)
                }
              }
              >
                <FiTrash />
              </button>
            </div>
          </CardDatailsContent>
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
