export default function ProdItem() {
  return(
    <h2>po</h2>
  )
}



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
// } from "./styles";
// import { AiFillStar, AiOutlineClose } from "react-icons/ai";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import Modal from "react-modal";
// import React, { useState ,useEffect } from "react";
// import axios from "axios";
// let token = localStorage.getItem("token")?.replace(/"/g, "");

// interface RepositoryItemProps {
//   repository: {
//     id: string;
//     name: string;
//     title: string;
//     price: string;
//     image: string;
//   };
// }

// export function RepositoryItem(props: RepositoryItemProps) {
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   useEffect( () => {
//     async function loadProducts() {

//     function getHash() {
//       const hash = window.location.hash.replace(/#\/produto\//g, '');    
//       return hash
//     }
    
//     function buildUrl(){
//       const productId = getHash()
//       const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";
//   //  `/tenant/:tenantId/produto/:id`
//       const requisition = `/tenant/${tenantId}/produto/${productId}`
//       return requisition
//     }
//     const a= buildUrl()
//     console.log(a);
    
//     const instance = axios.create({
//       baseURL: 'http://localhost:8157/api/',
//       timeout: 10000,
//       headers: {'Authorization': 'Bearer '+ token}
//     });
    
//     const response = await instance.get(`tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/produto/d5f60210-40b0-4a90-bc3d-04547a94bf0f`)
//     .then(response => {        
//         return response.data;
//     })
//     console.log(response.data)
//     }

//     loadProducts()
//     }, [] )
//   return (
//     <>
//       <div className="container">
//         <ContainerProd>
//           <img src={props.repository.image} alt="" />
//           <DetailsProdFirts>
//             <BoxProd>
//               <BoxProdFirts>
//                 <span>Nome da marca /*response.nome*/ </span>
//                 <strong>{props.repository.title}</strong>
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
//                 <strong>R$ {props.repository.price /*response.preco*/}</strong>
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
//                 <FlexBtnsProd>
//                   <IconPlusMinus>
//                     <FiPlus />
//                   </IconPlusMinus>
//                   <h3>4</h3>
//                   <IconPlusMinus>
//                     <FiMinus />
//                   </IconPlusMinus>
//                 </FlexBtnsProd>
//                 <Link to="#">Adicionar</Link>
//               </AddCartRight>
//             </BoxProd>

//             <BoxProd>
//               <div className="oi">
//                 <span>
//                   response.descricao
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
//                   laboris nisi ut aliquip ex ea commodo consequat.
//                 </span>

//                 <strong>Descrição técnica</strong>

//                 <span>
//                   Marca: response.marca<br />
//                   Modelo: response.modelo<br />
//                   Material: <br />
//                   Características: response.caracteristicas<br />
//                   Observações: <br />
//                   Acabamento: <br />
//                 </span>
//               </div>
//             </BoxProd>
//           </DetailsProdFirts>
//         </ContainerProd>

//         <ProdSecond>
//           <div>
//             <h2>Nome do cliente</h2>
//             <span>Posso pedir para embrulhar para presente?</span>
//           </div>

//           <Link to="#">Responder</Link>
//         </ProdSecond>
//       </div>

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
//                   <strong>Rua XXXXXX XXXX XX XXXX, 55</strong>
//                   <br />
//                   <span>CEP: XXXX - SP</span>
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
