import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";


{/* CONFIRMADOS */}

export default function Confirmed() {
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
                                <span>Pendentes({  pedidosPendentes.length})</span>
          <Link to="/confirmadas"><span><b>Confirmadas({pedidosConfirmados.length})</b></span></Link>
            <Link to="/devolvidas"><span>Devolvidas({ pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span>enunciadas({pedidosDenunciador.length})</span></Link>
        </MenuSell>

        {
        pedidosConfirmados.map(
          (pedidos) => {
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
              <h3>Status: <b>Entregue</b></h3>
            </div>
          </ContainerMenuSell>
          }
        )
        }
      </div>
    </>
  );
}
