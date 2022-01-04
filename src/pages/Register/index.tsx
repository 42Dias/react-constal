import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Menu } from "../../components/Menu";
import { api, id, ip, token } from "../../services/api";
import axios from "axios";
import * as S from '../Signature/Signature.styled'

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [category, setCategory] = useState('1');
  const [loading, setLoading] = useState(false);

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
    
    localStorage.setItem("email", JSON.stringify(emailA));//saves client's data into localStorage:
    localStorage.setItem("password", JSON.stringify(passwordB));//saves client's data into localStorage:
    console.log();
  }
  async function senEmail() {
    Axios.post(`${ip}:8157/api/cliente/${id}/${token}/verificarEmail`,{
      email: email
    }).then((response) => {
      if (response.statusText == "OK") {
        toast.info('Email enviado com sucesso!');
        setLoading(false)
        handleClickLogin();
      }else{
        toast.error('Email não enviado com sucesso!');
      }
    });
  }
  async function loadUser(token:any) {
    const response = await axios({
      method: 'get',
      url: `${ip}:8157/api/auth/me`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      timeout: 50000
    }).then(response => {
      return response.data;
    })
    console.log(response);
    console.log(response.tenants[0].roles[0]);
    localStorage.setItem("roles", JSON.stringify(response.tenants[0].roles[0]));//saves client's data into localStorage:
    console.log(response.tenants[0].tenant.id);
    localStorage.setItem("tenantId", JSON.stringify(response.tenants[0].tenant.id));//saves client's data into localStorage:
    localStorage.setItem("id", JSON.stringify(response.id));//saves client's data into localStorage:
    localStorage.setItem("status", JSON.stringify(response.tenants[0].status));//saves client's data into localStorage:
    senEmail();
  }
  function handleLocalStorageToken(token: string[]) {
    const setLocalStorage = (data: string[]) => {
      localStorage.setItem("token", JSON.stringify(data)); //saves client's data into localStorage:
      console.log("OK!!!");
    };
    setLocalStorage(token);
    loadUser(token)
  }
  async function Cadastro() {
      setLoading(true)
      let responser = Axios.post(''+ip+':8157/api/auth/sign-up', {   
        fullName: nome,   
        email: email,
        password: senha,
        role: parseInt(category),
        status: ''
    }).then((response) =>{
        console.log(response);  
        if(response.statusText === "OK"){
          toast.info('Opa, recebemos o seu registro :)');
          if(category == '2'){
            toast.info('Obrigado pela sua adesão');
          }
          handleLocalStorage(email, senha);
          handleLocalStorageToken(response.data);
        }else if(response.statusText === "Forbidden"){
          toast.error("Ops, Não tem permisão!");
          setLoading(false)
        }else{
          toast.error("Ops, Dados Incorretos!");
          setLoading(false)
        }
  }).catch(res => {
    if (res.response.data){
      toast.error(res.response.data);
    }
    else{
      toast.error("Erro no servidor, tente mais tarde :(");
    }
    setLoading(false)
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
                  <option value={"3"}>Admin</option>
              </select> 
            </div>
          </GridRegister>
          {category === "2"?
        <S.Container style={{margin:"0 auto"}} >
        <S.Title>Planos de cobrança da plataforma</S.Title>
        <S.Cards>
          <S.Card>
            <h3>Free</h3>
            <p style={{color: "#58A4B0"}}>Taxa de 5% por venda finalizada</p>
            <strong>R$ 00,00/mês</strong>
            

            {/*<button type="button">Adquirir</button>*/}
          </S.Card>
        </S.Cards>
      </S.Container>:false} 
          <Terms>
            <input type="checkbox" />
            <span>
              Aceito os <a href="">Termos e condições
              {
                category == '2' ? ' e plano de assinatura': ''
              }
              .</a>
            </span>
          </Terms>
          <LinkContent>
          {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : 
            <button type="submit">Cadastrar</button>}
          </LinkContent>
        </BoxRegister>
      </div>
    </>
  );
}