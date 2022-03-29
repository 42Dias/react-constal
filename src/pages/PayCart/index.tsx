import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FooterContainer, CenterPay, Titleh2, BtnFinish } from "./styles";
import { api, id, ip, role } from "../../services/api";
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
  const [formaDePagamento, setFormaDePagamento] = useState("");
  // const [produtosNoCarrinho, setProdutosNoCarrinho] = useState([]);
  var produtosNoCarinho: any;

  async function gerarFornecedores(){
    setLoading(true)
    const fornecedoresNoCarrinho: string[] = []
    const produtosNoCarrinhoResponse: any = await api.get('/carrinho/').then((response)=>{
      // console.log("response.data.rows")
      // console.log(response.data.rows)

      produtosNoCarinho = response.data.rows
    
      makeMagic()
      
    }
   
    )} 


  useEffect(() => {
    if(role != 'pessoa'){
      window.location.replace(`${ip}/constal#/erro`);
    }
    
    }, []
    )
    
    async function deletarCarrinho() {
      const deletarCarrinho: any = await api.delete('/carrinho/') 
      // console.log(deletarCarrinho)
    }
    // deletarCarrinho()

  async function gerarPedido() {

    produtosNoCarinho.compradorUserId = id

    
    // console.log("Começou")
    // console.log(produtosNoCarinho)
    axios({
      method: 'post',
      url: `${ip}:8157/api/tenant/${tenantId}/pedido-newfatura`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
      data: {
        data:{
          fornecedores: {
            produtosNoCarinho
          }
        }
      }              
    }).then(
      (response) => {
        let url = response.data.urlFaturaIugu
        // console.log('url') 
        // console.log(url)
        
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

      
        toast.info("Gerando fatura...")
        
        
      } 
      
      

    
    async function makeMagic() {
      setLoading(true)
      gerarPedido()
      // createNewFatura()
      
    }

    
    return (
      <>
        <Header />
        <Menu />
        <div className="container">
            <Titleh2>Formas de pagamentos</Titleh2>
            <CenterPay>
              <div>{
              loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'} alt="Loading" /> : 
             false}</div>
              <div className="input">
                <input type="radio" name="forma-pag" id="pix"
                 onClick={
                    () => {
                      setFormaDePagamento('pix')
                    console.log(formaDePagamento)
                    }
                  }
                />
                <div>
                  <h2>Pix</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div> 
              <div className="input">
                <input type="radio" name="forma-pag" id="boleto"
                  onClick={
                    () => {
                    // formaDePagamento = 'boleto'
                    setFormaDePagamento('boleto')
                    console.log(formaDePagamento)
                    console.log(produtosDosFornecedores)
                    console.log(ids)
                    }
                  }
                
                />
                <div>
                  <h2>Boleto</h2>
                  <p>Aprovado em 1 ou 2 dias úteis após pagamento</p>
                </div>
              </div>

              <div className="input">
                <input type="radio" name="forma-pag" id="cartao" 
                onClick={
                  () => {
                    setFormaDePagamento('cartao')
                    // formaDePagamento = 'cartao'
                    console.log(formaDePagamento)
                  }
                }
              />
                <div>
                  <h2>Cartão de crédito</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>
              
            </CenterPay>
            <BtnFinish>
            {loading ?
            (
              <img
                width="40px"
                style={{margin: 'auto'}}
                height=""
                src={'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'}
                alt="Loading" /> 
              ) : (
              <Btn
              onClick={
                () => {
                  makeMagic()
                }
              }
            >Finalizar</Btn>) }
            </BtnFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
