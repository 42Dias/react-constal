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
import Loading from "../../components/Loading";

let token = localStorage.getItem("token")?.replace(/"/g, "");
const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";
const containerDeObjetos: any = []

export default function PayCart() {
  const [produtosDosFornecedores, setProdutosDosFornecedores] = useState([]);
  const [ids = [], setIds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // const [produtosNoCarrinho, setProdutosNoCarrinho] = useState([]);
  var produtosNoCarinho: any;


  useEffect(() => {
    if(role != 'pessoa'){
      window.location.replace(`${ip}/constal#/erro`);
    }
    
    async function gerarFornecedores(){
      setLoading(true)
      const fornecedoresNoCarrinho: string[] = []
      const produtosNoCarrinhoResponse: any = await api.get('/carrinho/').then((response)=>{
        console.log("response.data.rows")
        console.log(response.data.rows)

        produtosNoCarinho = response.data.rows
      
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

    produtosNoCarinho.compradorUserId = id

    
    console.log("Começou")
    console.log(produtosNoCarinho)
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

      
        toast.info("Gerando fatura...")
        
        
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
              <div>Carregando formas de pagamentos... <Loading loading={loading}/></div>
            </CenterPay>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
