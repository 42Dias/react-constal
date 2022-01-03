import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { useEffect } from "react";
import { ip, role, status } from "../../../services/api";

export default function Payments() {
  useEffect(
    () => {
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`http://dev.42dias.com.br/Clientes/constal/#/erro`);
        }
      }
  
    }
    ,[]
  )
  return (
    <>
      <Header />
      <Menu />

      <div className="container">
        <TitleVendas>Pagamentos</TitleVendas>

        <MenuSell>
          <Link to="/pagamentos"><span><b>Clientes(3)</b></span></Link>
          <Link to="/pagamentos-empresas"><span>Empresas(3)</span></Link>
        </MenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome do cliente</span>
            <h3>Quantidade de produtos: XXX</h3>
            <h3>Endereço para envio: XXX</h3>
            <h3>Cidade/Estado</h3>
          </div>
          <div>
            <h3>Valor Total: R$800,99</h3>
          </div>
        </ContainerMenuSell>
      </div>
    </>
  );
}
