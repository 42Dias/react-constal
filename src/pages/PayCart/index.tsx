import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FooterContainer, CenterPay, Titleh2, BtnFinish } from "./styles";
import { api } from "../../services/api";
import axios from 'axios';
import { Menu } from "../../components/Menu";

let token = localStorage.getItem("token")?.replace(/"/g, "");
const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";


/*          PARA CRIAR A FATURA!!!
            /tenant/:tenantId/pedido/:id/fatura
*/


export default function PayCart() {
  
  async function gerarPedido(){
      const produtosNoCarrinho: any = await api.get('tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/carrinho/') 
      produtosNoCarrinho.data.rows.map(
        async (produtoNoCarrinho: any) => {
            console.log("CARRINHO")
            /*PASSA O CARRINHO COMO PARÂMETRO DO AXIOS COMO POST
            */
            const response = await axios({
              method: 'post',
              url: `http://localhost:8157/api/tenant/${tenantId}/pedido`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },              
              timeout: 50000,
              data   :  produtoNoCarrinho 
            })
        }
      )
    }
    gerarPedido()

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
