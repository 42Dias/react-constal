import React, { useCallback, useEffect, useState } from "react";
import GlobalStyles from '../../../styles/global'
import Modal from "react-modal";
import {
  GridProdsFour,
  ProdContainerSingle,
  ContentNew,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
  ContentFormNew,
} from "./styles";
import { FiTrash2 } from "react-icons/fi";
import prodone from "../../../assets/images/prodone.png";
import prodtwo from "../../../assets/images/prodtwo.png";
import prodthree from "../../../assets/images/prodthree.png";
import prodfour from "../../../assets/images/prodfour.png";
import upload from "../../../assets/images/upload.svg";
import Header from "../../../components/Header";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Menu } from "../../../components/Menu";
import { formatPrice } from "../../../util/format";
import axios from "axios";
import { Empresa, Product } from "../../../types";
import { api, id, ip, role, status } from "../../../services/api";
import { Btn } from "./styles";
import Input from '../../../util/Input'

// @ts-ignore
import CurrencyInput from 'react-currency-masked-input'

// @ts-ignore
import { default as NumberFormat } from 'react-number-format';
import { Link } from "react-router-dom";

export default function NewProd() {
  var uuid = require("uuid");



  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [index, setIndex] = React.useState(0);

  const [productToReq, setProductToReq] = useState<any>();

  const [idProd, setId] = useState("");
  const [nome, setNome] = useState("");
  const [codigoDaEmpresa, setCodigoDaEmpresa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [caracteristicasTecnicas, setCaracteristicasTecnicas] = useState("");
  const [preco, setPreco] = useState<any>();
  const [prazo, setPrazo] = useState("");
  const [quantidade, setQuantidade] = useState<any>();
  const [frete, setFrete] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoria, setCategoria] = useState<any>();
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);

  const [isOferta, setIsOferta] = useState(false);
  const [precoOferta, setPrecoOferta] = useState<any>();
  const [empresaId, setEmpresaId] = useState("");

  const [newCategoria, setNewCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataEncerramento, setDataEncerramento]   =  useState<any>();
  const [categoriaId, setCategoriaId]   =  useState<any>();

  function openModal() {
    //setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
    setShowModal4(false);
  }

  function messageCancel() {
    toast.error(
      "Ah, que pena. o seu produto não foi cadastrado na plataforma. Revise algumas informações :("
    );
    //setIsOpen(false);
    setLoading(false)
  }

  function messageApprove() {
    toast.info(
      "Eba, estamos avaliando seu produto. Assim que aprovado estará na plataforma :)"
    );
    //setIsOpen(false);
    setLoading(false) 
  }

  function improvements() {
    toast.info("Melhore a qualidade das fotos");
    //setIsOpen(false);
  }

  function setValues() {
    const data = {
      data: {
        nome: nome,
        codigo: codigoDaEmpresa,
        descricao: descricao,
        caracteristicasTecnicas: caracteristicasTecnicas,
        preco: preco,
        prazo: prazo,
        quantidadeNoEstoque: quantidade,
        frete: frete,
        categoria: categoria,
        categoriaId: categoria,
        imagemUrl: imagem,
        status: "pendente",
      },
    };
    console.log(data)

    return data;
  }

  async function addProduct() {
    setLoading(true)
    const data = setValues();
    const response: any = await api.post("produto", data).then((response) => {
      console.log(response)
      if (response.status == 200) {
        messageApprove();
        closeModal()
        setProducts(prevProducts => {
          return [...new Set([...prevProducts, response.data])]	
           })
          console.log(response)
        //window.location.reload();
        setLoading(false)
      }else{
        toast.error('Algo deu errado, tente mais tarde :(');
        console.log(response)
      }
      }).catch(error => {
        toast.error("Algo deu errado, tente mais tarde :(");
        console.log(error)
        setLoading(false)
    });
    
    console.log(response);
    
    /*if (response.status == 200) {
      messageApprove();

      setProducts(prevProducts => {
        return [...new Set([...prevProducts, response.data])]	
         })

    } else{
      toast.error("Algo deu errado, tente mais tarde :(");
    }*/ 
    setShowModal2(false)
  }

  async function makeRequisitionToChange(data: any) {
    console.log(categoria)
    setLoading(true)

    const response: any = api.put(`produto/${idProd}`, data)
    .then(
      async (response) => {
    console.log(response);
    if ((response.status) == 200) {
      messageApprove();
      closeModal()
      window.location.hash = '#/promocoes'

    } else if (response.status == 500) {
      console.log(response)
      toast.error("Algo deu errado, tente mais tarde :(");
      setLoading(false)
    } else {
      toast.error("Algo deu errado, tente mais tarde :(");
      console.log(response)
    }
    setLoading(false)
    console.log(response)
      }
    )
    .catch(error =>{
        toast.error("Algo deu errado, tente mais tarde :(");      
        setLoading(false)

    });

  }


  async function changeProduct() {
    const data = {
      data: {
        id: idProd,
        nome: nome,
        codigo: codigoDaEmpresa,
        descricao: descricao,
        caracteristicasTecnicas: caracteristicasTecnicas,
        preco: preco,
        prazo: prazo,
        quantidade: quantidade,
        frete: frete,
        empresaId: empresaId,
        // categoria: categoria,
        categoriaId: categoria,
        imagemUrl: imagem,
        status: "pendente",
      },
    };
    
    console.log("data")
    console.log(data);
    makeRequisitionToChange(data);
    
  }
  async function addPromotion() {
    setLoading(true)
    const data = {
      data: {
        id: idProd,
        nome: nome,
        codigo: codigoDaEmpresa,
        descricao: descricao,
        caracteristicasTecnicas: caracteristicasTecnicas,
        preco: preco,
        prazo: prazo,
        quantidade: quantidade,
        frete: frete,
        // categoria: categoria,
        categoriaId: categoriaId,
        empresaId: empresaId,
        imagemUrl: imagem,
        isOferta: isOferta,
        precoOferta: precoOferta,
        promocaoEncerramento: dataEncerramento,
        promocaoId: uuid.v4(),
      },
    };
    makeRequisitionToChange(data);
  }

  async function addCategoria() {
    const data = {
      data: {
        nome: newCategoria,
        status: "pendente",
      },
    };
    const response = await api.post("categoria", data);
    console.log(response);
    // console.log(newCategoria)
  }

  async function deleteProduct(prodId: any, index: number) {
    setLoading(true)
    const response = await api.delete(`produtoDeleteOne/${prodId}`);
    if(response.status == 200){
      products.splice(index, 1)
      setProducts(products)
      setLoading(false)
    }

  }

  const [products = [], setProducts] = useState<any[]>([]);
  const [categorias = [], setCategorias] = useState<any[]>([]);

  function setProductOnClick(index: number ) {
    try {
      console.log("products[index]")
      console.log(products[index])
      setId(products[index].id);
      setNome(products[index].nome);
      setCodigoDaEmpresa(products[index].codigoDaEmpresa);
      setDescricao(products[index].descricao);
      setCaracteristicasTecnicas(products[index].caracteristicasTecnicas);
      setPreco(products[index].preco);
      setImagem(products[index].imagemUrl);
      setPrazo(products[index].prazo);
      setQuantidade(products[index].quantidade);
      setFrete(products[index].frete);
      setCategoria(products[index].categoria);
      setCategoriaId(products[index].categoriaId)
      setEmpresaId(products[index].empresaId);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(!role){
      //window.location.reload()
    }
    else{
      if(role !== "admin" && role !== "empresa" || status === "pendente"){
        // Simulate an HTTP redirect:
        window.location.replace(`http://${ip}:3000/constal#/erro`);
      }
    }
    async function loadCategorias() {
      setLoading(false)
      const categoriasResponse = await api.get("categoria");
      const categoriasDoBack = categoriasResponse.data.rows;
      console.log(categoriasDoBack);
      setCategorias(categoriasDoBack);
      setLoading(false)
    }
    loadCategorias();
  }, []);
  async function loadEmpresa() {
    const response = await api
      .get("empresaStatus?filter%5Bid%5D=" + id)
      .then((response) => {
        return response.data;
      });
    setEmpresas(response.rows);
    console.log("Empresas");
    console.log(response.rows);
  }
  useEffect(() => {
    setLoading(true)
    loadEmpresa();
    async function loadProducts() {
      const response = await api.get("produto");
      setProducts(response.data.rows);
      setLoading(false)
    }
    loadProducts();
  }, []);


  const [usuario, setUsuario] = useState<any>({} as any);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUsuario({
        ...usuario,
        [e.currentTarget.name]: e.currentTarget.value,
      })
      // ele é atualizado dentro mas não fora
      setTimeout(() => {

        const value = parseFloat(localStorage.getItem("preco")!.replace(/\./g, ""))
        // const value = e.currentTarget.value.replace(/\./g, "")
        setPreco(value)
        
        
      }, 1000);
      
    },
    [usuario]
  );

  return (
    <>
      <GlobalStyles />
      <Header />
      <Menu />
      <div className="container">
        <ContentNew>
          <h2>Meus produtos</h2> {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) :false}
          {status == 'active' ?<button onClick={
            () => {
              setShowModal2(true)
            }
            }>Adicionar</button>: ''}
        </ContentNew>
        <GridProdsFour>
          {/* Como pegar os dados dos inputs? => login */}
          {products.map((product, index) => (
            <>
              <ProdContainerSingle>
                {/* {
                  console.log("product")
                }
                {
                  console.log(product)
                } */}
              <Link to={`/produto/${product.id}`}>
                <img src={product.imagemUrl} alt="" />
              </Link>

              
                <div>
                  <h5>{product.nome}</h5>
                  <p>{product.descricao}</p>
                </div>
                <div className="btn-group-add">
                  <span>{product.preco}</span>

                  <div className="btn-group">
                 <button
                      className="delete"
                      onClick={() => deleteProduct(product.id, index)}
                    >
                      <FiTrash2 />
                    </button>

                    <div
                      className="btn-more"
                      onClick={() => {
                        setIndex(index);
                        console.log(index);
                        setProductToReq(product.id);
                        setShowModal1(true);
                        setProductOnClick(index);
                      }}
                    >
                    <AiOutlinePlus />
                    </div>                    
                    <img
                    onClick={() => {
                      setIndex(index);
                      console.log(index);

                      setProductToReq(product.id);
                      setShowModal3(true);
                      setProductOnClick(index);

                    }}
                    style={{ width: "50px", height: '40px', transform: 'translateY(19%)' }}  

                    src="https://colorfitas.com.br/image/cache/catalog/Produtos/Papelaria/Cartazes%20e%20Splashs/SPLASH%20N4-500x500.png" alt="" /> 
                  </div>
                </div>
              </ProdContainerSingle>
            </>
          ))}
          {/* 
          <ProdContainerSingle className="prodAwait">
            <img src={prodfour} alt="" />
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle> */}
        </GridProdsFour>
      </div>

      {
        <ModalContainerVendedor>
          <Modal
            isOpen={showModal1}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setShowModal1(false)}
          >
            <div>
              <ModalFlex>
                <AiOutlineClose onClick={() => setShowModal1(false)} />
              </ModalFlex>
              <ModalContent>
                <img src={upload} alt="" />
                <h3>Alterar produto</h3>

                <ContentFormNew>
                  <label htmlFor="">Nome do produto</label>
                  <input
                    required
                    value={nome}
                    type="text"
                    placeholder="Nome do produto"
                    onChange={(text) => setNome(text.target.value)}
                    // value="5165161"
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Código da empresa</label>
                  <input
                    required
                    value={codigoDaEmpresa}
                    type="text"
                    placeholder="Código da empresa"
                    onChange={(text) => setCodigoDaEmpresa(text.target.value)}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Descrição</label>
                  <input
                    required
                    value={descricao}
                    type="text"
                    placeholder="Descrição"
                    onChange={(text) => setDescricao(text.target.value)}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Características técnicas</label>
                  <input
                  value={caracteristicasTecnicas}
                    required
                    type="text"
                    placeholder="Especificações técnicas"
                    onChange={(text) =>
                      setCaracteristicasTecnicas(text.target.value)
                    }
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Preço</label>
                  <Input
                  name="price"
                  mask="currency"
                  prefix="R$"
                  placeholder="0,01"
                  onChange={handleChange}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">URL da imagem</label>
                  <input
                  value={imagem}
                    required
                    type="text"
                    placeholder="www.imagem/suaimagem.com"
                    onChange={(text) => setImagem(text.target.value)}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Prazo de entrega</label>
                  <input
                  value={prazo}
                    required
                    type="text"
                    placeholder="Prazo de entrega"
                    onChange={(text) => setPrazo(text.target.value)}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Quantidade</label>
                  <input
                  value={quantidade}
                    required
                    type="number"
                    placeholder="Quantidade"
                    onChange={(text) => setQuantidade(text.target.value)}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Tipo de frete</label>
                  <select
                    required
                    onChange={(text) => setFrete(text.target.value)}
                  >
                    <option value="por_categoria">Por Cep</option>
                    <option value="a_combinar">A combinar</option>
                    <option value="retirar">Retirar</option>
                    <option value="gratis">Grátis</option>
                  </select>
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">Tipo de categoria</label>
                  <select onChange={(text) => setCategoria(text.target.value)}>
                    {categorias.map((categoria) => (
                      <option value={categoria.id}>{categoria.nome}</option>
                    ))}
                  </select>
                </ContentFormNew>
                {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
                <div className="buttonsNew">
                  <button type="button" onClick={messageCancel}>
                    Cancelar
                  </button>
                  <button type="button" onClick={() => changeProduct()}>
                    Adicionar
                  </button>
                </div>
              </ModalContent>
            </div>
          </Modal>
        </ModalContainerVendedor>
      }

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
              <img src={upload} alt="" />
              <h3>Novo produto</h3>

              <ContentFormNew>
                <label htmlFor="">Nome do produto</label>
                <input
                value={nome}
                  required
                  type="text"
                  placeholder="Nome do produto"
                  onChange={(text) => setNome(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Código da empresa</label>
                <input
                value={codigoDaEmpresa}
                  required
                  type="text"
                  placeholder="Código da empresa"
                  onChange={(text) => setCodigoDaEmpresa(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Descrição</label>
                <input
                value={descricao}
                  required
                  type="text"
                  placeholder="Descrição"
                  onChange={(text) => setDescricao(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Tipo de categoria</label>
                <select
                  required
                  onChange={(text) => setCategoria(text.target.value)}
                >
                  {categorias.map((categoria) => (
                    <option value={categoria.id}>{categoria.nome}</option>
                  ))}

                </select>
                <Btn
                className="btn-add-category"
                onClick={() => {
                  setShowModal2(false);
                  setShowModal4(true);
                }}
              >
                Não encontrou a sua categoria? adicione uma aqui.
              </Btn>
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Características técnicas</label>
                <textarea
                  required
                  placeholder="Especificações Aaaaa"
                  onChange={(text) =>
                    setCaracteristicasTecnicas(text.target.value)
                  }
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Preço</label>
                {/* <input
                value={preco}
                  required
                  type="number"
                  placeholder="Preço"
                  onChange={(text) => setPreco(text.target.value)}
                /> */}
                <Input
                  name="price"
                  mask="currency"
                  prefix="R$"
                  placeholder="0,01"
                  onChange={handleChange}
                  />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">URL da imagem</label>
                <input
                value={imagem}
                  required
                  type="text"
                  placeholder="www.imagem/suaimagem.com"
                  onChange={(text) => setImagem(text.target.value)}
                />
              </ContentFormNew>

              {/* 
              <ContentFormNew>
                <label htmlFor="">Especificações técnicas</label>
                <input
                value={} type="text" placeholder="Especificações técnicas" />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Cores disponíveis</label>
                <select>
                  <option value="">Verde</option>
                  <option value="">Preto</option>
                  <option value="">Amarelo</option>
                </select>
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Unidades de medida</label>
                <input
                value={} type="text" placeholder="Unidades de medida" />
              </ContentFormNew>
              */}

              <ContentFormNew>
                <label htmlFor="">Prazo de entrega</label>
                <input
                value={prazo}
                  required
                  type="text"
                  placeholder="Prazo de entrega"
                  onChange={(text) => setPrazo(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Quantidade</label>
                <input
                value={quantidade}
                  required
                  type="number"
                  placeholder="Quantidade"
                  onChange={(text) => setQuantidade(text.target.value)}
                />
              </ContentFormNew>

              {/* 

              <ContentFormNew>
                <label htmlFor="">Peso líquido</label>
                <input
                value={} type="text" placeholder="Peso líquido" />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Peso bruto</label>
                <input
                value={} type="text" placeholder="Peso bruto" />
              </ContentFormNew> 
              */}

              <ContentFormNew>
                <label htmlFor="">Tipo de frete</label>
                <select
                  required
                  onChange={(text) => setFrete(text.target.value)}
                >
                  <option value="por_categoria">Por Cep</option>
                  <option value="a_combinar">A combinar</option>
                  <option value="retirar">Retirar</option>
                  <option value="gratis">Grátis</option>
                </select>
              </ContentFormNew>
              {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>
                  Cancelar
                </button>
                <button type="button" onClick={addProduct}>
                  Adicionar
                </button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>

      <ModalContainerVendedor>
        <Modal
          isOpen={showModal3}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Nova promoção</h3>

              
              <ContentFormNew>
                <label htmlFor="">Novo preço</label>
                <input
                value={precoOferta}
                  required
                  type="number"
                  placeholder="650"
                  onChange={(text) => {
                    setPrecoOferta(text.target.value);
                    setIsOferta(true);
                  }}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Porcentagem</label>
                <input required type="number" placeholder="10%" 
                onChange={event => {
                    // @ts-ignore
                    var newValue = preco - (event.target.value * 100)

                    setPrecoOferta(newValue)
                }
                }
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Data de encerramento</label>
                <input
                value={dataEncerramento}
                  required
                  type="date"
                  placeholder="650"
                  onChange={event => setDataEncerramento(event.target.value)}
                />
              </ContentFormNew>

              {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>
                  Cancelar
                </button>
                <button type="button" onClick={addPromotion}>
                  Adicionar
                </button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>

      <ModalContainerVendedor>
        <Modal
          isOpen={showModal4}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} />
            </ModalFlex>

            <ModalContent>
              <h3>Nova Categoria</h3>

              <ContentFormNew>
                <label htmlFor="">Nova Categoria</label>
                <input
                value={categoria}
                  required
                  type="text"
                  placeholder="Computador potente"
                  onChange={(text) => setNewCategoria(text.target.value)}
                />
              </ContentFormNew>
              {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>
                  Cancelar
                </button>
                <button type="button" onClick={addCategoria}>
                  Adicionar
                </button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
