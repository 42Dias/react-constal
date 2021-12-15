import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, role } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";
import Products from "../../Products";
import { formatPrice } from "../../../util/format";


export default function Vendas() {
  const [pedidos = [], setPedidos] = useState<any[]>([]);
  const [pedidosPendentes = [], setPedidosPendentes] = useState<any>();
  const [pedidosConfirmados = [], setPedidosConfirmados] = useState<any[]>([]);
  const [pedidosDevolvidos = [], setPedidosDevolvidos] = useState<any[]>([]);
  const [pedidosDenunciador = [], setPedidosDenunciador] = useState<any[]>([]);
  const [empresas = [], setEmpresas] = useState<Empresa[]>([]);
  let [empresa, setEmpresa] = useState('');
  let [display, setDisplay] = useState('none');
  let [filter, setFilter] = useState('');

/*
async function loadPedidosPendentes() {
  pedidosArrayPendentes = []

  pedidos.filter(
    pedido => {
      if (pedido.status == "pendente")
      {
        pedidosArrayPendentes.push(pedido)
      }
    })
    pedidosArray.map(
      (p) => setPedidosPendentes(p)
    )
}

async function loadPedidosConfirmados() {
  pedidosArrayConfirmados = []

  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "confirmados"){
        pedidosArrayConfirmados.push(pedido)
      }
    })
  pedidosArrayConfirmados.map(
    (p) => setPedidosConfirmados(p)
  )
}

async function loadPedidosDevolvidos() {
  pedidosArrayDevolvidos = []

  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "devolvidos"){
        pedidosArrayDevolvidos.push(pedido)
      }  
    })
    pedidosArrayDevolvidos.map(
    (p) => {
      console.log("p")
      console.log(p)
      setPedidosDevolvidos(p)}
  )
}

async function loadPedidosDenunciador() {
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "denunciados"){

        setPedidosDenunciador(pedido)
      }
    }
  )
}

*/

async function loadPedidosPendentes() {
  pedidos.filter(
    pedido => {
      if (pedido.status == "pendente")
      {
        // setPedidosPendentes((prevValues: any) => {
        //     return [...new Set([...prevValues, pedido])]
        //   })
      }
    }
  )
}

async function loadPedidosConfirmados() {
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "confirmados"){
        setPedidosConfirmados(pedido)
      }
    }
  )
}

async function loadPedidosDevolvidos() {
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "devolvidos"){
        setPedidosDevolvidos(pedido)
      }
      
    }
  )
}

async function loadPedidosDenunciador() {
  pedidos.filter(
    (pedido: any) => {
      if (pedido.status == "denunciados"){
        setPedidosDenunciador(pedido)
      }
    }
  )
}



  useEffect(
    () => {
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
      }

      else{
      async function loadPedidos() {
        console.log("requisição do pedido feita")
        const res = await api.get('pedido')
        console.log(res.data)
        setPedidos(res.data.rows)
      }

      loadPedidos()
    }
    }, []);
    useEffect(
    () => {
      loadPedidosPendentes()
      loadPedidosConfirmados()
      loadPedidosDevolvidos()
      loadPedidosDenunciador()
    }, [pedidos]
    )
    
    async function empresaT(empresaId: string){
      console.log("Entrou empresaT");
      console.log(empresaId);
        console.log("requisição do pedido feita")
        const res = await api.get('pedido?filter%5BfornecedorEmpresa%5D='+empresaId)
        // const res = await api.get('pedido')
        console.log(res.data);

        setPedidos(res.data.rows);
    }
    console.log(pedidosConfirmados)
    console.log(pedidosPendentes)
    console.log(pedidosDevolvidos)
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
              <option value={empresa.id} key={empresa.id} >{empresa.razaoSocial}</option>
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
                <a href="">Ver detalhes</a>
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
