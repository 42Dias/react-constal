import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';

export default function Register() {
  function handleCustom() {
    toast.info('Opa, recebemos o seu registro :)')
  }

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
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="*****" />
            </div>
            <div>
              <label htmlFor="cadastrar">Cadastrar como:</label>
              <select name="" id="cadastrar">
                <option>Cliente</option>
                <option>Empresa</option>
              </select>
            </div>
          </GridRegister>

          <Terms>
            <input type="checkbox" />
            <span>
              Aceito os <a href="">Termos e condições.</a>
            </span>
          </Terms>
          <LinkContent>
            <button type="button" onClick={handleCustom}>Cadastrar</button>
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}
