import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import MenuAdm from "../../../components/MenuAdm";

export default function Payments() {
  return (
    <>
      <Header />
      <MenuAdm />
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
