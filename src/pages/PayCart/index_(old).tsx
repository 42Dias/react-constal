import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FooterContainer, CenterPay, Titleh2, BtnFinish } from "./styles";
import { api, ip, role } from "../../services/api";
import axios from 'axios';
import { Menu } from "../../components/Menu";
import { useEffect, useState } from "react";
import { Btn } from "../Dashboard/PersonalData/styles";
import { toast } from "react-toastify";

let token = localStorage.getItem("token")?.replace(/"/g, "");
const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";
const containerDeObjetos: any = []

export default function PayCart() {
  const [produtosDosFornecedores, setProdutosDosFornecedores] = useState([]);
  const [ids = [], setIds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(role != 'pessoa'){
      window.location.replace(`${ip}/constal#/erro`);
    }
    
    async function gerarFornecedores(){
      setLoading(true)
      const fornecedoresNoCarrinho: string[] = []
      const produtosNoCarrinhoResponse: any = await api.get('/carrinho/').then((response)=>{
        const produtosNoCarrinho = response.data.rows
      
      produtosNoCarrinho.filter(
        async (produtoNoCarrinho: any) => {
          if(!fornecedoresNoCarrinho.includes(produtoNoCarrinho.fornecedorId)){
            fornecedoresNoCarrinho.push(produtoNoCarrinho.fornecedorId)
          }
        }
      )
      

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
        setProdutosDosFornecedores(containerDeObjetos)
        makeMagic()
        
      }
     
      )} 
       gerarFornecedores() 
    }, []
    )
    
    async function deletarCarrinho() {
      const deletarCarrinho: any = await api.delete('/carrinho/') 
      console.log(deletarCarrinho)
    }
    // deletarCarrinho()

  async function gerarPedido() {
    
    /*PASSA O CARRINHO COMO PARÂMETRO DO AXIOS COMO POST*/
    console.log("Começou, VAI!")
    console.log(produtosDosFornecedores)
    containerDeObjetos.map(
      async (produtoDoFornecedor: any) => {
        produtoDoFornecedor.formaPagemento = formaDePagamento
        const response = await axios({
          method: 'post',
          url: `${ip}:8157/api/tenant/${tenantId}/pedido`,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
          },              
          timeout: 50000,
          data   : produtoDoFornecedor  
        }).then(
          (response) => {
            setTimeout(() => {
              axios({
                method: 'post',
                url: `${ip}:8157/api/tenant/${tenantId}/pedido/${response.data.id}/fatura`,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ token
                },              
                timeout: 50000
              }).then(
                (response) => {
                  let url = response.data.urlFaturaIugu
                 console.log('url') 
                 console.log(url)
                 
                  if(url === undefined){
                    toast.error("Não foi possivel gerar a fatura, confira os seu dados pessoais!")
                  }else{
                    window.open(url, '_blank')?.focus();
                    window.location.replace(`https://projetos.42dias.com.br/constal/#/finalizar`)
                  }
                  setLoading(false)
                }
              ).catch((error)=>{
                toast.error(error)
                setLoading(false)
              })
              /*.then(
                () =>  window.location.replace(`https://projetos.42dias.com.br/constal/#/finalizar`)
              )*/
              console.log(response)

            }, 3000);

            // setIds(prevValues => {
            //   return [...new Set([...prevValues,  response.data.id])]	
            // })
          }).catch((error)=>{
            toast.error(error)
            setLoading(false)
          })
        
        
        console.log(response)
        toast.info("Gerando fatura...")
        
        
      }
    ) 
      /*
      Cria os pedidos pelo id do fornecedor
      há uma variavel produtos, fazer o map de acordo com o id da empresa
      e assim fazer a requisição
      */
      
  }
  async function reduceStock(){
    /*
    
    para reduzir no estoque?
    fazer uma nova rota??

    
    
    */
    // ids.map(
    //   async (id) => {
    //     const response = await axios({
    //       method: 'get',
    //       url: `${ip}:8157/api/tenant/${tenantId}/produto/${id}`,
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer '+ token
    //       },              
    //       timeout: 50000,
    //       // data   : produtoDoFornecedor
    //     })
    //     console.log(response)
    //   } 
    // )
  }


  
  
  async function createNewFatura() {
    console.log(ids)
    ids.map(
      async (id) => {
        const response = await axios({
          method: 'post',
          url: `${ip}:8157/api/tenant/${tenantId}/pedido/${id}/fatura`,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
          },              
          timeout: 50000
        })
        console.log(response)
        
        let url = response.data.urlFaturaIugu
        window.open(url, '_blank')?.focus();
      }
      ) 
      
    }
    
    async function makeMagic() {
      setLoading(true)
      gerarPedido()
      // createNewFatura()
      
    }

    let formaDePagamento: string;
    
    return (
      <>
        <Header />
        <Menu />
          <div className="container">
            <Titleh2>Formas de pagamentos</Titleh2>
            <CenterPay>
              <div>Carregando formas de pagamentos...{loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : 
             false}</div>
              {/*<div className="input">
                {/*<input type="checkbox" name="" id=""
                  onClick={
                    () => {
                      formaDePagamento = 'pix'
                    console.log(formaDePagamento)
                    }
                  }
                />
                <img src="https://jsaonthego.com/wp-content/uploads/2021/08/pre-start-onthego-transparent-256px.png" style={{width: '30px'}}></img>
                <div>
                  <h2>Pix</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div> 
              <div className="input">
                {/*<input type="checkbox" name="" id="" 
                onClick={
                  () => {
                    formaDePagamento = 'cartao'
                    console.log(formaDePagamento)
                  }
                }
              />
              <img src="https://jsaonthego.com/wp-content/uploads/2021/08/pre-start-onthego-transparent-256px.png" style={{width: '30px'}}></img>
                <div>
                  <h2>Cartão de crédito</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              <div className="input">
                {/*<input type="checkbox" name="" id=""
                  onClick={
                    () => {
                      formaDePagamento = 'boleto'
                    console.log(formaDePagamento)
                    console.log(produtosDosFornecedores)
                    console.log(ids)
                    }
                  }
                
                />
                <img src="https://jsaonthego.com/wp-content/uploads/2021/08/pre-start-onthego-transparent-256px.png" style={{width: '30px'}}></img>
                <div>
                  <h2>Boleto</h2>
                  <p>Aprovado em 1 ou 2 dias úteis após pagamento</p>
                </div>
              </div>*/}
            </CenterPay>
            <BtnFinish>
            {/*loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : 
              /*<Btn
              onClick={
                () => {
                  makeMagic()
                }
              }
            >Finalizar</Btn> false*/}
            </BtnFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
