import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import {
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiSearch,
  FiX,
} from "react-icons/fi";
import Axios from 'axios';

import logo from "../../assets/images/logo.png";
import {
  ModalContainer,
  Container,
  Cart,
  InputCenter,
  IconsContainer,
  ModalEnter,
  Form,
} from "./styles";

import React, { useState } from "react";

import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  const [email, setUser]=useState('');
  const [password, setPassword]=useState('');
  
  function openModal() {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let token = localStorage.getItem("token");
    console.log("email e senha: "+ email + " " + password );
    
    if (email && password && token){
      handleClickLogin()
    }
    else{
    setIsOpen(true);
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleLocalStorage(emailA: string, passwordB: string) {
    let clientData = [emailA, passwordB];
    const setLocalStorage = () => {
      localStorage.setItem("email", JSON.stringify(emailA));//saves client's data into localStorage:
      localStorage.setItem("password", JSON.stringify(passwordB));//saves client's data into localStorage:
      console.log();
    }

  }
  function handleLocalStorageToken(token: string[]) {
    const setLocalStorage = (data: string[]) => {
      localStorage.setItem("token", JSON.stringify(data));//saves client's data into localStorage:
      console.log("OK!!!");
    }
    setLocalStorage(token)
  }

  let history = useHistory();
  function handleClickLogin() {
    history.push("/meu-perfil");
  }
  async function Login(){
    let response=Axios.post('http://localhost:8157/api/auth/sign-in', {   
            email: email,
            password: password,
        }).then((response) =>{
            console.log(response);  
            if(response.statusText == "OK"){
              toast.info('Opa, recebemos o seu registro :)')
              handleLocalStorage(email, password);
              handleClickLogin();

            }else if(response.statusText == "Forbidden"){
              toast.info("Ops, Não tem permisão!");
            }else{
              toast.info("Ops, Dados Incorretos!");
            }  
            handleLocalStorageToken(response.data);
      })
    
  }
  return (
    <>
      <Container>
        <Link to="/">
          <img src={logo} alt="Constal" />
        </Link>

        <InputCenter>
          <input type="text" placeholder="Pesquise o seu produto" />
          <button type="button">
            <FiSearch />
          </button>
        </InputCenter>

        <IconsContainer>
          <FiUser onClick={openModal} size={20} color="black" />
          <Link to="/favoritos"><FiHeart size={20} color="black" /></Link>
          <Cart to="/cart">
            <div>
              <strong>Meu carrinho</strong>
              <span data-testid="cart-size">
                {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
              </span>
            </div>
            <FiShoppingBag size={20} color="black" />
          </Cart>
        </IconsContainer>
      </Container>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
      >
        <ModalContainer>
          <ModalEnter>
            <h2>Insira os seus dados</h2>
            <FiX size={20} onClick={closeModal} />
          </ModalEnter>
          <Form>
            <label htmlFor="user">E-mail*</label>
            <input type="text" id="user" placeholder="Digite o seu e-mail" required value={email} onChange={text=>setUser(text.target.value)}/>
            <label htmlFor="senha">Senha*</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite a sua senha" required value={password} onChange={text=>setPassword(text.target.value)}
            />

            {/*<Link to="/meu-perfil" className="btn-enter" href="">
              Entrar
              </Link>*/}
            <button className="btn-enter" onClick={Login}>
            Entrar
            </button>
            <div className="contentBorder">
              <div className="border" />
              <p>ou</p>
              <div className="border" />
            </div>

            <Link to="/cadastrar" className="btn-register">
              Cadastrar
            </Link>
          </Form>

          <strong>
            Esqueceu a senha?
            <Link to="" href="">
              Clique aqui
            </Link>
          </strong>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Header;
