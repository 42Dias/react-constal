import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { Menu } from "../../../components/MenuAdminOnly";
import { FiMenu, FiTrash } from "react-icons/fi";

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
import { Container, FlexLink } from "../../../components/Menu/styles";

export default function Sendcategoria() {

  const [categorias = [], setcategorias] = useState<any[]>([]);

  const [categoriasDisplayed = [], setcategoriasDisplayed] = useState<any[]>([]);
  
  const [categoriasInativa = [], setcategoriasInativa] = useState<any[]>([]);
  const [categoriasAtiva = [], setcategoriasAtiva] = useState<any[]>([]);
  
  const [name, setName] = useState<any>("");
  

  async function addCategoria() {
    const data = {
      data: {
        nome: name,
        status: "aprovado",
      },
    };

    const response = await api.post("categoria", data).then(
      (response) => {
        console.log(response)
        response.status == 200 ? toast.info("Categoria adicionada ao sistema :)"): toast.error("Algo deu errado, tente mais tarde :(")
      }
    )
    loadcategorias()
  }


  async function makeRequisition(e: any){


    e.preventDefault()
    e.target.reset();

    toast.info("Carregando...")
    addCategoria()
   }


  function updatecategoriaStatus(categoriaStatus: any, categoria: any){
    toast.info("Carregando...")
    
    console.log(categoriasAtiva.length < 7 )
    
    console.log(categoria)

      if(categoria.isFixed == null){
        if(categoriasAtiva.length < 7 ){
          categoriaStatus = '1'
          console.log("fixou!")
        }
        else{
          toast.error("Não é possivel adicionar mais que 8 categorias fixas")
          return
        }
      }
      // else (categoriaStatus == '1')
      else{
        categoriaStatus = null
        console.log("desfixou!")
      }
  
      const body ={
        data: { 
          isFixed: categoriaStatus,
        }
      }
  
      api.put(`categoria/${categoria.id}`, body).then(
        (response) => {
          console.log(response)
          if(response.status == 200){
            toast.info("Atualização do categoria feita com sucesso!")
            loadcategorias()
  
    
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

  function deletecategoria(id: string){
    toast.info("Carregando...")
    api.delete(`categoriaDeleteOne/${id}`)
    .then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info("Categoria apagada com sucesso!")
          loadcategorias()
          
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

  async function loadcategorias(){
    const categorias = await api.get("categoria?filter%5Bstatus%5D=aprovado")
    console.log(categorias.data.rows)
    setcategorias(categorias.data.rows)
    setcategoriasDisplayed(categorias.data.rows)
    filtercategorias(categorias.data.rows)
  }

  useEffect(
    () => {
      loadcategorias()
    }, []
  )

  useEffect(
    () => {
      setcategoriasInativa([])
    }, []
  )
  function updateDisplayedStatus(text: any){
    if(text == 'inativo'){
      setcategoriasDisplayed(categoriasInativa)
    }
    else if(text == 'ativo'){
      setcategoriasDisplayed(categoriasAtiva) 
    }
    else{
      setcategoriasDisplayed(categorias) 
    }
  }
  function filtercategorias(categorias: any){
    categorias.filter(
      (categoria: any)  => {
        
        console.log("categoria")
        console.log(categoria)

        if (categoria.isFixed == null) {
          setcategoriasInativa((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, categoria])]
          })
        }
      }
    )
    setcategoriasAtiva([])
    categorias.filter(
      (categoria:any)  => {
        
        console.log("categoria")
        console.log(categoria)

        if (categoria.isFixed != null) {

          setcategoriasAtiva((prevValues: any[]) => {
            //console.log(prevValues)
            return [...new Set([...prevValues, categoria])]
          })
        }
      }
    )
  }

  
  return (
    <>
      <Header />
      <Container>
        <FlexLink>
          <div className="dropdown">
            <button className="dropbtn">
              <FiMenu />
              <span>Categorias</span>
            </button>
            <div className="dropdown-content">
              <div className="drop-grid">
                {/* categorias do back? */}
                {
                  categoriasInativa.map(
                    (categoria, index) => (
                      <Link
                        key={index}
                        to={`/produto-categoria/${categoria.id}`}>{categoria.nome}</Link>
                    )
                  )
                }
              </div>
            </div>
          </div>

          <div className="category-fix">
            {            
            categoriasAtiva.map(
            (categoria, index) => (
                <Link
                  key={index}
                  to={`/produto-categoria/${categoria.id}`}>{categoria.nome}</Link>
                )
            )}
          </div>
        </FlexLink>
      </Container>
      <Menu />
      <div className="container">
        <CardDatails>
          
          <form 
          className="file"
          onSubmit={makeRequisition}
          
          >
            <h2>Criar Categoria</h2>


          <input 
          type="text"
          
          required

          onChange={e => {
          console.log(e)

          //@ts-ignore
          console.log(e.target.value)
          //@ts-ignore
          setName(e.target.value)
          //@ts-ignore

        }
        } 
          /><br /><br />

            

            <input type="submit" value="Enviar"
             />
          </form>


          <h2>todas categorias</h2>

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
               value='ativo'>Fixas
               </option>
              
              <option 
               value='inativo'>Não Fixas
               </option>

            </select>
          </SelectInput>

          {
          categoriasDisplayed.map(
            (categoria) => (
            <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                  <p>
                    {categoria.nome}
                  </p>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button
              onClick={
                () => {
                  deletecategoria(categoria.id)
                }
              }
              >
                <FiTrash />
              </button>

              
              {/* <button
              onClick={
                () => {
                  updatecategoriaStatus(categoria.status, categoria)
                }
              }
              > 
              {
                console.log(categoria.status)
              }
                <span>
                  {
                    categoria.status == "aprovado" ? ' desaprovar': ' aprovar'
                  }
                  </span>
              </button> */}

              <button
              onClick={
                () => {
                  updatecategoriaStatus(categoria.status, categoria)
                }
              }
              > 
              {
                console.log(categoria.status)
              }
                <span>
                  {
                    categoria.isFixed == null ? ' Fixar': ' Desfixar'
                  }
                  {/* ao fixar ela é aprovada automaticamente */}
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
