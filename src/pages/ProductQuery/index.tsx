import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './ProductQuery.styled'
import prodfav from "../../assets/images/prodfav.png"
import { Link } from "react-router-dom"
import { Menu } from "../../components/Menu"
import { useEffect, useState } from "react"
import { api, Email, ip, role, status, tenantId } from "../../services/api"
import { Product } from "../../types"
import axios from "axios"
import { toast } from "react-toastify"
import { ContentFormNew } from "../Profile/styles"
import { SelectInput } from "../Dashboard/Vendas/styles"
/*


  */
function ProductQuery() {
  const [produtos = [], setProdutos] = useState<any[]>([]);
  const [produtosHelp = [], setProdutosHelp] = useState<any[]>([]);
  const [produtoRecusado = [], setProdutoRecusado] = useState<any>();
  const [emailContent = [], setEmailContent] = useState<any>();
  const [loading, setLoading] = useState(false);
  const containerDeObjetos: any = []
  const [produtosDosFornecedores, setProdutosDosFornecedores] = useState([]);
  const fornecedoresNoCarrinho: string[] = []


  async function loadUser() {
    setLoading(true)
    const response = await api.get('produto?filter%5Bstatus%5D=pendente')
      .then(response => {
        setLoading(false)
        console.log(response)
        return response.data.rows;
      })
    setProdutos(response)
    setProdutosHelp(response)
    console.log("Produtos");
    console.log(response);
    const produtosNoCarrinho = response
      
    //adiciona os nomes dos fornecedores numa variavel
      produtosNoCarrinho.filter(
        async (produtoNoCarrinho: any) => {
          if(!fornecedoresNoCarrinho.includes(produtoNoCarrinho.empresa.nome)){
            fornecedoresNoCarrinho.push(produtoNoCarrinho.empresa.nome)
          }
        }
      )
      
    //cria um objeto com o fornecedor e adiciona ao container
      fornecedoresNoCarrinho.map(
        (fornecedor) =>{ 
          const novoObj =  { "fornecedorId": fornecedor, "produtos": [] }
          containerDeObjetos.push(novoObj)
        }
      )
    
      console.log("containerDeObjetos")
      console.log(containerDeObjetos)

      console.log(produtosNoCarrinho)
      console.log(fornecedoresNoCarrinho)

      //responsável por filtrar cada um em si
      containerDeObjetos.map( (fornecedor: any, index: number )=>{
        produtosNoCarrinho.filter(
          (produtoNoCarrinho: any) => {
            if (fornecedor.fornecedorId == produtoNoCarrinho.empresa.nome){
              fornecedor.produtos.push(produtoNoCarrinho)
              fornecedor.produtos.map(
                (produtoDoFornecedor: any) => {
                  produtoDoFornecedor.empresa.nome = fornecedor.fornecedorId
                }
              )
            }
          }
          )
          console.log(fornecedor, index)
        }
        )
        setProdutosDosFornecedores(containerDeObjetos)

    /*produtos.map((produto)=>(
      console.log(produto)  
  ))*/
  console.log(produtosDosFornecedores)
  }
  useEffect(() => {
    if(role !== "admin" && role !== "empresa" || status === "pendente"){
      // Simulate an HTTP redirect:
      window.location.replace(`dev.42dias.com.br/Clientes/constal/#/erro`);
    }  
    loadUser();

  }, []);
  function aprovarProd(produto: Product) {
    toast.info("Processando...")
    produto.status = "aprovado";
    let response = api.put('produtoStatusUpdate/' + produto.id, {
      id: produto.id,
      data: produto,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Produto aprovado com sucesso! :)');
        //window.location.reload();
        loadUser()
      }else{
        toast.error('Ops, não foi possivel aprovar o produto! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar o produto! :(');
      console.log(error)
    })
  }
  function recusarProd(produto: Product) {
    toast.info("Processando...")
    setLoading(true)
    produto.status = "recusado";
    let response = api.put('produtoStatusUpdate/' + produto.id, {
      id: produto.id,
      data: produto,
    }).then((response) => {
      setLoading(false)
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Produto recusado com sucesso! :)');
        loadUser()
        console.log(response)
        axios.post(''+ip+':8157/api/produto/enviarEmailRecusado', {
          userId: produto.empresa.userId,
          product: produto, 
          emailContent: emailContent
        }).then((response) => {
          if(response.status == 200){
            console.log(response)
            toast.info('Email enviado com sucesso! :)')
            setEmailContent('')
          }
          else{
            console.log(response)
            toast.info('Email não foi enviado com sucesso! :(')
          }
        })
      }else{
        toast.error('Ops, não foi possivel recusado o produto! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel recusado o produto! :(');
      console.log(error)
    })
  }

  function filterProductsBySelect(text: any) {
    if(text != 'selecione'){
      produtosDosFornecedores.map(
        (produtoDoFornecedor: any) => {
          if(produtoDoFornecedor.fornecedorId == text){
            setProdutos(produtoDoFornecedor.produtos)
            console.log(produtoDoFornecedor.produtos)
          }
        }
      )
    }
    else{
      setProdutos([...produtosHelp])
      console.log(produtosHelp)

    }
  }
  console.log(produtosHelp)
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <S.CardDatails>
          <S.Title>Aprovar Produtos  {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}</S.Title>
         
          {
              role == 'admin' ? (
            <SelectInput>
              <label htmlFor="">Selecionar Empresa: </label>
              <select
                onChange={(text) => {
                  
                  console.log(text.target.value)
                  if(!text){
                  }
                  filterProductsBySelect(text.target.value)
                }
                  // setProdutos(text.target.value)
                }
              >
                <option value={"selecione"} key={"Selecione"} >Selecione</option>
                {produtosDosFornecedores.map(
                  (empresa: any) => (
                    <option 
                    value={empresa.fornecedorId} 
                    key={empresa.fornecedorId} >
                        {empresa.fornecedorId || empresa.fornecedorId}
                    </option>
                  )
                )}
              </select>
              {loading ? <img width="40px" height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
            </SelectInput>
              ) : (
                false
              )
            }

          {
            produtos.map((produto) => (
              <>
              <S.CardDatailsContent>
                <S.ContentDetails>
                  <img src={produto.imagemUrl} alt="" />
                  <span className="prodNome" >{produto.nome}</span>
                  <p>{produto.quantidade}</p>
                  <p>R$ {produto.preco}</p>
                </S.ContentDetails>
                <S.BtnContent>
                  <Link to="/consultar-produtos" onClick={() => aprovarProd(produto)}>Aprovar</Link>
                  <Link to="/consultar-produtos" onClick={() => recusarProd(produto)}>Recusar</Link>
                </S.BtnContent>
              </S.CardDatailsContent>
                <ContentFormNew 
                style={{backgroundColor: 'white', padding: 15}}>
                  nome da empresa: {produto.empresa.nome}
                  <label style={{color: 'black'}}  htmlFor="">Se recusar, envie um Email para empresa</label>
                  <textarea
                    required
                    placeholder="Resposta"
                    onChange={(text) => setEmailContent(text.target.value)}
                  // value="5165161"
                  />
                </ContentFormNew>

              </>
            ))

          }

        </S.CardDatails>

      </div>
      <S.FooterContainer>
        <Footer />
      </S.FooterContainer>
    </>
  )
}

export default ProductQuery