import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { MenuSell, TitleVendas, ContainerMenuSell } from "./styles";
import MenuAdm from "../../../components/MenuAdm";

export default function AllUsers() {
  return (
    <>
      <Header />
      <MenuAdm />
      <div className="container">
        <TitleVendas>Usuários</TitleVendas>

        <MenuSell>
          <Link to="/todos-usuarios"><span><b>Clientes(3)</b></span></Link>

          <Link to="/empresa-usuarios"><span>Empresas(3)</span></Link>
          
          <Link to="/gestores"><span>Gestores(3)</span></Link>
        </MenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome do user</span>
            <h3>CPF: XXX</h3>
            <h3>Telefone: XXX</h3>
            <h3>Email: XXX</h3>
          </div>
        </ContainerMenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome do user</span>
            <h3>CPF: XXX</h3>
            <h3>Telefone: XXX</h3>
            <h3>Email: XXX</h3>
          </div>
        </ContainerMenuSell>

        <ContainerMenuSell>
          <div>
            <span>Nome do user</span>
            <h3>CPF: XXX</h3>
            <h3>Telefone: XXX</h3>
            <h3>Email: XXX</h3>
          </div>
        </ContainerMenuSell>
      </div>
    </>
  );
}
