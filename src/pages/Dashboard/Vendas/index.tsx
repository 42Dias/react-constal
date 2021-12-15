import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, role } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";


export default function Vendas() {
  const [pedidos = [], setPedidos] = useState<any[]>([]);
  const [pedidosPendentes = [], setPedidosPendentes] = useState<any[]>([]);
  const [pedidosConfirmados = [], setPedidosConfirmados] = useState<any[]>([]);
  const [pedidosDevolvidos = [], setPedidosDevolvidos] = useState<any[]>([]);
  const [pedidosDenunciador = [], setPedidosDenunciador] = useState<any[]>([]);
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  let [empresa, setEmpresa] = useState('');
  let [display, setDisplay] = useState('none');
  let [filter, setFilter] = useState('');
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
        setDisplay('block'); 
        loadUser();
      }else{
      async function loadPedidos() {
        console.log("requisição do pedido feita")
        const res = await api.get('pedido')
        console.log(res.data)
        setPedidos(res.data.rows)
        loadPedidosPendentes()
        loadPedidosConfirmados()
        loadPedidosDevolvidos()
        loadPedidosDenunciador()

      }
      loadPedidos()
    }
    }, []);
    
    async function empresaT(empresaId: string){
      console.log("Entrou empresaT");
      console.log(empresaId);
        console.log("requisição do pedido feita")
        const res = await api.get('pedido?filter%5BfornecedorEmpresa%5D='+empresaId)
        console.log(res.data);
        setPedidos(res.data.rows);
    }

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Vendas</TitleVendas>
        <div style={{display: display}}>
        <label htmlFor="">Selecionar Empresa: </label>
        <select 
          onChange={(text) => setEmpresa(text.target.value)} onClick={() => empresaT(empresa)}
        >
          {empresas.map(
            (empresa) => (
              <option value={empresa.id} >{empresa.razaoSocial}</option>
            )
          )}
        </select>
        </div>
        <MenuSell>
          <span><b>Pendentes({pedidosPendentes.length})</b></span>
          <Link to="/confirmadas"><span>Confirmadas({pedidosConfirmados.length})</span></Link>
          <Link to="/devolvidas"><span>Devolvidas({pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span>Denunciadas({pedidosDenunciador.length})</span></Link>
        </MenuSell>
        {
          pedidos.map(
            (pedidos) => {
              console.log("pedidos");
              console.log(pedidos);
              <ContainerMenuSell>
                <div>
                  <span>{pedidos.compradorUser.firstName}</span>
                  <h3>Quantidade de produtos: {pedidos.quantidadeProdutos}</h3>
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
