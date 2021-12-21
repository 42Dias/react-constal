import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Menu } from "../../components/Menu";
import { api, ip } from "../../services/api";

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
  function handleLocalStorage(emailA: string, passwordB: string) {
    
    localStorage.setItem("email", JSON.stringify(email));//saves client's data into localStorage:
    localStorage.setItem("password", JSON.stringify(senha));//saves client's data into localStorage:
    console.log();
  }
  function handleLocalStorageToken(token: string[]) {
    const setLocalStorage = (data: string[]) => {
      localStorage.setItem("token", JSON.stringify(data)); //saves client's data into localStorage:
      console.log("OK!!!");
    };
    setLocalStorage(token);
  }
  async function Cadastro() {
    
      Axios.post('http://'+ip+':8157/api/auth/sign-up', {   
        fullName: nome,   
        email: email,
        password: senha,
        role: parseInt(category),
        status: ''
    }).then((response) =>{
        console.log(response);  
        if(response.statusText === "OK"){
          toast.info('Opa, recebemos o seu registro :)');
          handleLocalStorage(email, senha);
          handleLocalStorageToken(response.data);
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
      history.push("/");
    }

  return (
    <>
      <Header />
      <Menu />
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