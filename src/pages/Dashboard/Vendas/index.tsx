import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, role } from "../../../services/api";
import { Empresa } from "../../../types";


export default function Vendas() {
  const [pedidos = [], setPedidos] = useState<any[]>([]);
  const [pedidosPendentes = [], setPedidosPendentes] = useState<any[]>([])
  const [pedidosConfirmados = [], setPedidosConfirmados] = useState<any[]>([])
  const [pedidosDevolvidos = [], setPedidosDevolvidos] = useState<any[]>([])
  const [pedidosDenunciador = [], setPedidosDenunciador] = useState<any[]>([])
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  const [empresa, setEmpresa] = useState('')

  useEffect(
    () => {
      async function loadPedidosPendentes() {
        pedidos.map(
          (pedido: any) => {
            setPedidosPendentes(pedido)
          }
        )
      }

      async function loadPedidosConfirmados() {
        pedidos.map(
          (pedido: any) => {
            setPedidosConfirmados(pedido)
          }
        )
      }

      async function loadPedidosDevolvidos() {
        pedidos.map(
          (pedido: any) => {
            setPedidosDevolvidos(pedido)
          }
        )
      }

      async function loadPedidosDenunciador() {
        pedidos.map(
          (pedido: any) => {
            setPedidosDenunciador(pedido)
          }
        )
      }
      var filter = "";
      async function loadUser() {
        const response = await api.get('empresa?filter%5Bstatus%5D=aprovado')
          .then(response => {
            return response.data;
          })
        setEmpresas(response.rows)
        console.log("Empresas");
        console.log(response.rows);
      }
      if (role == "admin") {
        loadUser();
      }
      async function loadPedidos() {
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
    }, [])

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Vendas</TitleVendas>
        <label htmlFor="">Selecionar Empresa: </label>
        <select 
          onChange={(text) => setEmpresa(text.target.value)}
        >
          {empresas.map(
            (empresa) => (
              <option value={empresa.id}>{empresa.razaoSocial}</option>
            )
          )}
        </select>
        <MenuSell>
          <span><b>Pendentes({pedidosPendentes.length})</b></span>
          <Link to="/confirmadas"><span>Confirmadas({pedidosConfirmados.length})</span></Link>
          <Link to="/devolvidas"><span>Devolvidas({pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span>Denunciadas({pedidosDenunciador.length})</span></Link>
        </MenuSell>
        {
          pedidosPendentes.map(
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
