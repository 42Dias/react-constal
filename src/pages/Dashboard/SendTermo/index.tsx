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

export default function SendTermo() {

  const [imagens = [], setImagens] = useState<any[]>([]);

  const [imagensDisplayed = [], setImagensDisplayed] = useState<any[]>([]);

  const [imagensInativa = [], setImagensInativa] = useState<any[]>([]);
  const [imagensAtiva = [], setImagensAtiva] = useState<any[]>([]);

  const [promocoes = [], setPromocoes] = useState<any[]>([]);
  
  const [displyedStatus = [], setDisplyedStatus] = useState<any[]>([]);
  
  const [termoNova, settermoNova] = useState<any>();
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
        url: termoNova,
        // status: 'ativo',
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

   const uploadImage = async (termoNova: string | Blob) => {
    
    const formData = new FormData();

    formData.append('image', termoNova);
    
    console.log(...formData)

    const headers = {
      'headers': {
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'
        
      }
    }

    await axios.post(`${ip}:3028/upload-image`, formData, headers)
    .then((response) => {
      console.log(response)
      if(response.status == 200){
        const pathHelper = response.data.mensagem
        console.log(ip+pathHelper)
        settermoNova(ip+pathHelper)
        toast.info("termo Válida!")
      }
      else{
        toast.info("termo inválida, ou problemas com o servidor :(")
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

  function updatetermoStatus(termoStatus: any, termo: any){
    toast.info("Carregando...")
    console.log(termoStatus)
    console.log(termo)
    if(termoStatus == 'inativo'){
      termoStatus = 'ativo'
    }
    else if(termoStatus == 'ativo'){
      termoStatus = 'inativo'
    }
    else{
      throw 'deve ser ativo ou inativo!'
    }

    const body ={
      data: {
        termoUrl: termo.termoUrl,
        nome: termo.nome, 
        status: termoStatus,
      }
    }

    api.put(`banner/${termo.id}`, body).then(
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
  


  async function loadImagens(){
    const imagensResponse = await api.get("termo")
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
      (termo: any)  => {
        
        console.log("termo")
        console.log(termo)

        if (termo.status == "inativo") {
          setImagensInativa((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, termo])]
          })
        }
      }
    )
    setImagensAtiva([])
    imagens.filter(
      (termo:any)  => {
        
        console.log("termo")
        console.log(termo)

        if (termo.status == "ativo") {

          setImagensAtiva((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, termo])]
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
                  {/* O arquivo deve estar no formato _____ */}
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
          // if(e.target.files[0].type.includes('image')){
          if(true){

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


          <h2>termo</h2>

          {/* <SelectInput>
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
          </SelectInput> */}

          {
          imagensDisplayed.map(
            (termo) => (
            <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href={termo.url}
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
                  <p>
                    {termo.nome}
                  </p>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button
              onClick={
                () => {
                  deleteBanner(termo.id)
                }
              }
              >
                <FiTrash />
              </button>

              
              <button
              onClick={
                () => {
                  updatetermoStatus(termo.status, termo)
                }
              }
              > 
              {
                console.log(termo.status)
              }
                <span>
                  Deixar
                  {
                    termo.status == 'ativo' ? ' inativa': ' ativa'
                  }
                  </span>
              </button>
            </div>
          </CardDatailsContent>
            )
          )
      }
        </CardDatails>
      </div>
    </>
  );
}
