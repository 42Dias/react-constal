import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import Modal from "react-modal";

import { useEffect, useState } from "react";
import { role, ip, id, api, status } from "../../../services/api";
import React from "react";
import { Btn } from "../PersonalData/styles";
import { ContentFormNew, ModalContainerVendedor, ModalContent, ModalFlex } from "../NewProd/styles";
import { AiOutlineClose } from "react-icons/ai";


export default function Questions() {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [comment , setComment]=useState<any>();
  const [resposta , setResposta]=useState<any>();

  const [empresaId,  setEmpresaId] = useState<any>()
  const [comentarios = [] , setComentarios]=useState<any[]>([]);



  useEffect(
    () => {
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`http://${ip}:3000/constal#/erro`);
        }
      }

      async function loadComentarios(){
        async function getEmpresaId() {
          const empresaIdResponse =  api.get(`empresaUser/${id}`).then(
            (empresaIdResponse) => {
              console.log("empresaIdResponse")
              console.log(empresaIdResponse.data)
              // const response  = api.get(`findByEmpresa/${empresaIdResponse.data.id}`).then(
                const response  = api.get(`findByEmpresa/3b386e29-c490-4231-b3f6-bb9b407fc8e9`).then(
                (response) => { //3b386e29-c490-4231-b3f6-bb9b407fc8e9
                  setComentarios(response.data)
                  console.log(response)
                }
              )
            }
            )
          
        }

        await getEmpresaId()
      }

      loadComentarios()
    }
    ,[]
  )
  useEffect(
    () => {

    }, [empresaId]
  )

  function closeModal() {
    setIsOpen(false);
    setShowModal1(false)
    setShowModal2(false)
  }
  console.log(
    comentarios
  )

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  async function addResposta() {
    
    comment.resposta = resposta
    comment.isRespondido = 1

    const response = await api.put(`comentario/${comment.id}`, comment)
    console.log(response)
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Perguntas(
            {comentarios.length}
            )</h2>
            {
              comentarios.map(
                (comentario) => (
                  <>
                  <CardDatailsContent>
                    <ContentDetails>
                      <small>
                        <b>{comentario.firstName}</b>     {
                            comentario.isRespondido != 1? (
                              <span>
                                x
                              </span>
                            ) : (
                              <span>
                              ✓
                            </span>
                            )

                            }
                        <br />
                        {comentario.comentario}
                      </small>
                    </ContentDetails>
                    <Btn
                      onClick={
                        () => {
                          setShowModal1(true)
                          setComment(comentario)
                        }
                      } 
                      >Responder</Btn>
                </CardDatailsContent>
                {
                  comentario.isRespondido? (
                    <CardDatailsContent>
                      {comentario.resposta}
                    </CardDatailsContent>
                  ): (
                    <div></div>
                  )
                }
                  </>
                  
                )
              )
            }
          </CardDatails>

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
                  <h3>Nova resposta</h3>

                  <ContentFormNew>
                    <label htmlFor="">Responder</label>
                    <input
                      required
                      type="text"
                      onChange={(text) => {
                        setResposta(text.target.value);
                      }}
                    />
                  </ContentFormNew>

                  <div className="buttonsNew">
                    <button type="button" onClick={
                      () => console.log('ok')
                    }>
                      Cancelar
                    </button>
                    <button type="button" onClick={addResposta}>
                      Adicionar
                    </button>
                  </div>
                </ModalContent>
              </div>
            </Modal>
          </ModalContainerVendedor>
      </div>
    </>
  );
}
