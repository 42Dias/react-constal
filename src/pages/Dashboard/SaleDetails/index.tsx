import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import item from "../../../assets/images/prodfav.png";
import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, ip, role, status } from "../../../services/api";
import { complement } from "polished";
import { formatPrice } from "../../../util/format";

export default function SaleDetails() {

  const [pedido, setPedido]=useState<any>();

  const [produto, setProduto]=useState<any>();
  const [produtoId, setProdutoId]=useState('');

  const [preco, setPreco]=useState('');
  const [img, setImg]=useState('');
  const [cpf, setCPF]=useState('');
  const [phone, setPhone]=useState('');
  const [logradouro, setLogradouro]=useState('');
  const [bairro, setBairro]=useState('');
  const [cep, setCEP]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');
  const [valorEntrega, setValorEntrega]=useState('');
  const [rua, setRua]=useState('');
  const [numero, setNumero]=useState('');
  const [complemento, setComplemento]=useState('');
  const [valorFrete, setValorFrete]=useState(0);
  const [valorTotal, setValorTotal]=useState(0);
  const [formaPagamento, setFormaPagamento]=useState(0);
  const [dataPedido, setDataPedido]=useState('');
  
  
  

  

  const [total, setTotal]=useState('');


  

  function getHash() {
      const hash = window.location.hash.replace(/#\/detalhes-da-venda\//g, '');    
      // /#\/detalhes-da-venda\//
      // const hash = window.location.hash.replace(/#\/produto\//g, '');    
      return hash
    }

  useEffect(
    () => {
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`http://${ip}:3000/constal#/erro`);
        }
      }
  
      async function loadPedidoDetails() {
        const pedidoId = getHash()
        console.log("pedidoId")      
        console.log(pedidoId)      
        const response = await api.get(`find-pedido/${pedidoId}`)        
        console.log(response.data)
        setPedido(response.data)

        // setProdutoId(pedido.produto.id)
        // setProduto(pedido.produto)
        setPreco(response.data.preco)
        setImg(response.data.img)
        setCPF(response.data.cpf)
        setPhone(response.data.telefone)
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setCEP(response.data.cep)
        setCidade(response.data.cidade)
        setEstado(response.data.estado)
        setValorEntrega(response.data.valorEntrega)
        setRua(response.data.rua)
        setNumero(response.data.numero)
        setComplemento(response.data.complemento)
        setFormaPagamento(response.data.formaPagamento)
        setValorFrete(response.data.valorFrete)
        setValorTotal(response.data.valorTotal)
        setDataPedido(response.data.dataPedido)

        /*
        NECESSIDADE DE LINKAR O PRODUTO COM O PEDIDO
        */

      }

      loadPedidoDetails()
    }
    ,[])


  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Detalhes da venda</h2>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <span>Headset Preto</span>
            </ContentDetails>
            <p>R$ 999,99</p>
          </CardDatailsContent>

          <CardDatails>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Nome do cliente: </b> <br />
                  CPF: {cpf} <br />
                  Metodo de pagamento: {formaPagamento} <br />
                  Parcelamento: XX
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Entrega</b> <br />
                  Endereço de destino: {/*{rua},*/} {numero}, {bairro}, {cep} <br />
                  Complemento: {complemento} <br />
                  {cidade}/{estado}
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Detalhes</b> <br />
                  Data de solicitação da compra:  {dataPedido} <br />
                  Produto R$ 00,00 {/*pedidoId*/} <br />
                  Envio {formatPrice(valorFrete)} <br />
                  <b>Total: {formatPrice(valorTotal)}</b>
                </small>
              </ContentDetails>
            </CardDatailsContent>
          </CardDatails>
        </CardDatails>
      </div>
    </>
  );
}
