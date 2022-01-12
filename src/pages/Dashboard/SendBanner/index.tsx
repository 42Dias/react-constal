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

import Uploady from "@rpldy/uploady";
import { toast } from "react-toastify";

export default function SendBanner() {

  const [imagens = [], setImagens] = useState<any[]>([]);

  const [imagensDisplayed = [], setImagensDisplayed] = useState<any[]>([]);

  const [imagensInativa = [], setImagensInativa] = useState<any[]>([]);
  const [imagensAtiva = [], setImagensAtiva] = useState<any[]>([]);

  
  const [displyedStatus = [], setDisplyedStatus] = useState<any[]>([]);


  const [imagemNova, setImagemNova] = useState<any>();
  const [name, setName] = useState<any>();
  const [image, setImage] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  async function makeRequisition(e: any){
    e.preventDefault()
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

   const uploadImage = async () => {
    
    const formData = new FormData();

    formData.append('image', image);
    
    console.log(...formData)

    const headers = {
      'headers': {
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'
        
      }
    }

    await axios.post("http://localhost:8080/upload-image", formData, headers)
    .then((response) => {
      console.log(response)
      if(response.status == 200){
        const pathHelper = response.data.mensagem
        console.log(ip+pathHelper)
        setImagemNova(ip+pathHelper)
        toast.info("Imagem Válida!")
      }
      else{
        toast.error("Imagem inválida, ou problemas com o servidor :(")
      }

    }).catch((err) => {
      if(err.response){
        console.log(err)
      }else{
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde!"
        });
      }
    });
  }

  function updateImagemStatus(imagemStatus: any, imagem: any){
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
    api.delete(`bannerDeleteOne/${id}`)
    .then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info("Banner apagado com sucesso!")
  
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

  useEffect(
    () => {
      async function loadImagens(){
        const imagensResponse = await api.get("banner")
        console.log(imagensResponse.data.rows)
        setImagens(imagensResponse.data.rows)
        setImagensDisplayed(imagensResponse.data.rows)
        filterImagens(imagensResponse.data.rows)
      }
      loadImagens()
    }, []
  )

  useEffect(
    () => {
      setImagensInativa([])
      
    }, []
  )
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


          <input type="file" name="image" 
          onChange={e => {
          console.log(e)

          //@ts-ignore
          console.log(e.target.files[0].name)
          //@ts-ignore
          setName(e.target.files[0].name)
          //@ts-ignore
          setImage(e.target.files[0])

          uploadImage()

        }
        } 
          /><br /><br />

            

            <input type="submit" value="Enviar"
             />
          </form>


          <h2>Banners</h2>

          <SelectInput>
            <select
            onChange={(text) => {
                  
              console.log(text.target.value)
              if(!text){
              }
              updateDisplayedStatus(text.target.value)
            }
          }

            >

              <option 
              // onClick={setDisplyedStatus}
               value='todos'>Todos
               </option>
              
              <option 
              // onClick={setDisplyedStatus}
               value='ativo'>Ativas
               </option>
              
              <option 
              // onClick={setDisplyedStatus}
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
                  <p>
                    TESTE!
                  </p>
                </small>
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
                    imagem.status == 'ativo' ? ' ativa':' inativa'
                  }
                  </span>
              </button>
            </div>
          </CardDatailsContent>

            )
          )
          
      }
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
