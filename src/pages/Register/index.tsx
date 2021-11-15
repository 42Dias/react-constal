import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";

export default function Register() {
  return (
    <>
      <Header />
      <div className="container">
        <BoxRegister>
          <h2>Preencha os campos com seus dados</h2>
          <GridRegister>
            <div>
              <label htmlFor="nome">Nome completo</label>
              <input type="text" id="nome" placeholder="Seu nome" />
            </div>
            <div>
              <label htmlFor="cpf">Cpf</label>
              <input type="text" id="cpf" placeholder="Seu cpf" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="*****" />
            </div>
          </GridRegister>

          <Terms>
            <input type="checkbox" />
            <span>
              Aceito os <a href="">Termos e condições.</a>
            </span>
          </Terms>
          <LinkContent>
            <Link to="/meu-perfil">Cadastrar</Link>
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}
