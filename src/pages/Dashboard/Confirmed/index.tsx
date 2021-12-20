import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { api, ip, role } from "../../../services/api";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../util/format";
import { Empresa } from "../../../types";


{/* CONFIRMADOS */}

export default function Confirmed() {
  const [pedidos = [], setPedidos] = useState<any[]>([]);
  const [pedidosPendentes = [], setPedidosPendentes] = useState<any[]>([]);
  const [pedidosConfirmados = [], setPedidosConfirmados] = useState<any[]>([]);
  const [pedidosDevolvidos = [], setPedidosDevolvidos] = useState<any[]>([]);
  const [pedidosDenunciador = [], setPedidosDenunciador] = useState<any[]>([]);
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  let [empresa, setEmpresa] = useState('');
  let [display, setDisplay] = useState('none');
  let [filter, setFilter] = useState('');
  let [sinal, setSinal] = useState(0);

async function loadPedidosPendentes() {
  setPedidosPendentes([])
  pedidos.filter(
    pedido => {
      if (pedido.status == "pendente")
      {
        
        setPedidosPendentes((prevProducts: any[]) => {
          console.log(prevProducts)
          return [...new Set([...prevProducts, pedido])]	
            })
      
      }
    }
  )
}

async function loadPedidosConfirmados() {
  setPedidosConfirmados([])
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "confirmado" || pedido.status == "entregue"){
        setPedidosConfirmados((prevProducts: any[]) => {
          console.log(prevProducts)
          return [...new Set([...prevProducts, pedido])]	
            })
      }
    }
  )
}

async function loadPedidosDevolvidos() {
  setPedidosDevolvidos([])
  
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "devolvido" || pedido.status == "cancelado"){
        setPedidosDevolvidos((prevProducts: any[]) => {
        console.log(prevProducts)
        return [...new Set([...prevProducts, pedido])]	
          })
      }
    }
  )
}

async function loadPedidosDenunciador() {
  setPedidosDenunciador([])
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "denunciado"){
        setPedidosDenunciador((prevProducts: any[]) => {
          console.log(prevProducts)
          return [...new Set([...prevProducts, pedido])]	
            })
      }
    }
  )
}



  useEffect(
    () => {
      if(role != 'admin' && role != "empresa"){
        // Simulate an HTTP redirect:
        window.location.replace(`http://${ip}:3000/constal#/erro`);
      }
  
      async function loadUser() {
        setSinal(0)
        const response = await api.get('empresaStatus?filter%5Bstatus%5D=active')
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
      }

      else{
      async function loadPedidos() {
        console.log("requisição do pedido feita")
        const res = await api.get('pedido')
        console.log(res.data)
        setPedidos(res.data.rows)
      }
      loadPedidos()
      setSinal(1)
    }
    }, []);
    useEffect(
    () => {
      loadPedidosPendentes()
      loadPedidosConfirmados()
      loadPedidosDevolvidos()
      loadPedidosDenunciador()
      console.log("EBA")
    }, [sinal]
    )
    
    async function empresaT(empresaId: string){
      setSinal(0)
      console.log("Entrou empresaT");
      console.log(empresaId);
        console.log("requisição do pedido feita")
        const res = await api.get('pedido?filter%5BfornecedorEmpresaId%5D='+empresaId)
        // const res = await api.get('pedido')
        console.log(res.data);

        setPedidos(res.data.rows);
        setSinal(1)
    }

    console.log(pedidosPendentes)
    console.log(pedidosConfirmados)
    console.log(pedidosDevolvidos)

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Vendas</TitleVendas>

        {/*<div style={{display: display}}>
        <label htmlFor="">Selecionar Empresa: </label>
        <select 
          onChange={(text) => setEmpresa(text.target.value)} onClick={() => empresaT(empresa)}
        >
          <option value={"--Selecione--"} key={"--Selecione--"} >--Selecione--</option>
          {empresas.map(
            (empresa) => (
              <option value={empresa.id} key={empresa.id} >{empresa.razaoSocial}</option>
            )
          )}
        </select>
            </div>*/}
        <MenuSell>
          <Link to="/vendas"><span>Pendentes({pedidosPendentes.length})</span></Link>
          <span><b>Confirmadas({pedidosConfirmados.length})</b></span>
          <Link to="/devolvidas"><span>Devolvidas({pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span>Denunciadas({pedidosDenunciador.length})</span></Link>
        </MenuSell>
        {
          pedidosConfirmados.map(
            (pedidos) => (
              <ContainerMenuSell>
              <div>
                <span>Nome do cliente: {pedidos.compradorUser.pessoaFisica[0].nome} </span>
                <h3>Quantidade de produtos: { pedidos.quantidadeProdutos }</h3>
                <h3>Endereço para envio: {
                  pedidos.compradorUser.pessoaFisica[0].logradouro+" " +
                  pedidos.compradorUser.pessoaFisica[0].bairro }</h3>
                <h3>{
                  pedidos.compradorUser.pessoaFisica[0].cidade+ " " +
                  pedidos.compradorUser.pessoaFisica[0].estado}</h3>
              </div>

              <div>
                <Link to={`/detalhes-da-venda/${pedidos.id}`}>Ver detalhes</Link>
                <h3>Valor Total: {formatPrice(pedidos.valorTotal)}</h3>
                <h3>Status: <b>{pedidos.status}</b></h3>
              </div>
            </ContainerMenuSell>
            )
          )
        }
      </div>
    </>
  );
}
