import { useEffect, useState } from "react";
import {
  DetailsProdFirts,
  ContainerProd,
  BoxProd,
  IconsContentStar,
  BoxColors,
  ColorWhite,
  ColorBlack,
  ColorRed,
  AddCartRight,
  BoxProdFirts,
  FlexBtnsProd,
  IconPlusMinus,
  ProdSecond,
  ModalContainerVendedor,
  ModalFlex,
  SelectAdress,
  ProdCaracteristicas,
  Right
} from "./styles";


import {  AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import Modal from "react-modal";
import React from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { api, id, ip, role } from "../../services/api";
import { formatPrice } from "../../util/format";
import { Menu } from "../../components/Menu";
import { FormComents, ProdSecondComents } from "./ProdItem/styles";
import { Btn } from "../Dashboard/PersonalData/styles";
import { ContentFormNew, ModalContent } from "../Dashboard/NewProd/styles";
import { useCart } from "../../hooks/useCart";
import axios from "axios";
import LoadingLayer from "../../components/LoadingLayer";
import Loading from "../../components/Loading";

export default function Produto() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const [counter, setCounter] = useState(1);

  function error() {
    toast.error("Não é possível adicionar menos que 1")
  }

  //BUG AO ADICIONAR MAIS DE UM!!!!!
  const favoritos: string[] = JSON.parse(localStorage.getItem("favorito") || "[]");


  function setFavoritos(favoritos: string[], produtoId: string){    

      favoritos.push(produtoId)
      localStorage.setItem("favorito", JSON.stringify(favoritos))
      toast.info("Adicionado aos favoritos!")
  }



  function increment() {
    if(counter < estoque){
      setCounter(counter + 1)
    }
    else{
      toast.error("Quantidade solicitada fora do estoque")
    }
  }
  function withdraw() {
    if (counter < 2 || counter == 0) {
      setCounter(1);
      error();

    } else {
      setCounter(counter - 1);
    }
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setShowModal1(false)
    setShowModal2(false)
  }

  function getHash() {
    const hash = window.location.hash.replace(/#\/produto\//g, '');    
    return hash
  }

  const productId = getHash()


  function buildUrl(){
    const productId = getHash()
    const requisition = `/produto/${productId}`
    return requisition
  }
  
  
  
  const selectedProduct = buildUrl()
  
  const [prodId, setProdId]=useState('');
  const [nome, setNome]=useState('');
  const [preco, setPreco]=useState('');
  const [estoque, setEstoque]=useState(0);
  const [publicUrl, setPublicUrl]=useState(''); 
  const [codigo, setCodigo]=useState('');
  const [marca, setMarca]=useState('');
  const [fotos, setFotos]=useState('');
  const [categoria, setCategoria]=useState('');
  const [descricao, setDescricao]=useState('');
  const [caracteristicasTecnicas, setCaracteristicasTecnicas]=useState('');
  const [isOferta, setIsOferta]=useState('');
  const [precoOferta, setPrecoOferta]=useState<any>();
  
  

  /*
  1 Esquema do carrinho
  2 checagem do produto se estiver no carrinho
  3 counter = quantidade do produto no carrinho
  */

  const [userEmpresaId, setUserEmpresaId]=useState('');

  const [logradouro, setLogradouro]=useState('');
  const [produtoEmpresaId, setProdutoEmpresaId]=useState('');
  const [bairro, setBairro]=useState('');
  const [cep, setCEP]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');

  const [resposta, setResposta] = useState('')
  
  const [empresaId, setEmpresaId]=useState('');
  const [comentario, setComentario]=useState('');

  const [comentarios = [] , setComentarios]=useState<any[]>([]);
  const [comment , setComment]=useState<any>();
  const [user , setUser]=useState<any>();

  
  const [loading, setLoading] = useState(true);
  
  const { addProduct } = useCart();

   async function loadProduct() {
    setLoading(true)

    
    const response = await axios.get(`${ip}:8157/api/find-produto-by-id/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
        toast.error("Ocorreu um erro")
        setLoading(false)
      }
    );

    setProdId(response.id)
    setPublicUrl(response.publicUrl);
    setCodigo(response.codigo);
    setMarca(response.marca);
    // setFotos(response.imagemUrl);
    setDescricao(response.descricao);
    setCaracteristicasTecnicas(response.caracteristicasTecnicas)
    setEmpresaId(response.empresaId)
    setEstoque(response.quantidadeNoEstoque)
    setIsOferta(response.isOferta)
    setPrecoOferta(response.precoOferta)
    setProdutoEmpresaId(response.empresaId)
    setNome(response.nome);

    if (response.isOferta === true) {
      setPreco(formatPrice(response.precoOferta));
    }
    
    else {
      setPreco(formatPrice(response.preco));
    }

    if(response.categoria){
      setCategoria(response.categoria.nome);
    }


    await fetch(response.imagemUrl)
      //                         vvvv
      .then(response => response.blob())
      .then(imageBlob => {
          // Then create a local URL for that image and print it 
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setFotos(imageObjectURL);
      })
      
    window.scrollTo(0, 0); // values are x,y-offset
    setLoading(false)

  }


  async function loadUser() {
    
    const user = await api.get("pessoa-fisica-perfil").then((user) => {
      setUser(user.data)
      return user.data;
    });

    setLogradouro(user.logradouro + ", " + user.numero);
    setBairro(user.bairro);
    setCEP(user.cep);
    setCidade(user.cidade);
    setEstado(user.estado);
  }


  useEffect(() => {
    loadUser();
    loadProduct();
  }, []);

     async function makeCommentary() {
       toast.info("Carregando...")
       setLoading(true)
        let data = {
          data: {
            "comentario": comentario ,
            "fornecedorEmpresaId": empresaId,
            "produtoId": prodId,
            "userId": id,
          }
        }

        const response = await api.post('comentario', data)
        
        loadComments()
        setComentario('')

        setComentarios(prevProducts => {
          return [...new Set([...prevProducts,  response.data])]

        })
        
       if(response.status == 200){
          toast.info("Comentario adicionado com sucesso!")
          setLoading(false)
          loadComments()
       }
       else{
          toast.error("Algo deu errado :(")
       }
      }
    
      async function addResposta() {
        setLoading(true)
        toast.info("Carregando...")
        
        comment.resposta = resposta
        comment.isRespondido = 1

        const response = await api.put(`comentario/${comment.id}`, comment)
        if(response.status == 200){
          toast.info("Resposta adicionada com sucesso!")
          closeModal()
          loadComments()
          setLoading(false)
        }
        else{

          toast.error("Algo deu errado :(")
        }
      }

    function handleAddProduct(id: string) {
      if(role == 'pessoa'){
        addProduct(id, counter);
      }
      else{
        toast.error("Cadastre-se como cliente para habilitar o carrinho")
      }
    }

    async function loadComments() {
      if(prodId){
        const response = await api.get(`findByProduto/${prodId}`);
        setComentarios( response.data)
      }
    }

    async function loadEmpresaIdUser(id: any){
      api.get(`empresa?filter%5Buser%5D=${id}`).then(
        (res) => {
          setUserEmpresaId(res.data.rows[0].id)
        }
      )
    }


  useEffect(
    () => {
      loadComments()
    }, [prodId]
  )

  useEffect(
    () => {
      if(role == 'empresa'){

        let userId = localStorage.getItem('id')?.replace(/"/g, "");
        // // console.log(userId)

        loadEmpresaIdUser(userId)
      }
    }, []
    )
    
  return (
    <>
      <LoadingLayer loading={loading} />
      
      <Header />
      <Menu />
      

      <div className="container">
        <ContainerProd>
          <img src={fotos} alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                <span>{categoria}</span>
                <strong>{nome}</strong>
                <span>{codigo}</span>
                 {/* <IconsContentStar>
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <small>(1)</small>
                </IconsContentStar>  */}
                <br />
                {
                  isOferta ? (
                    <strong>{formatPrice(precoOferta)}</strong>
                  ) : (
                    <strong>{preco}</strong>
                  )  
                }
                <span>quantidade no estoque {estoque}</span>
                {/* <BoxColors>
                  <ColorWhite />
                  <ColorBlack />
                  <ColorRed />
                </BoxColors> */}
                {
                role == 'empresa' || role == 'admin' ? (false): (
                  <a className="vendedor" onClick={
                    () => setShowModal2(true)
                  }>
                    Opções de frete
                  </a>
                )
                }

              </BoxProdFirts>
              {
                role == 'empresa' || role == 'admin' ? (false): (
                  <AddCartRight>
                <button
                  className="fav"
                  type="button"
                  onClick={() => {
                    if(role == 'pessoa'){
                      setFavoritos(favoritos, productId)
                    }
                    else{
                      toast.error("Cadastre-se como cliente para habilitar os favoritos!")
                    }
                  }}
                >
                  Favoritar <FiHeart />
                </button>
                <FlexBtnsProd>
                  <IconPlusMinus onClick={increment}>
                    <FiPlus />
                  </IconPlusMinus>
                  <h3>{counter}</h3>
                  <IconPlusMinus onClick={withdraw}>
                    <FiMinus />
                  </IconPlusMinus>
                </FlexBtnsProd>
                <Btn
                onClick={() => handleAddProduct(productId)}
                >Adicionar</Btn>
              </AddCartRight>
                )
              }
              
            </BoxProd>

            <BoxProd>
              <div className="descprod">
                <strong>Descrição do produto</strong>
                <span>{descricao}</span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>

        <ProdCaracteristicas>
          <div>
            <h2>Características Técnicas</h2>
            <span>
              {caracteristicasTecnicas}
            </span>
          </div>
        </ProdCaracteristicas>

        {
        comentarios.map(
          (comentario: any, index: number) => (
            <>
        <ProdSecond>
          <div>
            <h2>{comentario.firstName}</h2>
            <span>{comentario.comentario}</span>
          </div>
          {/* 
          pegar o id do comentátio
          */}
          {role == 'empresa' && userEmpresaId ==  produtoEmpresaId ? ( 
              <Btn
              onClick={
                () => {
                  setShowModal1(true)
                  setComment(comentario)
                }
              } 
              >Responder</Btn>
            ): (
              <div></div>
             )
          }
        </ProdSecond>
        {
            comentario.isRespondido? (
              <>
                <Right>↳ {comentario.resposta}</Right>
              </>

            ) : (<Right/>)
          }
        </>
          )
        )
        }
        {
          role != 'pessoa'? (
            <div></div>
          ) : (
            <ProdSecondComents>
            {loading ? (
            <Loading loading={loading} />
          ) : (
            <FormComents>
              <h2>Tire a sua dúvida aqui</h2>
              <select name="" id="">
                <option value="">Motivo da mensagem</option>
                <option value="">Reclamação</option>
                <option value="">Elogio</option>
                <option value="">Pergunta</option>
                <option value="">Denuncia</option>
              </select>
              <textarea name="" id=""
              value={comentario}
              onChange={(text) => {
                setComentario(text.target.value)
              }}
              ></textarea>
              <input placeholder="Sua mensagem" type="submit" value="Enviar"
                onClick={
                (e) => {
                  e.preventDefault()
                  makeCommentary()
                }
              } />
            </FormComents>
          )}
            
          </ProdSecondComents>    
          )
        }
      </div>

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

              <ContentFormNew>
                {loading ? (
              <Loading loading={loading} />
            ) : <>
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
            </>}
              </ContentFormNew>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>



      <ModalContainerVendedor>
        <Modal
          isOpen={showModal2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Opções de frete e retirada</h3>
              <p>Calculamos os custos e prazos para este endereço:</p>

              <SelectAdress>
                <div>
                  <strong>{logradouro}</strong>
                  <br />
                  <span>CEP: {cep} - {estado}</span>
                </div>
                <div>
                  <small>Selecione outro endereço</small>
                </div>
              </SelectAdress>

              <h3>Receber compra</h3>
              <p>Chegará Quarta em seu endereço</p>

              <h3>Retirar compra</h3>

              <p>Retire a partir de Quarta em uma agência dos correios</p>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}