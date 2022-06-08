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

import { useCreditCard } from "../../contexts/CreditCardContext";
import Form from "react-bootstrap/Form";
import { convertToObject } from "typescript";


import QRCode from "react-qr-code";

import handleCovertDate from "../../utils/handleCovertDate"
import { setTimeout } from "timers";

export default function PayCart() {
  const { getCreditCards, creditCardList, } = useCreditCard();


  const [produtosDosFornecedores, setProdutosDosFornecedores] = useState([]);
  const [formaDePagamento       , setFormaDePagamento       ] = useState(0);
  const [returnedApiData        , setReturnedApiData        ] = useState<any>({});
  const [ids    , setIds    ] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [card  ,  setCard   ] = useState({});

  var produtosNoCarinho: any;

  async function gerarFornecedores(){
    setLoading(true)
    const fornecedoresNoCarrinho: string[] = []
    const produtosNoCarrinhoResponse: any = await api.get('/carrinho/').then((response)=>{


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
    toast.info("Gerando fatura...")


    produtosNoCarinho.compradorUserId = id
    await api.post('pedido-newfatura', {
      
        data:{
          fornecedores: {
            produtosNoCarinho
          },
          formaPagamento: formaDePagamento,
          cartao: card,
        }
    })
    .then(
      (response) => {

        console.log(response)
        
        let id = response.data.id
        
        if(id === undefined){
          toast.error("Não foi possivel gerar a fatura, confira os seu dados pessoais!")
          return setLoading(false)
        }

        const dataFromApi = response.data.apiResponse

        setReturnedApiData(dataFromApi)

        toast.info("Fatura paga com sucesso!")

        if( dataFromApi && formaDePagamento == 3){
          setTimeout(() => {
            window.location.hash = '#/finalizar'
          }, 1000);
        }

        setLoading(false)
      }
    )
    .catch((error)=>{
      toast.error(error)
      setLoading(false)
    })

      } 
      
      

    
    async function makeMagic() {
      setLoading(true)
      gerarPedido()
      // createNewFatura()
      
    }

    useEffect(
      () => {


      }, []
    )

    console.log(returnedApiData)

    
    return (
      <>
        <Header />
        <Menu />

          <div>
          {
          formaDePagamento != 3 && returnedApiData.success ? (
            <div className="container">
            <h2> Para pagar:</h2>
            {
            (formaDePagamento == 5 && returnedApiData.pedido.qrCodePix)&& (
              <CenterPay>
              <h3>Você escolheu PIX</h3>
              <QRCode level="L" value={returnedApiData.pedido.qrCodePix}/>
              {/* <p>QR Code do PIX:  <br/> {returnedApiData.pedido.qrCodePix}</p> */}
              <p>Validade: {returnedApiData.pedido.validadePix}</p>
              </CenterPay>
            )
            }

            {
            (formaDePagamento == 1  && returnedApiData.pedido.boleto) && (
              <CenterPay>
                <h3>Você escolheu Boleto</h3>
                <p>Código de Barras: {returnedApiData.pedido.boleto.codigo_barras}</p>
                <p>Data de Vencimento: { handleCovertDate(returnedApiData.pedido.boleto.data_vencimento)}</p>
                <p>Veja o boleto: <a href={returnedApiData.pedido.boleto.url} target="_blank">Ver</a></p>
              </CenterPay>
            )
            }
            </div>
          ) : (
          <div className="container">
            <Titleh2>Formas de pagamentos</Titleh2>
            <CenterPay>

              <div className="input">
                <input type="radio" name="forma-pag" id="pix"
                onClick={
                    () => setFormaDePagamento(5)
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
                    () => setFormaDePagamento(1)
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
                  () => setFormaDePagamento(3)
                }
              />
                <div>
                  <h2>Cartão de crédito</h2>
                  <p>Aprovação imediata</p>
                </div>
              </div>

              {
              formaDePagamento == 3 && (
                <>
                <h5>Selecione um Cartão</h5>
                  {
                  creditCardList.map(
                  (card: any, index: number) => (
                  <div
                  key={index}
                  onClick={(_) => {
                    setCard(card)
                  }}
                  >    
                    <Form.Check
                      type="radio"
                      label={card.apelido}
                      name="formHorizontalRadios"
                      id={card.id}
                    />
                  </div>
                    )
                  )
                  }
                <Link
                  to="/cartoes"
                >
                  Criar Cartões
                </Link>
                </>
              )
              }
              
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
                  gerarFornecedores()
                }
              }
            >Finalizar</Btn>) }
            </BtnFinish>
        </div>)
        }
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
