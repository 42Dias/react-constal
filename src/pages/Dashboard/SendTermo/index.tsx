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

  const [termo = [], setTermo] = useState<any[]>([]);

  const [termoDisplayed = [], setTermoDisplayed] = useState<any[]>([]);

  const [termoInativa = [], setTermoInativa] = useState<any[]>([]);
  const [termoAtiva = [], setTermoAtiva] = useState<any[]>([]);

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
        ativo: 'inativo',
        nome: name
      }
    }
      
    await api.post("termo", body).then(
    (response) => {
      console.log(response)
      if(response.status == 200){
        toast.info("Novo termo adicionado com sucesso!")

        setTermo((prevValues: any[]) => {
          //console.log(prevValues)
          return [...new Set([...prevValues, response.data])]
        })
        loadTermo()

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

    // await axios.post(`${ip}:3028/upload-image`, formData, headers)
    await axios.post(`${ip}:3000/upload-image`, formData, headers)
    .then((response) => {
      console.log(response)
      if(response.status == 200){
        const pathHelper = response.data.mensagem
        console.log(ip+pathHelper)
        settermoNova(ip+pathHelper)
        toast.info("Termo Válido!")
      }
      else{
        toast.info("Termo inválido, ou problemas com o servidor :(")
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
    console.log(termoAtiva.length)

    if(termoStatus == 'inativo'){
      if(termoStatus == 'inativo' && termoAtiva.length >= 1){
        toast.error("Apenas pode ser 1 ativa")
        throw 'Apenas pode ser 1 ativa'
      }
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
        ativo: termoStatus,
      }
    }

    api.put(`termo/${termo.id}`, body).then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info("Atualização do termo feita com sucesso!")
          loadTermo()

  
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
    api.delete(`termoDeleteOne/${id}`)
    .then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info("Banner apagado com sucesso!")
          loadTermo()
          
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
  


  async function loadTermo(){
    const termoResponse = await api.get("termo")
    console.log(termoResponse.data.rows)
    setTermo(termoResponse.data.rows)
    setTermoDisplayed(termoResponse.data.rows)
    filterTermo(termoResponse.data.rows)
  }

  useEffect(
    () => {
      loadTermo()
    }, []
  )

  useEffect(
    () => {
      setTermoInativa([])
    }, []
  )
  function updateDisplayedStatus(text: any){
    if(text == 'inativo'){
      setTermoDisplayed(termoInativa)
    }
    else if(text == 'ativo'){
      setTermoDisplayed(termoAtiva) 
    }
    else{
      setTermoDisplayed(termo) 
    }
  }

  console.log(termoAtiva)
  console.log(termoInativa)

  function filterTermo(termo: any){
    termo.filter(
      (termo: any)  => {
        
        console.log("termo")
        console.log(termo)

        if (termo.ativo == "inativo") {
          setTermoInativa((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, termo])]
          })
        }
      }
    )
    setTermoAtiva([])
    termo.filter(
      (termo:any)  => {
        
        console.log("termo")
        console.log(termo)

        if (termo.ativo == "ativo") {

          setTermoAtiva((prevValues: any[]) => {
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
                  Todos os arquivos devem estar em formato PDF
            <br />
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
          if(e.target.files[0].type.includes('pdf')){
            // if(true){

            //@ts-ignore
            uploadImage(e.target.files[0])
          }
          else{
            toast.error("Só é aceito arquivos em formato pdf")
          }
          
            

        }
        } 
          /><br /><br />

            

            <input type="submit" value="Enviar"
             />
          </form>


          <h2>termo</h2>

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
          termoDisplayed.map(
            (termo) => (
            <CardDatailsContent>
            <div>
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
            </div>
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
                  updatetermoStatus(termo.ativo, termo)
                }
              }
              > 
              {
                console.log(termo.ativo)
              }
                <span>
                  Deixar
                  {
                    termo.ativo == 'ativo' ? ' inativa': ' ativa'
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
