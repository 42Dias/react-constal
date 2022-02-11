import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import item from "../../../assets/images/prodfav.png";
import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, id, ip, role, status } from "../../../services/api";
import { complement } from "polished";
import { formatPrice } from "../../../util/format";
import moment from "moment";

export default function SaleDetails() {
  const [response, setResponse]=useState<any[]>([]);

  
  

  

  const [total, setTotal]=useState('');


  

  function getHash() {
      const hash = window.location.hash.replace(/#\/detalhes-da-venda\//g, '');    
      // /#\/detalhes-da-venda\//
      // const hash = window.location.hash.replace(/#\/produto\//g, '');    
      return hash
    }

  async function loadPedidoDetails() {
    const pedidoId = getHash()
    // console.log("pedidoId")      
    // console.log(pedidoId)      

    const data = {
      userId: id
    }


    const response = await api.post(`findPedidoWithProductToEmpresa?filter%5BpedidoId%5D=${pedidoId}`, data)        
    // console.log("response.data")
    // console.log(response.data)
    setResponse(response.data)

    /*
    NECESSIDADE DE LINKAR O PRODUTO COM O PEDIDO
    */

  }

  useEffect(
    () => {
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`${ip}/#/erro`);
        }
      }

      loadPedidoDetails()
    }
    ,[])


  return (
    <>
      <Header />
      <Menu />
      <div className="container">
          <h2>Detalhes da venda</h2>
          {response.map(
            (pedido) => (
            <>
            <CardDatails>
          <CardDatailsContent>
            <ContentDetails
            style={{
              width: '95%'
            }}
            >
              <ContentDetails>
                <img  src={pedido.imagemUrl} alt={pedido.nome} />
                {/* <img  src={pedido.imagemUrl} alt={pedido.nome} /> */}
                <span>{pedido.nome} </span>
              </ContentDetails>
              <p>{
                formatPrice(pedido.preco)
                }</p>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatails>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Nome do cliente: </b> {pedido.nome} <br />
                  CPF: {pedido.cpf} <br />
                  {/* Metodo de pagamento: {formaPagamento} <br />
                  Parcelamento: XX */}
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Entrega</b> <br />
                  Endereço de destino: {pedido.logradouro} {pedido.numero}, {pedido.bairro}, {pedido.cep} <br />
                  Complemento: {pedido.complemento} <br />
                  {pedido.cidade}/{pedido.estado}
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Detalhes</b> <br />
                  Data de solicitação da compra:  {
                  moment(pedido.dataPedido).format('DD/MM/YYYY')
                  } <br />
                  Produto {formatPrice(pedido.preco)} <br />
                  Envio {pedido.valorFrete? formatPrice(pedido.valorFrete): 'grátis'} <br />
                  <b>Total: {pedido.valorFrete? formatPrice(pedido.preco + pedido.valorFrete): formatPrice(pedido.preco)}</b>
                </small>
              </ContentDetails>
            </CardDatailsContent>
          </CardDatails>
        </CardDatails>
            </>  
              )
          )}
      </div>
    </>
  );
}
