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
import prod from "../../assets/images/prodfav.png";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import React from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { api, id, role } from "../../services/api";
import { formatPrice } from "../../util/format";
import { Menu } from "../../components/Menu";
import { FormComents, ProdSecondComents } from "./ProdItem/styles";
import { Btn } from "../Dashboard/PersonalData/styles";
import { ContentFormNew, ModalContent } from "../Dashboard/NewProd/styles";
import { useCart } from "../../hooks/useCart";

interface RepositoryItemProps {
  repository: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
  };
}
export default function Produto() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const [counter, setCounter] = useState(1);

  function error() {
    // toast("Não é possível adicionar menos que 1", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    toast.error("Não é possível adicionar menos que 1")
  }

  //BUG AO ADICIONAR MAIS DE UM!!!!!
  const favoritos: string[] = JSON.parse(localStorage.getItem("favorito") || "[]");


  function setFavoritos(favoritos: string[], produtoId: string){    
      console.log("favoritos")
      console.log(favoritos)
      console.log("produtoId")
      console.log(produtoId)    
      favoritos.push(produtoId)
      console.log(favoritos)
      localStorage.setItem("favorito", JSON.stringify(favoritos))
  }



  function increment() {
    console.log("counter dentro")
    console.log(counter)
    if(counter < estoque){
      setCounter(counter + 1)
    }
    else{
      toast.error("Quantidade solicitada fora do estoque")
    }
  }
  console.log("counter fora")
  console.log(counter)
  function withdraw() {
    console.log("counter dentro")
    console.log(counter)
    if (counter < 2 || counter == 0) {
      setCounter(1);
      error();
      console.log("counter dentro que passou")
      console.log(counter)
    } else {
      setCounter(counter - 1);
    }
  }
  function openModal() {
    setIsOpen(true);
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
//  `/tenant/:tenantId/produto/:id`
    const requisition = `/produto/${productId}`
    return requisition
  }
  
  
  
  const selectedProduct = buildUrl()
  console.log(selectedProduct);
  
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

  /*
  1 Esquema do carrinho
  2 checagem do produto se estiver no carrinho
  3 counter = quantidade do produto no carrinho
  */

  const [logradouro, setLogradouro]=useState('');
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

  
  const [loading, setLoading] = useState(false);
  
  const { addProduct, cart } = useCart();


  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(selectedProduct).then((response) => {
        console.log(response.data);
        return response.data;
      });

      setProdId(response.id)

      setNome(response.nome);

      if (response.isOferta === true) {
        setPreco(formatPrice(response.precoOferta));
      } else {
        setPreco(formatPrice(response.preco));
      }
      setPublicUrl(response.publicUrl);
      setCodigo(response.codigo);
      setMarca(response.marca);
      if(response.categoria){
        setCategoria(response.categoria.nome);
      }
      setFotos(response.imagemUrl/*|| response.fotos[0].downloadUrl*/);
      setDescricao(response.descricao);
      setCaracteristicasTecnicas(response.caracteristicasTecnicas)
      setEmpresaId(response.empresaId)
      setEstoque(response.quantidadeNoEstoque)


    }
    async function loadUser() {
      const user = await api.get("pessoa-fisica-perfil").then((user) => {
        console.log(user.data);
        setUser(user.data)
        return user.data;
      });
      setLogradouro(user.logradouro + ", " + user.numero);
      setBairro(user.bairro);
      setCEP(user.cep);
      setCidade(user.cidade);
      setEstado(user.estado);
    }
    loadUser();
    loadProduct();
  }, []);

     async function makeCommentary() {
       setLoading(true)
        let data = {
          data: {
            "comentario": comentario ,
            "fornecedorEmpresaId": empresaId,
            "produtoId": prodId,
            "userId": id,
          }
        }
        console.log(data)

        const response = await api.post('comentario', data)

        // console.log(response.data)
        
        // let nwe = response.data

        // console.log("-------------------------------")
        // console.log("nwe")
        // console.log(nwe)
        
        setComentarios(prevProducts => {
          return [...new Set([...prevProducts,  response.data])]	
        })
        
        window.location.reload()
        
        setLoading(false)
      }
    
      async function addResposta() {
        
        comment.resposta = resposta
        comment.isRespondido = 1

        const response = await api.put(`comentario/${comment.id}`, comment)
        console.log(response)
      }

    function handleAddProduct(id: string) {
      if(role == 'pessoa'){
        addProduct(id, counter);
      }
      else{
        toast.error("Cadastre-se para habilitar o carrinho")
      }
    }

  useEffect(
    () => {
      async function loadComments() {
        if(prodId){
          const response = await api.get(`findByProduto/${prodId}`);
          console.log(response)
          setComentarios( response.data)
        }
      }
      loadComments()
    }, [prodId]
  )
  return (
    <>
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
                </IconsContentStar> */}
                <br />
                <strong>{preco}</strong>
                <span>quantidade no estoque {estoque}</span>
                {/* <BoxColors>
                  <ColorWhite />
                  <ColorBlack />
                  <ColorRed />
                </BoxColors> */}
                <a className="vendedor" onClick={
                  () => setShowModal2(true)
                }>
                  Opções de frete
                </a>
              </BoxProdFirts>

              <AddCartRight>
                <button
                  className="fav"
                  type="button"
                  onClick={() => setFavoritos(favoritos, productId)}
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
          {
            role != 'pessoa'? ( 
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
            <FormComents>
              {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
              <h2>Tire a sua dúvida aqui</h2>
              <select name="" id="">
                <option value="">Motivo da mensagem</option>
                <option value="">Reclamação</option>
                <option value="">Elogio</option>
                <option value="">Pergunta</option>
                <option value="">Denuncia</option>
              </select>
              <textarea name="" id=""
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
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
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