export default function ProdItem() {
  return(
    <h2>po</h2>
  )
}



// import { useEffect, useState } from "react";
// import {
//   DetailsProdFirts,
//   ContainerProd,
//   BoxProd,
//   IconsContentStar,
//   BoxColors,
//   ColorWhite,
//   ColorBlack,
//   ColorRed,
//   AddCartRight,
//   BoxProdFirts,
//   FlexBtnsProd,
//   IconPlusMinus,
//   ProdSecond,
//   ModalContainerVendedor,
//   ModalFlex,
//   ModalContent,
//   SelectAdress,
//   ProdCaracteristicas,
// } from "./styles";
// import prod from "../../assets/images/prodfav.png";
// import { AiFillStar, AiOutlineClose } from "react-icons/ai";
// import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import Modal from "react-modal";
// import React from "react";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import { api, role, id } from "../../services/api";
// import { formatPrice } from "../../util/format";
// import { Menu } from "../../components/Menu";
// import { REFUSED } from "dns";
// import { Btn } from "../Dashboard/PersonalData/styles";
// import { ContentFormNew } from "../Profile/styles";

// interface RepositoryItemProps {
//   repository: {
//     id: string;
//     name: string;
//     title: string;
//     price: string;
//     image: string;
//   };
// }
// export default function Produto() {
//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [showModal1, setShowModal1] = React.useState(false);
//   const [showModal2, setShowModal2] = React.useState(false);

//   const [counter, setCounter] = useState(0);

//   function error() {
//     toast("Não é possível adicionar menos que 0 ", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   }

//   //BUG AO ADICIONAR MAIS DE UM!!!!!
//   const favoritos: string[] = JSON.parse(localStorage.getItem("favorito") || "[]");


//   function setFavoritos(favoritos: string[], produtoId: string){    
//       console.log("favoritos")
//       console.log(favoritos)
//       console.log("produtoId")
//       console.log(produtoId)    
//       favoritos.push(produtoId)
//       console.log(favoritos)
//       localStorage.setItem("favorito", JSON.stringify(favoritos))
//   }



//   function increment() {
//     setCounter(counter + 1);
//   }

//   function withdraw() {
//     if (counter < 1) {
//       setCounter(0);
//       error();
//     } else {
//       setCounter(counter - 1);
//     }
//   }
//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function getHash() {
//     const hash = window.location.hash.replace(/#\/produto\//g, '');    
//     return hash
//   }
//   const productId = getHash()
//   function buildUrl(){
//     const productId = getHash()
// //  `/tenant/:tenantId/produto/:id`
//     const requisition = `/produto/${productId}`
//     return requisition
//   }
  
//   const selectedProduct = buildUrl()
//   console.log(selectedProduct);
  
//   const [prodId, setProdId]=useState('');
//   const [nome, setNome]=useState('');
//   const [preco, setPreco]=useState('');
//   const [publicUrl, setPublicUrl]=useState(''); 
//   const [codigo, setCodigo]=useState('');
//   const [marca, setMarca]=useState('');
//   const [fotos, setFotos]=useState('');
//   const [modelo, setModelo]=useState('');
//   const [descricao, setDescricao]=useState('');
//   const [caracteristicasTecnicas, setCaracteristicasTecnicas]=useState('');


//   const [logradouro, setLogradouro]=useState('');
//   const [bairro, setBairro]=useState('');
//   const [cep, setCEP]=useState('');
//   const [cidade, setCidade]=useState('');
//   const [estado, setEstado]=useState('');

//   const [resposta, setResposta] = useState('')
  
//   const [empresaId, setEmpresaId]=useState('');
//   const [comentario, setComentario]=useState('');

//   const [comentarios = [] , setComentarios]=useState<any[]>([]);
  
//   const userId = id

//   useEffect(() => {
//   async function loadProduct(){
//     const response = await api.get(selectedProduct)
//     .then(response => {
//         console.log(response.data)
//         return response.data
//     })

//     setProdId(response.id)
//     setNome(response.nome)
    
//     if(response.isOferta === true){
//     setPreco(formatPrice(response.precoOferta))        
//     }
//     else{
//     setPreco(formatPrice(response.preco))
//     }
//     setPublicUrl(response.publicUrl)
//     setCodigo(response.codigo)
//     setMarca(response.marca)
//     setFotos(response.fotos[0].downloadUrl)
//     setModelo(response.modelo);
//     setDescricao(response.descricao)
//     setCaracteristicasTecnicas(response.caracteristicasTecnicas)
//     setEmpresaId(response.empresaId)
// }
// async function loadUser() {
//   const user = await api.get('pessoa-fisica-perfil')
//   .then(user => {
//       console.log(user.data);
    
//       return user.data;            
//   })
// setLogradouro(user.logradouro+", "+user.numero);
//   setBairro(user.bairro);
//   setCEP(user.cep)
//   setCidade(user.cidade);
//   setEstado(user.estado);
// }
//   loadUser()  
//   loadProduct();
// console.log(id)
// }, []);


//   useEffect(
//     () => {
//       async function loadComments() {
//         if(prodId){
//           const response = await api.get(`findByProduto/${prodId}`);
//           console.log(response)
//           setComentarios( response.data)
//         }
//       }
//       loadComments()
//     }, [prodId]
//   )

//   async function makeCommentary() {
//     let data = {
//       data: {
//         "comentario": comentario ,
//         "fornecedorEmpresaId": empresaId,
//         "produtoId": prodId,
//         "userId": id,
//       }
//     }
//     console.log(data)
//     const response = await api.post('comentario', data)
//     console.log(response)
//   }

//   async function addResposta() {
//     console.log(resposta)
//   }


//   return (
//     <>
//       <Header />
//       <Menu />
//       <div className="container">
//         <ContainerProd>
//           <img src={fotos} alt="" />
//           <DetailsProdFirts>
//             <BoxProd>
//               <BoxProdFirts>
//                 <span>Nome da marca</span>
//                 <strong>{nome}</strong>
//                 <span>Código do produto</span>
//                 <IconsContentStar>
//                   <AiFillStar size={18} />
//                   <AiFillStar size={18} />
//                   <AiFillStar size={18} />
//                   <AiFillStar size={18} />
//                   <AiFillStar size={18} />
//                   <small>(1)</small>
//                 </IconsContentStar>
//                 <br />
//                 <strong>{preco}</strong>
//                 <span>Variantes (ex: Cor)</span>
//                 <BoxColors>
//                   <ColorWhite />
//                   <ColorBlack />
//                   <ColorRed />
//                 </BoxColors>
//                 <a className="vendedor" onClick={openModal}>
//                   Opções de frete
//                 </a>
//               </BoxProdFirts>

//               <AddCartRight>
//                 <button className="fav" type="button"
//                 onClick={() => setFavoritos(favoritos, productId)}
//                 >Favoritar <FiHeart /></button>
//                 <FlexBtnsProd>
//                   <IconPlusMinus onClick={increment}>
//                     <FiPlus />
//                   </IconPlusMinus>
//                   <h3>{counter}</h3>
//                   <IconPlusMinus onClick={withdraw}>
//                     <FiMinus />
//                   </IconPlusMinus>
//                 </FlexBtnsProd>
//                 <Link to="/pagar">Adicionar</Link>
//               </AddCartRight>
//             </BoxProd>

//             <BoxProd>
//               <div className="descprod">
//                 <strong>Descrição do produto</strong>
//                 <span>
//                   {descricao}
//                 </span>
//               </div>
//             </BoxProd>
//           </DetailsProdFirts>
//         </ContainerProd>

//         <ProdCaracteristicas>
//           <div>
//             <h2>Características Técnicas</h2>
//             <span>
//                 {caracteristicasTecnicas}
//             </span>
//           </div>
//         </ProdCaracteristicas>

//         {
//           role == "pessoa"? (
//         <form action="submit">
//           <fieldset>
//               <input type="text" name="" id="" 
//               placeholder="digite seu comentario"
//               onChange={(text) => {
//                 setComentario(text.target.value)
//               }}
//               />
//               <button 
//               onClick={
//                 (e) => {
//                   e.preventDefault()
//                   makeCommentary()
//                 }
//               }
//               >
//                 Fazer Comentario
//               </button>
//           </fieldset>
//         </form>
//           ):(
//             <div></div>
//           )
//         }

//         {
//         comentarios.map(
//           (comentario: any) => (
//         <ProdSecond>
//           <div>
//             <h2>{comentario.firstName}</h2>
//             <span>{comentario.comentario}</span>
//           </div>
//           {
//             role != 'pessoa'? ( 
//               <Btn
//               onClick={
//                 () => console.log('fkdbnldfbnjdfnçbjndfbndjnbndfbjakjfbnjvnbndajkkf')
//               } 
//               >Responder</Btn>
//             ): (
//               <div></div>
//              )
//           }
//         </ProdSecond>

//           )
//         )
//         }

//       </div>
//       <ModalContainerVendedor>
//         <Modal
//           isOpen={showModal1}
//           onAfterOpen={afterOpenModal}
//           onRequestClose={closeModal}
//         >
//           <div>
//             <ModalFlex>
//               <AiOutlineClose onClick={closeModal} />
//             </ModalFlex>

//             <ModalContent>
//               <h3>Nova promoção</h3>

//               <ContentFormNew>
//                 <label htmlFor="">Novo preço</label>
//                 <input
//                   required
//                   type="text"
//                   placeholder="650"
//                   onChange={(text) => {
//                     setResposta(text.target.value);
   
//                   }}
//                 />
//               </ContentFormNew>

//               <div className="buttonsNew">
//                 <button type="button" onClick={
//                   () => console.log('ok')
//                 }>
//                   Cancelar
//                 </button>
//                 <button type="button" onClick={addResposta}>
//                   Adicionar
//                 </button>
//               </div>
//             </ModalContent>
//           </div>
//         </Modal>
//       </ModalContainerVendedor>



//       <ModalContainerVendedor>
//         <Modal
//           isOpen={modalIsOpen}
//           onAfterOpen={afterOpenModal}
//           onRequestClose={closeModal}
//         >
//           <div>
//             <ModalFlex>
//               <AiOutlineClose onClick={closeModal} />
//             </ModalFlex>

//             <ModalContent>
//               <h3>Opções de frete e retirada</h3>
//               <p>Calculamos os custos e prazos para este endereço:</p>

//               <SelectAdress>
//                 <div>
//                   <strong>{logradouro}</strong>
//                   <br />
//                   <span>CEP: {cep} - {estado}</span>
//                 </div>
//                 <div>
//                   <small>Selecione outro endereço</small>
//                 </div>
//               </SelectAdress>

//               <h3>Receber compra</h3>
//               <p>Chegará Quarta em seu endereço</p>

//               <h3>Retirar compra</h3>

//               <p>Retire a partir de Quarta em uma agência dos correios</p>
//             </ModalContent>
//           </div>
//         </Modal>
//       </ModalContainerVendedor>

//     </>
//   );

// }


