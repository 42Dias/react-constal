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
import upload from "../../../assets/images/upload.png";
import Header from "../../../components/Header";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Menu } from "../../../components/Menu";
import { formatPrice } from "../../../util/format";
import axios from "axios";
import { Empresa, Product } from "../../../types";
import { api, id, ip, role, status } from "../../../services/api";
import { Btn } from "./styles";

//@ts-ignore
import IntlCurrencyInput from "react-intl-currency-input"



import Input from '../../../util/Input'

// @ts-ignore
import CurrencyInput from 'react-currency-masked-input'

// @ts-ignore
import { default as NumberFormat } from 'react-number-format';
import { Link } from "react-router-dom";
import moment from "moment";

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
  const [statusProd, setStatusProd] = useState<any>();
  
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  
  const [isOferta, setIsOferta] = useState(false);
  const [precoOferta, setPrecoOferta] = useState<any>();
  const [empresaId, setEmpresaId] = useState("");
  
  const [newCategoria, setNewCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataEncerramento, setDataEncerramento] = useState<any>();
  const [categoriaId, setCategoriaId] = useState<any>();
  
  const [handleChangePrice, setHandleChangePrice] = useState<any>();

  const [handleChangePriceOferta, setHandleChangePriceOferta] = useState<any>();


  const [compararProd, setCompararProd] = useState<any>();
  const [porcentagem, setPorcentagem] = useState<any>("");
  

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
      "Ação efetuada com sucesso! :)"
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
        categoriaId: categoriaId,
        imagemUrl: imagem,
        status: "pendente",
      },
    };
    console.log(data)

    return data;
  }

  async function addProduct(e: any) {
    e.preventDefault()
    setLoading(true)
    const data = setValues();
    const response: any = await api.post("produto", data).then((response) => {
      console.log(response)
      if (response.status == 200) {
        messageApprove();
        toast.info(
          "Eba, estamos avaliando seu produto. Assim que aprovado estará na plataforma :)"
        );
        closeModal()
        setProducts(prevProducts => {
          return [...new Set([...prevProducts, response.data])]
        })
        console.log(response)
        //window.location.reload();
        setLoading(false)
      } else {
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
      return response.data

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

    return response
      }
    )
    .catch(error =>{
        toast.error("Algo deu errado, tente mais tarde :(");      
        setLoading(false)

      });
      return response
  }


  async function changeProduct(e: any) {
    e.preventDefault()
    let data;
    console.log(compararProd.nome != nome)
    if(
      compararProd.nome != nome ||
      compararProd.descricao != descricao ||
      compararProd.caracteristicasTecnicas != caracteristicasTecnicas ||
      compararProd.imagemUrl != imagem
    ){
      data = {
        data: {
          id: idProd,
          nome: nome,
          codigo: codigoDaEmpresa,
          descricao: descricao,
          caracteristicasTecnicas: caracteristicasTecnicas,
          preco: preco,
          prazo: prazo,
          frete: frete,
          quantidadeNoEstoque: quantidade,
          empresaId: empresaId,
          // categoria: categoria,
          categoriaId: categoriaId,
          imagemUrl: imagem,
          status: 'pendente',
        },
      };
    }
    else{
      data = {
        data: {
          id: idProd,
          nome: nome,
          codigo: codigoDaEmpresa,
          descricao: descricao,
          caracteristicasTecnicas: caracteristicasTecnicas,
          preco: preco,
          prazo: prazo,
          frete: frete,
          quantidadeNoEstoque: quantidade,
          empresaId: empresaId,
          // categoria: categoria,
          categoriaId: categoriaId,
          imagemUrl: imagem,
          status: statusProd,
        },
      };
    }

    console.log("data")
    console.log(data);
    const prod = await makeRequisitionToChange(data);
    let updatedProducts = [...products]
    console.log(prod)
    updatedProducts[index].nome = prod.nome
    updatedProducts[index].codigo = prod.codigo
    updatedProducts[index].descricao = prod.descricao
    updatedProducts[index].preco = prod.preco
    updatedProducts[index].quantidadeNoEstoque = prod.quantidadeNoEstoque
    updatedProducts[index].imagemUrl = prod.imagemUrl
    updatedProducts[index].status = prod.status
    updatedProducts[index].caracteristicasTecnicas = prod.caracteristicasTecnicas
    setProducts(updatedProducts) 
  }
  async function addPromotion(e: any) {
    e.preventDefault()
    let now = new Date
    let dataPassed = new Date(dataEncerramento)
    if(dataPassed < now){
      toast.error("Data inválida :(")
      return
    }
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
        frete: frete,
        quantidadeNoEstoque: quantidade,
        // categoria: categoria,
        categoriaId: categoriaId,
        empresaId: empresaId,
        imagemUrl: imagem,
        isOferta: true,
        precoOferta: precoOferta,
        promocaoEncerramento: dataEncerramento,
        promocaoId: uuid.v4(),
      },
    };
    makeRequisitionToChange(data).then(
      () => {
        window.location.hash = '#/promocoes'
      }
    );
  }

  async function addCategoria(e: any) {
    e.preventDefault()
    setLoading(true)
    const data = {
      data: {
        nome: newCategoria,
        status: "pendente",
      },
    };
    const response = await api.post("categoria", data).then(
      (response) => {
        console.log(response)
        response.status == 200 ? toast.info("A sua categoria será revisada e logo entrará no sistema :)"): toast.error("Algo deu errado, tente mais tarde :(")
        closeModal()
        setLoading(false)
      }
    )
    console.log(response);
    // console.log(newCategoria)
  }

  async function deleteProduct(prodId: any, index: number) {
    setLoading(true)
    const response = await api.delete(`produtoDeleteOne/${prodId}`);
    if (response.status == 200) {
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
      setCodigoDaEmpresa(products[index].codigo);
      setDescricao(products[index].descricao);
      setCaracteristicasTecnicas(products[index].caracteristicasTecnicas);
      setPreco(products[index].preco);
      setImagem(products[index].imagemUrl);
      setPrazo(products[index].prazo);
      setQuantidade(products[index].quantidadeNoEstoque);
      setFrete(products[index].frete);
      setCategoria(products[index].categoria.id);
      console.log("ESSA É A CATEGORIA AHAHAHAHAHAHHAHAHAHAHAAHAHAHAH")
      console.log(products[index].categoria.id)
      console.log(products[index].categoria.nome)
      setCategoriaId(products[index].categoriaId)
      setEmpresaId(products[index].empresaId);
      setStatusProd(products[index].status);
      setHandleChangePrice(formatPrice(products[index].preco))
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!role) {
      // window.location.reload()
    }
    else {
      if (role !== "admin" && role !== "empresa" || status === "pendente") {
        // Simulate an HTTP redirect:
        window.location.replace(`${ip}/#/erro`);
      }
    }
    async function loadCategorias() {
      setLoading(false)
      const categoriasResponse = await api.get('categoria?filter%5Bstatus%5D=aprovado');
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
    loadProducts();
  }, []);

  async function loadProducts() {
        const response = await api.get("produto");
        setProducts(response.data.rows);
        setLoading(false)
      }

  const [usuario, setUsuario] = useState<any>({} as any);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUsuario({
        ...usuario,
        [e.currentTarget.name]: e.currentTarget.value,
      })
      // ele é atualizado dentro mas não fora
      setTimeout(() => {

        // setHandleChangePrice(localStorage.getItem("preco")!)
        const value = parseFloat(localStorage.getItem("preco")!.replace(/\./g, ""))
        // const value = e.currentTarget.value.replace(/\./g, "")
        setPreco(value)
        

      }, 1000);
      
    },
    [usuario]
  );

    // @ts-ignore
    String.prototype.replaceAt = function(index: number, replacement: string) {
      if (index >= this.length) {
          return this.valueOf();
      }
   
      var chars = this.split('');
      chars[index] = replacement;
      return chars.join('');
  }

  function parseAFormatedNumber(text: any){
        //pega a string de "R$ 0,00" e tenta transforma-la em um float
        let newText = text
        .replaceAt(text.length-3, '*')
        .replace(/\./g, "")
        .replace(/R\$/g, "")
        .replace(/\*/g, ".")
        .replaceAll(" ", "")

        console.log(parseFloat(newText))


        //checa se a conversão é NaN, ocasionado quando se é passado um caracter que não seja numero
        if(Number.isNaN(parseFloat(newText))){
          console.log(newText)
          newText = 0.00 // transforma o numero para ser devolvido ao input
        }


        return parseFloat(newText)
  }

  function handlePriceOnMask(text: any){
    
    //pega a string de "R$ 0,00" e tenta transforma-la em um float
    let newText = parseAFormatedNumber(text)

    //Transforma o numero novamente em string, para devolver ao input

    return formatPrice(newText)
  }
  //apenas fazer outra funçãozinha para setar o esse input com o valor quando for alterado!!!


  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };
  
    const handleChangea = (event: any, value: any, maskedValue: any) => {
      event.preventDefault();
  
      setPreco(value); // value without mask (ex: 1234.56)
      setHandleChangePrice(maskedValue); // masked value (ex: R$1234,56)
    };

    const handleChangeb = (event: any, value: any, maskedValue: any) => {
      event.preventDefault();
  
      setPrecoOferta(value); // value without mask (ex: 1234.56)
      setHandleChangePriceOferta(maskedValue); // masked value (ex: R$1234,56)
    };
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
              src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
              alt="Loading"
            />
          ) : false}
          {status === 'active' ? <button onClick={
            () => {
              setId("");
              setNome("");
              setCodigoDaEmpresa("");
              setDescricao("");
              setCaracteristicasTecnicas("");
              setPreco("");
              setImagem("");
              setPrazo("");
              setQuantidade("");
              setFrete("");
              setCategoria("");
              setCategoriaId("")
              setEmpresaId("");
              setStatusProd("");
              setHandleChangePrice("")

              setShowModal2(true)
            }
          }>Adicionar</button> : ''}
        </ContentNew>
        <GridProdsFour>
          {/* Como pegar os dados dos inputs? => login */}
          {products.map((product, index) => (
            <>
              <ProdContainerSingle
              // style={{opacity: 0.65}}
              >
              <Link
              style={{opacity: product.status != 'aprovado' ?  0.3 :  1}} 
              to={`/produto/${product.id}`}>
                <img src={product.imagemUrl} alt="" />
              </Link>

              
                <div
                style={{opacity: product.status != 'aprovado' ?  0.3 :  1}}>
                  <h5>{product.nome}</h5>
                  <p>{product.descricao}</p>
                  <p>
                     <b>QTD: {product.quantidadeNoEstoque}</b>
                  </p>
                </div>
                <div 
                className="btn-group-add">
                  <span style={{opacity: product.status != 'aprovado' ?  0.3 :  1}} > {formatPrice(product.preco)} </span>

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
                        setCompararProd(products[index])
                        setProductToReq(product.id);
                        setShowModal1(true);
                        setProductOnClick(index);
                      }}
                    >
                    <AiOutlinePlus />
                    </div>      
                    {                    
                    product.status == 'aprovado' ?  (
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
                    ) :  false              
                    }
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
            onRequestClose={() => {
              setShowModal1(false)
            }}
          >
            <div>
              <ModalFlex>
                <AiOutlineClose onClick={() => setShowModal1(false)} />
              </ModalFlex>
              <ModalContent
              onSubmit={(e) => changeProduct(e)}
              >
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
                  {/* <input 
                  type="text"
                  placeholder="R$ 00,00"
                  value={handleChangePrice}
                  // type='number'
                  // pattern="[0-9]+"
                  onChange={(text: any) => {
                    // ESTÁ MANDANDO COM ESPAÇO NO PRIMEIRO CARACTER
                    setHandleChangePrice(handlePriceOnMask(text.target.value))
                    setPreco(parseAFormatedNumber(handlePriceOnMask(text.target.value)))
                  }} /> */}
                  <IntlCurrencyInput 
                  currency="BRL" 
                  config={currencyConfig}
                  onChange={handleChangea} 
                  value={handleChangePrice}
                  />
                </ContentFormNew>

                <ContentFormNew>
                  <label htmlFor="">URL da imagem</label>
                  <p
                      style={{margin: 'auto'}}
                      >
                        Imagem deve estar em 263 X 146 PX
                  </p>
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
                  <select
                  value={categoria}
                  required 
                  onChange={(text) => {
                    setCategoria(text.target.value);
                    console.log(text.target.value);
                    setCategoriaId(text.target.value);
                    }
                    }>
                    {categorias.map((categoria) => (
                      <option
                      onClick={(text) => {
                        //@ts-ignore
                        setCategoria(text.target.value);
                        //@ts-ignore
                        console.log(text.target.value);
                        //@ts-ignore
                        setCategoriaId(text.target.value);}
                      } 
                      value={categoria.id}>{categoria.nome}</option>
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
                {loading ? (
                  <img
                    width="40px"
                    style={{ margin: "auto" }}
                    height=""
                    src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                    alt="Loading"
                  />
                ) : false}
                <div className="buttonsNew">
                  <button type="button" onClick={messageCancel}>
                    Cancelar
                  </button>
                  <button type="submit" onSubmit={(e) => changeProduct(e)}>
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

            <ModalContent
            onSubmit={addProduct}
            >
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
                  onChange={(text) => {
                    setCategoria(text.target.value);
                    console.log(text.target.value);
                    setCategoriaId(text.target.value);
                    }
                    }>
                    {categorias.map((categoria) => (
                      <option
                      onClick={(text) => {
                        //@ts-ignore
                        setCategoria(text.target.value);
                        //@ts-ignore
                        console.log(text.target.value);
                        //@ts-ignore
                        setCategoriaId(text.target.value);}
                      } 
                      value={categoria.id}>{categoria.nome}</option>
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
                  placeholder="Especificações"
                  onChange={(text) =>
                    setCaracteristicasTecnicas(text.target.value)
                  }
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Preço</label>
                {/* <input 
                  type="text"
                  placeholder="R$ 00,00"
                  value={handleChangePrice}
                  // type='number'
                  // pattern="[0-9]+"
                  onChange={(text: any) => {
                    // ESTÁ MANDANDO COM ESPAÇO NO PRIMEIRO CARACTER
                    setHandleChangePrice(handlePriceOnMask(text.target.value))
                    setPreco(parseAFormatedNumber(handlePriceOnMask(text.target.value)))
                  }} /> */}
                  <IntlCurrencyInput 
                  currency="BRL" 
                  config={currencyConfig}
                  onChange={handleChangea} 
                  value={handleChangePrice}
                  />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">URL da imagem</label>
                <p
                      style={{margin: 'auto'}}
                      >
                        Imagem deve estar em 263 X 146 PX
                  </p>
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
                  src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                  alt="Loading"
                />
              ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={messageCancel}>
                  Cancelar
                </button>
                <button type="submit" onSubmit={addProduct}>
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

            <ModalContent
             onSubmit={addPromotion}
            >
              <h3>Nova promoção</h3>


              <ContentFormNew>
                <label htmlFor="">Novo preço</label>
                {/* <input 
                  required
                  type="text"
                  placeholder="R$ 00,00"
                  value={handleChangePrice}
                  // type='number'
                  // pattern="[0-9]+"
                  onChange={(text: any) => {
                    // ESTÁ MANDANDO COM ESPAÇO NO PRIMEIRO CARACTER
                    setHandleChangePrice(handlePriceOnMask(text.target.value))
                    setPrecoOferta(parseAFormatedNumber(handlePriceOnMask(text.target.value)))
                    console.log(precoOferta)
                  }} /> */}
                  <IntlCurrencyInput 
                  currency="BRL" 
                  config={currencyConfig}
                  onChange={handleChangeb} 
                  value={handleChangePriceOferta}
                  />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Porcentagem</label>
                <input
                required
                type="number" 
                value={porcentagem}
                min="1" max="100" step="0.1"
                // type="range" id="points" name="points" min="0" max="100"
                placeholder="10%" 
                onChange={(event: any) => {
                  console.log("event.target.value")
                  console.log(event.target.value)
                  if(event.target.value == ''){
                    event.target.value = 0
                  }

                    if(event.target.value){
                      // @ts-ignore
                      let porcentagem:any  = parseInt(event.target.value)
                      // @ts-ignore
                      if(porcentagem < 100 && porcentagem >= 0 ){
                        // @ts-ignore
                        var newPreco = preco - (event.target.value / 100) * preco
                        console.log(newPreco)
                        setPorcentagem(event.target.value)
                        setHandleChangePriceOferta(formatPrice(newPreco))
                        setPrecoOferta(newPreco)
                      }
                      else{
                        toast.error("Inválido!")
                        
                      }
                    }
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
                  placeholder="01/03/2024"
                  onChange={event => {
                    console.log(event.target.value)
                    let now = new Date
                    let dataPassed = new Date(event.target.value)
                    console.log(dataPassed)
                    if(dataPassed > now){
                      toast.info("Data válida :)")
                    }
                    else{
                      toast.error("Data inválida :(")
                    }
                  setDataEncerramento(event.target.value)
                  }}
                />
              </ContentFormNew> 

              {loading ? (
                <img
                  width="40px"
                  style={{ margin: "auto" }}
                  height=""
                  src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                  alt="Loading"
                />
              ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={() => {
                    messageCancel()
                    closeModal()
                  }}>
                  Cancelar
                </button>
                <button type="submit" onSubmit={addPromotion}>
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

            <ModalContent
            onSubmit={addCategoria}
            >
              <h3>Nova Categoria</h3>

              <ContentFormNew>
                <label htmlFor="">Nova Categoria</label>
                <input
                  required
                  value={newCategoria}
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
                  src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                  alt="Loading"
                />
              ) : false}
              <div className="buttonsNew">
                <button type="button" onClick={
                  () => {
                    messageCancel()
                    closeModal()
                  }
                  }>
                  Cancelar
                </button>
                <button type="submit" onSubmit={addCategoria}>
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
