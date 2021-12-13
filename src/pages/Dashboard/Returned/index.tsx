import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import { Menu } from "../../../components/Menu";

export default function Returned() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <TitleVendas>Devolvidas</TitleVendas>

        <MenuSell>
          <Link to="/vendas"><span>Pendentes(2)</span></Link>
          <Link to="/confirmadas"><span>Confirmadas(4)</span></Link>
          <Link to="/devolvidas"><span><b>Devolvidas(3)</b></span></Link>
          <Link to="/denunciadas"><span>Denunciadas(3)</span></Link>
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
            <h3>Status: <b>Devolvido</b></h3>
          </div>
        </ContainerMenuSell>

      </div>
    </>
  );
}
