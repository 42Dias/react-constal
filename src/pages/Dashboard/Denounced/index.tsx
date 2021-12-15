import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";

export default function Denounced() {
  const [pedidos = [], setPedidos]                        = useState<any[]>([]); 
  const [pedidosPendentes = [], setPedidosPendentes]      = useState<any[]>([])
  const [pedidosConfirmados = [], setPedidosConfirmados]  = useState<any[]>([])
  const [pedidosDevolvidos = [], setPedidosDevolvidos]    = useState<any[]>([])
  const [pedidosDenunciador = [], setPedidosDenunciador]  = useState<any[]>([])



  useEffect(
    ()=>{
      async function loadPedidosPendentes(){
        pedidos.map(
          (pedido: any) => {
            setPedidosPendentes(pedido)
          }
        )
      }
 
      async function loadPedidosConfirmados(){
        pedidos.map(
          (pedido: any) => {
            setPedidosConfirmados(pedido)
          }
        )
      }
      
      async function loadPedidosDevolvidos(){
        pedidos.map(
          (pedido: any) => {
            setPedidosDevolvidos(pedido)
          }
        )
      }
      
      async function loadPedidosDenunciador(){
        pedidos.map(
          (pedido: any) => {
            setPedidosDenunciador(pedido)
          }
        )
      }
      async function loadPedidos(){
        console.log("requisição do pedido feita")
        const res = await api.get('pedido')
        console.log(res.data)
        setPedidos(res.data)
        loadPedidosPendentes()
        loadPedidosConfirmados()
        loadPedidosDevolvidos()
        loadPedidosDenunciador()

      }
      loadPedidos()
    }, [] )

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Vendas</TitleVendas>

        <MenuSell>
        <Link to="/vendas"><span>Pendentes({  pedidosPendentes.length})</span></Link>

          <Link to="/confirmadas"><span>Confirmadas({pedidosConfirmados.length})</span></Link>
            <Link to="/devolvidas"><span>Devolvidas({ pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span><b>Denunciadas({pedidosDenunciador.length})</b></span></Link>
        </MenuSell>


        <ContainerMenuSell>
          <div>
            <span>Nome do cliente</span>
            <h3>Quantidade de produtos: XXX</h3>
            <h3>Endereço para envio: XXX</h3>
            <h3>Cidade/Estado</h3>
          </div>
          <div>
            <a href="">Ver detalhes</a>
            <h3>Valor Total: R$800,99</h3>
            <h3>Status: <b>Denunciado</b></h3>
          </div>
        </ContainerMenuSell>
      </div>
    </>
  );
}
