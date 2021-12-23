import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell, SelectInput } from "./styles";
import { Menu } from "../../../components/Menu";
import { useEffect, useState } from "react";
import { api, id, ip, role, status } from "../../../services/api";
import { Empresa } from "../../../types";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";
import Products from "../../Products";
import { formatPrice } from "../../../util/format";


export default function Vendas() {
  const [pedidos = [], setPedidos] = useState<any[]>([]);
  const [pedidosPendentes = [], setPedidosPendentes] = useState<any[]>([]);
  const [pedidosConfirmados = [], setPedidosConfirmados] = useState<any[]>([]);
  const [pedidosDevolvidos = [], setPedidosDevolvidos] = useState<any[]>([]);
  const [pedidosDenunciador = [], setPedidosDenunciador] = useState<any[]>([]);
  const [empresas = [], setEmpresas] = useState<any[]>([]);
  let [empresa, setEmpresa] = useState('');
  let [display, setDisplay] = useState('none');
  let [filter, setFilter] = useState('');
  let [sinal, setSinal] = useState(0);
  let [empresaIds, setEmpresaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  async function loadPedidosPendentes() {
    setPedidosPendentes([])
    pedidos.filter(
      pedido => {
        if (pedido.status == "pendente") {

          setPedidosPendentes((prevProducts: any[]) => {
            //console.log(prevProducts)
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
        if (pedido.status == "confirmado" || pedido.status == "entregue") {
          setPedidosConfirmados((prevProducts: any[]) => {
            //console.log(prevProducts)
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
        if (pedido.status == "devolvido" || pedido.status == "cancelado") {
          setPedidosDevolvidos((prevProducts: any[]) => {
            //console.log(prevProducts)
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
        if (pedido.status == "denunciado") {
          setPedidosDenunciador((prevProducts: any[]) => {
            //console.log(prevProducts)
            return [...new Set([...prevProducts, pedido])]
          })
        }
      }
    )
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

      async function loadUser() {
        setLoading(true)
        setSinal(0)
        const response = await api.get('empresaStatus?filter%5Bstatus%5D=active')
          .then(response => {
            setLoading(false)
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

      else {
        async function loadPedidos() {
          console.log("requisição do pedido feita")
          const res = await api.get('pedido')
          console.log(res.data)
          setPedidos(res.data.rows)
        }
        loadPedidos()
        setSinal(1)

        empresaT(id!)

      }
    }, []);
  useEffect(
    () => {
      loadPedidosPendentes()
      loadPedidosConfirmados()
      loadPedidosDevolvidos()
      loadPedidosDenunciador()
      //console.log("EBA")
    }, [sinal]
  )

  async function empresaT(empresaId: string) {
    setSinal(0)
    console.log("Entrou empresaT");
    console.log(empresaId);

    if (empresaId != "" && empresaId !== empresaIds) {
      setLoading2(true)
      setEmpresaId(empresaId)
      console.log("requisição do pedido feita")
      const res = await api.get('pedido?filter%5BfornecedorEmpresa%5D=' + empresaId)
      // const res = await api.get('pedido')
      //console.log(res.data);
      setLoading2(false)
      setPedidos(res.data.rows);
      setSinal(1)
    }
  }

  //console.log(pedidosPendentes)
  //console.log(pedidosConfirmados)
  //console.log(pedidosDevolvidos)

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Vendas</TitleVendas>
        {
          role == 'admin' ? (
        <SelectInput>
          <label htmlFor="">Selecionar Empresa: </label>
          <select
            onChange={(text) => setEmpresa(text.target.value)} onClick={() => empresaT(empresa)}
          >
            <option value={"Selecione"} key={"--Selecione--"} >Selecione</option>
            {empresas.map(
              (empresa) => (
                <option value={empresa.empresaId} key={empresa.empresaId} >{empresa.razaoSocial || empresa.fullName}</option>
              )
            )}
          </select>
          {loading ? <img width="40px" height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
        </SelectInput>
          ) : (
            false
          )
        }
        <MenuSell>
          <span><b>Pendentes({pedidosPendentes.length})</b></span>
          <Link to="/confirmadas"><span>Confirmadas({pedidosConfirmados.length})</span></Link>
          <Link to="/devolvidas"><span>Devolvidas({pedidosDevolvidos.length})</span></Link>
          <Link to="/denunciadas"><span>Denunciadas({pedidosDenunciador.length})</span></Link>
        </MenuSell>
        {loading2 ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
        {
          pedidosPendentes.map(
            (pedidos) => (
              <ContainerMenuSell>
                <div>
                  <span>Nome do cliente: {pedidos.compradorUser.pessoaFisica[0].nome} </span>
                  <h3>Quantidade de produtos: {pedidos.quantidadeProdutos}</h3>
                  <h3>Endereço para envio: {
                    pedidos.compradorUser.pessoaFisica[0].logradouro + " " +
                    pedidos.compradorUser.pessoaFisica[0].bairro}</h3>
                  <h3>{
                    pedidos.compradorUser.pessoaFisica[0].cidade + " " +
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
