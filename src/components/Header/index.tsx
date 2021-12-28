import { Link, useHistory } from "react-router-dom";
import GlobalStyles from "../../styles/global";
import Modal from "react-modal";
import {
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiSearch,
  FiX,
  FiMenu,
} from "react-icons/fi";
import Axios from "axios";
import logo from "../../assets/images/logo.png";
import { FiLogOut } from "react-icons/fi";
import loading from "../../assets/images/loading.gif";

import {
  ModalContainer,
  Container,
  Cart,
  InputCenter,
  IconsContainer,
  ModalEnter,
  Form,
  IconsContainerMenu,
  PasswordContent,
} from "./styles";

import React, { useEffect, useState } from "react";

import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { api, id, ip, role, token } from "../../services/api";
import axios from "axios";
import { margin } from "polished";

const Header = (): JSX.Element => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const { cart } = useCart();

  //console.log("cart")
  //console.log(cart)

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  const [email, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [cartSize, setCartSize] = useState(0);
  const [loading, setLoading] = useState(false);

  function openModal() {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let token = localStorage.getItem("token");
    /*
    Verificar se o token é valido, caso não descartar o token

    */
    console.log("email e senha: " + email + " " + password);

    if (token) {
      handleClickLogin();
    } else {
      setIsOpen(true);
    }
    setClick(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeMobileMenu() {
    setIsOpen(false);
  }

  function handleLocalStorage(emailA: string, passwordB: string) {
    localStorage.setItem("email", JSON.stringify(emailA)); //saves client's data into localStorage:
    localStorage.setItem("password", JSON.stringify(passwordB)); //saves client's data into localStorage:
    console.log();
  }
  function handleLocalStorageToken(token: string[]) {
    const setLocalStorage = (data: string[]) => {
      localStorage.setItem("token", JSON.stringify(data)); //saves client's data into localStorage:
      console.log("OK!!!");
    };
    setLocalStorage(token);
    loadUser();
  }

  let history = useHistory();
  function handleClickLogin() {
    if (role === "pessoa") {
      history.push("/meu-perfil/"+token);
    } else {
      history.push("/dados-pessoais");
    }
  }
  async function loadUser() {
    const response = await axios({
      method: "get",
      url: `http://${ip}:8157/api/auth/me`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      timeout: 50000,
    }).then((response) => {
      return response.data;
    });
    console.log(response);
    console.log(response.tenants[0].roles[0]);
    localStorage.setItem("roles", JSON.stringify(response.tenants[0].roles[0])); //saves client's data into localStorage:
    console.log(response.tenants[0].tenant.id);
    localStorage.setItem(
      "tenantId",
      JSON.stringify(response.tenants[0].tenant.id)
    ); //saves client's data into localStorage:
    localStorage.setItem("id", JSON.stringify(response.id)); //saves client's data into localStorage:
    localStorage.setItem("status", JSON.stringify(response.tenants[0].status)); //saves client's data into localStorage:
  }
  async function Login() {
    setLoading(true);
    let response = Axios.post("http://" + ip + ":8157/api/auth/sign-in", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.statusText == "OK") {
        toast.info('Login efetuado com sucesso! :)');
        setLoading(false);
        handleLocalStorage(email, password);
        handleLocalStorageToken(response.data);
        closeModal();
        window.location.reload();
      } else if (response.statusText == "Forbidden") {
        setLoading(false);
        toast.error("Ops, Não tem permisão!");
      } else {
        setLoading(false);
        toast.error("Ops, Dados Incorretos!");
      }

    }).catch((error) =>{
      setLoading(false);
      toast.error("Desculpe, não reconhecemos suas credenciais")
    });
    
  }
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    async function loadCart() {
      //console.log("await cart")
      //console.log(await cart)

      setCartSize(1);
    }
    loadCart();
    console.log(cartSize);
  }, []);

  function logof(){
    localStorage.clear();
    toast.info("Saiu!")
    window.location.reload();
  }

  async function senEmail() {
    setLoading(true)
    axios.post(`http://${ip}:8157/api/cliente/trocarSenha`,{
      email: email
    }).then((response) => {
      if (response.statusText == "OK") {
        toast.info('Email enviado com sucesso!');
        setLoading(false)
      }else{
        toast.error('Email não enviado com sucesso!');
      }
    });
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        {/* 
        <header>
          <nav>
            <ul className={click ? "nav-options active" : "nav-options"}>
            </ul>
          </nav>

          <div className="mobile-menu" onClick={handleClick}>
            {click ? (
              <h2 onClick={closeMobileMenu}>fechei</h2>
            ) : (
              <FiMenu className="menu-icon" />
            )}
          </div>
        </header> 
      */}

        <InputCenter>
          <nav className="header">
            <div>
              <Link to="/">
                <img src={logo} alt="Constal" />
              </Link>
            </div>

            <ul className={click ? "nav-options active" : "nav-options"}>
              <div className="input">
                <input type="text" placeholder="Pesquise o seu produto" />
                <button type="button">
                  <FiSearch />
                </button>
              </div>

              <IconsContainer>
                <FiUser onClick={openModal} size={20} />{token ? "Perfil":"Login"}
                {role != "pessoa" ? (
                  <div />
                ) : (
                  <>
                    <Link to="/favoritos">
                      <FiHeart size={20} />
                    </Link>
                    <Cart to="/cart">
                      <div>
                        <strong>Meu carrinho</strong>
                        <span data-testid="cart-size">
                          {cartSize == 1
                            ? `${cartSize} item`
                            : `${cartSize} itens`}
                        </span>
                      </div>
                      <FiShoppingBag size={20} />
                    </Cart>
                  </>
                )}
                <button className="loggout">
                  <FiLogOut size={20} onClick={logof}/>Sair
                </button>
              </IconsContainer>

              <IconsContainerMenu>
                <div className="icons-flex-align">
                  <div className="flex-item" onClick={openModal}>
                    <span>Meu perfil</span>
                    <FiUser size={20} />
                  </div>
                  {role != "pessoa" ? (
                    <div />
                  ) : (
                    <>
                      <div className="flex-item">
                        <span>Meus produtos favoritos</span>
                        <Link to="/favoritos">
                          <FiHeart size={20} />
                        </Link>
                      </div>
                      <Cart to="/cart">
                        <div>
                          <strong>Meu carrinho</strong>
                          <span data-testid="cart-size">
                            {cartSize == 1
                              ? `${cartSize} item`
                              : `${cartSize} itens`}
                          </span>
                        </div>
                        <FiShoppingBag size={20} />
                      </Cart>
                    </>
                  )}
                </div>
              </IconsContainerMenu>
            </ul>
          </nav>

          <div className="mobile-menu" onClick={handleClick}>
            {click ? (
              <FiX className="menu-icon" onClick={closeMobileMenu} />
            ) : (
              <FiMenu className="menu-icon" />
            )}
          </div>
        </InputCenter>
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
            <input
              type="text"
              id="user"
              placeholder="Digite o seu e-mail"
              required
              value={email}
              onChange={(text) => setUser(text.target.value)}
            />
            <label htmlFor="senha">Senha*</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite a sua senha"
              required
              value={password}
              onChange={(text) => setPassword(text.target.value)}
            />

            {/*<Link to="/meu-perfil" className="btn-enter" href="">
              Entrar
            </Link>*/}
            {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : (
              <button className="btn-enter" onClick={Login}>
                Entrar
              </button>
            )}
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
            <span onClick={openModal2}> Clique aqui</span>
          </strong>
        </ModalContainer>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        className="modal"
      >
        <ModalContainer>
          <ModalEnter>
            <h2>Insira os seus dados</h2>
            <FiX size={20} onClick={closeModal2} />
          </ModalEnter>

          <PasswordContent>
            <label htmlFor="email">Confirme o seu e-mail</label>
            <input type="email" id="email" placeholder="Email" value={email}
              onChange={(text) => setUser(text.target.value)}/>
              {loading ? (
              <img
                width="40px"
                style={{ margin: "0 auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) :
            <button onClick={senEmail}>Verificar</button>}
          </PasswordContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Header;
