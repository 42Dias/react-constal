import Header from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import { useState } from "react";
import Axios from 'axios';
import React from "react";

export default function Register() {
  const [nome, setNome]=useState('');
  const [email, setEmail]=useState('');
  const [role, setRole]=useState('');
  const [selectValue, setSelectValue] = React.useState('1'); 
  const list = [
    {id: 1, name: 'Cliente'},
    {id: 2, name: 'Empresa'},
  ];
  const [password, setPassword]=useState('');
  
  async function Cadastro() {
    Axios.post('http://localhost:8157/api/auth/sign-up', {   
          fullName: nome,   
          email: email,
          password: password,
          role: parseInt(selectValue)
      }).then((response) =>{
          console.log(response);  
          if(response.statusText == "OK"){
            toast.info('Opa, recebemos o seu registro :)')
            handleClickLogin();
          }else if(response.statusText == "Forbidden"){
            alert("Não tem permisão!");
          }else{
            alert("Dados Incorretos!");
          }
    })
    
  }
  let history = useHistory();
    function handleClickLogin() {
      history.push("/meu-perfil");
    }
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
              <input type="text" id="nome" placeholder="Seu nome" value={nome} onChange={text => setNome(text.target.value)}/>
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="E-mail" value={email} onChange={text => setEmail(text.target.value)}/>
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="*****" value={password} onChange={text => setPassword(text.target.value)}/>
            </div>
            <div>
              <label htmlFor="cadastrar">Cadastrar como:</label>
             
              <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                {list.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}        
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
            <button type="button" onClick={Cadastro}>Cadastrar</button>
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}
