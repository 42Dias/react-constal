import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './ProductQuery.styled'
import prodfav from "../../assets/images/prodfav.png"
import { Link } from "react-router-dom"
import { Menu } from "../../components/Menu"
import { useEffect, useState } from "react"
import { api, ip, role, status, tenantId } from "../../services/api"
import { Product } from "../../types"
import axios from "axios"
import { toast } from "react-toastify"

function ProductQuery() {
  const [produtos = [], setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadUser() {
    setLoading(true)
    const response = await api.get('produto?filter%5Bstatus%5D=pendente')
      .then(response => {
        setLoading(false)
        return response.data;
      })
    setProdutos(response.rows)
    console.log("Produtos");
    console.log(response.rows);

    /*produtos.map((produto)=>(
      console.log(produto)  
  ))*/
  }
  useEffect(() => {
    if(role !== "admin" && role !== "empresa" || status === "pendente"){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
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
        //window.location.reload();
        loadUser()
      }else{
        toast.error('Ops, não foi possivel recusado o produto! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel recusado o produto! :(');
      console.log(error)
    })
  }
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <S.CardDatails>
          <S.Title>Aprovar Produtos  {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}</S.Title>
         
          {
            produtos.map((produto) => (
              <S.CardDatailsContent>
                <S.ContentDetails>
                  <img src={prodfav} alt="" />
                  <span>{produto.nome}</span>
                  <p>{produto.quantidade}</p>
                  <p>R$ {produto.preco}</p>
                </S.ContentDetails>
                <S.BtnContent>
                  <Link to="/consultar-produtos" onClick={() => aprovarProd(produto)}>Aprovar</Link>
                  <Link to="/consultar-produtos" onClick={() => recusarProd(produto)}>Recusar</Link>
                </S.BtnContent>
              </S.CardDatailsContent>
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