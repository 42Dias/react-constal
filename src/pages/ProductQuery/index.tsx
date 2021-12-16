import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './ProductQuery.styled'
import prodfav from "../../assets/images/prodfav.png"
import { Link } from "react-router-dom"
import { Menu } from "../../components/Menu"
import { useEffect, useState } from "react"
import { api, ip, tenantId } from "../../services/api"
import { Product } from "../../types"
import axios from "axios"
import { toast } from "react-toastify"

function ProductQuery() {
  const [produtos = [], setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get('produto?filter%5Bstatus%5D=pendente')
        .then(response => {
          return response.data;
        })
      setProdutos(response.rows)
      console.log("Produtos");
      console.log(response.rows);

      /*produtos.map((produto)=>(
        console.log(produto)  
    ))*/
    }
    loadUser();

  }, []);
  function aprovarProd(produto: Product) {
    produto.status = "aprovado";
    let response = api.put('produto/' + produto.id, {
      id: produto.id,
      data: produto,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Produto aprovado com sucesso! :)');
        window.location.reload();
      }else{
        toast.error('Ops, não foi possivel aprovar o produto! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar o produto! :(');
      console.log(error)
    })
  }
  function recusarProd(produto: Product) {
    produto.status = "recusado";
    let response = api.put('produto/' + produto.id, {
      id: produto.id,
      data: produto,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Produto recusado com sucesso! :)');
        window.location.reload();
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
          <S.Title>Aprovar Produtos</S.Title>
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
                  <Link 
                    to="/consultar-produtos" 
                    onClick={() => recusarProd(produto)}
                  >
                    Recusar
                  </Link>
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