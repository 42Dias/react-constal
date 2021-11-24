import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import MenuEmpresa from "../../../components/MenuEmpresa";

export default function PaymentsCompanies() {
  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
        <TitleVendas>Pagamentos</TitleVendas>

        <MenuSell>
          <Link to="/pagamentos"><span>Clientes(3)</span></Link>
          <Link to="/pagamentos-empresas"><span><b>Empresas(3)</b></span></Link>
        </MenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome da empresa</span>
            <h3>Quantidade de produtos: XXX</h3>
            <h3>Endereço para envio: XXX</h3>
            <h3>Cidade/Estado</h3>
          </div>
          <div>
            <h3>Valor Total: R$800,99</h3>
          </div>
        </ContainerMenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome da empresa</span>
            <h3>Quantidade de produtos: XXX</h3>
            <h3>Endereço para envio: XXX</h3>
            <h3>Cidade/Estado</h3>
          </div>
          <div>
            <h3>Valor Total: R$800,99</h3>
          </div>
        </ContainerMenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome da empresa</span>
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