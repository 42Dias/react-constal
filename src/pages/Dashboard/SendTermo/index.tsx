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
      // console.log(response)
      if(response.status == 200){
        toast.info("Novo termo adicionado com sucesso!")

        setTermo((prevValues: any[]) => {
          //// console.log(prevValues)
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

   async function uploadImage(newImage: any, setImage: any) {
    const formData = new FormData()

    console.log(newImage)

    formData.append('file', newImage)

    let imageName = newImage.name
    console.log(imageName)

    let credentials = await api.get(`file/credentials`, {
        params: {
            filename: imageName,
            storageId: 'produtoImagem1',
        },
    })
    if (credentials.status != 200) {
        toast.info('Arquivo inv??lido, ou problemas com o servidor :(')
        return
    }

    let credentialsData = credentials.data

    let credencial = credentialsData.uploadCredentials.url

    console.log(credentialsData)

    let credentialCleaned = credencial.replace('"http://localhost:8157/api" ;localhost', '')
    let downloadExtension = credentialsData.downloadUrl.replace('"http://localhost:8157/api" ;localhost', '')

    console.log(credentialCleaned)
    console.log(downloadExtension)

    let ipLoad = `${ip}:8157/api${credentialCleaned}`

    let upload = await axios.post(ipLoad, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    if (upload.status != 200) {
        console.log(upload)
        toast.info('Arquivo inv??lido')
        return
    }

    console.log(credencial)
    toast.success('Arquivo V??lido!')

    let pathToImage = `${ip}:8157/api${downloadExtension}`
    console.log("pathToImage")
    console.log(pathToImage)
    setImage(pathToImage)
  }

  function updatetermoStatus(termoStatus: any, termo: any){
    toast.info("Carregando...")
    // console.log(termoStatus)
    // console.log(termo)
    // console.log(termoAtiva.length)

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
        // console.log(response)
        if(response.status == 200){
          toast.info("Atualiza????o do termo feita com sucesso!")
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
        // console.log(response)
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
    // console.log(termoResponse.data.rows)
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

  // console.log(termoAtiva)
  // console.log(termoInativa)

  function filterTermo(termo: any){
    termo.filter(
      (termo: any)  => {
        
        // console.log("termo")
        // console.log(termo)

        if (termo.ativo == "inativo") {
          setTermoInativa((prevValues: any[]) => {
            //// console.log(prevValues)
            return [...new Set([...prevValues, termo])]
          })
        }
      }
    )
    setTermoAtiva([])
    termo.filter(
      (termo:any)  => {
        
        // console.log("termo")
        // console.log(termo)

        if (termo.ativo == "ativo") {

          setTermoAtiva((prevValues: any[]) => {
            //// console.log(prevValues)
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
            <h2>Fa??a upload</h2>
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
          // console.log(e)
          
          
          //@ts-ignore
          // console.log(e.target.files[0].name)
          
          //@ts-ignore
          setName(e.target.files[0].name)
          
          //@ts-ignore
          setImage(e.target.files[0])
          
          //@ts-ignore
          if(e.target.files[0].type.includes('pdf')){
            // if(true){

            //@ts-ignore
            uploadImage(e.target.files[0], settermoNova)
          }
          else{
            toast.error("S?? ?? aceito arquivos em formato pdf")
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
                    {termo.url}
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
                // console.log(termo.ativo)
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
