import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FooterContainer, CenterPay, Titleh2, BtnFinish } from "./styles";
import { api, ip, role } from "../../services/api";
import axios from 'axios';
import { Menu } from "../../components/Menu";
import { useEffect, useState } from "react";

let token = localStorage.getItem("token")?.replace(/"/g, "");
const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";


/*          PARA CRIAR A FATURA!!!
            /tenant/:tenantId/pedido/:id/fatura
*/
export default function PayCart() {
  const [produtosDosFornecedores, setProdutosDosFornecedores] = useState([]);
  

  useEffect(() => {
    if(role != 'pessoa'){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
    }
    
    async function gerarFornecedores(){
      const fornecedoresNoCarrinho: string[] = []
      const produtosNoCarrinhoResponse: any = await api.get('/carrinho/') 
      const produtosNoCarrinho = produtosNoCarrinhoResponse.data.rows
      
      produtosNoCarrinho.filter(
        async (produtoNoCarrinho: any) => {
          if(!fornecedoresNoCarrinho.includes(produtoNoCarrinho.fornecedorId)){
            fornecedoresNoCarrinho.push(produtoNoCarrinho.fornecedorId)
          }
        }
      )
      const containerDeObjetos: any = []

      fornecedoresNoCarrinho.map(
        (fornecedor) =>{ 
          const novoObj =  { "fornecedorId": fornecedor, "produtos": [] }
          containerDeObjetos.push(novoObj)
        }
      )
    
      console.log(containerDeObjetos)


      console.log(produtosNoCarrinho)
      console.log(fornecedoresNoCarrinho)

      containerDeObjetos.map( (fornecedor: any, index: number )=>{
        produtosNoCarrinho.filter(
          (produtoNoCarrinho: any) => {
            if (fornecedor.fornecedorId == produtoNoCarrinho.fornecedorId){
              fornecedor.produtos.push(produtoNoCarrinho)
              fornecedor.produtos.map(
                (produtoDoFornecedor: any) => {
                  produtoDoFornecedor.fornecedorId = fornecedor.fornecedorId
                }
              )
            }
          }
        )
        console.log(fornecedor, index)
      }
      )
      gerarPedido()
      setProdutosDosFornecedores(containerDeObjetos)
    }
      gerarFornecedores()

    async function gerarPedido() {
      /*PASSA O CARRINHO COMO PARÂMETRO DO AXIOS COMO POST*/
      console.log("Começou, VAI!")
      produtosDosFornecedores.map(
        async (produtoDoFornecedor) => {
          const response = await axios({
            method: 'post',
            url: `http://localhost:8157/api/tenant/${tenantId}/pedido`,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            },              
            timeout: 50000,
            data   : produtoDoFornecedor  
          })
          console.log(response)
        }
      )        /*
        Cria os pedidos pelo id do fornecedor
        há uma variavel produtos, fazer o map de acordo com o id da empresa
        e assim fazer a requisição
        */
    }


    async function deletarCarrinho() {
      const deletarCarrinho: any = await api.delete('/carrinho/') 
      console.log(deletarCarrinho)
    }
    //deletarCarrinho()
  }, []
  )
  

    return (
      <>
        <Header />
        <Menu />
          <div className="container">
            <Titleh2>Como prefere pagar?</Titleh2>
            <CenterPay>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Pix</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Cartão de crédito</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              <div className="input">
                <input type="checkbox" name="" id="" />
                <div>
                  <h2>Boleto</h2>
                  <p>Aprovado em 1 ou 2 dias úteis após pagamento</p>
                </div>
              </div>
            </CenterPay>
            <BtnFinish>
              <Link to="/finalizar">Finalizar</Link>
            </BtnFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
