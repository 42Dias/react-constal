import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import Axios from 'axios';
import React from "react";

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [category, setCategory] = useState('')
  
  function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    console.log({
      nome,
      email,
      senha,
      category
    });
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
            <button type="submit">Cadastrar</button>
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}