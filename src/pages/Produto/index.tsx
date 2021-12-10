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
  ModalContent,
  SelectAdress,
  ProdCaracteristicas,
} from "./styles";
import prod from "../../assets/images/prodfav.png";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import React from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { Menu } from "../../components/Menu";

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

  const [counter, setCounter] = useState(0);

  function error() {
    toast("Não é possível adicionar menos que 0 ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    setCounter(counter + 1);
  }

  function withdraw() {
    if (counter < 1) {
      setCounter(0);
      error();
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
  }

  function getHash() {
    const hash = window.location.hash.replace(/#\/produto\//g, '');    
    return hash
  }
  const productId = getHash()
  function buildUrl(){
    const productId = getHash()
    const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";
//  `/tenant/:tenantId/produto/:id`
    const requisition = `/tenant/${tenantId}/produto/${productId}`
    return requisition
  }
  
  const selectedProduct = buildUrl()
  console.log(selectedProduct);
  
  const [id, setId]=useState('');
  const [nome, setNome]=useState('');
  const [preco, setPreco]=useState('');
  const [publicUrl, setPublicUrl]=useState(''); 
  const [codigo, setCodigo]=useState('');
  const [marca, setMarca]=useState('');
  const [fotos, setFotos]=useState('');
  const [modelo, setModelo]=useState('');
  const [descricao, setDescricao]=useState('');


  const [logradouro, setLogradouro]=useState('');
  const [bairro, setBairro]=useState('');
  const [cep, setCEP]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');

  useEffect(() => {
  async function loadProduct(){
    const response = await api.get(selectedProduct)
    .then(response => {
        console.log(response.data)
        return response.data
    })

    setId(response.id)
    setNome(response.nome)
    
    if(response.isOferta === true){
    setPreco(formatPrice(response.precoOferta))        
    }
    else{
    setPreco(formatPrice(response.preco))
    }
    setPublicUrl(response.publicUrl)
    setCodigo(response.codigo)
    setMarca(response.marca)
    setFotos(response.fotos[0].downloadUrl)
    setModelo(response.modelo);
    setDescricao(response.descricao)

}
async function loadUser() {
  const user = await api.get('/tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/pessoa-fisica-perfil')
  .then(user => {
      console.log(user.data);
    
      return user.data;            
  })
setLogradouro(user.logradouro+", "+user.numero);
  setBairro(user.bairro);
  setCEP(user.cep)
  setCidade(user.cidade);
  setEstado(user.estado);
}
  loadUser()  
  loadProduct();
console.log(id)
}, []);

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
                <span>Nome da marca</span>
                <strong>{nome}</strong>
                <span>Código do produto</span>
                <IconsContentStar>
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <small>(1)</small>
                </IconsContentStar>
                <br />
                <strong>{preco}</strong>
                <span>Variantes (ex: Cor)</span>
                <BoxColors>
                  <ColorWhite />
                  <ColorBlack />
                  <ColorRed />
                </BoxColors>
                <a className="vendedor" onClick={openModal}>
                  Opções de frete
                </a>
              </BoxProdFirts>

              <AddCartRight>
                <button className="fav" type="button"
                onClick={() => setFavoritos(favoritos, productId)}

                >Favoritar <FiHeart /></button>
                <FlexBtnsProd>
                  <IconPlusMinus onClick={increment}>
                    <FiPlus />
                  </IconPlusMinus>
                  <h3>{counter}</h3>
                  <IconPlusMinus onClick={withdraw}>
                    <FiMinus />
                  </IconPlusMinus>
                </FlexBtnsProd>
                <Link to="/pagar">Adicionar</Link>
              </AddCartRight>
            </BoxProd>

            <BoxProd>
              <div className="descprod">
                <strong>Descrição do produto</strong>
                <span>
                  {descricao}
                </span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>

        <ProdCaracteristicas>
          <div>
            <h2>Características Técnicas</h2>
            <span>
              <b>Peso do Produto:</b> 12 Kg
            </span>
            <span>
              <b>Quantidade de Lugares:</b> 6 lugares
            </span>
            <span>
              <b>Formato:</b> Retangular
            </span>
            <span>
              <b>Material do Tampo da Mesa:</b> Plástico
            </span>
            <span>
              <b>Tipo de Material do Tampo da Mesa:</b> Polipropileno
            </span>

            <span>
              <b>Material da Estrutura da Mesa:</b> Plástico
            </span>
            <span>
              <b>Tipo de Material da Estrutura da Mesa:</b> Polipropileno
            </span>
            <span>
              <b>Mesa Dobrável:</b> Sim
            </span>
            <span>
              <b>Furo para Ombrelone:</b> Não
            </span>
            <span>
              <b>Dimensão da Mesa (AxLxC):</b> 74x75x180cm
            </span>
          </div>
        </ProdCaracteristicas>

        <ProdSecond>
          <div>
            <h2>Nome do cliente</h2>
            <span>Posso pedir para embrulhar para presente?</span>
          </div>

          <Link to="#">Responder</Link>
        </ProdSecond>
      </div>

      <ModalContainerVendedor>
        <Modal
          isOpen={modalIsOpen}
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


