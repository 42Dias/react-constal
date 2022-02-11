import { CardDatails, CardDatailsContent, CardDatailsContentSecondary, ContentDetails, TextAreaFormated } from "./styles";

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
import { toast } from "react-toastify";


export default function Questions() {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [comment , setComment]=useState<any>();
  const [resposta , setResposta]=useState<any>();

  const [empresaId,  setEmpresaId] = useState<any>()
  const [comentarios = [] , setComentarios]=useState<any[]>([]);

  const [emailContent, setEmailContent] = useState('');


  async function loadComentarios(){
    if (role == 'empresa'){
      async function getEmpresaId() {
        const empresaIdResponse =  api.get(`empresaUser/${id}`).then(
          (empresaIdResponse) => {
            // console.log("empresaIdResponse")
            // console.log(empresaIdResponse.data)
            const response  = api.get(`findByEmpresa/${empresaIdResponse.data.id}`).then(
              // const response  = api.get(`findByEmpresa/3b386e29-c490-4231-b3f6-bb9b407fc8e9`).then(
              (response) => {
                setComentarios(response.data)
              }
            )
          }
          )
      }
  
      await getEmpresaId()
    }
    else{
      const response  = api.get(`comentario`).then(
        (response) => {
          // console.log(response)
          setComentarios(response.data.record)
        }
      )
    }
  }


  async function denunciarComentario(comment: any){
    if(!emailContent){
      toast.error("Adicione o email!")
      return
    }
    toast.info("Carregando...")

    // console.log(comment)

    comment.isDenunciado = 1
    const response = await api.put(`comentario/${comment.id}`, comment)

  
    
    const email = await api.post('cliente/comentario-denuncia', {
      id: comment.fornecedorEmpresaId,
      emailContent: emailContent
    }).then(
      (res) => toast.info("Email enviado com sucesso!") 
    )

    if (response.status == 200){
      toast.info("Ação realizada com sucesso!")
      loadComentarios()
      closeModal()
      setEmailContent('')

    }
    else{
      toast.error("Algo deu errado :(")
      // console.log(response.status)
    }

  }


  async function undenunciarComentario(comment: any){
    toast.info("Carregando...")

    // console.log(comment)

    comment.isDenunciado = 0
    const response = await api.put(`comentario/${comment.id}`, comment)

    if (response.status == 200){
      toast.info("Ação realizada com sucesso!")
      loadComentarios()
      closeModal()
    }
    else{
      toast.error("Algo deu errado :(")
      // console.log(response.status)
    }

  }

  useEffect(
    () => {
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`${ip}/#/erro`);
        }
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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  async function addResposta() {
    toast.info("Carregando...")
    
    comment.resposta = resposta
    comment.isRespondido = 1

    const response = await api.put(`comentario/${comment.id}`, comment)

    if (response.status == 200){
      toast.info("Ação realizada com sucesso!")
      closeModal()
    }
    else{
      toast.error("Algo deu errado :(")
      // console.log(response.status)
    }
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
                    <small>     
                      </small>
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
                            {
                            role == 'admin'? (
                              <span>
                                <br />
                                Nome da empresa: {comentario.nome}
                                {/* razão Social: {comentario.razaoSocial} */}
                                {/* <br /> */}
                              </span>
                            ) : false
                            }
                        <br />
                        {comentario.comentario}
                      </small>
                    </ContentDetails>
                    {
                      role == 'empresa' ? (
                        <Btn
                        onClick={
                          () => {
                            setShowModal1(true)
                            setComment(comentario)
                          }
                        } 
                        >Responder</Btn>
                      ):(
                        false
                      )
                    }
                    {
                      role == 'admin' && comentario.isDenunciado == '0' ? (
                        <Btn
                        onClick={
                          () => {
                            denunciarComentario(comentario)
                          }
                        } 
                        >
                          Denunciar
                        </Btn>
                      ):(
                        false
                      )
                    }
                    {
                      role == 'admin' && comentario.isDenunciado == '1' ? (
                        <Btn
                        style={
                          {
                            width: '150px'
                          }
                        } 
                        onClick={
                          () => {
                            undenunciarComentario(comentario)
                          }
                        }
                        >
                          Reverter denuncia
                        </Btn>
                      ):(
                        false
                      )
                    }
                </CardDatailsContent>
                {
                  comentario.isRespondido? (
                    <CardDatailsContentSecondary>
                      Resposta: {comentario.resposta}
                    </CardDatailsContentSecondary>
                  ): (
                    <div></div>
                  )
                }
                {
                  comentario.isDenunciado == '0' && role == 'admin' ? (
                  <TextAreaFormated
                  className="emailSender"
                  required
                  placeholder="Digite uma mensagem para a denuncia"
                  onChange={(e) => setEmailContent(e.target.value)}
                  />
                  ): false
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
                      () => closeModal()
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
