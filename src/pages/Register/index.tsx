import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import Axios from 'axios';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [category, setCategory] = useState('1');

  function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    console.log({
      nome,
      email,
      senha,
      category
    });
    Cadastro();
  }

  async function Cadastro() {
    
      Axios.post('http://189.127.14.11:8157/api/auth/sign-up', {   
        fullName: nome,   
        email: email,
        password: senha,
        role: parseInt(category)
    }).then((response) =>{
        console.log(response);  
        if(response.statusText === "OK"){
          toast.info('Opa, recebemos o seu registro :)')
          handleClickLogin();
        }else if(response.statusText === "Forbidden"){
          toast.info("Ops, Não tem permisão!");
        }else{
          toast.info("Ops, Dados Incorretos!");
        }
  })
    
  }
  let history = useHistory();
    function handleClickLogin() {
      history.push("/meu-perfil");
    }

  return (
    <>
      <Header />
      <div className="container">
        <BoxRegister onSubmit={handleCreateUser}>
          <h2>Preencha os campos com seus dados</h2>
          <GridRegister>
            <div>
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                placeholder="Nome" 
                value={nome}
                onChange={event => setNome(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                placeholder="Email" 
                value={email}
                onChange={event => setEmail(event.target.value)}
              /> 
          
            </div>
            <div>
            <label htmlFor="senha">Senha</label>
              <input 
                type="password"
                placeholder="Senha" 
                value={senha}
                onChange={event => setSenha(event.target.value)}
              /> 
            </div>
            <div>
              <label htmlFor="cadastrar">Cadastrar como:</label>
             
              <select 
                value={category}
                onChange={event => setCategory(event.target.value)}
              >
                  <option value={"1"}>Cliente</option>
                  <option value={"2"}>Empresa</option>
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
            <button type="submit">Cadastrar</button>
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}